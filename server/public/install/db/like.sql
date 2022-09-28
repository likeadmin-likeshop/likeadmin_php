SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for la_admin
-- ----------------------------
DROP TABLE IF EXISTS `la_admin`;
CREATE TABLE `la_admin`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `root` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否超级管理员 0-否 1-是',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '名称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `account` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '账号',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `role_id` int(11) NOT NULL DEFAULT 0 COMMENT '角色id',
  `dept_id` int(11) NOT NULL DEFAULT 0 COMMENT '部门id',
  `jobs_id` int(11) NOT NULL DEFAULT 0 COMMENT '岗位id',
  `login_time` int(10) NULL DEFAULT NULL COMMENT '最后登录时间',
  `login_ip` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '最后登录ip',
  `multipoint_login` tinyint(1) UNSIGNED NULL DEFAULT 1 COMMENT '是否支持多处登录：1-是；0-否；',
  `disable` tinyint(1) UNSIGNED NULL DEFAULT 0 COMMENT '是否禁用：0-否；1-是；',
  `create_time` int(10) NOT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  `delete_time` int(10) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '管理员表';

-- ----------------------------
-- Table structure for la_admin_session
-- ----------------------------
DROP TABLE IF EXISTS `la_admin_session`;
CREATE TABLE `la_admin_session`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) UNSIGNED NOT NULL COMMENT '用户id',
  `terminal` tinyint(1) NOT NULL DEFAULT 1 COMMENT '客户端类型：1-pc管理后台 2-mobile手机管理后台',
  `token` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '令牌',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `expire_time` int(10) NOT NULL COMMENT '到期时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `admin_id_client`(`admin_id`, `terminal`) USING BTREE COMMENT '一个用户在一个终端只有一个token',
  UNIQUE INDEX `token`(`token`) USING BTREE COMMENT 'token是唯一的'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '管理员会话表';

-- ----------------------------
-- Table structure for la_article
-- ----------------------------
DROP TABLE IF EXISTS `la_article`;
CREATE TABLE `la_article`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `cid` int(11) NOT NULL COMMENT '文章分类',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章标题',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '简介',
  `abstract` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '文章摘要',
  `image` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章图片',
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '作者',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '文章内容',
  `click_virtual` int(10) NULL DEFAULT 0 COMMENT '虚拟浏览量',
  `click_actual` int(11) NULL DEFAULT 0 COMMENT '实际浏览量',
  `is_show` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否显示:1-是.0-否',
  `sort` int(5) NULL DEFAULT 0 COMMENT '排序',
  `create_time` int(11) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(11) NULL DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(11) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章表';

