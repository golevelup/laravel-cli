<span align="center">

<p align="center">
    <image width="70%" src="go-level-up-logo-3-no-padding.svg">
</p>

### A delightful CLI for Docker based Laravel developer environments and the cloud

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@badassery/laravel-up.svg)](https://npmjs.org/package/@badassery/laravel-up)
[![Downloads/week](https://img.shields.io/npm/dw/@badassery/laravel-up.svg)](https://npmjs.org/package/@badassery/laravel-up)
[![License](https://img.shields.io/npm/l/@badassery/laravel-up.svg)](https://github.com/badassery/laravel-up/blob/master/package.json)

</span>

# Motivation

There are two main goals for this project:

1. Provide _fully containerized_ developer environments for building Laravel applications
2. Adhere to the concept of development/production parity by ensuring that development environments are as close as possible to their production counterpart and can easily be deployed.

## Fully Containerized

Every component in a Laravel Up project is containerized, including the PHP runtime itself. This means that there is actually no requirement to have PHP installed on your developer machine.

All the tools you would expect to have are included inside of the Laravel Up CLI. This includes PHP, Artisan, Composer and Tinker.

## Dev Prod Parity

Laravel Up creates a Web Server container based on NGINX and an App Container based on PHP FPM 7.3.

Unlike other tools in the ecosystem like Laradock and Vessel, the container images created for you aim to be easily configurable and suitable for actual deployments to containerized environments including Kubernetes AWS ECS and Azure Container Instances.

# Features

- [x] Cross platform support. Works on Windows, Linux and Mac
- [x] Simple Docker containers that are easily configurable and suitable for deployment
- [x] Automatically configures XDebug
- [x] Supports MySQL and Postgres environments
- [x] Automatically configures Laravel ENV to connect to services in the Docker network
- [x] Support both Laravel and Lumen projects

# CLI

<!-- toc -->

- [Laravel Up ⬆️](#laravel-up-️)
- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

## Usage

<!-- usage -->

```sh-session
$ npm install -g @badassery/laravel-up
$ lvl COMMAND
running command...
$ lvl (-v|--version|version)
@badassery/laravel-up/0.5.1 linux-x64 node-v10.15.3
$ lvl --help [COMMAND]
USAGE
  $ lvl COMMAND
...
```

<!-- usagestop -->

## Commands

<!-- commands -->

- [`lvl artisan [COMMAND]`](#lvl-artisan-command)
- [`lvl command-base`](#lvl-command-base)
- [`lvl composer [COMMAND]`](#lvl-composer-command)
- [`lvl configure [DIRECTORY]`](#lvl-configure-directory)
- [`lvl down [DIRECTORY]`](#lvl-down-directory)
- [`lvl help [COMMAND]`](#lvl-help-command)
- [`lvl new`](#lvl-new)
- [`lvl target-directory-command`](#lvl-target-directory-command)
- [`lvl up [DIRECTORY]`](#lvl-up-directory)

## `lvl artisan [COMMAND]`

Runs an artisan command in the current directory

```
USAGE
  $ lvl artisan [COMMAND]

ARGUMENTS
  COMMAND  The command to pass to artisan. Omit this to see available commands

OPTIONS
  -h, --command-help  Passes --help to the underlying artisan command
```

_See code: [src/commands/artisan.ts](https://github.com/badassery/laravel-up/blob/v0.5.1/src/commands/artisan.ts)_

## `lvl command-base`

```
USAGE
  $ lvl command-base
```

_See code: [src/commands/command-base.ts](https://github.com/badassery/laravel-up/blob/v0.5.1/src/commands/command-base.ts)_

## `lvl composer [COMMAND]`

Executes a Composer command in the current directory

```
USAGE
  $ lvl composer [COMMAND]

ARGUMENTS
  COMMAND  The command to pass to composer. Omit this to see available commands

OPTIONS
  -h, --command-help  Passes --help to the underlying composer command
```

_See code: [src/commands/composer.ts](https://github.com/badassery/laravel-up/blob/v0.5.1/src/commands/composer.ts)_

## `lvl configure [DIRECTORY]`

Configures an existing vanilla Laravel app as an Up project

```
USAGE
  $ lvl configure [DIRECTORY]

ARGUMENTS
  DIRECTORY  The target directory for Laravel Up

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/configure.ts](https://github.com/badassery/laravel-up/blob/v0.5.1/src/commands/configure.ts)_

## `lvl down [DIRECTORY]`

Stops a running Laravel Up environment

```
USAGE
  $ lvl down [DIRECTORY]

ARGUMENTS
  DIRECTORY  The target directory for Laravel Up

OPTIONS
  -d, --destroy  Stops Docker containers and removes all volumes
  -v, --verbose  Include additional diagnostic logs
```

_See code: [src/commands/down.ts](https://github.com/badassery/laravel-up/blob/v0.5.1/src/commands/down.ts)_

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
  -v, --verbose  Include additional diagnostic logs
```

_See code: [src/commands/new.ts](https://github.com/badassery/laravel-up/blob/v0.5.1/src/commands/new.ts)_

## `lvl target-directory-command`

```
USAGE
  $ lvl target-directory-command
```

_See code: [src/commands/target-directory-command.ts](https://github.com/badassery/laravel-up/blob/v0.5.1/src/commands/target-directory-command.ts)_

## `lvl up [DIRECTORY]`

Starts a Laravel Up environment

```
USAGE
  $ lvl up [DIRECTORY]

ARGUMENTS
  DIRECTORY  The target directory for Laravel Up

OPTIONS
  -v, --verbose  Include additional diagnostic logs
```

_See code: [src/commands/up.ts](https://github.com/badassery/laravel-up/blob/v0.5.1/src/commands/up.ts)_

<!-- commandsstop -->
