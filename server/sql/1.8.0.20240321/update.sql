SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `la_decorate_page` ADD COLUMN `meta` text NULL COMMENT '页面设置' AFTER `data`;

ALTER TABLE `la_recharge_order` ADD COLUMN `refund_transaction_id` varchar(255) NULL DEFAULT NULL COMMENT '退款交易流水号' AFTER `refund_status`;


INSERT INTO `la_dev_pay_config`(`id`, `name`, `pay_way`, `config`, `icon`, `sort`, `remark`) VALUES (3, '支付宝支付', 3, '{\"mode\":\"normal_mode\",\"merchant_type\":\"ordinary_merchant\",\"app_id\":\"\",\"private_key\":\"\",\"ali_public_key\":\"\"}', '/resource/image/adminapi/default/ali_pay.png', 123, '支付宝支付');

INSERT INTO `la_dev_pay_way`(`id`, `pay_config_id`, `scene`, `is_default`, `status`) VALUES (7, 3, 3, 0, 1);


UPDATE `la_decorate_tabbar` SET `name` = '首页', `selected` = 'resource/image/adminapi/default/tabbar_home_sel.png', `unselected` = 'resource/image/adminapi/default/tabbar_home.png', `link` = '{\"path\":\"/pages/index/index\",\"name\":\"商城首页\",\"type\":\"shop\"}', `is_show` = 1, `create_time` = 1662688157, `update_time` = 1662688157 WHERE `id` = 1;

UPDATE `la_decorate_tabbar` SET `name` = '资讯', `selected` = 'resource/image/adminapi/default/tabbar_text_sel.png', `unselected` = 'resource/image/adminapi/default/tabbar_text.png', `link` = '{\"path\":\"/pages/news/news\",\"name\":\"文章资讯\",\"type\":\"shop\",\"canTab\":\"1\"}', `is_show` = 1, `create_time` = 1662688157, `update_time` = 1662688157 WHERE `id` = 2;

UPDATE `la_decorate_tabbar` SET `name` = '我的', `selected` = 'resource/image/adminapi/default/tabbar_me_sel.png', `unselected` = 'resource/image/adminapi/default/tabbar_me.png', `link` = '{\"path\":\"/pages/user/user\",\"name\":\"个人中心\",\"type\":\"shop\",\"canTab\":\"1\"}', `is_show` = 1, `create_time` = 1662688157, `update_time` = 1662688157 WHERE `id` = 3;


INSERT INTO `la_decorate_page`(`id`, `type`, `name`, `data`, `meta`, `create_time`, `update_time`) VALUES (5, 5, '系统风格', '{\"themeColorId\":3,\"topTextColor\":\"white\",\"navigationBarColor\":\"#A74BFD\",\"themeColor1\":\"#A74BFD\",\"themeColor2\":\"#CB60FF\",\"buttonColor\":\"white\"}', '', 1710410915, 1710990415);