-- ----------------------------
-- Records of la_article
-- ----------------------------
BEGIN;
INSERT INTO `la_article` VALUES (1, 1, '让生活更精致！五款居家好物推荐，实用性超高', '##好物推荐🔥', '随着当代生活节奏的忙碌，很多人在闲暇之余都想好好的享受生活。随着科技的发展，也出现了越来越多可以帮助我们提升幸福感，让生活变得更精致的产品，下面周周就给大家盘点五款居家必备的好物，都是实用性很高的产品，周周可以保证大家买了肯定会喜欢。', '/resource/image/adminapi/default/article01.png', '红花', '<p>拥有一台投影仪，闲暇时可以在家里直接看影院级别的大片，光是想想都觉得超级爽。市面上很多投影仪大几千，其实周周觉得没必要，选泰捷这款一千多的足够了，性价比非常高。</p><p>泰捷的专业度很高，在电视TV领域研发已经十年，有诸多专利和技术创新，荣获国内外多项技术奖项，拿下了腾讯创新工场投资，打造的泰捷视频TV端和泰捷电视盒子都获得了极高评价。</p><p>这款投影仪的分辨率在3000元内无敌，做到了真1080P高分辨率，也就是跟市场售价三千DLP投影仪一样的分辨率，真正做到了分毫毕现，像桌布的花纹、天空的云彩等，这些细节都清晰可见。</p><p>亮度方面，泰捷达到了850ANSI流明，同价位一般是200ANSI。这是因为泰捷为了提升亮度和LCD技术透射率低的问题，首创高功率LED灯源，让其亮度做到同价位最好。专业媒体也进行了多次对比，效果与3000元价位投影仪相当。</p><p>操作系统周周也很喜欢，完全不卡。泰捷作为资深音视频品牌，在系统优化方面有十年的研发经验，打造出的“零极”系统是业内公认效率最高、速度最快的系统，用户也评价它流畅度能一台顶三台，而且为了解决行业广告多这一痛点，系统内不植入任何广告。</p>', 1, 2, 1, 0, 1663317759, 1663317759, NULL), (2, 1, '埋葬UI设计师的坟墓不是内卷，而是免费模式', '', '本文从另外一个角度，聊聊作者对UI设计师职业发展前景的担忧，欢迎从事UI设计的同学来参与讨论，会有赠书哦', '/resource/image/adminapi/default/article02.jpeg', '小明', '<p><br></p><p style=\"text-align: justify;\">一个职业，卷，根本就没什么大不了的，尤其是成熟且收入高的职业，不卷才不符合事物发展的规律。何况 UI 设计师的人力市场到今天也和 5 年前一样，还是停留在大型菜鸡互啄的场面。远不能和医疗、证券、教师或者演艺练习生相提并论。</p><p style=\"text-align: justify;\">真正会让我对UI设计师发展前景觉得悲观的事情就只有一件 —— 国内的互联网产品免费机制。这也是一个我一直以来想讨论的话题，就在这次写一写。</p><p style=\"text-align: justify;\">国内互联网市场的发展，是一部浩瀚的 “免费经济” 发展史。虽然今天免费已经是深入国内民众骨髓的认知，但最早的中文互联网也是需要付费的，网游也都是要花钱的。</p><p style=\"text-align: justify;\">只是自有国情在此，付费确实阻碍了互联网行业的扩张和普及，一批创业家就开始通过免费的模式为用户提供服务，从而扩大了自己的产品覆盖面和普及程度。</p><p style=\"text-align: justify;\">印象最深的就是免费急先锋周鸿祎，和现在鲜少出现在公众视野不同，一零年前他是当之无愧的互联网教主，因为他开发出了符合中国国情的互联网产品 “打法”，让 360 的发展如日中天。</p><p style=\"text-align: justify;\">就是他在自传中提到：</p><p style=\"text-align: justify;\">只要是在互联网上每个人都需要的服务，我们就认为它是基础服务，基础服务一定是免费的，这样的话不会形成价值歧视。就是说，只要这种服务是每个人都一定要用的，我一定免费提供，而且是无条件免费。增值服务不是所有人都需要的，这个比例可能会相当低，它只是百分之几甚至更少比例的人需要，所以这种服务一定要收费……</p><p style=\"text-align: justify;\">这就是互联网的游戏规则，它决定了要想建立一个有效的商业模式，就一定要有海量的用户基数……</p>', 2, 4, 1, 0, 1663322854, 1663322854, NULL), (3, 2, '金山电池公布“沪广深市民绿色生活方式”调查结果', '', '60%以上受访者认为高质量的10分钟足以完成“自我充电”', '/resource/image/adminapi/default/article03.png', '中网资讯科技', '<p style=\"text-align: left;\"><strong>深圳，2021年10月22日）</strong>生活在一线城市的沪广深市民一向以效率见称，工作繁忙和快节奏的生活容易缺乏充足的休息。近日，一项针对沪广深市民绿色生活方式而展开的网络问卷调查引起了大家的注意。问卷的问题设定集中于市民对休息时间的看法，以及从对循环充电电池的使用方面了解其对绿色生活方式的态度。该调查采用随机抽样的模式，并对最终收集的1,500份有效问卷进行专业分析后发现，超过60%的受访者表示，在每天的工作时段能拥有10分钟高质量的休息时间，就可以高效“自我充电”。该调查结果反映出，在快节奏时代下，人们需要高质量的休息时间，也要学会利用高效率的休息方式和工具来应对快节奏的生活，以时刻保持“满电”状态。</p><p style=\"text-align: left;\">　　<strong>60%以上受访者认为高质量的10分钟足以完成“自我充电”</strong></p><p style=\"text-align: left;\">　　这次调查超过1,500人，主要聚焦18至85岁的沪广深市民，了解他们对于休息时间的观念及使用充电电池的习惯，结果发现：</p><p style=\"text-align: left;\">　　· 90%以上有工作受访者每天工作时间在7小时以上，平均工作时间为8小时，其中43%以上的受访者工作时间超过9小时</p><p style=\"text-align: left;\">　　· 70%受访者认为在工作期间拥有10分钟“自我充电”时间不是一件困难的事情</p><p style=\"text-align: left;\">　　· 60%受访者认为在工作期间有10分钟休息时间足以为自己快速充电</p><p style=\"text-align: left;\">　　临床心理学家黄咏诗女士在发布会上分享为自己快速充电的实用技巧，她表示：“事实上，只要选择正确的休息方法，10分钟也足以为自己充电。以喝咖啡为例，我们可以使用心灵休息法 ── 静观呼吸，慢慢感受咖啡的温度和气味，如果能配合着聆听流水或海洋的声音，能够有效放松大脑及心灵。”</p><p style=\"text-align: left;\">　　这次调查结果反映出沪广深市民的希望在繁忙的工作中适时停下来，抽出10分钟喝杯咖啡、聆听音乐或小睡片刻，为自己充电。金山电池全新推出的“绿再十分充”超快速充电器仅需10分钟就能充好电，喝一杯咖啡的时间既能完成“自我充电”，也满足设备使用的用电需求，为提升工作效率和放松身心注入新能量。</p><p style=\"text-align: left;\">　　<strong>金山电池推出10分钟超快电池充电器*绿再十分充，以创新科技为市场带来革新体验</strong></p><p style=\"text-align: left;\">　　该问卷同时从沪广深市民对循环充电电池的使用方面进行了调查，以了解其对绿色生活方式的态度：</p><p style=\"text-align: left;\">　　· 87%受访者目前没有使用充电电池，其中61%表示会考虑使用充电电池</p><p style=\"text-align: left;\">　　· 58%受访者过往曾使用过充电电池，却只有20%左右市民仍在使用</p><p style=\"text-align: left;\">　　· 60%左右受访者认为充电电池尚未被广泛使用，主要障碍来自于充电时间过长、缺乏相关教育</p><p style=\"text-align: left;\">　　· 90%以上受访者认为充电电池充满电需要1小时或更长的时间</p><p style=\"text-align: left;\">　　金山电池一直致力于为大众提供安全可靠的充电电池，并与消费者的需求和生活方式一起演变及进步。今天，金山电池宣布推出10分钟超快电池充电器*绿再十分充，只需10分钟*即可将4粒绿再十分充充电电池充好电，充电速度比其他品牌提升3倍**。充电器的LED灯可以显示每粒电池的充电状态和模式，并提示用户是否错误插入已损坏电池或一次性电池。尽管其体型小巧，却具备多项创新科技 ，如拥有独特的充电算法以优化充电电流，并能根据各个电池类型、状况和温度用最短的时间为充电电池充好电;绿再十分充内置横流扇，有效防止电池温度过热和提供低噪音的充电环境等。<br></p>', 11, 2, 1, 0, 1663322665, 1663322665, NULL);
COMMIT;

-- ----------------------------
-- Table structure for la_article_cate
-- ----------------------------
DROP TABLE IF EXISTS `la_article_cate`;
CREATE TABLE `la_article_cate`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章分类id',
  `name` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序',
  `is_show` tinyint(1) NULL DEFAULT 1 COMMENT '是否显示:1-是;0-否',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(10) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章分类表';

-- ----------------------------
-- Records of la_article_cate
-- ----------------------------
BEGIN;
INSERT INTO `la_article_cate` VALUES (1, '文章资讯', 0, 1, 1663317280, 1663317280, 1663317282), (2, '社会热点', 0, 1, 1663317280, 1663321464, 1663321494);
COMMIT;

-- ----------------------------
-- Table structure for la_article_collect
-- ----------------------------
DROP TABLE IF EXISTS `la_article_collect`;
CREATE TABLE `la_article_collect`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID',
  `article_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '文章ID',
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '收藏状态 0-未收藏 1-已收藏',
  `create_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新时间',
  `delete_time` int(10) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章收藏表';

-- ----------------------------
-- Table structure for la_config
-- ----------------------------
DROP TABLE IF EXISTS `la_config`;
CREATE TABLE `la_config`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '类型',
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '名称',
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '值',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '配置表';

-- ----------------------------
-- Table structure for la_decorate_page
-- ----------------------------
DROP TABLE IF EXISTS `la_decorate_page`;
CREATE TABLE `la_decorate_page`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` tinyint(2) UNSIGNED NOT NULL DEFAULT 10 COMMENT '页面类型',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '页面名称',
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '页面数据',
  `create_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(10) UNSIGNED NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '装修页面配置表';

