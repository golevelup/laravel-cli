@badassery/laravel-up
=====================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@badassery/laravel-up.svg)](https://npmjs.org/package/@badassery/laravel-up)
[![Downloads/week](https://img.shields.io/npm/dw/@badassery/laravel-up.svg)](https://npmjs.org/package/@badassery/laravel-up)
[![License](https://img.shields.io/npm/l/@badassery/laravel-up.svg)](https://github.com/badassery/laravel-up/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @badassery/laravel-up
$ lvl COMMAND
running command...
$ lvl (-v|--version|version)
@badassery/laravel-up/0.0.4 linux-x64 node-v10.13.0
$ lvl --help [COMMAND]
USAGE
  $ lvl COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`lvl artisan [COMMAND]`](#lvl-artisan-command)
* [`lvl hello [FILE]`](#lvl-hello-file)
* [`lvl help [COMMAND]`](#lvl-help-command)
* [`lvl new`](#lvl-new)
* [`lvl up`](#lvl-up)

## `lvl artisan [COMMAND]`

Runs an artisan command (eg make:controller {name})

```
USAGE
  $ lvl artisan [COMMAND]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/artisan.ts](https://github.com/badassery/laravel-up/blob/v0.0.4/src/commands/artisan.ts)_

## `lvl hello [FILE]`

describe the command here

```
USAGE
  $ lvl hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ lvl hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/badassery/laravel-up/blob/v0.0.4/src/commands/hello.ts)_

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

_See code: [src/commands/new.ts](https://github.com/badassery/laravel-up/blob/v0.0.4/src/commands/new.ts)_

## `lvl up`

Spins Up your local dev environment

```
USAGE
  $ lvl up
```

_See code: [src/commands/up.ts](https://github.com/badassery/laravel-up/blob/v0.0.4/src/commands/up.ts)_
<!-- commandsstop -->
