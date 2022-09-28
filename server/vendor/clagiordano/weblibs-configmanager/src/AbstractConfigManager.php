<?php

namespace clagiordano\weblibs\configmanager;

use Exception;
use RuntimeException;

/**
 * Class AbstractConfigManager
 * @package clagiordano\weblibs\configmanager
 */
abstract class AbstractConfigManager implements IConfigurable
{
    /** @var array $configData */
    protected $configData = null;
    /** @var string $configFilePath */
    protected $configFilePath = null;

    /**
     * Create config object, optionally automatic load config
     * from argument $configFilePath
     *
     * @param string $configFilePath
     */
    public function __construct($configFilePath = null)
    {
        try {
            $this->loadConfig($configFilePath);
        } catch (Exception $exception) {
            /**
             * Allow not existent file name at construct
             */
        }
    }

    /**
     * Get value pointer from config for get/set value
     *
     * @param string $configPath
     *
     * @return mixed
     */
    protected function & getValuePointer($configPath)
    {
        $configData =& $this->configData;
        $parts = explode('.', $configPath);
        $length = count($parts);

        for ($i = 0; $i < $length; $i++) {
            if (!isset($configData[ $parts[ $i ] ])) {
                $configData[ $parts[ $i ] ] = ($i === $length) ? [] : null;
            }

            $configData = &$configData[ $parts[ $i ] ];
        }

        return $configData;
    }

    /**
     * Get value from config data throught keyValue path
     *
     * @param string $configPath
     * @param mixed $defaultValue
     *
     * @return mixed
     */
    public function getValue($configPath, $defaultValue = null)
    {
        $stored = $this->getValuePointer($configPath);

        return (is_null($stored)
            ? $defaultValue
            : $stored);
    }

    /**
     * Check if exist required config for keyValue
     *
     * @param string $keyValue
     *
     * @return mixed
     */
    public function existValue($keyValue)
    {
        return !is_null($this->getValue($keyValue));
    }

    /**
     * Set value in config path
     *
     * @param string $configPath
     * @param mixed $newValue
     *
     * @return IConfigurable
     */
    public function setValue($configPath, $newValue)
    {
        $configData = &$this->getValuePointer($configPath);
        $configData = $newValue;

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function getConfig()
    {
        return $this->configData;
    }

    /**
     * @inheritDoc
     */
    public function setConfig($config)
    {
        $this->configData = (array)$config;

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function convert(IConfigurable $target)
    {
        $target->setConfig($this->getConfig());

        return $target;
    }

    /**
     * Check if configFilePath exists and is readable
     * @return bool
     * @throws RuntimeException
     */
    protected function checkLoadable()
    {
        if ($this->configFilePath !== null) {
            if (file_exists($this->configFilePath) && is_readable($this->configFilePath)) {
                /**
                 * Readable
                 */
                return true;
            }

            /**
             * $configFilePath is not null, but not existent or not readable
             */
            throw new RuntimeException("Failed to read config file from path '{$this->configFilePath}'");
        }

        /**
         * $configFilePath is null
         */
        return false;
    }
}