UPDATE `la_decorate_page` SET `type` = 1, `name` = '商城首页', `data` = '[{\"title\":\"搜索\",\"name\":\"search\",\"disabled\":1,\"content\":{},\"styles\":{}},{\"title\":\"首页轮播图\",\"name\":\"banner\",\"content\":{\"enabled\":1,\"data\":[{\"image\":\"/resource/image/adminapi/default/banner001.png\",\"name\":\"\",\"link\":{\"id\":6,\"name\":\"来自瓷器的爱\",\"path\":\"/pages/news_detail/news_detail\",\"query\":{\"id\":6},\"type\":\"article\"},\"is_show\":\"1\",\"bg\":\"/resource/image/adminapi/default/banner001_bg.png\"},{\"image\":\"/resource/image/adminapi/default/banner002.png\",\"name\":\"\",\"link\":{\"id\":3,\"name\":\"金山电池公布“沪广深市民绿色生活方式”调查结果\",\"path\":\"/pages/news_detail/news_detail\",\"query\":{\"id\":3},\"type\":\"article\"},\"is_show\":\"1\",\"bg\":\"/resource/image/adminapi/default/banner002_bg.png\"},{\"is_show\":\"1\",\"image\":\"/resource/image/adminapi/default/banner003.png\",\"name\":\"\",\"link\":{\"id\":1,\"name\":\"让生活更精致！五款居家好物推荐，实用性超高\",\"path\":\"/pages/news_detail/news_detail\",\"query\":{\"id\":1},\"type\":\"article\"},\"bg\":\"/resource/image/adminapi/default/banner003_bg.png\"}],\"style\":1,\"bg_style\":1},\"styles\":{}},{\"title\":\"导航菜单\",\"name\":\"nav\",\"content\":{\"enabled\":1,\"data\":[{\"image\":\"/resource/image/adminapi/default/nav01.png\",\"name\":\"资讯中心\",\"link\":{\"path\":\"/pages/news/news\",\"name\":\"文章资讯\",\"type\":\"shop\",\"canTab\":true},\"is_show\":\"1\"},{\"image\":\"/resource/image/adminapi/default/nav03.png\",\"name\":\"个人设置\",\"link\":{\"path\":\"/pages/user_set/user_set\",\"name\":\"个人设置\",\"type\":\"shop\"},\"is_show\":\"1\"},{\"image\":\"/resource/image/adminapi/default/nav02.png\",\"name\":\"我的收藏\",\"link\":{\"path\":\"/pages/collection/collection\",\"name\":\"我的收藏\",\"type\":\"shop\"},\"is_show\":\"1\"},{\"image\":\"/resource/image/adminapi/default/nav05.png\",\"name\":\"关于我们\",\"link\":{\"path\":\"/pages/as_us/as_us\",\"name\":\"关于我们\",\"type\":\"shop\"},\"is_show\":\"1\"},{\"image\":\"/resource/image/adminapi/default/nav04.png\",\"name\":\"联系客服\",\"link\":{\"path\":\"/pages/customer_service/customer_service\",\"name\":\"联系客服\",\"type\":\"shop\"},\"is_show\":\"1\"}],\"style\":2,\"per_line\":5,\"show_line\":2},\"styles\":{}},{\"title\":\"首页中部轮播图\",\"name\":\"middle-banner\",\"content\":{\"enabled\":1,\"data\":[{\"is_show\":\"1\",\"image\":\"/resource/image/adminapi/default/index_ad01.png\",\"name\":\"\",\"link\":{\"path\":\"/pages/agreement/agreement\",\"name\":\"隐私政策\",\"query\":{\"type\":\"privacy\"},\"type\":\"shop\"}}]},\"styles\":{}},{\"id\":\"l84almsk2uhyf\",\"title\":\"资讯\",\"name\":\"news\",\"disabled\":1,\"content\":{},\"styles\":{}}]', `meta` = '[{\"title\":\"页面设置\",\"name\":\"page-meta\",\"content\":{\"title\":\"首页\",\"bg_type\":\"2\",\"bg_color\":\"#2F80ED\",\"bg_image\":\"/resource/image/adminapi/default/page_meta_bg01.png\",\"text_color\":\"2\",\"title_type\":\"2\",\"title_img\":\"/resource/image/adminapi/default/page_mate_title.png\"},\"styles\":{}}]', `create_time` = 1661757188, `update_time` = 1710989700 WHERE `id` = 1;

