import path from 'path'
import semver from 'semver'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import * as core from '@actions/core'
import * as glob from '@actions/glob'
import * as tc from '@actions/tool-cache'
import { HttpClient } from '@actions/http-client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const http = new HttpClient('@actions/http-client')
const installSh = path.resolve(__dirname, '../../main/sh/install.sh')

export function getArch() {
  const { arch } = process
  if (!['arm64', 'x64'].includes(arch)) {
    throw new Error(`Unsupported arch: ${arch}`)
  }

  return arch
}

export function getPlatform() {
  const { platform } = process
  if (!['linux', 'darwin'].includes(platform)) {
    throw new Error(`Unsupported platform: ${platform}`)
  }

  return platform
}

export async function install(
  repo: string,
  version: string,
  platform: string,
  arch: string
) {
  if (!repo) throw new Error('Source repo is required')
  if (!version) throw new Error('Bun version is required')
  if (!platform) throw new Error('Target platform is required')

  const bunDist = await getBunDist(repo, version, platform, arch)

  return _install(platform, bunDist)
}

export async function _install(platform: string, distPath: string) {
  const HOME = process.env['HOME']
  const BUN_INSTALL = `${HOME}/.bun`
  const temp = await tc.extractZip(distPath)
  const binDir = `${BUN_INSTALL}/bin`
  const bun = (await (await glob.create(`${temp}/**/bun`)).glob())[0]

  if (bun) {
    await fs.mkdir(binDir, { recursive: true })
    await fs.rename(bun, `${binDir}/bun`)
  }

  core.exportVariable('BUN_INSTALL', BUN_INSTALL)
  core.addPath(binDir)

  return BUN_INSTALL
}

export async function pickVersion(repo: string, range: string) {
  type Tag = { name: string }
  const url = `https://api.github.com/repos/${repo}/tags?per_page=1000&page=1`
  const tags = (await http.getJson(url)).result as Tag[]
  const version = tags.find(({ name }) =>
    semver.satisfies(name.replace('bun-', ''), range)
  )

  if (!version) throw new Error(`Version ${range} not found in ${repo}`)

  return version.name
}

export async function getBunDist(
  repo: string,
  version: string,
  platform: string,
  arch: string
): Promise<string> {
  const _version = version.replace('bun-', '')
  const file = `bun-${version}-${platform}-${arch}.zip`
  const cachedBunPath = tc.find('bun', _version, arch)
  if (cachedBunPath) {
    core.info(`bun ${_version} ${platform} ${arch} found in cache`)
    return path.join(cachedBunPath, file)
  }

  const bunUri = getBunUri(repo, version, platform, arch)
  core.info(`Downloading bun from ${bunUri}`)
  const bunDist = await tc.downloadTool(bunUri)

  await tc.cacheFile(bunDist, file, 'bun', _version, arch)
  core.info(`bun dist cached as ${tc.find('bun', _version, arch)}`)

  return bunDist
}

export function getBunUri(
  repo: string,
  version: string,
  platform: string,
  arch: string
) {
  return `https://github.com/${repo}/releases/download/${version}/bun-${platform}-${arch}.zip`
}
