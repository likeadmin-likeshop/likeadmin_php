<?php

namespace clagiordano\weblibs\configmanager;

use Exception;
use RuntimeException;

/**
 * Class ArrayConfigManager, class for easily read and access to php config array file.
 * @package clagiordano\weblibs\configmanager
 */
class ArrayConfigManager extends AbstractConfigManager
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
            $this->configData = require $this->configFilePath;
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

        $configFileContent = "<?php\n\n";
        $configFileContent .= "return ";
        $configFileContent .= var_export($this->configData, true);
        $configFileContent .= ";\n\n";

        try {
            file_put_contents($configFilePath, $configFileContent);

            if (is_callable('opcache_invalidate')) {
                /**
                 * Invalidate opcache for writed file if opcache is available
                 */
                opcache_invalidate($configFilePath, true);
            }
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
