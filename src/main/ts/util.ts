import * as core from '@actions/core'
import fs from 'fs/promises'

export const parseInput = (value: string): string | undefined => {
  if (value === 'false' || value === '') return undefined

  return value
}

export const getInput = (name: string): string | undefined =>
  parseInput(core.getInput(name))

// https://github.com/antongolub/action-setup-bun/issues/62
// https://stackoverflow.com/questions/43206198/what-does-the-exdev-cross-device-link-not-permitted-error-mean
export const rename = async (from: string, to: string) => {
  try {
    await fs.rename(from, to)
  } catch (e) {
    await fs.cp(from, to)
    await fs.rm(from)
  }
}
