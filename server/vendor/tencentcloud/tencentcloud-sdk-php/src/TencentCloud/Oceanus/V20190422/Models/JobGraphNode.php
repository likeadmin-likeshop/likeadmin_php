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
namespace TencentCloud\Oceanus\V20190422\Models;
use TencentCloud\Common\AbstractModel;

/**
 * Flink Job 运行图的点信息
 *
 * @method integer getId() 获取节点ID
注意：此字段可能返回 null，表示取不到有效值。
 * @method void setId(integer $Id) 设置节点ID
注意：此字段可能返回 null，表示取不到有效值。
 * @method string getDescription() 获取节点描述
注意：此字段可能返回 null，表示取不到有效值。
 * @method void setDescription(string $Description) 设置节点描述
注意：此字段可能返回 null，表示取不到有效值。
 * @method string getName() 获取节点名称
注意：此字段可能返回 null，表示取不到有效值。
 * @method void setName(string $Name) 设置节点名称
注意：此字段可能返回 null，表示取不到有效值。
 * @method integer getParallelism() 获取节点并行度
注意：此字段可能返回 null，表示取不到有效值。
 * @method void setParallelism(integer $Parallelism) 设置节点并行度
注意：此字段可能返回 null，表示取不到有效值。
 */
class JobGraphNode extends AbstractModel
{
    /**
     * @var integer 节点ID
注意：此字段可能返回 null，表示取不到有效值。
     */
    public $Id;

    /**
     * @var string 节点描述
注意：此字段可能返回 null，表示取不到有效值。
     */
    public $Description;

    /**
     * @var string 节点名称
注意：此字段可能返回 null，表示取不到有效值。
     */
    public $Name;

    /**
     * @var integer 节点并行度
注意：此字段可能返回 null，表示取不到有效值。
     */
    public $Parallelism;

    /**
     * @param integer $Id 节点ID
注意：此字段可能返回 null，表示取不到有效值。
     * @param string $Description 节点描述
注意：此字段可能返回 null，表示取不到有效值。
     * @param string $Name 节点名称
注意：此字段可能返回 null，表示取不到有效值。
     * @param integer $Parallelism 节点并行度
注意：此字段可能返回 null，表示取不到有效值。
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
        if (array_key_exists("Id",$param) and $param["Id"] !== null) {
            $this->Id = $param["Id"];
        }

        if (array_key_exists("Description",$param) and $param["Description"] !== null) {
            $this->Description = $param["Description"];
        }

        if (array_key_exists("Name",$param) and $param["Name"] !== null) {
            $this->Name = $param["Name"];
        }

        if (array_key_exists("Parallelism",$param) and $param["Parallelism"] !== null) {
            $this->Parallelism = $param["Parallelism"];
        }
    }
}