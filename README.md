<a href="https://www.likeshop.cn">![likeshop全开源商城](https://server.likeshop.cn/uploads/gitad/fastbuildAI.png)</a><br>
 <a href="https://www.likeshop.cn">![likeshop全开源商城](https://server.likeshop.cn/uploads/gitad/likeshop.png)</a><br>
<a href="https://www.buildingai.cc">![BuildingAI](https://server.likeshop.cn/uploads/gitad/fastbuildAI.png)</a><br>
 <h1 align="center">likeadmin（PHP）
 通用管理后台</h1>
<h4 align="center">🚀快速开发 🛠️ 一键生成代码 ✅后台多端自适应 📱手机端 🖥️PC（电脑）端前台</h4> 
<p align="center">
<p align="center"><a href="https://gitee.com/likeadmin/likeadmin_php_saas">⬇⬇SaaS版点击这里⬇⬇</a></p>
<p align="center">
<a href="https://www.php.net/"><img src="https://img.shields.io/badge/PHP-8-8892bf"></a>
<a href="https://www.tslang.cn/"><img src="https://img.shields.io/badge/TypeScript-5-294e80"></a>
<a href="#"><img src="https://img.shields.io/badge/ThinkPHP-8.0-6fb737"></a>
<a href="#"><img src="https://img.shields.io/badge/Vue.js-3.5-4eb883"></a>
<a href="#"><img src="https://img.shields.io/badge/vite-5-ffc018"></a>
<a href="#"><img src="https://img.shields.io/badge/Element Plus-2.8-409eff"></a>
<a href="https://uniapp.dcloud.io/"><img src="https://img.shields.io/badge/uniapp-3-d85806"></a>
<a href="https://www.nuxtjs.cn/"><img src="https://img.shields.io/badge/Nuxt.js-3-18bc78"></a>
</p>
<p align="center">
<a href="https://mp.weixin.qq.com/"><img src="https://img.shields.io/badge/微信-公众号-05ce66"></a>
<a href="https://mp.weixin.qq.com/"><img src="https://img.shields.io/badge/微信-小程序-05ce66"></a>
<a href="https://open.weixin.qq.com/"><img src="https://img.shields.io/badge/微信-开放平台-05ce66"></a>
<a href="https://pay.weixin.qq.com/"><img src="https://img.shields.io/badge/微信-支付API3-05ce66"></a>
<a href="https://cloud.tencent.com/"><img src="https://img.shields.io/badge/腾讯云-COS-00a3ff"></a>
<a href="https://cloud.tencent.com/"><img src="https://img.shields.io/badge/腾讯云-短信-00a3ff"></a>
<a href="https://www.alipay.com"><img src="https://img.shields.io/badge/支付宝-支付-00a0eb"></a>
<a href="https://www.aliyun.com/"><img src="https://img.shields.io/badge/阿里云-OSS-ff6a00"></a>
<a href="https://www.aliyun.com/"><img src="https://img.shields.io/badge/阿里云-短信-ff6a00"></a>
<a href="https://www.qiniu.com/"><img src="https://img.shields.io/badge/七牛云-OSS-07beff"></a>
</p>

![](/server/public/readme/likeadmin.png)

## 🚀🚀🚀docker 本地一句命令快速部署体验

### 🐳 快速部署

安装启动 [docker](https://www.docker.com/) 之后，在终端运行以下命令即可体验。<br>

```shell
 docker run -d --name likeadmin_php  -p 20221:80 -e MYSQL_ROOT_PASSWORD=root  registry.cn-guangzhou.aliyuncs.com/likeadmin/likeadmin_php:latest
```

如果需要自定义参数永久挂载数据，在终端运行以下命令，其中整个"[]"改成自定义参数。

```shell
docker run -d --name likeadmin_php \
-v 【主机存储数据库路径】:/var/lib/mysql \
-v 【主机存储项目代码文件路径】:/var/www/html/likeadmin_php \
-p 【访问端口】:80 \
-e MYSQL_ROOT_PASSWORD=【Mysql密码】 \
registry.cn-guangzhou.aliyuncs.com/likeadmin/likeadmin_php:latest
```

### ⚠️ 注意

1.如果出现无法访问，请等待 1 分钟，docker 部署每次会下载最新源码。<br> 2.安装的时候，数据默认帐号为 root，默认密码为 root。<br>
3.docker 快速部署只适合本地部署体验，不熟悉 docker 请勿用于生产环境，可能造成数据丢失等问题。

### 🛜 访问

访问安装程序：http://127.0.0.1:20221
<br>PC 端管理后台：http://127.0.0.1:20221/admin/login
<br>PC 端前台：http://127.0.0.1:20221/pc/
<br>手机端前台：http://127.0.0.1:20221/mobile/

## 👀 体验后台

### 管理后台

**地址：https://php.likeadmin.cn/admin <br>
账号：admin 密码：123456**

### 微信小程序前台

<img  width="40%"  src="/server/public/readme/mnp.jpg" /><br>

### 手机端网页前台

https://php.likeadmin.cn/mobile

### PC（电脑）端网页前台

https://php.likeadmin.cn/pc/

### 开发文档

地址：[https://www.likeadmin.cn](https://www.likeadmin.cn "https://www.likeadmin.cn")

### 🖥️ 界面预览

![](/server/public/readme/admin-1.png)
![](/server/public/readme/admin-2.png)
![](/server/public/readme/admin-3.png)
![](/server/public/readme/admin-4.png)
<br>

### 📱 手机端前台界面

<center class="half">
<img  width="23%"  src="/server/public/readme/mobile-1.png" />
<img  width="23%"  src="/server/public/readme/mobile-2.png" />
<img  width="23%"  src="/server/public/readme/mobile-3.png" />
<img  width="23%"  src="/server/public/readme/mobile-4.png" />
</center> <br>

### 🖥️PC 端前台界面

![](/server/public/readme/pc-1.png)
![](/server/public/readme/pc-2.png)
![](/server/public/readme/pc-3.png)

## 👨‍💻‍ 简介

我们希望能够为开源社区做出更多的贡献，推出永久免费开源的 likeadmin 通用前后端分离管理后台系统。遵循 MIT 开源许可协议，您可以免费使用，甚至允许把你基于 likeadmin 开发的软件应用开源、发布、销售。
<br>

## 🧐 进一步了解

### 🧰 场景介绍

1.likeadmin 已经搭建好前后端分离的底层，包含程序安装、登录、登出、工作台、菜单权限控制、角色、管理员、部门管理、岗位管理、素材管理、网站设置、图库管理等基础功能，无需重复造轮子。更有开发者工具功能，一键生成代码，大大节省开发时间。<br> 2.可视化系统程序安装界面，可自定义安装数据，开发者可快速扩展发行自己的软件产品。<br>
3.likeadmin 定位为通用的软件系统管理后台，方便开发者快速开发软件系统，文档清晰、代码易懂、简单易用。<br> 4.集成通用的微信支付（API3）、微信小程序公众号登录、阿里云、腾讯云短信，阿里云 OSS、腾讯云 COS、七牛云 OSS 等通用模块。

### 🐙 后端架构方面

1.服务端使用 PHP8.0 开发，性能有突破性的提升。<br> 2.使用最新 ThinkPHP8 框架，目前国内最流行的 PHP 框架，高性能、简单易用、文档齐全、支持 composer 快速安装组件、支持 Redis、支持 PSR 多种规范等。

### 🐹 前端架构方面

#### 后台

1.使用最流性的前后端分离方案 typescript、vue3、vite 开发，保持了代码的简洁、一致和规范。<br> 2.后台界面使用 element-plus UI 框架，简单精美的后台界面，丰富的组件库，方便快速开发，满足各种后台交互。

#### 手机前台

手机端 uniapp 前台，可以编译成手机 H5 网页、微信小程序、安卓 App，苹果 App 等客户端。

#### PC 端前台

PC 端前台使用 Nuxt.js，支持服务器端渲染(SSR)，对 SEO 友好。

### 🛠️  代码生成器

一键生成前后端业务代码，大大提升开发效率。
