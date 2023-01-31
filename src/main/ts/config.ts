import fs from 'fs'
import path from 'path'
import TOML from '@iarna/toml'
import * as core from '@actions/core'
import { CONFIG_NAME } from './constants.js'

export function readConfig(): any {
  const cwd = process.env.GITHUB_WORKSPACE || process.cwd()
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
  const cwd = process.env.GITHUB_WORKSPACE || process.cwd()
  const configPath = path.join(cwd, CONFIG_NAME)

  try {
    const data = JSON.parse(config)
    fs.writeFileSync(configPath, TOML.stringify(data))
    core.info(`bunfig.toml saved: ${configPath}`)
  } catch (e) {
    core.error('bun config seems corrupted')

    throw e
  }
}

export function getConfig(config: any) {
  writeConfig(config)
  return readConfig()
}
