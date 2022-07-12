import * as core from '@actions/core'

export const parseInput = (value: string): string | undefined => {
  if (value === 'false' || value === '') return undefined

  return value
}

export const getInput = (name: string): string | undefined =>
  parseInput(core.getInput(name))
