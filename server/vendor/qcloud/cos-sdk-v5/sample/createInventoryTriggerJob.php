<?php

require dirname(__FILE__, 2) . '/vendor/autoload.php';

$secretId = "SECRETID"; //替换为用户的 secretId，请登录访问管理控制台进行查看和管理，https://console.cloud.tencent.com/cam/capi
$secretKey = "SECRETKEY"; //替换为用户的 secretKey，请登录访问管理控制台进行查看和管理，https://console.cloud.tencent.com/cam/capi
$region = "ap-beijing"; //替换为用户的 region，已创建桶归属的region可以在控制台查看，https://console.cloud.tencent.com/cos5/bucket
$cosClient = new Qcloud\Cos\Client(
    array(
        'region' => $region,
        'schema' => 'https', // 万象接口必须使用https
        'credentials'=> array(
            'secretId'  => $secretId,
            'secretKey' => $secretKey)));
try {
    // https://cloud.tencent.com/document/product/436/71516 触发批量存量任务
    // 1. 触发任务（工作流）https://cloud.tencent.com/document/product/460/76887
    $result = $cosClient->createInventoryTriggerJob(array(
        'Bucket' => 'examplebucket-125000000', //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.cloud.tencent.com/cos5/bucket
        'Name' => '存量触发任务名称',
        'Type' => 'Workflow',
        'Input' => array(
//            'Manifest' => '',
//            'UrlFile' => '',
//            'Prefix' => '',
            'Object' => 'test01.png',
        ),
        'Operation' => array(
            'WorkflowIds' => 'w9938ed4b1435448783xxxxxxxxxxxxx',
//            'TimeInterval' => array(
//                'Start' => '',
//                'End' => '',
//            ),
        ),
    ));
    // 请求成功
    print_r($result);

    // 2. 触发任务（独立节点）https://cloud.tencent.com/document/product/460/80155
    $result = $cosClient->createInventoryTriggerJob(array(
        'Bucket' => 'examplebucket-125000000', //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.cloud.tencent.com/cos5/bucket
        'Name' => '存量触发任务名称',
        'Type' => 'Job',
        'Input' => array(
//            'Manifest' => '',
//            'UrlFile' => '',
//            'Prefix' => '',
            'Object' => 'test01.png',
        ),
        'Operation' => array(
            'Tag' => '',
            'QueueId' => '',
            'QueueType' => '',
            'TimeInterval' => array(
                'Start' => '',
                'End' => '',
            ),
            'Output' => array(
                'Region' => '',
                'Bucket' => '',
                'Object' => '',
                'AuObject' => '',
                'SpriteObject' => '',
                'StreamExtract' => array(
                    'Index' => '',
                    'Object' => '',
                ),
            ),
            'JobParam' => array(
                // 根据Tag输入相应参数，参数详情参考 https://cloud.tencent.com/document/product/460/80155
                'TemplateId' => '',
                'TranscodeTemplateId' => '',
                'WatermarkTemplateId' => '',
//                'Animation' => ...,
//                'Transcode' => ...,
//                'SmartCover' => ...,
//                'DigitalWatermark' => ...,
//                'Watermark' => ...,
//                'RemoveWatermark' => ...,
//                'Snapshot' => ...,
//                'SpeechRecognition' => ...,
//                'ConcatTemplate' => ...,
//                'VoiceSeparate' => ...,
//                'VideoMontage' => ...,
//                'SDRtoHDR' => ...,
//                'VideoProcess' => ...,
//                'SuperResolution' => ...,
//                'Segment' => ...,
//                'ExtractDigitalWatermark' => ...,
//                'VideoTag' => ...,
//                'TtsTpl' => ...,
//                'NoiseReduction' => ...,
            ),
//            'UserData' => '',
//            'JobLevel' => '',
//            'CallBackFormat' => '',
//            'CallBackType' => '',
//            'CallBack' => '',
//            'CallBackMqConfig' => array(
//                'MqRegion' => '',
//                'MqMode' => '',
//                'MqName' => '',
//            ),
        ),
    ));
    // 请求成功
    print_r($result);
} catch (\Exception $e) {
    // 请求失败
    echo($e);
}
