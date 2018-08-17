
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(32) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT NULL COMMENT '性别',
  `telephone` varchar(20) DEFAULT NULL COMMENT '手机号码',
  `password` varchar(64) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0' COMMENT '人员状态(0:使用1:停用)',
  `create_id` int(11) DEFAULT NULL COMMENT '创建人ID',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `last_login_time` timestamp NULL DEFAULT NULL COMMENT '最后一次登录时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='券一筐管理人员列表'

insert into t_user(`name`,`password`) value('admin','21232f297a57a5a743894a0e4a801fc3');