-- ----------------------------
-- Records of la_decorate_page
-- ----------------------------
BEGIN;
INSERT INTO `la_decorate_page` VALUES (1, 1, '商城首页', '[{\"title\":\"搜索\",\"name\":\"search\",\"disabled\":1,\"content\":{},\"styles\":{}},{\"title\":\"首页轮播图\",\"name\":\"banner\",\"content\":{\"enabled\":1,\"data\":[{\"image\":\"/resource/image/adminapi/default/banner01.png\",\"name\":\"\",\"link\":{\"path\":\"/pages/index/index\",\"name\":\"商城首页\",\"type\":\"shop\"}},{\"image\":\"/resource/image/adminapi/default/banner02.png\",\"name\":\"\",\"link\":{}}]},\"styles\":{}},{\"title\":\"导航菜单\",\"name\":\"nav\",\"content\":{\"enabled\":1,\"data\":[{\"image\":\"/resource/image/adminapi/default/nav01.png\",\"name\":\"资讯中心\",\"link\":{\"path\":\"/pages/news/news\",\"name\":\"文章资讯\",\"type\":\"shop\"}},{\"image\":\"/resource/image/adminapi/default/nav02.png\",\"name\":\"我的收藏\",\"link\":{\"path\":\"/pages/collection/collection\",\"name\":\"我的收藏\",\"type\":\"shop\"}},{\"image\":\"/resource/image/adminapi/default/nav03.png\",\"name\":\"个人设置\",\"link\":{\"path\":\"/pages/user_set/user_set\",\"name\":\"个人设置\",\"type\":\"shop\"}},{\"image\":\"/resource/image/adminapi/default/nav04.png\",\"name\":\"联系客服\",\"link\":{\"path\":\"/pages/customer_service/customer_service\",\"name\":\"联系客服\",\"type\":\"shop\"}},{\"image\":\"/resource/image/adminapi/default/nav05.png\",\"name\":\"关于我们\",\"link\":{\"path\":\"/pages/as_us/as_us\",\"name\":\"关于我们\",\"type\":\"shop\"}}]},\"styles\":{}},{\"id\":\"l84almsk2uhyf\",\"title\":\"资讯\",\"name\":\"news\",\"disabled\":1,\"content\":{},\"styles\":{}}]', 1661757188, 1663321380), (2, 2, '个人中心', '[{\"title\":\"用户信息\",\"name\":\"user-info\",\"disabled\":1,\"content\":{},\"styles\":{}},{\"title\":\"我的服务\",\"name\":\"my-service\",\"content\":{\"style\":2,\"title\":\"服务中心\",\"data\":[{\"image\":\"/resource/image/adminapi/default/user_collect.png\",\"name\":\"我的收藏\",\"link\":{\"path\":\"/pages/collection/collection\",\"name\":\"我的收藏\",\"type\":\"shop\"}},{\"image\":\"/resource/image/adminapi/default/user_setting.png\",\"name\":\"个人设置\",\"link\":{\"path\":\"/pages/user_set/user_set\",\"name\":\"个人设置\",\"type\":\"shop\"}},{\"image\":\"/resource/image/adminapi/default/user_kefu.png\",\"name\":\"联系客服\",\"link\":{\"path\":\"/pages/customer_service/customer_service\",\"name\":\"联系客服\",\"type\":\"shop\"}}]},\"styles\":{}},{\"title\":\"个人中心广告图\",\"name\":\"user-banner\",\"content\":{\"enabled\":1,\"data\":[{\"image\":\"/resource/image/adminapi/default/ad01.jpg\",\"name\":\"\",\"link\":{}}]},\"styles\":{}}]', 1661757188, 1663320728), (3, 3, '客服设置', '[{\"title\":\"客服设置\",\"name\":\"customer-service\",\"content\":{\"title\":\"添加客服二维码\",\"time\":\"早上 9:00 - 22:00\",\"mobile\":\"13800138000\",\"qrcode\":\"\"},\"styles\":{}}]', 1661757188, 1662689155);
COMMIT;

-- ----------------------------
-- Table structure for la_decorate_tabbar
-- ----------------------------
DROP TABLE IF EXISTS `la_decorate_tabbar`;
CREATE TABLE `la_decorate_tabbar`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '导航名称',
  `selected` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '未选图标',
  `unselected` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '已选图标',
  `link` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '链接地址',
  `create_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '装修底部导航表';

-- ----------------------------
-- Records of la_decorate_tabbar
-- ----------------------------
BEGIN;
INSERT INTO `la_decorate_tabbar` VALUES (1, '首页', '/resource/image/adminapi/default/tabbar_home_sel.png', '/resource/image/adminapi/default/tabbar_home.png', '{\"path\":\"/pages/index/index\",\"name\":\"商城首页\",\"type\":\"shop\"}', 1662688157, 1662688157), (2, '资讯', '/resource/image/adminapi/default/tabbar_text_sel.png', '/resource/image/adminapi/default/tabbar_text.png', '{\"path\":\"/pages/news/news\",\"name\":\"文章资讯\",\"type\":\"shop\"}', 1662688157, 1662688157), (3, '我的', '/resource/image/adminapi/default/tabbar_me_sel.png', '/resource/image/adminapi/default/tabbar_me.png', '{\"path\":\"/pages/user/user\",\"name\":\"个人中心\",\"type\":\"shop\"}', 1662688157, 1662688157);
COMMIT;

-- ----------------------------
-- Table structure for la_dept
-- ----------------------------
DROP TABLE IF EXISTS `la_dept`;
CREATE TABLE `la_dept`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '部门名称',
  `pid` bigint(20) NOT NULL DEFAULT 0 COMMENT '上级部门id',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序',
  `leader` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '负责人',
  `mobile` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '部门状态（0停用 1正常）',
  `create_time` int(10) NOT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  `delete_time` int(10) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '部门表';

-- ----------------------------
-- Records of la_dept
-- ----------------------------
BEGIN;
INSERT INTO `la_dept` VALUES (1, '公司', 0, 0, 'boss', '12345698745', 1, 1650592684, 1653640368, NULL);
COMMIT;

-- ----------------------------
-- Table structure for la_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `la_dict_data`;
CREATE TABLE `la_dict_data`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '数据名称',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '数据值',
  `type_id` int(11) NOT NULL COMMENT '字典类型id',
  `type_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典类型',
  `sort` int(10) NULL DEFAULT 0 COMMENT '排序值',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '状态 0-停用 1-正常',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '备注',
  `create_time` int(10) NOT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  `delete_time` int(10) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典数据表';

