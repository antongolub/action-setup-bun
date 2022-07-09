const cp = require('child_process')
const path = require('path')

const installSh = path.resolve(__dirname, '../../main/sh/install.sh')
const setup = (version) => {
  const args = [installSh]
  if (version) args.push(version)

  const res = cp.spawnSync('bash', args, { encoding : 'utf8' })
  if (res.stderr) throw res.stderr
}

module.exports = {
  setup
}
