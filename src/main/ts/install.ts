import path from 'path'
import semver from 'semver'
import fs from 'fs/promises'
import * as core from '@actions/core'
import * as glob from '@actions/glob'
import * as tc from '@actions/tool-cache'
import * as cache from '@actions/cache'
import { HttpClient } from '@actions/http-client'

const http = new HttpClient('@actions/http-client')

export function getArch(arch: string = process.arch) {
  if (!['arm64', 'x64', 'x86_64', 'aarch64'].includes(arch))
    throw new Error(`Unsupported arch: ${arch}`)

  return arch
}

export function getPlatform(platform: string = process.platform) {
  if (!['linux', 'darwin'].includes(platform))
    throw new Error(`Unsupported platform: ${platform}`)

  return platform
}

export async function install(
  repo: string,
  version: string,
  platform: string,
  arch: string,
  token?: string,
  withCache?: string
) {
  const HOME = process.env['HOME']
  const BUN_INSTALL = `${HOME}/.bun`
  const bunBinDir = `${BUN_INSTALL}/bin`
  const binId = `bun-${version}-${platform}-${arch}`
  const restored = withCache && (await cache.restoreCache([bunBinDir], binId))

  if (restored) {
    core.info(`${binId} binary restored from action cache`)
  } else {
    const bunDist = await getBunDist(repo, version, platform, arch, token)
    const temp = await tc.extractZip(bunDist)
    const bun = (await (await glob.create(`${temp}/**/bun`)).glob())[0]

    if (bun) {
      await fs.mkdir(bunBinDir, { recursive: true })
      await fs.rename(bun, `${bunBinDir}/bun`)
    }
  }

  if (withCache && restored !== binId) {
    await cache.saveCache([bunBinDir], binId)
    core.info(`${binId} binary added to action cache`)
  }

  core.exportVariable('BUN_INSTALL', BUN_INSTALL)
  core.addPath(bunBinDir)

  return BUN_INSTALL
}

export async function pickVersion(repo: string, range: string) {
  type Tag = { name: string }
  const url = `https://api.github.com/repos/${repo}/tags?per_page=1000&page=1`
  const tags = (await http.getJson(url)).result as Tag[]
  const _range = range === 'latest' ? '*' : range

  if (semver.validRange(_range) === null) {
    throw new Error(`Invalid version range: ${_range}`)
  }

  const version = tags.find(({ name }) =>
    semver.satisfies(name.replace('bun-', ''), _range)
  )
  if (!version) throw new Error(`Version ${range} not found in ${repo}`)

  return version.name
}

export async function getBunDist(
  repo: string,
  version: string,
  platform: string,
  arch: string,
  token?: string
): Promise<string> {
  const _version = version.replace('bun-', '')
  const file = `bun-${_version}-${platform}-${arch}.zip`
  const cachedBunPath = tc.find('bun', _version, arch)
  if (cachedBunPath) {
    core.info(`bun ${file} found in tool-cache`)
    return path.join(cachedBunPath, file)
  }

  const auth = token ? `token ${token}` : undefined
  const bunDistUri = getBunDistUri(repo, version, platform, arch)
  core.info(`Downloading bun from ${bunDistUri}`)
  const bunDist = await tc.downloadTool(bunDistUri, undefined, auth)

  await tc.cacheFile(bunDist, file, 'bun', _version, arch)
  core.info(`bun dist tool-cached: ${tc.find('bun', _version, arch)}`)

  return bunDist
}

export function getBunDistUri(
  repo: string,
  version: string,
  platform: string,
  arch: string
) {
  // prettier-ignore
  const _arch =
      arch === 'x86_64' ? 'x64' :
      arch === 'arm64' ? 'aarch64' :  arch

  return `https://github.com/${repo}/releases/download/${version}/bun-${platform}-${_arch}.zip`
}
