
 <h1 align="center">likeadmin通用管理后台</h1>
<h4 align="center">📈快速开发前后端解决方案</h4> 
<p align="center">
<a href="https://www.php.net/"><img src="https://img.shields.io/badge/PHP-8.0-8892bf"></a> <a href="https://www.tslang.cn/"><img src="https://img.shields.io/badge/TypeScript-3.1-294e80"></a> <a href="#"><img src="https://img.shields.io/badge/ThinkPHP-6.0-6fb737"></a> <a href="#"><img src="https://img.shields.io/badge/Vue.js-3.2-4eb883"></a> <a href="#"><img src="https://img.shields.io/badge/vite-2.0.0-ffc018"></a> <a href="#"><img src="https://img.shields.io/badge/Element Plus-1.2.0-409eff"></a>
<div align="center">
  <img  width="80%"  src="https://md.likeshop.cn/server/index.php?s=/api/attachment/visitFile&sign=72c2e0bab13d47c8d62c00e4bd1f8c3b" />
</div>
 <br>

## 👨‍💻‍简介
我们希望能够为开源社区做出更多的贡献，推出永久免费开源的likeadmin通用前后端分离管理后台系统。遵循MIT开源许可协议，您可以免费使用，甚至允许把你基于likeadmin开发的软件应用开源、发布、销售。
<br>
##  🧐进一步了解
### 🧰场景介绍
1.likeadmin已经搭建好前后端分离的底层，包含程序安装、登录、登出、工作台、菜单权限控制、角色、管理员、网站设置、图库管理等基础功能，无需重复造轮子。<br>
2.可视化系统程序安装界面，可自定义安装数据，开发者可快速扩展发行自己的软件产品。<br>
3.likeadmin定位为通用的软件系统管理后台，方便开发者快速开发软件系统，文档清晰、代码易懂、简单易用。<br>
4.未来将持续集成通用的微信/支付宝支付，阿里云/腾讯云短信，阿里云/腾讯云OSS等通用模块。
### 🐙后端架构方面
1.服务端使用PHP8.0开发，性能有突破性的提升。<br>
2.使用最新ThinkPHP6框架，目前国内最流行的PHP框架，高性能、简单易用、文档齐全、支持composer快速安装组件、支持Redis、支持PSR多种规范等。
### 🐹前端架构方面
1.使用最流性的前后端分离方案typescript、vue3、vite开发，保持了代码的简洁、一致和规范。<br>
2.后台界面使用element-plus UI框架，简单精美的后台界面，丰富的组件库，方便快速开发，满足各种后台交互。
### 🛠️ 代码生成器
一键生成前后端业务代码，大大提示开发效率。
### 🖥️界面预览
![](https://md.likeshop.cn/server/index.php?s=/api/attachment/visitFile&sign=4f96e011b36b8d17fbbffb9b9f1df086)<br>

![](https://md.likeshop.cn/server/index.php?s=/api/attachment/visitFile&sign=204877788e70c5892e9a7fbfd1bfd908)<br>
![](https://md.likeshop.cn/server/index.php?s=/api/attachment/visitFile&sign=ac949614558e58de07ddc5facb08cb77)<br>
![](https://md.likeshop.cn/server/index.php?s=/api/attachment/visitFile&sign=aabf73d48cf4cd21eb272feee51206aa)<br>
![](https://md.likeshop.cn/server/index.php?s=/api/attachment/visitFile&sign=4ccd1fa46c94ef4c98098b7c8cb82afc)<br>


### 👀体验后台
**地址：https://demo.likeadmin.cn/admin
账号：admin 密码：123456**
<br>

## 📄文档
### ⚙️项目部署
PHP入口文件为项目根目录下：likeadmin/server/public/index.php
#### web软件设置
Nginx配置
```
server {
    listen 80;
    server_name  demo.likeadmin.cn;
    access_log /logs/demo.likeadmin.cn_access_nginx.log;
    error_log /logs/demo.likeadmin.cn_error_nginx.log;
    client_max_body_size 5M;
    location / {
        root  likeadmin/server/public;#入口文件目录
        index  index.html index.htm index.php;
        if (!-e $request_filename)
        {
            rewrite ^/(.*)$ /index.php?s=$1 last;
            break;
        }
    }
    location ~ /.*\.php/ {
        rewrite ^(.*?/?)(.*\.php)(.*)$ /$2?s=$3 last;
        break;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /var/www/html;
    }

    location ~ \.php$ {
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  likeadmin/server/public$fastcgi_script_name; #入口文件目录
        include        fastcgi_params;
    }
    location = /favicon.ico {
            log_not_found off;
            access_log off;
        }
}
```
或Apache配置
```
<IfModule mod_rewrite.c>
  Options +FollowSymlinks -Multiviews
  RewriteEngine On

  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^(.*)$ index.php/$1 [QSA,PT,L]
</IfModule>
```
#### 安装与使用
访问以上部署域名，安装提示安装。默认已经编译好管理后台，安装完访问"域名/admin"（例：demo.likeadmin.cn）即可。
### 📁目录结构
```shell
├─server  //服务端根目录（管理后台、接口）
│  ├─application  //应用目录
│  │  ├─adminapi  //管理后台
│  ├─public  //WEB目录（对外访问目录）
│  │  ├─index.php  //php入口文件
│  │  ├─admin  //已编译的后台前端代码入口（上线运行）
│  │  ├─install  //安装程序目录
│  ├─.env  //项目环境配置文件（最优化读取配置）
│
├─admin  //管理后台前端源码
```
### 🪐接口文档
[点击这里进入更多更详细文档。](http://doc.likeadmin.cn/php "点击这里进入更多更详细文档。")