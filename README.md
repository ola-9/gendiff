# genDiff.js

[![Actions Status](https://github.com/ola-9/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ola-9/frontend-project-lvl2/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/4152965af12ecda74ee8/maintainability)](https://codeclimate.com/github/ola-9/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4152965af12ecda74ee8/test_coverage)](https://codeclimate.com/github/ola-9/frontend-project-lvl2/test_coverage) [![my workflow](https://github.com/ola-9/frontend-project-lvl2/actions/workflows/my-check.yml/badge.svg)](https://github.com/ola-9/frontend-project-lvl2/actions/workflows/my-check.yml)

The CLI app to compare two configuration files and generate differences.

<details>
<summary>Setup</summary>

## Setup
### Install dependencies 

```bash
$ make install-deps
```

### Run eslint 

```bash
$ make lint
```

### Run tests

```bash
$ make test 
```
</details>

<details>
<summary>Installation</summary>

### Install
```bash
$ make gendiff-install
```
### UnInstall

```bash
$ make gendiff-uninstall
```
</details>

## Overview
The application compares two files of the JSON or YAML format and generates differences in the following formats: stylish, plain, and JSON.

### Use
```
Usage: gendiff [options] <filepath1> <filepath2>
Options:
  -V, --version        output the version number
  -f, --format [type]  output format [stylish, plain, json] (default: 'stylish')
  -h, --help           display help for command
```
### Example
[![asciicast](https://asciinema.org/a/3Cent8HDw9ClyvJVPHMsr45ND.svg)](https://asciinema.org/a/3Cent8HDw9ClyvJVPHMsr45ND)
