import fs from 'fs'
import path from 'path'
import TOML from '@iarna/toml'
import * as core from '@actions/core'
import { CONFIG_NAME } from './constants.js'

const cwd = process.env.GITHUB_WORKSPACE || process.cwd()

export function readConfig(): any {
  const configPath = path.join(cwd, CONFIG_NAME)

  try {
    return TOML.parse(fs.readFileSync(configPath, 'utf8'))
  } catch (e) {
    core.info(`bunfig.toml not found: ${configPath}`)
    return null
  }
}

export function writeConfig(config: any) {
  if (!config) return
  const configPath = path.join(cwd, CONFIG_NAME)

  core.info(`bunfig.toml saved: ${configPath}`)
  fs.writeFileSync(configPath, TOML.stringify(JSON.parse(config)))
}

export function getConfig(config: any) {
  writeConfig(config)
  return readConfig()
}
