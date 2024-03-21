SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `la_decorate_page` MODIFY COLUMN `type` tinyint(2) UNSIGNED NOT NULL DEFAULT 10 COMMENT '页面类型 1=商城首页, 2=个人中心, 3=客服设置 4-PC首页' AFTER `id`;

INSERT INTO `la_system_menu`(`pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (96, 'C', 'PC端', 'el-icon-Monitor', 0, '', 'pc', 'decoration/pc', '', '', 0, 1, 0, 1668423284, 1668423284);

INSERT INTO `la_decorate_page`(`id`, `type`, `name`, `data`, `create_time`, `update_time`) VALUES (4, 4, 'PC设置', '[{\"id\":\"lajcn8d0hzhed\",\"title\":\"首页轮播图\",\"name\":\"banner\",\"content\":{\"enabled\":1,\"data\":[{\"image\":\"/resource/image/adminapi/default/banner01.png\",\"name\":\"\",\"link\":{}}]},\"styles\":{\"position\":\"absolute\",\"left\":\"42px\",\"top\":\"27px\",\"width\":\"234px\",\"height\":\"114px\"}}]', 1661757188, 1668585410);

SET FOREIGN_KEY_CHECKS=1;