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
    // 创建语音识别模板 https://cloud.tencent.com/document/product/460/84498
    $result = $cosClient->createVoiceSpeechRecognitionTemplate(array(
        'Bucket' => 'examplebucket-125000000', //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.cloud.tencent.com/cos5/bucket
        'Tag' => 'SpeechRecognition',
        'Name' => 'voice-speechrecognition-name',
        'SpeechRecognition' => array(
            'EngineModelType' => '16k_zh',
            'ChannelNum' => 1,
            'ResTextFormat' => 1,
            'FilterDirty' => 0,
            'FilterModal' => 1,
            'ConvertNumMode' => 0,
            'SpeakerDiarization' => 1,
            'SpeakerNumber' => 0,
            'FilterPunc' => 0,
            'OutputFileType' => 'txt',
//            'FlashAsr' => 'true',
//            'Format' => 'mp3',
//            'FirstChannelOnly' => 1,
//            'WordInfo' => 1,
//            'SentenceMaxLength' => 6,
        ),
    ));
    // 请求成功
    print_r($result);
} catch (\Exception $e) {
    // 请求失败
    echo($e);
}
