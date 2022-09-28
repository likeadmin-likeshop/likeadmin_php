<?php

namespace clagiordano\weblibs\configmanager;

use Exception;
use RuntimeException;

/**
 * Class JsonConfigManager
 * @package clagiordano\weblibs\configmanager
 */
class JsonConfigManager extends AbstractConfigManager
{
    /**
     * Load config data from file and store it into internal property
     *
     * @param null|string $configFilePath
     *
     * @return IConfigurable
     */
    public function loadConfig($configFilePath = null)
    {
        $this->configFilePath = $configFilePath;
        if ($this->checkLoadable()) {
            if (!is_callable('json_decode')) {
                throw new RuntimeException('Missing php-json extension');
            }

            $this->configData = json_decode(file_get_contents($configFilePath), true);
        }

        return $this;
    }

    /**
     * Prepare and write config file on disk
     *
     * @param null|string $configFilePath
     * @param bool $autoReloadConfig
     *
     * @return IConfigurable
     * @throws RuntimeException
     */
    public function saveConfigFile($configFilePath = null, $autoReloadConfig = false)
    {
        if (is_null($configFilePath)) {
            $configFilePath = $this->configFilePath;
        }

        try {
            if (!is_callable('json_encode')) {
                throw new RuntimeException('Missing php-json extension');
            }

            file_put_contents($configFilePath, json_encode($this->configData, JSON_UNESCAPED_UNICODE));
        } catch (Exception $exception) {
            throw new RuntimeException(
                "Failed to write config file to path '{$configFilePath}'\n{$exception->getMessage()}"
            );
        }

        if ($autoReloadConfig) {
            $this->loadConfig($configFilePath);
        }

        return $this;
    }
}
