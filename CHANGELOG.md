## 0.5.4 (2020-10-10)

### Bug Fixes

- set port to 5432 for postgres container ([e954b78](https://github.com/golevelup/laravel-cli/commit/e954b78))

### Features

- add `art` alias for `artisan` ([50d423b](https://github.com/golevelup/laravel-cli/commit/50d423b)), closes [#11](https://github.com/golevelup/laravel-cli/issues/11) [#11](https://github.com/golevelup/laravel-cli/issues/11)
- add maria as database option ([2aed6a2](https://github.com/golevelup/laravel-cli/commit/2aed6a2))
- add option for redis container ([823f744](https://github.com/golevelup/laravel-cli/commit/823f744))

## [0.5.1](https://github.com/badassery/laravel-up/compare/v0.5.0...v0.5.1) (2019-10-13)

### Bug Fixes

- **docker-compose:** corrects formatting of volume key in docker-compose ([0c241d1](https://github.com/badassery/laravel-up/commit/0c241d1)), closes [#32](https://github.com/badassery/laravel-up/issues/32)
- **docker-compose:** pass FAST_CGI_HOST var to NGINX web service ([08fe362](https://github.com/badassery/laravel-up/commit/08fe362)), closes [#34](https://github.com/badassery/laravel-up/issues/34)
- **postgres:** fixes postgres service configuration issues ([b70398c](https://github.com/badassery/laravel-up/commit/b70398c)), closes [#33](https://github.com/badassery/laravel-up/issues/33)

# [0.5.0](https://github.com/badassery/laravel-up/compare/v0.4.0...v0.5.0) (2019-10-11)

### Features

- **app.dockerfile:** adds support for running artisan tinker ([d056aa5](https://github.com/badassery/laravel-up/commit/d056aa5)), closes [#28](https://github.com/badassery/laravel-up/issues/28)
- **databases:** added support for postgres ([94c259a](https://github.com/badassery/laravel-up/commit/94c259a)), closes [#12](https://github.com/badassery/laravel-up/issues/12)

# [0.4.0](https://github.com/badassery/laravel-up/compare/v0.3.0...v0.4.0) (2019-10-11)

### Features

- **commands/configure:** git tree check on `lvl configure` ([743d0c7](https://github.com/badassery/laravel-up/commit/743d0c7)), closes [#15](https://github.com/badassery/laravel-up/issues/15)

# [0.3.0](https://github.com/badassery/laravel-up/compare/v0.2.0...v0.3.0) (2019-10-10)

### Features

- **dockerfiles:** make docker images easy to deploy ([6492f1c](https://github.com/badassery/laravel-up/commit/6492f1c)), closes [#18](https://github.com/badassery/laravel-up/issues/18)

# 0.2.0 (2019-10-10)

### Bug Fixes

- **app.dockerfile:** missing pdo_mysql extension installation ([225db31](https://github.com/badassery/laravel-up/commit/225db31)), closes [#22](https://github.com/badassery/laravel-up/issues/22)

### Features

- **commands/down.ts:** new option -d in down command to remove volumes ([d97263a](https://github.com/badassery/laravel-up/commit/d97263a)), closes [#8](https://github.com/badassery/laravel-up/issues/8)

# 0.1.0 (2019-10-08)

### Features

- **commands/down.ts:** lvl down command added ([5f57da2](https://github.com/badassery/laravel-up/commit/5f57da2)), closes [#2](https://github.com/badassery/laravel-up/issues/2)
- **scripts:** configure commitizen and conventional commits ([b8f47b6](https://github.com/badassery/laravel-up/commit/b8f47b6)), closes [#3](https://github.com/badassery/laravel-up/issues/3)

# 0.1.0 (2019-10-08)

### Features

- **scripts:** configure commitizen and conventional commits ([b8f47b6](https://github.com/badassery/laravel-up/commit/b8f47b6)), closes [#3](https://github.com/badassery/laravel-up/issues/3)
