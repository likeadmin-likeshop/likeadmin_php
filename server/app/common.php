<?php
// 应用公共文件

/**
 * @notes 生成密码加密密钥
 * @param string $plaintext
 * @param string $salt
 * @return string
 * @author 令狐冲
 * @date 2021/7/5 11:52
 */
function create_password(string $plaintext, string $salt) : string
{
    return md5($salt . md5($plaintext . $salt));
}

/**
 * @notes 随机生成token值
 * @param string $extra
 * @return string
 * @author 令狐冲
 * @date 2021/7/1 19:04
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
 * @author 令狐冲
 * @date 2021/7/7 18:42
 */
function substr_symbol_behind($str, $symbol = '.') : string
{
    $result = strripos($str, $symbol);
    if ($result === false) {
        return $str;
    };
    return substr($str, $result + 1);
}