UPDATE `la_decorate_page` SET `type` = 2, `name` = '个人中心', `data` = '[{\"title\":\"用户信息\",\"name\":\"user-info\",\"disabled\":1,\"content\":{},\"styles\":{}},{\"title\":\"我的服务\",\"name\":\"my-service\",\"content\":{\"style\":1,\"title\":\"我的服务\",\"data\":[{\"image\":\"/resource/image/adminapi/default/user_collect.png\",\"name\":\"我的收藏\",\"link\":{\"path\":\"/pages/collection/collection\",\"name\":\"我的收藏\",\"type\":\"shop\"},\"is_show\":\"1\"},{\"image\":\"/resource/image/adminapi/default/user_setting.png\",\"name\":\"个人设置\",\"link\":{\"path\":\"/pages/user_set/user_set\",\"name\":\"个人设置\",\"type\":\"shop\"},\"is_show\":\"1\"},{\"image\":\"/resource/image/adminapi/default/user_kefu.png\",\"name\":\"联系客服\",\"link\":{\"path\":\"/pages/customer_service/customer_service\",\"name\":\"联系客服\",\"type\":\"shop\"},\"is_show\":\"1\"},{\"image\":\"/resource/image/adminapi/default/wallet.png\",\"name\":\"我的钱包\",\"link\":{\"path\":\"/packages/pages/user_wallet/user_wallet\",\"name\":\"我的钱包\",\"type\":\"shop\"},\"is_show\":\"1\"}],\"enabled\":1},\"styles\":{}},{\"title\":\"个人中心广告图\",\"name\":\"user-banner\",\"content\":{\"enabled\":1,\"data\":[{\"image\":\"/resource/image/adminapi/default/user_ad01.png\",\"name\":\"\",\"link\":{\"path\":\"/pages/customer_service/customer_service\",\"name\":\"联系客服\",\"type\":\"shop\"},\"is_show\":\"1\"},{\"image\":\"/resource/image/adminapi/default/user_ad02.png\",\"name\":\"\",\"link\":{\"path\":\"/pages/customer_service/customer_service\",\"name\":\"联系客服\",\"type\":\"shop\"},\"is_show\":\"1\"}]},\"styles\":{}}]', `meta` = '[{\"title\":\"页面设置\",\"name\":\"page-meta\",\"content\":{\"title\":\"个人中心\",\"bg_type\":\"1\",\"bg_color\":\"#2F80ED\",\"bg_image\":\"\",\"text_color\":\"1\",\"title_type\":\"2\",\"title_img\":\"/resource/image/adminapi/default/page_mate_title.png\"},\"styles\":{}}]', `create_time` = 1661757188, `update_time` = 1710933097 WHERE `id` = 2;

UPDATE `la_decorate_page` SET `type` = 3, `name` = '客服设置', `data` = '[{\"title\":\"客服设置\",\"name\":\"customer-service\",\"content\":{\"title\":\"添加客服二维码\",\"time\":\"早上 9:30 - 19:00\",\"mobile\":\"18578768757\",\"qrcode\":\"/resource/image/adminapi/default/kefu01.png\",\"remark\":\"长按添加客服或拨打客服热线\"},\"styles\":{}}]', `meta` = '', `create_time` = 1661757188, `update_time` = 1710929953 WHERE `id` = 3;

UPDATE `la_decorate_page` SET `type` = 4, `name` = 'PC设置', `data` = '[{\"id\":\"lajcn8d0hzhed\",\"title\":\"首页轮播图\",\"name\":\"pc-banner\",\"content\":{\"enabled\":1,\"data\":[{\"image\":\"/resource/image/adminapi/default/banner003.png\",\"name\":\"\",\"link\":{\"path\":\"/pages/news/news\",\"name\":\"文章资讯\",\"type\":\"shop\"}},{\"image\":\"/resource/image/adminapi/default/banner002.png\",\"name\":\"\",\"link\":{\"path\":\"/pages/collection/collection\",\"name\":\"我的收藏\",\"type\":\"shop\"}},{\"image\":\"/resource/image/adminapi/default/banner001.png\",\"name\":\"\",\"link\":{}}]},\"styles\":{\"position\":\"absolute\",\"left\":\"40\",\"top\":\"75px\",\"width\":\"750px\",\"height\":\"340px\"}}]', `meta` = '', `create_time` = 1661757188, `update_time` = 1710990175 WHERE `id` = 4;


