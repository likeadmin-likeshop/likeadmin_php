SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE `la_user_auth` MODIFY COLUMN `openid` varchar(128) NOT NULL COMMENT '微信openid' AFTER `user_id`;

ALTER TABLE `la_user_auth` MODIFY COLUMN `unionid` varchar(128) NULL DEFAULT '' COMMENT '微信unionid' AFTER `openid`;

SET FOREIGN_KEY_CHECKS=1;