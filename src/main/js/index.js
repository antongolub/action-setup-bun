const exec = require('@actions/exec')
const path = require('path')

const installSh = path.resolve(__dirname, '../../main/sh/install.sh')
const setup = async (version) => {
  const args = [installSh]
  if (version) args.push(version)

  const res = await exec.getExecOutput('bash', args, { ignoreReturnCode: true})

  if (res.stderr) throw res.stderr

  // cp.execSync('exec bash')
}

module.exports = {
  setup
}
