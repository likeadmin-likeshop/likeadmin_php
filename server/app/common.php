<?php
// 应用公共文件

/**
 * @notes 生成密码加密密钥
 * @param string $plaintext
 * @param string $salt
 * @return string
 * @author 段誉
 * @date 2021/12/28 18:24
 */
function create_password(string $plaintext, string $salt) : string
{
    return md5($salt . md5($plaintext . $salt));
}


/**
 * @notes 随机生成token值
 * @param string $extra
 * @return string
 * @author 段誉
 * @date 2021/12/28 18:24
 */
function create_token(string $extra = '') : string
{
    return md5($extra . time());
}


/**
 * @notes 截取某字符字符串
 * @param $str
 * @param string $symbol
 * @return string
 * @author 段誉
 * @date 2021/12/28 18:24
 */
function substr_symbol_behind($str, $symbol = '.') : string
{
    $result = strripos($str, $symbol);
    if ($result === false) {
        return $str;
    }
    return substr($str, $result + 1);
}


/**
 * @notes 对比php版本
 * @param string $version
 * @return bool
 * @author 段誉
 * @date 2021/12/28 18:27
 */
function comparePHP(string $version) : bool
{
    return version_compare(PHP_VERSION, $version) >= 0 ? true : false;
}


/**
 * @notes 检查文件是否可写
 * @param string $dir
 * @return bool
 * @author 段誉
 * @date 2021/12/28 18:27
 */
function checkDirWrite(string $dir = '') : bool
{
    $route = root_path() . '/' . $dir;
    return is_writable($route);
}

