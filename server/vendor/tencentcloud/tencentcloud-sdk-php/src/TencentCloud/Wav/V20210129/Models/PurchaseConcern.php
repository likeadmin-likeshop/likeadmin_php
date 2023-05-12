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
namespace TencentCloud\Wav\V20210129\Models;
use TencentCloud\Common\AbstractModel;

/**
 * 购车关注点
 *
 * @method string getCode() 获取购车关注点code
 * @method void setCode(string $Code) 设置购车关注点code
 * @method string getDescription() 获取购车关注点描述
 * @method void setDescription(string $Description) 设置购车关注点描述
 */
class PurchaseConcern extends AbstractModel
{
    /**
     * @var string 购车关注点code
     */
    public $Code;

    /**
     * @var string 购车关注点描述
     */
    public $Description;

    /**
     * @param string $Code 购车关注点code
     * @param string $Description 购车关注点描述
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
        if (array_key_exists("Code",$param) and $param["Code"] !== null) {
            $this->Code = $param["Code"];
        }

        if (array_key_exists("Description",$param) and $param["Description"] !== null) {
            $this->Description = $param["Description"];
        }
    }
}