-- ----------------------------
-- Records of la_dict_data
-- ----------------------------
BEGIN;
INSERT INTO `la_dict_data` VALUES (1, '隐藏', '0', 1, 'show_status', 0, 1, '', 1656381543, 1656381543, NULL), (2, '显示', '1', 1, 'show_status', 0, 1, '', 1656381550, 1656381550, NULL), (3, '进行中', '0', 2, 'business_status', 0, 1, '', 1656381410, 1656381410, NULL), (4, '成功', '1', 2, 'business_status', 0, 1, '', 1656381437, 1656381437, NULL), (5, '失败', '2', 2, 'business_status', 0, 1, '', 1656381449, 1656381449, NULL), (6, '待处理', '0', 3, 'event_status', 0, 1, '', 1656381212, 1656381212, NULL), (7, '已处理', '1', 3, 'event_status', 0, 1, '', 1656381315, 1656381315, NULL), (8, '拒绝处理', '2', 3, 'event_status', 0, 1, '', 1656381331, 1656381331, NULL), (9, '禁用', '1', 4, 'system_disable', 0, 1, '', 1656312030, 1656312030, NULL), (10, '正常', '0', 4, 'system_disable', 0, 1, '', 1656312040, 1656312040, NULL), (11, '未知', '0', 5, 'sex', 0, 1, '', 1656062988, 1656062988, NULL), (12, '男', '1', 5, 'sex', 0, 1, '', 1656062999, 1656062999, NULL), (13, '女', '2', 5, 'sex', 0, 1, '', 1656063009, 1656063009, NULL);
COMMIT;

-- ----------------------------
-- Table structure for la_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `la_dict_type`;
CREATE TABLE `la_dict_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '字典名称',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '字典类型名称',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '状态 0-停用 1-正常',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '备注',
  `create_time` int(10) NOT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  `delete_time` int(10) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典类型表';

-- ----------------------------
-- Records of la_dict_type
-- ----------------------------
BEGIN;
INSERT INTO `la_dict_type` VALUES (1, '显示状态', 'show_status', 1, '', 1656381520, 1656381520, NULL), (2, '业务状态', 'business_status', 1, '', 1656381393, 1656381393, NULL), (3, '事件状态', 'event_status', 1, '', 1656381075, 1656381075, NULL), (4, '禁用状态', 'system_disable', 1, '', 1656311838, 1656311838, NULL), (5, '用户性别', 'sex', 1, '', 1656062946, 1656380925, NULL);
COMMIT;

-- ----------------------------
-- Table structure for la_file
-- ----------------------------
DROP TABLE IF EXISTS `la_file`;
CREATE TABLE `la_file`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `cid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '类目ID',
  `source_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上传者id',
  `source` tinyint(1) NOT NULL DEFAULT 0 COMMENT '来源类型[0-后台,1-用户]',
  `type` tinyint(2) UNSIGNED NOT NULL DEFAULT 10 COMMENT '类型[10=图片, 20=视频]',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '文件名称',
  `uri` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文件路径',
  `create_time` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(10) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文件表';

-- ----------------------------
-- Table structure for la_file_cate
-- ----------------------------
DROP TABLE IF EXISTS `la_file_cate`;
CREATE TABLE `la_file_cate`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `pid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父级ID',
  `type` tinyint(2) UNSIGNED NOT NULL DEFAULT 10 COMMENT '类型[10=图片，20=视频，30=文件]',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '分类名称',
  `create_time` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文件分类表';

-- ----------------------------
-- Table structure for la_generate_column
-- ----------------------------
DROP TABLE IF EXISTS `la_generate_column`;
CREATE TABLE `la_generate_column`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `table_id` int(11) NOT NULL DEFAULT 0 COMMENT '表id',
  `column_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '字段名称',
  `column_comment` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '字段描述',
  `column_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '字段类型',
  `is_required` tinyint(1) NULL DEFAULT 0 COMMENT '是否必填 0-非必填 1-必填',
  `is_pk` tinyint(1) NULL DEFAULT 0 COMMENT '是否为主键 0-不是 1-是',
  `is_insert` tinyint(1) NULL DEFAULT 0 COMMENT '是否为插入字段 0-不是 1-是',
  `is_update` tinyint(1) NULL DEFAULT 0 COMMENT '是否为更新字段 0-不是 1-是',
  `is_lists` tinyint(1) NULL DEFAULT 0 COMMENT '是否为列表字段 0-不是 1-是',
  `is_query` tinyint(1) NULL DEFAULT 0 COMMENT '是否为查询字段 0-不是 1-是',
  `query_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '=' COMMENT '查询类型',
  `view_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'input' COMMENT '显示类型',
  `dict_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典类型',
  `create_time` int(10) NOT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '代码生成表字段信息表';

-- ----------------------------
-- Table structure for la_generate_table
-- ----------------------------
DROP TABLE IF EXISTS `la_generate_table`;
CREATE TABLE `la_generate_table`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `table_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '表名称',
  `table_comment` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '表描述',
  `template_type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '模板类型 0-单表(curd) 1-树表(curd)',
  `author` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '作者',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '备注',
  `generate_type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '生成方式  0-压缩包下载 1-生成到模块',
  `module_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '模块名',
  `class_dir` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '类目录名',
  `class_comment` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '类描述',
  `admin_id` int(11) NULL DEFAULT 0 COMMENT '管理员id',
  `menu` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '菜单配置',
  `create_time` int(10) NOT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '代码生成表信息表';

-- ----------------------------
-- Table structure for la_hot_search
-- ----------------------------
DROP TABLE IF EXISTS `la_hot_search`;
CREATE TABLE `la_hot_search`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '关键词',
  `sort` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序号',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '热门搜索表';

-- ----------------------------
-- Table structure for la_jobs
-- ----------------------------
DROP TABLE IF EXISTS `la_jobs`;
CREATE TABLE `la_jobs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '岗位名称',
  `code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '岗位编码',
  `sort` int(11) NULL DEFAULT 0 COMMENT '显示顺序',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '状态（0停用 1正常）',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` int(10) NOT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  `delete_time` int(10) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '岗位表';

