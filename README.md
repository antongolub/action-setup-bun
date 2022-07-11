# action-setup-bun
Setup GitHub Actions workflow with a specific version of [Bun](https://github.com/Jarred-Sumner/bun) and add `$BUN_INSTALL/bin` to the `$PATH`.

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
    
    # Optional, default is <current system>
    # Examples: darwin-x64, darwin-aarch64, linux-x64
    platform: 'linux-x64'
    
    # Attach $BUN_INSTALL/install/cache to action/cache
    # Optional, defaults to false
    cache: true

- name: Run script
  run: bun index.js
```

### Outputs
`bun-version` — the version of Bun that was installed.  
`error_message` — if an error occurred, the error message.  
`cache-hit` — if the bun cache was hit: true / false.

## License
[MIT](LICENSE)
