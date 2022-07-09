# action-setup-bun
Setup GitHub Actions workflow with a specific version of [Bun](https://github.com/Jarred-Sumner/bun) and adds `BUN_INSTALL` to the `$PATH`.

## Usage
```yaml
- name: Setup Bun Runtime
  uses: antongolub/action-setup-bun@v1.x.x
  with:
    version: 0.1.2 # Examples: 0.0.77, 0.1.2, >=0.1

- name: Run script
  run: bun index.js
```

## License
[MIT](LICENSE)
