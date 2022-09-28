<?php


namespace app\adminapi\listener;


use ReflectionClass;
use think\Exception;

class OperationLog
{
    /**
     * @notes 管理员操作日志
     * @param $response
     * @return bool|void
     * @throws \ReflectionException
     * @author 段誉
     * @date 2022/4/8 17:09
     */
    public function handle($response)
    {
        $request = request();

        //需要登录的接口，无效访问时不记录
        if (!$request->controllerObject->isNotNeedLogin() && empty($request->adminInfo)) {
            return;
        }

        //不记录日志操作
        if (strtolower(str_replace('.', '\\', $request->controller())) === 'setting\system\log') {
            return;
        }

        //获取操作注解
        $notes = '';
        try {
            $re = new ReflectionClass($request->controllerObject);
            $doc = $re->getMethod($request->action())->getDocComment();
            if (empty($doc)) {
                throw new Exception('请给控制器方法注释');
            }
            preg_match('/\s(\w+)/u', $re->getMethod($request->action())->getDocComment(), $values);
            $notes = $values[0];
        } catch (Exception $e) {
            $notes = $notes ?: '无法获取操作名称，请给控制器方法注释';
        }

        $params = $request->param();

        //过滤密码参数
        if (isset($params['password'])) {
            $params['password'] = "******";
        }
        //过滤密钥参数
        if(isset($params['app_secret'])){
            $params['app_secret'] = "******";
        }

        //导出数据操作进行记录
        if (isset($params['export']) && $params['export'] == 2) {
            $notes .= '-数据导出';
        }

        //记录日志
        $systemLog = new \app\common\model\OperationLog();
        $systemLog->admin_id = $request->adminInfo['admin_id'] ?? 0;
        $systemLog->admin_name = $request->adminInfo['name'] ?? '';
        $systemLog->action = $notes;
        $systemLog->account = $request->adminInfo['account'] ?? '';
        $systemLog->url = $request->url(true);
        $systemLog->type = $request->isGet() ? 'GET' : 'POST';
        $systemLog->params = json_encode($params, true);
        $systemLog->ip = $request->ip();
        $systemLog->result = $response->getContent();
        return $systemLog->save();
    }
}