-- ----------------------------
-- Table structure for la_notice_record
-- ----------------------------
DROP TABLE IF EXISTS `la_notice_record`;
CREATE TABLE `la_notice_record`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(10) UNSIGNED NOT NULL COMMENT '用户id',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '内容',
  `scene_id` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '场景',
  `read` tinyint(1) NULL DEFAULT 0 COMMENT '已读状态;0-未读,1-已读',
  `recipient` tinyint(1) NULL DEFAULT 0 COMMENT '通知接收对象类型;1-会员;2-商家;3-平台;4-游客(未注册用户)',
  `send_type` tinyint(1) NULL DEFAULT 0 COMMENT '通知发送类型 1-系统通知 2-短信通知 3-微信模板 4-微信小程序',
  `notice_type` tinyint(1) NULL DEFAULT NULL COMMENT '通知类型 1-业务通知 2-验证码',
  `extra` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '其他',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(10) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '通知记录表';

-- ----------------------------
-- Table structure for la_notice_setting
-- ----------------------------
DROP TABLE IF EXISTS `la_notice_setting`;
CREATE TABLE `la_notice_setting`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `scene_id` int(10) NOT NULL COMMENT '场景id',
  `scene_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '场景名称',
  `scene_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '场景描述',
  `recipient` tinyint(1) NOT NULL DEFAULT 1 COMMENT '接收者 1-用户 2-平台',
  `type` tinyint(1) NOT NULL DEFAULT 1 COMMENT '通知类型: 1-业务通知 2-验证码',
  `system_notice` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '系统通知设置',
  `sms_notice` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '短信通知设置',
  `oa_notice` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '公众号通知设置',
  `mnp_notice` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '小程序通知设置',
  `support` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '支持的发送类型 1-系统通知 2-短信通知 3-微信模板消息 4-小程序提醒',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '通知设置表';

-- ----------------------------
-- Table structure for la_official_account_reply
-- ----------------------------
DROP TABLE IF EXISTS `la_official_account_reply`;
CREATE TABLE `la_official_account_reply`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '规则名称',
  `keyword` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '关键词',
  `reply_type` tinyint(1) NOT NULL COMMENT '回复类型 1-关注回复 2-关键字回复 3-默认回复',
  `matching_type` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '匹配方式：1-全匹配；2-模糊匹配',
  `content_type` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '内容类型：1-文本',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '回复内容',
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '启动状态：1-启动；0-关闭',
  `sort` int(11) UNSIGNED NOT NULL DEFAULT 50 COMMENT '排序',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(10) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '公众号消息回调表';

-- ----------------------------
-- Table structure for la_operation_log
-- ----------------------------
DROP TABLE IF EXISTS `la_operation_log`;
CREATE TABLE `la_operation_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL COMMENT '管理员ID',
  `admin_name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '管理员名称',
  `account` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '管理员账号',
  `action` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '操作名称',
  `type` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求方式',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '访问链接',
  `params` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '请求数据',
  `result` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '请求结果',
  `ip` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'ip地址',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统日志表';

-- ----------------------------
-- Table structure for la_sms_log
-- ----------------------------
DROP TABLE IF EXISTS `la_sms_log`;
CREATE TABLE `la_sms_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `scene_id` int(11) NOT NULL COMMENT '场景id',
  `mobile` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '手机号码',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '发送内容',
  `code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '发送关键字（注册、找回密码）',
  `is_verify` tinyint(1) NULL DEFAULT 0 COMMENT '是否已验证；0-否；1-是',
  `check_num` int(5) NULL DEFAULT 0 COMMENT '验证次数',
  `send_status` tinyint(1) NOT NULL COMMENT '发送状态：0-发送中；1-发送成功；2-发送失败',
  `send_time` int(10) NOT NULL COMMENT '发送时间',
  `results` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '短信结果',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(10) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '短信记录表';

