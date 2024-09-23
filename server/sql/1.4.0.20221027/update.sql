SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO `la_system_menu`(`pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (82, 'C', '微信开放平台', 'local-icon-notice_buyer', 0, 'channel.open_setting/getConfig', 'open_setting', 'channel/open_setting', '', '', 0, 1, 0, 1666085713, 1666085713);

SELECT @pid := LAST_INSERT_ID();

INSERT INTO `la_system_menu`(`pid`, `type`, `name`, `icon`, `sort`, `perms`, `paths`, `component`, `selected`, `params`, `is_cache`, `is_show`, `is_disable`, `create_time`, `update_time`) VALUES (@pid, 'A', '保存', '', 0, 'channel.open_setting/setConfig', '', '', '', '', 0, 1, 0, 1666085751, 1666085776);

SET FOREIGN_KEY_CHECKS = 1;