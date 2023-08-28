SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `la_file` MODIFY COLUMN `name` varchar(255) NOT NULL DEFAULT '' COMMENT '文件名称' AFTER `type`;

ALTER TABLE `la_operation_log` MODIFY COLUMN `url` text NOT NULL COMMENT '访问链接' AFTER `type`;

ALTER TABLE `la_user` MODIFY COLUMN `login_ip` varchar(200) NOT NULL DEFAULT '' COMMENT '最后登录IP' AFTER `is_disable`;

SET FOREIGN_KEY_CHECKS=1;