<?php

namespace clagiordano\weblibs\configmanager\tests;

use clagiordano\weblibs\configmanager\ArrayConfigManager;

/**
 * Class ArrayConfigManagerTest
 * @package clagiordano\weblibs\configmanager\tests
 */
class ArrayConfigManagerTest extends AbstractConfigManagerTest
{
    protected $configFile = 'testsdata/sample_config_data.php';

    public function setUp()
    {
        parent::setUp();

        $this->config = new ArrayConfigManager("TestConfigData.php");
        $this->assertInstanceOf('clagiordano\weblibs\configmanager\ArrayConfigManager', $this->config);

        $this->assertFileExists($this->configFile);
        $this->config->loadConfig($this->configFile);
    }
}