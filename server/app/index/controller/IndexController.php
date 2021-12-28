<?php
namespace app\index\controller;

use app\BaseController;
use app\common\service\JsonService;

class IndexController extends BaseController
{
    public function index($name = '你好,likeshop')
    {
        return JsonService::success($name);
    }
}