-- ----------------------------
-- Table structure for la_system_menu
-- ----------------------------
DROP TABLE IF EXISTS `la_system_menu`;
CREATE TABLE `la_system_menu`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级菜单',
  `type` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '权限类型: M=目录，C=菜单，A=按钮',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '菜单名称',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '菜单图标',
  `sort` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '菜单排序',
  `perms` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '权限标识',
  `paths` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '路由地址',
  `component` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '前端组件',
  `selected` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '选中路径',
  `params` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '路由参数',
  `is_cache` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否缓存: 0=否, 1=是',
  `is_show` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否显示: 0=否, 1=是',
  `is_disable` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否禁用: 0=否, 1=是',
  `create_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 121 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统菜单表';

-- ----------------------------
-- Records of la_system_menu
-- ----------------------------
BEGIN;
INSERT INTO `la_system_menu` VALUES (4, 0, 'M', '权限管理', 'el-icon-Lock', 400, '', 'permission', '', '', '', 0, 1, 0, 1656664556, 1664354975), (5, 0, 'C', '工作台', 'el-icon-Monitor', 1000, 'workbench/index', 'workbench', 'workbench/index', '', '', 0, 1, 0, 1656664793, 1664354981), (6, 4, 'C', '菜单', 'el-icon-Operation', 1, 'auth.menu/lists', 'menu', 'permission/menu/index', '', '', 1, 1, 0, 1656664960, 1658989504), (7, 4, 'C', '管理员', 'local-icon-shouyiren', 1, 'auth.admin/lists', 'admin', 'permission/admin/index', '', '', 0, 1, 0, 1656901567, 1664355515), (8, 4, 'C', '角色', 'el-icon-Female', 1, 'auth.role/lists', 'role', 'permission/role/index', '', '', 0, 1, 0, 1656901660, 1664355612), (12, 8, 'A', '新增', '', 1, 'auth.role/add', '', '', '', '', 0, 1, 0, 1657001790, 1663750625), (14, 8, 'A', '编辑', '', 1, 'auth.role/edit', '', '', '', '', 0, 1, 0, 1657001924, 1663750631), (15, 8, 'A', '删除', '', 1, 'auth.role/delete', '', '', '', '', 0, 1, 0, 1657001982, 1663750637), (16, 6, 'A', '新增', '', 1, 'auth.menu/add', '', '', '', '', 0, 1, 0, 1657072523, 1663750565), (17, 6, 'A', '编辑', '', 1, 'auth.menu/edit', '', '', '', '', 0, 1, 0, 1657073955, 1663750570), (18, 6, 'A', '删除', '', 1, 'auth.menu/delete', '', '', '', '', 0, 1, 0, 1657073987, 1663750578), (19, 7, 'A', '新增', '', 1, 'auth.admin/add', '', '', '', '', 0, 1, 0, 1657074035, 1663750596), (20, 7, 'A', '编辑', '', 1, 'auth.admin/edit', '', '', '', '', 0, 1, 0, 1657074071, 1663750603), (21, 7, 'A', '删除', '', 1, 'auth.admin/delete', '', '', '', '', 0, 1, 0, 1657074108, 1663750609), (23, 0, 'M', '开发工具', 'el-icon-EditPen', 100, '', 'dev_tools', '', '', '', 0, 1, 0, 1657097744, 1664355057), (24, 23, 'C', '代码生成器', 'el-icon-DocumentAdd', 1, 'tools.generator/generateTable', 'code', 'dev_tools/code/index', '', '', 0, 1, 0, 1657098110, 1658989423), (25, 0, 'M', '组织管理', 'el-icon-OfficeBuilding', 500, '', 'organization', '', '', '', 0, 1, 0, 1657099914, 1664354956), (26, 25, 'C', '部门管理', 'el-icon-Coordinate', 1, 'dept.dept/lists', 'department', 'organization/department/index', '', '', 1, 1, 0, 1657099989, 1664353662), (27, 25, 'C', '岗位管理', 'el-icon-PriceTag', 1, 'dept.jobs/lists', 'post', 'organization/post/index', '', '', 0, 1, 0, 1657100044, 1658989726), (28, 0, 'M', '系统设置', 'el-icon-Setting', 200, '', 'setting', '', '', '', 0, 1, 0, 1657100164, 1664355035), (29, 28, 'M', '网站设置', 'el-icon-Basketball', 1, '', 'website', '', '', '', 0, 1, 0, 1657100230, 1658989861), (30, 29, 'C', '网站信息', '', 1, 'setting.web.web_setting/getWebsite', 'information', 'setting/website/information', '', '', 0, 1, 0, 1657100306, 1657164412), (31, 29, 'C', '网站备案', '', 1, 'setting.web.web_setting/getCopyright', 'filing', 'setting/website/filing', '', '', 0, 1, 0, 1657100434, 1657164723), (32, 29, 'C', '政策协议', '', 1, 'setting.web.web_setting/getAgreement', 'protocol', 'setting/website/protocol', '', '', 0, 1, 0, 1657100571, 1657164770), (33, 28, 'C', '存储设置', 'el-icon-FolderOpened', 1, 'setting.storage/lists', 'storage', 'setting/storage/index', '', '', 0, 1, 0, 1657160959, 1658989894), (34, 23, 'C', '字典管理', 'el-icon-Box', 1, 'setting.dict.dict_type/lists', 'dict', 'setting/dict/type/index', '', '', 0, 1, 0, 1657161211, 1663225935), (35, 28, 'M', '系统维护', 'el-icon-SetUp', 1, '', 'system', '', '', '', 0, 1, 0, 1657161569, 1658989938), (36, 35, 'C', '系统日志', '', 1, 'setting.system.log/lists', 'journal', 'setting/system/journal', '', '', 0, 1, 0, 1657161696, 1657165722), (37, 35, 'C', '系统缓存', '', 1, '', 'cache', 'setting/system/cache', '', '', 0, 1, 0, 1657161896, 1657173767), (38, 35, 'C', '系统环境', '', 1, 'setting.system.system/info', 'environment', 'setting/system/environment', '', '', 0, 1, 0, 1657162000, 1657173794), (39, 24, 'A', '导入数据表', '', 1, 'tools.generator/selectTable', '', '', '', '', 0, 1, 0, 1657162736, 1657162736), (40, 24, 'A', '代码生成', '', 1, 'tools.generator/generate', '', '', '', '', 0, 1, 0, 1657162806, 1657162806), (41, 23, 'C', '编辑数据表', '', 1, 'tools.generator/edit', 'code/edit', 'dev_tools/code/edit', '/dev_tools/code', '', 1, 0, 0, 1657162866, 1663748668), (42, 24, 'A', '同步表结构', '', 1, 'tools.generator/syncColumn', '', '', '', '', 0, 1, 0, 1657162934, 1657162934), (43, 24, 'A', '删除数据表', '', 1, 'tools.generator/delete', '', '', '', '', 0, 1, 0, 1657163015, 1657163015), (44, 24, 'A', '预览代码', '', 1, 'tools.generator/preview', '', '', '', '', 0, 1, 0, 1657163263, 1657163263), (45, 26, 'A', '新增', '', 1, 'dept.dept/add', '', '', '', '', 0, 1, 0, 1657163548, 1663750492), (46, 26, 'A', '编辑', '', 1, 'dept.dept/edit', '', '', '', '', 0, 1, 0, 1657163599, 1663750498), (47, 26, 'A', '删除', '', 1, 'dept.dept/delete', '', '', '', '', 0, 1, 0, 1657163687, 1663750504), (48, 27, 'A', '新增', '', 1, 'dept.jobs/add', '', '', '', '', 0, 1, 0, 1657163778, 1663750524), (49, 27, 'A', '编辑', '', 1, 'dept.jobs/edit', '', '', '', '', 0, 1, 0, 1657163800, 1663750530), (50, 27, 'A', '删除', '', 1, 'dept.jobs/delete', '', '', '', '', 0, 1, 0, 1657163820, 1663750535), (51, 30, 'A', '保存', '', 1, 'setting.web.web_setting/setWebsite', '', '', '', '', 0, 1, 0, 1657164469, 1663750649), (52, 31, 'A', '保存', '', 1, 'setting.web.web_setting/setCopyright', '', '', '', '', 0, 1, 0, 1657164692, 1663750657), (53, 32, 'A', '保存', '', 1, 'setting.web.web_setting/setAgreement', '', '', '', '', 0, 1, 0, 1657164824, 1663750665), (54, 33, 'A', '设置', '', 1, 'setting.storage/setup', '', '', '', '', 0, 1, 0, 1657165303, 1663750673), (55, 34, 'A', '新增', '', 1, 'setting.dict.dict_type/add', '', '', '', '', 0, 1, 0, 1657166966, 1663750783), (56, 34, 'A', '编辑', '', 1, 'setting.dict.dict_type/edit', '', '', '', '', 0, 1, 0, 1657166997, 1663750789), (57, 34, 'A', '删除', '', 1, 'setting.dict.dict_type/delete', '', '', '', '', 0, 1, 0, 1657167038, 1663750796), (58, 62, 'A', '新增', '', 1, 'setting.dict.dict_data/add', '', '', '', '', 0, 1, 0, 1657167317, 1663750758), (59, 62, 'A', '编辑', '', 1, 'setting.dict.dict_data/edit', '', '', '', '', 0, 1, 0, 1657167371, 1663750751), (60, 62, 'A', '删除', '', 1, 'setting.dict.dict_data/delete', '', '', '', '', 0, 1, 0, 1657167397, 1663750768), (61, 37, 'A', '清除系统缓存', '', 1, 'setting.system.cache/clear', '', '', '', '', 0, 1, 0, 1657173837, 1657173939), (62, 23, 'C', '字典数据管理', '', 1, 'setting.dict.dict_data/lists', 'dict/data', 'setting/dict/data/index', '/dev_tools/dict', '', 1, 0, 0, 1657174351, 1663745617), (63, 0, 'M', '素材管理', 'el-icon-Picture', 300, '', 'material', '', '', '', 0, 1, 0, 1657507133, 1664355047), (64, 63, 'C', '素材中心', 'el-icon-PictureRounded', 0, '', 'index', 'material/index', '', '', 0, 1, 0, 1657507296, 1664355653), (66, 26, 'A', '详情', '', 0, 'dept.dept/detail', '', '', '', '', 0, 1, 0, 1663725459, 1663750516), (67, 27, 'A', '详情', '', 0, 'dept.jobs/detail', '', '', '', '', 0, 1, 0, 1663725514, 1663750559), (68, 6, 'A', '详情', '', 0, 'auth.menu/detail', '', '', '', '', 0, 1, 0, 1663725564, 1663750584), (69, 7, 'A', '详情', '', 0, 'auth.admin/detail', '', '', '', '', 0, 1, 0, 1663725623, 1663750615), (70, 0, 'M', '文章资讯', 'el-icon-ChatLineSquare', 900, '', 'article', '', '', '', 0, 1, 0, 1663749965, 1664354597), (71, 70, 'C', '文章管理', 'el-icon-ChatDotSquare', 0, 'article.article/lists', 'lists', 'article/lists/index', '', '', 0, 1, 0, 1663750101, 1664354615), (72, 70, 'C', '文章添加/编辑', '', 0, 'article.article/add:edit', 'lists/edit', 'article/lists/edit', '/article/lists', '', 0, 0, 0, 1663750153, 1664356275), (73, 70, 'C', '文章栏目', 'el-icon-CollectionTag', 0, 'article.articleCate/lists', 'column', 'article/column/index', '', '', 1, 1, 0, 1663750287, 1664354678), (74, 71, 'A', '新增', '', 0, 'article.article/add', '', '', '', '', 0, 1, 0, 1663750335, 1663750335), (75, 71, 'A', '详情', '', 0, 'article.article/detail', '', '', '', '', 0, 1, 0, 1663750354, 1663750383), (76, 71, 'A', '删除', '', 0, 'article.article/delete', '', '', '', '', 0, 1, 0, 1663750413, 1663750413), (77, 71, 'A', '修改状态', '', 0, 'article.article/updateStatus', '', '', '', '', 0, 1, 0, 1663750442, 1663750442), (78, 73, 'A', '添加', '', 0, 'article.articleCate/add', '', '', '', '', 0, 1, 0, 1663750483, 1663750483), (79, 73, 'A', '删除', '', 0, 'article.articleCate/delete', '', '', '', '', 0, 1, 0, 1663750895, 1663750895), (80, 73, 'A', '详情', '', 0, 'article.articleCate/detail', '', '', '', '', 0, 1, 0, 1663750913, 1663750913), (81, 73, 'A', '修改状态', '', 0, 'article.articleCate/updateStatus', '', '', '', '', 0, 1, 0, 1663750936, 1663750936), (82, 0, 'M', '渠道设置', 'el-icon-Message', 600, '', 'channel', '', '', '', 0, 1, 0, 1663754084, 1664354919), (83, 82, 'C', 'h5设置', 'el-icon-Cellphone', 0, 'channel.web_page_setting/getConfig', 'h5', 'channel/h5', '', '', 0, 1, 0, 1663754158, 1663754158), (84, 83, 'A', '保存', '', 0, 'channel.web_page_setting/setConfig', '', '', '', '', 0, 1, 0, 1663754259, 1663754259), (85, 82, 'M', '微信公众号', 'local-icon-dingdan', 0, '', 'wx_oa', '', '', '', 0, 1, 0, 1663755470, 1664355356), (86, 85, 'C', '公众号配置', '', 0, 'channel.official_account_setting/getConfig', 'config', 'channel/wx_oa/config', '', '', 0, 1, 0, 1663755663, 1664355450), (87, 85, 'C', '菜单管理', '', 0, 'channel.official_account_menu/detail', 'menu', 'channel/wx_oa/menu', '', '', 0, 1, 0, 1663755767, 1664355456), (88, 86, 'A', '保存', '', 0, 'channel.official_account_setting/setConfig', '', '', '', '', 0, 1, 0, 1663755799, 1663755799), (89, 86, 'A', '保存并发布', '', 0, 'channel.official_account_menu/save', '', '', '', '', 0, 1, 0, 1663756490, 1663756490), (90, 85, 'C', '关注回复', '', 0, 'channel.official_account_reply/lists', 'follow', 'channel/wx_oa/reply/follow_reply', '', '', 0, 1, 0, 1663818358, 1663818366), (91, 85, 'C', '关键字回复', '', 0, '', 'keyword', 'channel/wx_oa/reply/keyword_reply', '', '', 0, 1, 0, 1663818445, 1663818445), (93, 85, 'C', '默认回复', '', 0, '', 'default', 'channel/wx_oa/reply/default_reply', '', '', 0, 1, 0, 1663818580, 1663818580), (94, 82, 'C', '微信小程序', 'local-icon-weixin', 0, 'channel.mnp_settings/getConfig', 'weapp', 'channel/weapp', '', '', 0, 1, 0, 1663831396, 1664355388), (95, 94, 'A', '保存', '', 0, 'channel.mnp_settings/setConfig', '', '', '', '', 0, 1, 0, 1663831436, 1663831436), (96, 0, 'M', '装修管理', 'el-icon-Brush', 700, '', 'decoration', '', '', '', 0, 1, 0, 1663834825, 1664354863), (97, 96, 'C', '页面装修', 'el-icon-CopyDocument', 0, 'decorate.page/detail', 'pages', 'decoration/pages/index', '', '', 0, 1, 0, 1663834879, 1664355183), (98, 97, 'A', '保存', '', 0, 'decorate.page/save', '', '', '', '', 0, 1, 0, 1663834956, 1663834956), (99, 96, 'C', '底部导航', 'el-icon-Position', 0, 'decorate.tabbar/detail', 'tabbar', 'decoration/tabbar', '', '', 0, 1, 0, 1663835004, 1664355253), (100, 99, 'A', '保存', '', 0, 'decorate.tabbar/save', '', '', '', '', 0, 1, 0, 1663835018, 1663835018), (101, 28, 'M', '消息管理', 'el-icon-ChatDotRound', 0, '', 'message', '', '', '', 0, 1, 0, 1663838602, 1664355731), (102, 101, 'C', '通知设置', '', 0, 'notice.notice/settingLists', 'notice', 'message/notice/index', '', '', 0, 1, 0, 1663839195, 1663839195), (103, 102, 'A', '详情', '', 0, 'notice.notice/detail', '', '', '', '', 0, 1, 0, 1663839537, 1663839537), (104, 101, 'C', '通知设置编辑', '', 0, 'notice.notice/set', 'notice/edit', 'message/notice/edit', '/message/notice', '', 0, 0, 0, 1663839873, 1663898477), (105, 71, 'A', '编辑', '', 0, 'article.article/edit', '', '', '', '', 0, 1, 0, 1663840043, 1663840053), (106, 71, 'A', '详情', '', 0, 'article.article/detail', '', '', '', '', 0, 1, 0, 1663840284, 1663840494), (107, 101, 'C', '短信设置', '', 0, 'notice.sms_config/getConfig', 'short_letter', 'message/short_letter/index', '', '', 0, 1, 0, 1663898591, 1664355708), (108, 107, 'A', '设置', '', 0, 'notice.sms_config/setConfig', '', '', '', '', 0, 1, 0, 1663898644, 1663898644), (109, 107, 'A', '详情', '', 0, 'notice.sms_config/detail', '', '', '', '', 0, 1, 0, 1663898661, 1663898661), (110, 28, 'C', '热门搜索', 'el-icon-Search', 0, 'setting.hot_search/getConfig', 'search', 'setting/search/index', '', '', 0, 1, 0, 1663901821, 1664355779), (111, 110, 'A', '保存', '', 0, 'setting.hot_search/setConfig', '', '', '', '', 0, 1, 0, 1663901856, 1663901856), (112, 28, 'M', '用户设置', 'local-icon-keziyuyue', 0, '', 'user', '', '', '', 0, 1, 0, 1663903302, 1664355695), (113, 112, 'C', '用户设置', '', 0, 'setting.user.user/getConfig', 'setup', 'setting/user/setup', '', '', 0, 1, 0, 1663903506, 1663903506), (114, 113, 'A', '保存', '', 0, 'setting.user.user/setConfig', '', '', '', '', 0, 1, 0, 1663903522, 1663903522), (115, 112, 'C', '登录注册', '', 0, 'setting.user.user/getRegisterConfig', 'login_register', 'setting/user/login_register', '', '', 0, 1, 0, 1663903832, 1663903832), (116, 115, 'A', '保存', '', 0, 'setting.user.user/setRegisterConfig', '', '', '', '', 0, 1, 0, 1663903852, 1663903852), (117, 0, 'M', '用户管理', 'el-icon-User', 800, '', 'consumer', '', '', '', 0, 1, 0, 1663904351, 1664354732), (118, 117, 'C', '用户列表', 'local-icon-user_guanli', 0, 'user.user/lists', 'lists', 'consumer/lists/index', '', '', 0, 1, 0, 1663904392, 1664355092), (119, 117, 'C', '用户详情', '', 0, 'user.user/detail', 'lists/detail', 'consumer/lists/detail', '/consumer/lists', '', 0, 0, 0, 1663904470, 1663928109), (120, 119, 'A', '编辑', '', 0, 'user.user/edit', '', '', '', '', 0, 1, 0, 1663904499, 1663904499);
COMMIT;

-- ----------------------------
-- Table structure for la_system_role
-- ----------------------------
DROP TABLE IF EXISTS `la_system_role`;
CREATE TABLE `la_system_role`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '名称',
  `desc` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '描述',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(10) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色表';

-- ----------------------------
-- Table structure for la_system_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `la_system_role_menu`;
CREATE TABLE `la_system_role_menu`  (
  `role_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '角色ID',
  `menu_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '菜单ID',
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色菜单关系表';

-- ----------------------------
-- Table structure for la_user
-- ----------------------------
DROP TABLE IF EXISTS `la_user`;
CREATE TABLE `la_user`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `sn` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '编号',
  `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '头像',
  `real_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '真实姓名',
  `nickname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户昵称',
  `account` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户账号',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户密码',
  `mobile` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户电话',
  `sex` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户性别: [1=男, 2=女]',
  `channel` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '注册渠道: [1-微信小程序 2-微信公众号 3-手机H5 4-电脑PC 5-苹果APP 6-安卓APP]',
  `is_disable` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否禁用: [0=否, 1=是]',
  `login_ip` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '最后登录IP',
  `login_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '最后登录时间',
  `create_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新时间',
  `delete_time` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `sn`(`sn`) USING BTREE COMMENT '编号唯一',
  UNIQUE INDEX `account`(`account`) USING BTREE COMMENT '账号唯一'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表';

