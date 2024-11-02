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
    // 提交一个语音合成任务 https://cloud.tencent.com/document/product/460/84797
    // 1. 使用模版
    $result = $cosClient->createVoiceTtsJobs(array(
        'Bucket' => 'examplebucket-125000000', //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.cloud.tencent.com/cos5/bucket
        'Tag' => 'Tts', // 固定为 Tts
        'Operation' => array(
            'TemplateId' => 't1460606b9752148c4ab182f55163ba7cd',
            'TtsConfig' => array(
                'InputType' => 'Text',
                'Input' => '床前明月光，疑是地上霜',
            ),
            'Output' => array(
                'Region' => $region,
                'Bucket' => 'examplebucket-125000000',
                'Object' => 'demo.mp3',
            ),
//            'UserData' => 'xxx',
//            'JobLevel' => '0',
        ),
//        'CallBack' => '',
//        'CallBackFormat' => '',
//        'CallBackType' => '',
//        'CallBackMqConfig' => array(
//            'MqRegion' => '',
//            'MqMode' => '',
//            'MqName' => '',
//        ),
    ));
    // 请求成功
    print_r($result);

    // 2. 自定义参数
    $result = $cosClient->createVoiceTtsJobs(array(
        'Bucket' => 'examplebucket-125000000', //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.cloud.tencent.com/cos5/bucket
        'Tag' => 'Tts', // 固定为 Tts
        'Operation' => array(
            'TtsConfig' => array(
                'InputType' => 'Text',
                'Input' => '床前明月光，疑是地上霜',
            ),
            'TtsTpl' => array(
                'Mode' => 'Sync',
                'Codec' => 'pcm',
                'VoiceType' => 'aixiaoxing',
                'Volume' => '2',
                'Speed' => '200',
                'Emotion' => 'arousal',
            ),
            'Output' => array(
                'Region' => $region,
                'Bucket' => 'examplebucket-125000000',
                'Object' => 'demo.mp3',
            ),
//            'UserData' => 'xxx',
//            'JobLevel' => '0',
        ),
//        'CallBack' => '',
//        'CallBackFormat' => '',
//        'CallBackType' => '',
//        'CallBackMqConfig' => array(
//            'MqRegion' => '',
//            'MqMode' => '',
//            'MqName' => '',
//        ),
    ));
    // 请求成功
    print_r($result);
} catch (\Exception $e) {
    // 请求失败
    echo($e);
}
