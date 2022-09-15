<?php

namespace clagiordano\weblibs\configmanager\tests;

use clagiordano\weblibs\configmanager\YamlConfigManager;

/**
 * Class YamlConfigManagerTest
 * @package clagiordano\weblibs\configmanager\tests
 */
class YamlConfigManagerTest extends AbstractConfigManagerTest
{
    protected $configFile = 'testsdata/sample_config_data.yml';

    public function setUp()
    {
        parent::setUp();

        $this->config = new YamlConfigManager("TestConfigData.yml");
        $this->assertInstanceOf('clagiordano\weblibs\configmanager\YamlConfigManager', $this->config);

        $this->assertFileExists($this->configFile);
        $this->config->loadConfig($this->configFile);
    }
}