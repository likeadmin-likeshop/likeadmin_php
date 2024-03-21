SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `la_generate_table` ADD COLUMN `delete` text NULL COMMENT '删除配置' AFTER `menu`;

ALTER TABLE `la_generate_table` ADD COLUMN `tree` text NULL COMMENT '树表配置' AFTER `delete`;

ALTER TABLE `la_generate_table` ADD COLUMN `relations` text NULL COMMENT '关联配置' AFTER `tree`;


INSERT INTO `la_system_menu`(`pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (0, 'M', '模板', 'el-icon-SetUp', 0, '', 'template', '', '', '', 0, 1, 0, 1670206819, 1670206819);

SELECT @pid := LAST_INSERT_ID();

INSERT INTO `la_system_menu`(`pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (@pid, 'M', '组件示例', 'el-icon-Coin', 0, '', 'component', '', '', '', 0, 1, 0, 1670207182, 1670207244);

SELECT @pid := LAST_INSERT_ID();

INSERT INTO `la_system_menu`(`pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (@pid, 'C', '富文本', '', 0, '', 'rich_text', 'template/component/rich_text', '', '', 0, 1, 0, 1670207751, 1670207751);

INSERT INTO `la_system_menu`(`pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (@pid, 'C', '上传文件', '', 0, '', 'upload', 'template/component/upload', '', '', 0, 1, 0, 1670208925, 1670208925);

INSERT INTO `la_system_menu`(`pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (@pid, 'C', '图标', '', 0, '', 'icon', 'template/component/icon', '', '', 0, 1, 0, 1670230069, 1670230069);

INSERT INTO `la_system_menu`(`pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (@pid, 'C', '文件选择器', '', 0, '', 'file', 'template/component/file', '', '', 0, 1, 0, 1670232129, 1670232129);

INSERT INTO `la_system_menu`(`pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (@pid, 'C', '链接选择器', '', 0, '', 'link', 'template/component/link', '', '', 0, 1, 0, 1670292636, 1670292636);

INSERT INTO `la_system_menu`(`pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (@pid, 'C', '超出自动打点', '', 0, '', 'overflow', 'template/component/overflow', '', '', 0, 1, 0, 1670292883, 1670292883);

INSERT INTO `la_system_menu`(`pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (@pid, 'C', '悬浮input', '', 0, '', 'popover_input', 'template/component/popover_input', '', '', 0, 1, 0, 1670293336, 1670293336);


SET FOREIGN_KEY_CHECKS=1;