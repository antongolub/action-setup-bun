## [1.12.4](https://github.com/antongolub/action-setup-bun/compare/v1.12.3...v1.12.4) (2022-07-16)

### Fixes & improvements
* fix: pass auth token to tags read req ([70d8e8d](https://github.com/antongolub/action-setup-bun/commit/70d8e8dd932f6aaa0bf02531cdfd575ac2eb4dc8))
* refactor: tweak up cache state markers ([afabb21](https://github.com/antongolub/action-setup-bun/commit/afabb21853bbd2abf621582c09dd81fa25e0787b))

## [1.12.3](https://github.com/antongolub/action-setup-bun/compare/v1.12.2...v1.12.3) (2022-07-13)

### Fixes & improvements
* docs: mention `oven-sh/misc-test-builds` release stream ([f279831](https://github.com/antongolub/action-setup-bun/commit/f279831253da61407dbeee3b0dede8ea420a8d4f))

## [1.12.2](https://github.com/antongolub/action-setup-bun/compare/v1.12.1...v1.12.2) (2022-07-13)

### Fixes & improvements
* fix: fix platform-to-dist mapping ([bebcae8](https://github.com/antongolub/action-setup-bun/commit/bebcae8f9c299bbed387ff86279c4a9de866fb12))

## [1.12.1](https://github.com/antongolub/action-setup-bun/compare/v1.12.0...v1.12.1) (2022-07-12)

### Fixes & improvements
* fix: check modules cache match before cache dir presence ([edb89b1](https://github.com/antongolub/action-setup-bun/commit/edb89b1071e79a4afc0e2368b0787af0a81d3a80))

## [1.12.0](https://github.com/antongolub/action-setup-bun/compare/v1.11.2...v1.12.0) (2022-07-12)

### Features
* feat: check input version range validity ([900dfcc](https://github.com/antongolub/action-setup-bun/commit/900dfccd8f3e3778e1fe7033cd3a3039f17ca208))
* feat: check `platform` and `arch` user inputs ([b666962](https://github.com/antongolub/action-setup-bun/commit/b666962b064e3c9e76ce5e931145b39f3c3a106f))
* feat: handle `latest` as `*` bun version alias ([98cafbd](https://github.com/antongolub/action-setup-bun/commit/98cafbde6d2f1df35c4835b9070cd06ec9bbdc5c))

## [1.11.2](https://github.com/antongolub/action-setup-bun/compare/v1.11.1...v1.11.2) (2022-07-12)

### Fixes & improvements
* fix: parse input 'false' as undefined ([7b11397](https://github.com/antongolub/action-setup-bun/commit/7b11397416810990a448118ba1f3514e67197b66))

## [1.11.1](https://github.com/antongolub/action-setup-bun/compare/v1.11.0...v1.11.1) (2022-07-12)

### Fixes & improvements
* fix: avoid bin cache reupload ([8704639](https://github.com/antongolub/action-setup-bun/commit/8704639ff061dbe0a8cefde2ca67247a3dda4a0c))

## [1.11.0](https://github.com/antongolub/action-setup-bun/compare/v1.10.1...v1.11.0) (2022-07-12)

### Features
* feat: add `cache-bin` option to enable cross-job installed bun binaries caching ([62bf36c](https://github.com/antongolub/action-setup-bun/commit/62bf36c556f7e2738beb2276a340fa8f104e8a0f))

## [1.10.1](https://github.com/antongolub/action-setup-bun/compare/v1.10.0...v1.10.1) (2022-07-12)

### Fixes & improvements
* docs: add bunfig spec ref ([790f6eb](https://github.com/antongolub/action-setup-bun/commit/790f6eb1bff1547e227c51443a14fd157f5e9927))

## [1.10.0](https://github.com/antongolub/action-setup-bun/compare/v1.9.1...v1.10.0) (2022-07-11)

### Features
* feat: use `${{github.token}}` as `token` default ([be406f2](https://github.com/antongolub/action-setup-bun/commit/be406f26a605b6619a126df1deafc42e3fbbfeb7))

## [1.9.1](https://github.com/antongolub/action-setup-bun/compare/v1.9.0...v1.9.1) (2022-07-11)

### Fixes & improvements
* docs: formatting ([fa20b06](https://github.com/antongolub/action-setup-bun/commit/fa20b06cb66b6ae7731099b55158ea70895d4304))

## [1.9.0](https://github.com/antongolub/action-setup-bun/compare/v1.8.1...v1.9.0) (2022-07-11)

### Features
* feat: intriduce gh `token` option ([b7cc5a0](https://github.com/antongolub/action-setup-bun/commit/b7cc5a00fe4fb796c262c4c03cca34b332389570))

### Fixes & improvements
* fix: fix archive unfolding ([2b125df](https://github.com/antongolub/action-setup-bun/commit/2b125df84cb23069aaccac85a4d706bb87239408))
* refactor: remove legacy sh scripts ([59d2be9](https://github.com/antongolub/action-setup-bun/commit/59d2be98d709651cbfe6cab11db50e79ddd5caad))

## [1.8.1](https://github.com/antongolub/action-setup-bun/compare/v1.8.0...v1.8.1) (2022-07-11)

### Fixes & improvements
* refactor: migrate to typescript (#7) ([a6c1e86](https://github.com/antongolub/action-setup-bun/commit/a6c1e864f9e8430fb93050987dd7ee7dbb44eedc))

## [1.8.0](https://github.com/antongolub/action-setup-bun/compare/v1.7.1...v1.8.0) (2022-07-11)

### Features
* feat: add `config` opt alias for `bun-config` ([94241b2](https://github.com/antongolub/action-setup-bun/commit/94241b218ebafebe52757b38ff0d293315090561))

## [1.7.1](https://github.com/antongolub/action-setup-bun/compare/v1.7.0...v1.7.1) (2022-07-11)

### Fixes & improvements
* fix: fix configPath on save ([61f0f2a](https://github.com/antongolub/action-setup-bun/commit/61f0f2ab7a1a6695d72179d76fc31a89334a0c16))

## [1.7.0](https://github.com/antongolub/action-setup-bun/compare/v1.6.4...v1.7.0) (2022-07-11)

### Features
* feat: provide `bun-config` option to override `bunfig.toml` contents ([f88d787](https://github.com/antongolub/action-setup-bun/commit/f88d7876d6de14f83ea8c668de444a69026d8c8d))

## [1.6.4](https://github.com/antongolub/action-setup-bun/compare/v1.6.3...v1.6.4) (2022-07-11)

### Fixes & improvements
* fix: set env.BUN_INSTALL ([6d53a44](https://github.com/antongolub/action-setup-bun/commit/6d53a44fa669476aa83a67e2797d6606d1eda222))

## [1.6.3](https://github.com/antongolub/action-setup-bun/compare/v1.6.2...v1.6.3) (2022-07-11)

### Fixes & improvements
* fix: fix zip extract from cache ([9d93b1d](https://github.com/antongolub/action-setup-bun/commit/9d93b1de2f45507b2a310808b218bd7ea4534bfc))

## [1.6.2](https://github.com/antongolub/action-setup-bun/compare/v1.6.1...v1.6.2) (2022-07-11)

### Fixes & improvements
* fix: fix bin cache key ([1681fc4](https://github.com/antongolub/action-setup-bun/commit/1681fc4711042a3fe9c00d1cc6467f279b690c72))
* perf: debug ([d1c0063](https://github.com/antongolub/action-setup-bun/commit/d1c0063db7486cdb728920905b58633ba592c597))

## [1.6.1](https://github.com/antongolub/action-setup-bun/compare/v1.6.0...v1.6.1) (2022-07-10)

### Fixes & improvements
* fix: fix cache key await ([f7eb82d](https://github.com/antongolub/action-setup-bun/commit/f7eb82d616d90be1e885ec6d1b14f73faa49fe4c))

## [1.6.0](https://github.com/antongolub/action-setup-bun/compare/v1.5.0...v1.6.0) (2022-07-10)

### Features
* feat: provide modules caching ([91c680b](https://github.com/antongolub/action-setup-bun/commit/91c680bcb420d564ba56949ae4ab6e111f7ab7fa))

## [1.5.0](https://github.com/antongolub/action-setup-bun/compare/v1.4.4...v1.5.0) (2022-07-10)

### Features
* feat: apply tool-cache ([94b0ff0](https://github.com/antongolub/action-setup-bun/commit/94b0ff0593497d9f01b6db219b35335c69aedce6))

## [1.4.4](https://github.com/antongolub/action-setup-bun/compare/v1.4.3...v1.4.4) (2022-07-10)

### Fixes & improvements
* refactor: swap install.sh params ([e145c62](https://github.com/antongolub/action-setup-bun/commit/e145c62f460f8897f2aeb7695dc863544922a40a))

## [1.4.3](https://github.com/antongolub/action-setup-bun/compare/v1.4.2...v1.4.3) (2022-07-10)

### Fixes & improvements
* docs: mention @v1 ([9d5aad2](https://github.com/antongolub/action-setup-bun/commit/9d5aad26ffbf5dd0ffa2b7c5458d523db2c28d85))

## [1.4.2](https://github.com/antongolub/action-setup-bun/compare/v1.4.1...v1.4.2) (2022-07-09)

### Fixes & improvements
* fix: fetch all tags instead of default 20 ([665de9d](https://github.com/antongolub/action-setup-bun/commit/665de9d621848ac65dafadeca4d7156cca93d92f))

## [1.4.1](https://github.com/antongolub/action-setup-bun/compare/v1.4.0...v1.4.1) (2022-07-09)

### Fixes & improvements
* fix: rename `repo` to `bun-repo` option ([5775534](https://github.com/antongolub/action-setup-bun/commit/5775534342cc80fbdc413e5f2845c989df24c375))
* docs: describe action outputs ([4ef0e37](https://github.com/antongolub/action-setup-bun/commit/4ef0e3789ec296bc38b21cd564df0baf0dee59d8))

## [1.4.0](https://github.com/antongolub/action-setup-bun/compare/v1.3.1...v1.4.0) (2022-07-09)

### Fixes & improvements
* refactor: decompose, add some tests ([f8c40d3](https://github.com/antongolub/action-setup-bun/commit/f8c40d34ada864d55254b770ad643954234ee04c))

### Features
* feat: add `repo` option ([99d7187](https://github.com/antongolub/action-setup-bun/commit/99d71877d6b3e0f627db0e442f9ea3c4261fe3e7))

## [1.3.1](https://github.com/antongolub/action-setup-bun/compare/v1.3.0...v1.3.1) (2022-07-09)

### Fixes & improvements
* fix: use bun-releases-for-updater channel to search versions ([e63c109](https://github.com/antongolub/action-setup-bun/commit/e63c1090b441b7625bd2185cc38dc0b4ec5255fa))

## [1.3.0](https://github.com/antongolub/action-setup-bun/compare/v1.2.2...v1.3.0) (2022-07-09)

### Features
* feat: log installed version ([c1e3ada](https://github.com/antongolub/action-setup-bun/commit/c1e3ada361aa672fa78e4e7d5f146a100a190f28))

## [1.2.2](https://github.com/antongolub/action-setup-bun/compare/v1.2.1...v1.2.2) (2022-07-09)

### Fixes & improvements
* fix: add useragent ([fb6324a](https://github.com/antongolub/action-setup-bun/commit/fb6324a8e58575d68faf4ca4c218025bee084115))

## [1.2.1](https://github.com/antongolub/action-setup-bun/compare/v1.2.0...v1.2.1) (2022-07-09)

### Fixes & improvements
* fix: http client init ([ebbd1a9](https://github.com/antongolub/action-setup-bun/commit/ebbd1a97e8aa1b3814e36662a47f67b6f426ffe3))

## [1.2.0](https://github.com/antongolub/action-setup-bun/compare/v1.1.0...v1.2.0) (2022-07-09)

### Features
* feat: support both `version` and `bun-version` options ([f6df376](https://github.com/antongolub/action-setup-bun/commit/f6df37646fe56e282c25d0b3a55ee1c5347ff593))

## [1.1.0](https://github.com/antongolub/action-setup-bun/compare/v1.0.8...v1.1.0) (2022-07-09)

### Features
* feat: provide semver matcher ([ac066df](https://github.com/antongolub/action-setup-bun/commit/ac066df1e3e5762d6a22ca4687bb4edde06c8ff7))

## [1.0.8](https://github.com/antongolub/action-setup-bun/compare/v1.0.7...v1.0.8) (2022-07-09)

### Fixes & improvements
* fix: debug ([1334bb5](https://github.com/antongolub/action-setup-bun/commit/1334bb567fe2d942279863472cd1e642d9dda86e))

## [1.0.7](https://github.com/antongolub/action-setup-bun/compare/v1.0.6...v1.0.7) (2022-07-09)

### Fixes & improvements
* fix: fix exec ([9c67d1d](https://github.com/antongolub/action-setup-bun/commit/9c67d1de255ef44bd2785affef60f4b833a453fb))

## [1.0.6](https://github.com/antongolub/action-setup-bun/compare/v1.0.5...v1.0.6) (2022-07-09)

### Fixes & improvements
* fix: fix PATH injection ([aeb0f67](https://github.com/antongolub/action-setup-bun/commit/aeb0f6750af46374b0823ff6855fdad41683437d))

## [1.0.5](https://github.com/antongolub/action-setup-bun/compare/v1.0.4...v1.0.5) (2022-07-09)

### Fixes & improvements
* fix: update bundle ([6ca551d](https://github.com/antongolub/action-setup-bun/commit/6ca551d1981c02c9751a8bb222732fdeaa2463da))

## [1.0.4](https://github.com/antongolub/action-setup-bun/compare/v1.0.3...v1.0.4) (2022-07-09)

### Fixes & improvements
* fix: update env.GITHUB_PATH ([914c7d9](https://github.com/antongolub/action-setup-bun/commit/914c7d9e6f026b0cb080bd75fd73adc4571307e0))

## [1.0.3](https://github.com/antongolub/action-setup-bun/compare/v1.0.2...v1.0.3) (2022-07-09)

### Fixes & improvements
* fix: fix action entry point ([a62c788](https://github.com/antongolub/action-setup-bun/commit/a62c788499bb61fa2314d81293be1f965ce42806))

## [1.0.2](https://github.com/antongolub/action-setup-bun/compare/v1.0.1...v1.0.2) (2022-07-09)

### Fixes & improvements
* fix: bundled deps ([3d2632b](https://github.com/antongolub/action-setup-bun/commit/3d2632ba5284416538f6cf50d7d4690971201f84))

## [1.0.1](https://github.com/antongolub/action-setup-bun/compare/v1.0.0...v1.0.1) (2022-07-09)

### Fixes & improvements
* fix: move to @actions/exec ([b9fe6e3](https://github.com/antongolub/action-setup-bun/commit/b9fe6e31a2ed50b14935444ae558d3cce0a33282))

## [1.0.0](https://github.com/antongolub/action-setup-bun/compare/undefined...v1.0.0) (2022-07-09)

### Features
* feat: add bun installer ([ab211ad](https://github.com/antongolub/action-setup-bun/commit/ab211ad3d6aa70162c07c9848d2e4d23efced506))
