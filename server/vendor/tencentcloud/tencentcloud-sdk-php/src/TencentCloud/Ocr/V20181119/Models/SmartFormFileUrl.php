<?php
/*
 * Copyright (c) 2017-2018 THL A29 Limited, a Tencent company. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
namespace TencentCloud\Ocr\V20181119\Models;
use TencentCloud\Common\AbstractModel;

/**
 * 智慧表单上传文件信息
 *
 * @method string getFileUrl() 获取文件url地址
 * @method void setFileUrl(string $FileUrl) 设置文件url地址
 * @method integer getFileOrderNumber() 获取文件的顺序，顺序从1开始
 * @method void setFileOrderNumber(integer $FileOrderNumber) 设置文件的顺序，顺序从1开始
 */
class SmartFormFileUrl extends AbstractModel
{
    /**
     * @var string 文件url地址
     */
    public $FileUrl;

    /**
     * @var integer 文件的顺序，顺序从1开始
     */
    public $FileOrderNumber;

    /**
     * @param string $FileUrl 文件url地址
     * @param integer $FileOrderNumber 文件的顺序，顺序从1开始
     */
    function __construct()
    {

    }

    /**
     * For internal only. DO NOT USE IT.
     */
    public function deserialize($param)
    {
        if ($param === null) {
            return;
        }
        if (array_key_exists("FileUrl",$param) and $param["FileUrl"] !== null) {
            $this->FileUrl = $param["FileUrl"];
        }

        if (array_key_exists("FileOrderNumber",$param) and $param["FileOrderNumber"] !== null) {
            $this->FileOrderNumber = $param["FileOrderNumber"];
        }
    }
}
