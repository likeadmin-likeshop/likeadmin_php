<?php
// 事件定义文件
use app\common\listener\NoticeListener;

return [
    'bind'      => [
    ],

    'listen'    => [
        'AppInit'  => [],
        'HttpRun'  => [],
        'HttpEnd'  => [],
        'LogLevel' => [],
        'LogWrite' => [],

        // 通知
        'Notice' => [NoticeListener::class],
    ],

    'subscribe' => [
    ],
];