INSERT INTO `la_system_menu`(`id`, `pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (173, 175, 'C', '系统风格', 'el-icon-Brush', 80, '', 'style', 'decoration/style/style', '', '', 0, 1, 0, 1681635044, 1710929278);

INSERT INTO `la_system_menu`(`id`, `pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (174, 96, 'C', '素材中心', 'local-icon-shangchuanzhaopian', 0, 'file/listCate', 'material', 'material/index', '', '', 0, 1, 0, 1710734367, 1710734392);

INSERT INTO `la_system_menu`(`id`, `pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (175, 96, 'M', '移动端', '', 100, '', 'mobile', '', '', '', 0, 1, 0, 1710901543, 1710929294);

INSERT INTO `la_system_menu`(`id`, `pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (176, 96, 'M', 'PC端', '', 90, '', 'pc', '', '', '', 0, 1, 0, 1710901592, 1710929299);

UPDATE `la_system_menu` SET `pid` = 0, `type` = 'M', `name` = '权限管理', `icon` = 'el-icon-Lock', `sort` = 300, `perms` = '', `paths` = 'permission', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1656664556, `update_time` = 1710472802 WHERE `id` = 4;

UPDATE `la_system_menu` SET `pid` = 4, `type` = 'C', `name` = '菜单', `icon` = 'el-icon-Operation', `sort` = 100, `perms` = 'auth.menu/lists', `paths` = 'menu', `component` = 'permission/menu/index', `selected` = '', `params` = '', `is_cache` = 1, `is_show` = 1, `is_disable` = 0, `create_time` = 1656664960, `update_time` = 1710472994 WHERE `id` = 6;

UPDATE `la_system_menu` SET `pid` = 4, `type` = 'C', `name` = '管理员', `icon` = 'local-icon-shouyiren', `sort` = 80, `perms` = 'auth.admin/lists', `paths` = 'admin', `component` = 'permission/admin/index', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1656901567, `update_time` = 1710473013 WHERE `id` = 7;

UPDATE `la_system_menu` SET `pid` = 4, `type` = 'C', `name` = '角色', `icon` = 'el-icon-Female', `sort` = 90, `perms` = 'auth.role/lists', `paths` = 'role', `component` = 'permission/role/index', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1656901660, `update_time` = 1710473000 WHERE `id` = 8;

UPDATE `la_system_menu` SET `pid` = 28, `type` = 'M', `name` = '开发工具', `icon` = 'el-icon-EditPen', `sort` = 40, `perms` = '', `paths` = 'dev_tools', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1657097744, `update_time` = 1710473127 WHERE `id` = 23;

UPDATE `la_system_menu` SET `pid` = 0, `type` = 'M', `name` = '组织管理', `icon` = 'el-icon-OfficeBuilding', `sort` = 400, `perms` = '', `paths` = 'organization', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1657099914, `update_time` = 1710472797 WHERE `id` = 25;

UPDATE `la_system_menu` SET `pid` = 25, `type` = 'C', `name` = '部门管理', `icon` = 'el-icon-Coordinate', `sort` = 100, `perms` = 'dept.dept/lists', `paths` = 'department', `component` = 'organization/department/index', `selected` = '', `params` = '', `is_cache` = 1, `is_show` = 1, `is_disable` = 0, `create_time` = 1657099989, `update_time` = 1710472962 WHERE `id` = 26;

UPDATE `la_system_menu` SET `pid` = 25, `type` = 'C', `name` = '岗位管理', `icon` = 'el-icon-PriceTag', `sort` = 90, `perms` = 'dept.jobs/lists', `paths` = 'post', `component` = 'organization/post/index', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1657100044, `update_time` = 1710472967 WHERE `id` = 27;

UPDATE `la_system_menu` SET `pid` = 0, `type` = 'M', `name` = '系统设置', `icon` = 'el-icon-Setting', `sort` = 200, `perms` = '', `paths` = 'setting', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1657100164, `update_time` = 1710472807 WHERE `id` = 28;

UPDATE `la_system_menu` SET `pid` = 28, `type` = 'M', `name` = '网站设置', `icon` = 'el-icon-Basketball', `sort` = 100, `perms` = '', `paths` = 'website', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1657100230, `update_time` = 1710473049 WHERE `id` = 29;

UPDATE `la_system_menu` SET `pid` = 28, `type` = 'C', `name` = '存储设置', `icon` = 'el-icon-FolderOpened', `sort` = 70, `perms` = 'setting.storage/lists', `paths` = 'storage', `component` = 'setting/storage/index', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1657160959, `update_time` = 1710473095 WHERE `id` = 33;

UPDATE `la_system_menu` SET `pid` = 28, `type` = 'M', `name` = '系统维护', `icon` = 'el-icon-SetUp', `sort` = 50, `perms` = '', `paths` = 'system', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1657161569, `update_time` = 1710473122 WHERE `id` = 35;

UPDATE `la_system_menu` SET `pid` = 35, `type` = 'C', `name` = '系统日志', `icon` = '', `sort` = 90, `perms` = 'setting.system.log/lists', `paths` = 'journal', `component` = 'setting/system/journal', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1657161696, `update_time` = 1710473253 WHERE `id` = 36;

UPDATE `la_system_menu` SET `pid` = 35, `type` = 'C', `name` = '系统缓存', `icon` = '', `sort` = 80, `perms` = '', `paths` = 'cache', `component` = 'setting/system/cache', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1657161896, `update_time` = 1710473258 WHERE `id` = 37;

UPDATE `la_system_menu` SET `pid` = 35, `type` = 'C', `name` = '系统环境', `icon` = '', `sort` = 70, `perms` = 'setting.system.system/info', `paths` = 'environment', `component` = 'setting/system/environment', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1657162000, `update_time` = 1710473265 WHERE `id` = 38;

UPDATE `la_system_menu` SET `pid` = 158, `type` = 'M', `name` = '素材管理', `icon` = 'el-icon-Picture', `sort` = 0, `perms` = '', `paths` = 'material', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1657507133, `update_time` = 1710472243 WHERE `id` = 63;

UPDATE `la_system_menu` SET `pid` = 158, `type` = 'M', `name` = '文章资讯', `icon` = 'el-icon-ChatLineSquare', `sort` = 90, `perms` = '', `paths` = 'article', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663749965, `update_time` = 1710471867 WHERE `id` = 70;

UPDATE `la_system_menu` SET `pid` = 0, `type` = 'M', `name` = '渠道设置', `icon` = 'el-icon-Message', `sort` = 500, `perms` = '', `paths` = 'channel', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663754084, `update_time` = 1710472649 WHERE `id` = 82;

UPDATE `la_system_menu` SET `pid` = 82, `type` = 'C', `name` = 'h5设置', `icon` = 'el-icon-Cellphone', `sort` = 100, `perms` = 'channel.web_page_setting/getConfig', `paths` = 'h5', `component` = 'channel/h5', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663754158, `update_time` = 1710472929 WHERE `id` = 83;

UPDATE `la_system_menu` SET `pid` = 82, `type` = 'M', `name` = '微信公众号', `icon` = 'local-icon-dingdan', `sort` = 80, `perms` = '', `paths` = 'wx_oa', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663755470, `update_time` = 1710472946 WHERE `id` = 85;

UPDATE `la_system_menu` SET `pid` = 82, `type` = 'C', `name` = '微信小程序', `icon` = 'local-icon-weixin', `sort` = 90, `perms` = 'channel.mnp_settings/getConfig', `paths` = 'weapp', `component` = 'channel/weapp', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663831396, `update_time` = 1710472941 WHERE `id` = 94;

UPDATE `la_system_menu` SET `pid` = 0, `type` = 'M', `name` = '装修管理', `icon` = 'el-icon-Brush', `sort` = 600, `perms` = '', `paths` = 'decoration', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663834825, `update_time` = 1710472099 WHERE `id` = 96;

UPDATE `la_system_menu` SET `pid` = 175, `type` = 'C', `name` = '页面装修', `icon` = 'el-icon-CopyDocument', `sort` = 100, `perms` = 'decorate.page/detail', `paths` = 'pages', `component` = 'decoration/pages/index', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663834879, `update_time` = 1710929256 WHERE `id` = 97;

UPDATE `la_system_menu` SET `pid` = 175, `type` = 'C', `name` = '底部导航', `icon` = 'el-icon-Position', `sort` = 90, `perms` = 'decorate.tabbar/detail', `paths` = 'tabbar', `component` = 'decoration/tabbar', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663835004, `update_time` = 1710929262 WHERE `id` = 99;

UPDATE `la_system_menu` SET `pid` = 158, `type` = 'M', `name` = '消息管理', `icon` = 'el-icon-ChatDotRound', `sort` = 80, `perms` = '', `paths` = 'message', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663838602, `update_time` = 1710471874 WHERE `id` = 101;

UPDATE `la_system_menu` SET `pid` = 28, `type` = 'C', `name` = '热门搜索', `icon` = 'el-icon-Search', `sort` = 60, `perms` = 'setting.hot_search/getConfig', `paths` = 'search', `component` = 'setting/search/index', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663901821, `update_time` = 1710473109 WHERE `id` = 110;

UPDATE `la_system_menu` SET `pid` = 28, `type` = 'M', `name` = '用户设置', `icon` = 'local-icon-keziyuyue', `sort` = 90, `perms` = '', `paths` = 'user', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663903302, `update_time` = 1710473056 WHERE `id` = 112;

UPDATE `la_system_menu` SET `pid` = 0, `type` = 'M', `name` = '用户管理', `icon` = 'el-icon-User', `sort` = 900, `perms` = '', `paths` = 'consumer', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663904351, `update_time` = 1710472074 WHERE `id` = 117;

UPDATE `la_system_menu` SET `pid` = 117, `type` = 'C', `name` = '用户列表', `icon` = 'local-icon-user_guanli', `sort` = 100, `perms` = 'user.user/lists', `paths` = 'lists', `component` = 'consumer/lists/index', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1663904392, `update_time` = 1710471845 WHERE `id` = 118;

UPDATE `la_system_menu` SET `pid` = 117, `type` = 'C', `name` = '用户详情', `icon` = '', `sort` = 90, `perms` = 'user.user/detail', `paths` = 'lists/detail', `component` = 'consumer/lists/detail', `selected` = '/consumer/lists', `params` = '', `is_cache` = 0, `is_show` = 0, `is_disable` = 0, `create_time` = 1663904470, `update_time` = 1710471851 WHERE `id` = 119;

UPDATE `la_system_menu` SET `pid` = 82, `type` = 'C', `name` = '微信开发平台', `icon` = 'local-icon-notice_buyer', `sort` = 70, `perms` = 'channel.open_setting/getConfig', `paths` = 'open_setting', `component` = 'channel/open_setting', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1666085713, `update_time` = 1710472951 WHERE `id` = 140;

UPDATE `la_system_menu` SET `pid` = 176, `type` = 'C', `name` = 'PC端装修', `icon` = 'el-icon-Monitor', `sort` = 8, `perms` = '', `paths` = 'pc', `component` = 'decoration/pc', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1668423284, `update_time` = 1710901602 WHERE `id` = 142;

UPDATE `la_system_menu` SET `pid` = 35, `type` = 'C', `name` = '定时任务', `icon` = '', `sort` = 100, `perms` = 'crontab.crontab/lists', `paths` = 'scheduled_task', `component` = 'setting/system/scheduled_task/index', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1669357509, `update_time` = 1710473246 WHERE `id` = 143;

UPDATE `la_system_menu` SET `pid` = 0, `type` = 'M', `name` = '模板示例', `icon` = 'el-icon-SetUp', `sort` = 100, `perms` = '', `paths` = 'template', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1670206819, `update_time` = 1710472811 WHERE `id` = 148;

UPDATE `la_system_menu` SET `pid` = 149, `type` = 'C', `name` = '富文本', `icon` = '', `sort` = 90, `perms` = '', `paths` = 'rich_text', `component` = 'template/component/rich_text', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1670207751, `update_time` = 1710473315 WHERE `id` = 150;

UPDATE `la_system_menu` SET `pid` = 149, `type` = 'C', `name` = '上传文件', `icon` = '', `sort` = 80, `perms` = '', `paths` = 'upload', `component` = 'template/component/upload', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1670208925, `update_time` = 1710473322 WHERE `id` = 151;

UPDATE `la_system_menu` SET `pid` = 149, `type` = 'C', `name` = '图标', `icon` = '', `sort` = 100, `perms` = '', `paths` = 'icon', `component` = 'template/component/icon', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1670230069, `update_time` = 1710473306 WHERE `id` = 152;

UPDATE `la_system_menu` SET `pid` = 149, `type` = 'C', `name` = '文件选择器', `icon` = '', `sort` = 60, `perms` = '', `paths` = 'file', `component` = 'template/component/file', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1670232129, `update_time` = 1710473341 WHERE `id` = 153;

UPDATE `la_system_menu` SET `pid` = 149, `type` = 'C', `name` = '链接选择器', `icon` = '', `sort` = 50, `perms` = '', `paths` = 'link', `component` = 'template/component/link', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1670292636, `update_time` = 1710473346 WHERE `id` = 154;

UPDATE `la_system_menu` SET `pid` = 149, `type` = 'C', `name` = '超出自动打点', `icon` = '', `sort` = 40, `perms` = '', `paths` = 'overflow', `component` = 'template/component/overflow', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1670292883, `update_time` = 1710473351 WHERE `id` = 155;

UPDATE `la_system_menu` SET `pid` = 149, `type` = 'C', `name` = '悬浮input', `icon` = '', `sort` = 70, `perms` = '', `paths` = 'popover_input', `component` = 'template/component/popover_input', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1670293336, `update_time` = 1710473329 WHERE `id` = 156;

UPDATE `la_system_menu` SET `pid` = 0, `type` = 'M', `name` = '应用管理', `icon` = 'el-icon-Postcard', `sort` = 800, `perms` = '', `paths` = 'app', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1677143430, `update_time` = 1710472079 WHERE `id` = 158;

UPDATE `la_system_menu` SET `pid` = 158, `type` = 'C', `name` = '用户充值', `icon` = 'local-icon-fukuan', `sort` = 100, `perms` = 'recharge.recharge/getConfig', `paths` = 'recharge', `component` = 'app/recharge/index', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1677144284, `update_time` = 1710471860 WHERE `id` = 159;

UPDATE `la_system_menu` SET `pid` = 28, `type` = 'M', `name` = '支付设置', `icon` = 'local-icon-set_pay', `sort` = 80, `perms` = '', `paths` = 'pay', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1677148075, `update_time` = 1710473061 WHERE `id` = 161;

UPDATE `la_system_menu` SET `pid` = 0, `type` = 'M', `name` = '财务管理', `icon` = 'local-icon-user_gaikuang', `sort` = 700, `perms` = '', `paths` = 'finance', `component` = '', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1677552269, `update_time` = 1710472085 WHERE `id` = 166;

UPDATE `la_system_menu` SET `pid` = 166, `type` = 'C', `name` = '充值记录', `icon` = 'el-icon-Wallet', `sort` = 90, `perms` = 'recharge.recharge/lists', `paths` = 'recharge_record', `component` = 'finance/recharge_record', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1677552757, `update_time` = 1710472902 WHERE `id` = 167;

UPDATE `la_system_menu` SET `pid` = 166, `type` = 'C', `name` = '余额明细', `icon` = 'local-icon-qianbao', `sort` = 100, `perms` = 'finance.account_log/lists', `paths` = 'balance_details', `component` = 'finance/balance_details', `selected` = '', `params` = '', `is_cache` = 0, `is_show` = 1, `is_disable` = 0, `create_time` = 1677552976, `update_time` = 1710472894 WHERE `id` = 168;

SET FOREIGN_KEY_CHECKS = 1;