-- ----------------------------
-- Table structure for la_user_auth
-- ----------------------------
DROP TABLE IF EXISTS `la_user_auth`;
CREATE TABLE `la_user_auth`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '微信openid',
  `unionid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '微信unionid',
  `terminal` tinyint(1) NOT NULL DEFAULT 1 COMMENT '客户端类型：1-微信小程序；2-微信公众号；3-手机H5；4-电脑PC；5-苹果APP；6-安卓APP',
  `create_time` int(10) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `openid`(`openid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户授权表';

-- ----------------------------
-- Table structure for la_user_session
-- ----------------------------
DROP TABLE IF EXISTS `la_user_session`;
CREATE TABLE `la_user_session`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `terminal` tinyint(1) NOT NULL DEFAULT 1 COMMENT '客户端类型：1-微信小程序；2-微信公众号；3-手机H5；4-电脑PC；5-苹果APP；6-安卓APP',
  `token` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '令牌',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '更新时间',
  `expire_time` int(10) NOT NULL COMMENT '到期时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `admin_id_client`(`user_id`, `terminal`) USING BTREE COMMENT '一个用户在一个终端只有一个token',
  UNIQUE INDEX `token`(`token`) USING BTREE COMMENT 'token是唯一的'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户会话表';

SET FOREIGN_KEY_CHECKS = 1;
