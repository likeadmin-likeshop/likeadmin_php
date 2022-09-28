<?php

namespace clagiordano\weblibs\configmanager\tests;

use clagiordano\weblibs\configmanager\ConfigManager;

/**
 * Class ConfigManagerTest
 * @package clagiordano\weblibs\configmanager\tests
 */
class ConfigManagerTest extends AbstractConfigManagerTest
{
    protected $configFile = 'testsdata/sample_config_data.php';

    public function setUp()
    {
        parent::setUp();

        $this->config = new ConfigManager("TestConfigData.php");
        $this->assertInstanceOf('clagiordano\weblibs\configmanager\ConfigManager', $this->config);

        $this->assertFileExists($this->configFile);
        $this->config->loadConfig($this->configFile);
    }
}