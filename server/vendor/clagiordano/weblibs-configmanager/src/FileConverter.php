<?php

namespace clagiordano\weblibs\configmanager;

/**
 * Class FileConverter
 * @package clagiordano\weblibs\configmanager
 */
class FileConverter implements IConvertable
{
    /**
     * @inheritDoc
     */
    public static function convert(IConfigurable $source, IConfigurable $target)
    {
        return $target->setConfig($source->getConfig());
    }

    /**
     * @inheritDoc
     */
    public static function convertAndSave(IConfigurable $source, IConfigurable $target)
    {
        $target->setConfig($source->getConfig());

        return $target->saveConfigFile();
    }
}
