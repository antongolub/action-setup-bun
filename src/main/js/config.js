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
    core.debug('Lockfile not found')
    return null
  }
}

function writeConfig(config) {
  if (!config) return
  const workspace = process.env.GITHUB_WORKSPACE
  const configPath = path.join(workspace, CONFIG_NAME)

  fs.writeFileSync(TOML.stringify(JSON.parse(config)), configPath)
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
