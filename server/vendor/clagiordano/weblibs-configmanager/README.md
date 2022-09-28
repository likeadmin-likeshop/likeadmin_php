[![PHP Composer](https://github.com/clagiordano/weblibs-configmanager/actions/workflows/php.yml/badge.svg)](https://github.com/clagiordano/weblibs-configmanager/actions/workflows/php.yml) 
[![Coverage Status](https://coveralls.io/repos/github/clagiordano/weblibs-configmanager/badge.svg?branch=master)](https://coveralls.io/github/clagiordano/weblibs-configmanager?branch=master)
[![SymfonyInsight](https://insight.symfony.com/projects/54c4e80c-ff15-4235-8bec-a4c71bbe3ba5/mini.svg)](https://insight.symfony.com/projects/54c4e80c-ff15-4235-8bec-a4c71bbe3ba5)

# weblibs-configmanager
weblibs-configmanager is a tool library for easily read and access to php config array file and direct read/write configuration file / object.

## Why use weblibs-configmanager ?
The purpose of this project is to propose a simple and lightweight library to manage php hierarchical configuration files.

## Supported formats

This package supports config files in the following format:

Format | Component | Since version |  Description
:---: | :---: | :---: | ---
Array | `ConfigManager` | `v0.1.0` |  Deprecated, legacy name for the php array reader, only for compatibility support
Array | `ArrayConfigManager` | `v1.2.0` | A file that returns a php array, the original supported format
Yaml | `YamlConfigManager` | `v1.3.0` | A file containing a valid YAML file
JSON | `JsonConfigManager` | `v1.4.0` | A file containing a valid JSON file

All the supported format are parsed and internally handled in the same way granting the same functionalities.

## Installation
The recommended way to install weblibs-configmanager is through [Composer](https://getcomposer.org).
```bash
composer require clagiordano/weblibs-configmanager
```

## Usage examples (Array format)

### Write a sample config file like this
```php
<?php

return array (
  'app' => 'app_name',
  'db' => 
  array (
    'host' => 'localhost',
    'user' => 'sample_user',
    'pass' => 'sample_pass',
    'port' => 3306,
  ),
  'other' => 
  array (
    'multi' => 
    array (
      'deep' => 
      array (
        'nested' => 'config_value',
      ),
    ),
  ),
);

```

### Instance ConfigManager object

```php
use clagiordano\weblibs\configmanager\ConfigManager;

/**
 * Instance object to read argument file
 */
$config = new ConfigManager("configfile.php");
```

### Check if a value exists into config file

```php
/**
 * Check if a value exists into config file
 */
$value = $config->existValue('app');
```

### Read a simple element from config file

```php
/**
 * Read a simple element from config file
 */
$value = $config->getValue('app');
```

### Access to a nested element from config

```php
/**
 * Access to a nested element from config
 */
$nestedValue = $config->getValue('other.multi.deep.nested');
```

### Change config value at runtime

```php
/**
 * Change config value at runtime
 */
$this->config->setValue('other.multi.deep.nested', "SUPERNESTED");
```

### Save config file with original name (OVERWRITE) 

```php
/**
 * Save config file with original name (OVERWRITE) 
 */
$this->config->saveConfigFile();
```

### Or save config file with a different name

```php
/**
 * Save config file with original name (OVERWRITE) 
 */
$this->config->saveConfigFile('/new/file/name/or/path/test.php');
```

### Optionally you can also reload config file from disk after save

```php
/**
 * Optionally you can also reload config file from disk after save
 */
$this->config->saveConfigFile('/new/file/name/or/path/test.php', true);
```

### Load another configuration file without reinstance ConfigManager

```php
/**
 * Load another configuration file without reinstance ConfigManager
 */
$this->config->loadConfig('another_config_file.php');
```

## Legal
*Copyright (C) Claudio Giordano <claudio.giordano@autistici.org>*
