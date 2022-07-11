# action-setup-bun

> Setup GitHub Actions workflow with a specific version of [Bun](https://github.com/Jarred-Sumner/bun) and add `$BUN_INSTALL/bin` to the `$PATH`.

[![CI](https://github.com/antongolub/action-setup-bun/actions/workflows/ci.yaml/badge.svg)](https://github.com/antongolub/action-setup-bun/actions/workflows/ci.yaml)
[![Maintainability](https://api.codeclimate.com/v1/badges/51f63421b9c234ac6f27/maintainability)](https://codeclimate.com/github/antongolub/action-setup-bun/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/51f63421b9c234ac6f27/test_coverage)](https://codeclimate.com/github/antongolub/action-setup-bun/test_coverage)

## Requirements
* macOS x64 & Silicon, Linux x64, Windows Subsystem for Linux

## Usage
```yaml
- name: Setup Bun Runtime
  uses: antongolub/action-setup-bun@v1 # or @v1.x.x
  with:
    # Optional, default is the latest Bun version
    # Examples: 0.0.77, 0.1.2, >=0.1
    bun-version: 0.1.2

    # Optional, default is 'Jarred-Sumner/bun-releases-for-updater'
    bun-repo: 'Jarred-Sumner/bun-releases-for-updater'

    # Override bunfig.toml inners
    # Optional. JSON-formatted string as input
    bun-config: '{"install: {"production": false}}'
    
    # Attach $BUN_INSTALL/install/cache to action/cache
    # Optional, defaults to false
    cache: true

    # Optional, default is process.platform
    # Examples: darwin, linux
    platform: 'linux'

    # Optional, default is process.arch
    arch: 'x64'

- name: Run script
  run: bun index.js
```

### Outputs
`bun-version` — the version of Bun that was installed.  
`error_message` — if an error occurred, the error message.  
`cache-hit` — if the bun cache was hit: true / false.

## License
[MIT](LICENSE)
