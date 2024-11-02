SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `la_admin` MODIFY COLUMN `login_ip` varchar(39) NULL DEFAULT '' COMMENT '最后登录ip' AFTER `login_time`;

ALTER TABLE `la_operation_log` MODIFY COLUMN `ip` varchar(39) NOT NULL DEFAULT '' COMMENT 'ip地址' AFTER `result`;

SET FOREIGN_KEY_CHECKS=1;