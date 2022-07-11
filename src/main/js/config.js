const fs = require('fs')
const path = require('path')
const TOML = require('@iarna/toml')
const core = require('@actions/core')
const { CONFIG_NAME } = require('./constants.js')

function readConfig() {
  const workspace = process.env.GITHUB_WORKSPACE
  const configPath = path.join(workspace, CONFIG_NAME)

  try {
    return TOML.parse(fs.readFileSync(configPath, 'utf8'))
  } catch (e) {
    core.info(`bunfig.toml not found: ${configPath}`)
    return null
  }
}

function writeConfig(config) {
  if (!config) return
  const workspace = process.env.GITHUB_WORKSPACE
  const configPath = path.join(workspace, CONFIG_NAME)

  core.info(`bunfig.toml saved: ${configPath}`)
  fs.writeFileSync(configPath, TOML.stringify(JSON.parse(config)))
}

function getConfig(config) {
  writeConfig(config)
  return readConfig()
}

module.exports = {
  getConfig,
  readConfig,
  writeConfig
}
