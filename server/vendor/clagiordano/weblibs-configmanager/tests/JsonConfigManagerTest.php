<?php

namespace clagiordano\weblibs\configmanager\tests;

use clagiordano\weblibs\configmanager\JsonConfigManager;

/**
 * Class JsonConfigManagerTest
 * @package clagiordano\weblibs\configmanager\tests
 */
class JsonConfigManagerTest extends AbstractConfigManagerTest
{
    protected $configFile = 'testsdata/sample_config_data.json';

    public function setUp()
    {
        parent::setUp();

        $this->config = new JsonConfigManager("TestConfigData.json");
        $this->assertInstanceOf('clagiordano\weblibs\configmanager\JsonConfigManager', $this->config);

        $this->assertFileExists($this->configFile);
        $this->config->loadConfig($this->configFile);
    }
}