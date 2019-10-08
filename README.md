# Laravel Up ⬆️

## A Delightful Developer Environment and CLI for the Laravel Framework

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@badassery/laravel-up.svg)](https://npmjs.org/package/@badassery/laravel-up)
[![Downloads/week](https://img.shields.io/npm/dw/@badassery/laravel-up.svg)](https://npmjs.org/package/@badassery/laravel-up)
[![License](https://img.shields.io/npm/l/@badassery/laravel-up.svg)](https://github.com/badassery/laravel-up/blob/master/package.json)

<!-- toc -->

- [@badassery/laravel-up](#badasserylaravel-up)
- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @badassery/laravel-up
$ lvl COMMAND
running command...
$ lvl (-v|--version|version)
@badassery/laravel-up/0.0.8 linux-x64 node-v10.15.2
$ lvl --help [COMMAND]
USAGE
  $ lvl COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`lvl artisan COMMAND`](#lvl-artisan-command)
- [`lvl composer COMMAND`](#lvl-composer-command)
- [`lvl configure`](#lvl-configure)
- [`lvl help [COMMAND]`](#lvl-help-command)
- [`lvl new`](#lvl-new)
- [`lvl up [DIRECTORY]`](#lvl-up-directory)
- [`lvl down [DIRECTORY]`](#lvl-down-directory)

## `lvl artisan COMMAND`

Runs an artisan command (eg make:controller {name})

```
USAGE
  $ lvl artisan COMMAND

ARGUMENTS
  COMMAND  The command to pass to artisan

OPTIONS
  -h, --command-help  Passes --help to the underlying composer command
  -s, --silent        Silent mode prevents artisan shell output
```

_See code: [src/commands/artisan.ts](https://github.com/badassery/laravel-up/blob/v0.0.8/src/commands/artisan.ts)_

## `lvl composer COMMAND`

Executes a composer command

```
USAGE
  $ lvl composer COMMAND

ARGUMENTS
  COMMAND  The command to pass to composer. Should be wrapped in quotes if passing flags

OPTIONS
  -h, --command-help  Passes --help to the underlying composer command
  -s, --silent        Silent mode prevents Composer shell output
```

_See code: [src/commands/composer.ts](https://github.com/badassery/laravel-up/blob/v0.0.8/src/commands/composer.ts)_

## `lvl configure`

Configures an existing vanilla Laravel app as an Up project

```
USAGE
  $ lvl configure

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/configure.ts](https://github.com/badassery/laravel-up/blob/v0.0.8/src/commands/configure.ts)_

## `lvl help [COMMAND]`

display help for lvl

```
USAGE
  $ lvl help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `lvl new`

Creates a new Laravel Up project

```
USAGE
  $ lvl new

OPTIONS
  -v, --verbose
```

_See code: [src/commands/new.ts](https://github.com/badassery/laravel-up/blob/v0.0.8/src/commands/new.ts)_

## `lvl up [DIRECTORY]`

Spins Up your local dev environment

```
USAGE
  $ lvl up [DIRECTORY]

ARGUMENTS
  DIRECTORY  The Laravel Up directory you would like to launch

OPTIONS
  -v, --verbose
```

_See code: [src/commands/up.ts](https://github.com/badassery/laravel-up/blob/v0.0.8/src/commands/up.ts)_

## `lvl down [DIRECTORY] [OPTIONS,]`

To Stop your local dev environment

```
USAGE
  $ lvl down [DIRECTORY] [OPTIONS,]

ARGUMENTS
  DIRECTORY  Running Laravel Up directory you would like to stop

OPTIONS
  -v, --verbose
  -d, --destroy To remove dev environment docker volumes
```

_See code: [src/commands/down.ts](https://github.com/badassery/laravel-up/blob/v0.0.8/src/commands/down.ts)_

<!-- commandsstop -->
