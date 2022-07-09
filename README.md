# action-setup-bun
Setup GitHub Actions workflow with a specific version of [Bun](https://github.com/Jarred-Sumner/bun) and add `$BUN_INSTALL/bin` to the `$PATH`.

## Requirements
* macOS x64 & Silicon, Linux x64, Windows Subsystem for Linux

## Usage
```yaml
- name: Setup Bun Runtime
  uses: antongolub/action-setup-bun@v1.x.x
  with:
    bun-version: 0.1.2 # Examples: 0.0.77, 0.1.2, >=0.1

- name: Run script
  run: bun index.js
```

### Outputs
`version` — the version of Bun that was installed.  
`error_message` — if an error occurred, the error message.

## License
[MIT](LICENSE)
