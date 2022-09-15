<?php

namespace clagiordano\weblibs\configmanager\tests;

use clagiordano\weblibs\configmanager\ArrayConfigManager;
use clagiordano\weblibs\configmanager\FileConverter;
use clagiordano\weblibs\configmanager\YamlConfigManager;
use PHPUnit\Framework\TestCase;

/**
 * Class FileConverterTest
 * @package clagiordano\weblibs\configmanager\tests
 */
class FileConverterTest extends TestCase
{
    /**
     * @return array
     */
    public function configDataProvider()
    {
        return [
            [
              __DIR__ . '/../testsdata/sample_config_data.php',
              '\clagiordano\weblibs\configmanager\ArrayConfigManager',
              __DIR__ . '/../testsdata/sample_config_data.php.converted.yml',
              '\clagiordano\weblibs\configmanager\YamlConfigManager',
            ],
            [
                __DIR__ . '/../testsdata/sample_config_data.php',
                '\clagiordano\weblibs\configmanager\ArrayConfigManager',
                __DIR__ . '/../testsdata/sample_config_data.php.converted.json',
                '\clagiordano\weblibs\configmanager\JsonConfigManager',
            ],
            [
                __DIR__ . '/../testsdata/sample_config_data.yml',
                '\clagiordano\weblibs\configmanager\YamlConfigManager',
                __DIR__ . '/../testsdata/sample_config_data.yml.converted.json',
                '\clagiordano\weblibs\configmanager\JsonConfigManager',
            ],
            [
                __DIR__ . '/../testsdata/sample_config_data.yml',
                '\clagiordano\weblibs\configmanager\YamlConfigManager',
                __DIR__ . '/../testsdata/sample_config_data.yml.converted.php',
                '\clagiordano\weblibs\configmanager\ArrayConfigManager',
            ],
            [
                __DIR__ . '/../testsdata/sample_config_data.json',
                '\clagiordano\weblibs\configmanager\JsonConfigManager',
                __DIR__ . '/../testsdata/sample_config_data.json.converted.yml',
                '\clagiordano\weblibs\configmanager\YamlConfigManager',
            ],
            [
                __DIR__ . '/../testsdata/sample_config_data.json',
                '\clagiordano\weblibs\configmanager\JsonConfigManager',
                __DIR__ . '/../testsdata/sample_config_data.json.converted.php',
                '\clagiordano\weblibs\configmanager\ArrayConfigManager',
            ],
        ];
    }

    /**
     * @test
     * @dataProvider configDataProvider
     * @param mixed $sourceConfig
     * @param mixed $sourceInstance
     * @param mixed $targetConfig
     * @param mixed $targetInstance
     */
    public function canConvertOneFormatToAnother($sourceConfig, $sourceInstance, $targetConfig, $targetInstance)
    {
        if (file_exists($targetConfig)) {
            /**
             * Drop target file if already existing
             */
            unlink($targetConfig);
        }

        $source = new $sourceInstance($sourceConfig);
        self::assertInstanceOf($sourceInstance, $source);

        $target = new $targetInstance($targetConfig);
        self::assertInstanceOf($targetInstance, $target);

        $converted = FileConverter::convert($source, $target);
        self::assertInstanceOf($targetInstance, $converted);

        $converted = FileConverter::convertAndSave($source, $target);
        self::assertInstanceOf($targetInstance, $converted);

        self::assertFileExists($targetConfig);
    }

    /**
     * @test
     */
    public function canSuccessConversionOnInvalidSource()
    {

        $source = new ArrayConfigManager();
        $target = new YamlConfigManager(__DIR__ . '/../testsdata/sample_config_data.empty.converted.yml');

        $converted = FileConverter::convert($source, $target);
        self::assertInstanceOf('\clagiordano\weblibs\configmanager\YamlConfigManager', $converted);

        self::assertSame($target, $converted);
    }

    /**
     * @test
     */
    public function canSuccessConversionAndSaveOnInvalidSource()
    {

        $source = new ArrayConfigManager();
        $target = new YamlConfigManager(__DIR__ . '/../testsdata/sample_config_data.empty.converted.yml');

        $converted = FileConverter::convertAndSave($source, $target);
        self::assertInstanceOf('\clagiordano\weblibs\configmanager\YamlConfigManager', $converted);

        self::assertSame($target, $converted);
    }

    /**
     * @test
     */
    public function cannotFailConversionOnInvalidTarget()
    {
        $source = new ArrayConfigManager(__DIR__ . '/../testsdata/sample_config_data.php');
        $target = new YamlConfigManager();

        $converted = FileConverter::convert($source, $target);
        self::assertInstanceOf('\clagiordano\weblibs\configmanager\YamlConfigManager', $converted);
    }

    /**
     * @test
     */
    public function canFailConversionAndSaveOnInvalidTarget()
    {
        self::setExpectedException('\RuntimeException');

        $source = new ArrayConfigManager(__DIR__ . '/../testsdata/sample_config_data.php');
        $target = new YamlConfigManager();

        $converted = FileConverter::convertAndSave($source, $target);
        self::assertInstanceOf('\clagiordano\weblibs\configmanager\YamlConfigManager', $converted);
    }
}
