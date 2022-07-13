# action-setup-bun

> Setup GitHub Actions workflow with a specific version of [Bun](https://github.com/oven-sh/bun) and add `$BUN_INSTALL/bin` to the `$PATH`.

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
    # Optional, if empty the latest bun version will be used
    # Examples: 0.0.77, 0.1.2, >=0.1
    bun-version: 0.1.2

    # Optional, default is 'Jarred-Sumner/bun-releases-for-updater'
    # Example: oven-sh/misc-test-builds
    bun-repo: 'Jarred-Sumner/bun-releases-for-updater'

    # Override bunfig.toml inners
    # Optional. JSON-formatted string as input
    # See: https://github.com/oven-sh/bun#bunfigtoml
    bun-config: '{"install: {"production": false}}'
    
    # Attach $BUN_INSTALL/install/cache to action/cache
    # Optional, defaults to false
    cache: true

    # actions/tool-cache provides a cache for the current job only
    # Use actions/cache to store the bun binary for the whole workflow
    # Optional, defaults to false
    cache-bin: true

    # Optional, default is process.platform
    # Examples: darwin, linux
    platform: 'linux'

    # Optional, default is process.arch
    arch: 'x64'
    
    # Authenticated requests get a higher rate limit
    # Optional. Defaults to ${{ github.token }}
    token: 'gh-token'

- name: Run script
  run: bun index.js
```

### bun-repo
There are at least 3 known places to fetch bun distributions:
* [`Jarred-Sumner/bun-releases-for-updater`](https://github.com/Jarred-Sumner/bun-releases-for-updater/releases)
* [`oven-sh/bun`](https://github.com/oven-sh/bun/releases)
* [`oven-sh/misc-test-builds`](https://github.com/oven-sh/misc-test-builds/releases)

### Outputs
| Name          | Description                              |
|---------------|------------------------------------------|
| `bun-version` | The version of Bun that was installed    |
| `cache-hit`   | if the bun cache was hit: `true / false` |
| `error`       | if an error occurred, the error message  |

## License
[MIT](LICENSE)
