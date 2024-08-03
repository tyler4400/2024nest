query: SELECT VERSION() AS `version` 查询当前数据库版本
query: START TRANSACTION 开始事务
query: SELECT DATABASE() AS `db_name` 查询当前的数据名称
query: SELECT `TABLE_SCHEMA`, `TABLE_NAME`, `TABLE_COMMENT` FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA` = 'orm' AND `TABLE_NAME` = 'user'
query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'orm' AND `TABLE_NAME` = 'typeorm_metadata'
query: CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(50) NOT NULL, `lastName` varchar(50) NOT NULL, `age` int NOT NULL, `email` varchar(255) NULL, `isActive` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB
query: COMMIT



query: INSERT INTO `user`(`id`, `firstName`, `lastName`, `age`, `email`, `isActive`, `createdAt`, `updatedAt`) VALUES (DEFAULT, ?, ?, ?, ?, ?, DEFAULT, DEFAULT) -- PARAMETERS: ["zhang","san",18,"zhangsan@qq.com",true]
query: SELECT `User`.`id` AS `User_id`, `User`.`isActive` AS `User_isActive`, `User`.`createdAt` AS `User_createdAt`, `User`.`updatedAt` AS `User_updatedAt` FROM `user` `User` WHERE `User`.`id` = ? -- PARAMETERS: [1]
query: COMMIT
用户已经保存 User {
  firstName: 'zhang',
  lastName: 'san',
  age: 18,
  email: 'zhangsan@qq.com',
  isActive: true,
  id: 1,
  createdAt: 2024-08-03T12:51:46.104Z,
  updatedAt: 2024-08-03T12:51:46.104Z
}
query: SELECT `User`.`id` AS `User_id`, `User`.`firstName` AS `User_firstName`, `User`.`lastName` AS `User_lastName`, `User`.`age` AS `User_age`, `User`.`email` AS `User_email`, `User`.`isActive` AS `User_isActive`, `User`.`createdAt` AS `User_createdAt`, `User`.`updatedAt` AS `User_updatedAt` FROM `user` `User` WHERE ((`User`.`id` = ?)) LIMIT 1 -- PARAMETERS: [1]
找到用户 User {
  id: 1,
  firstName: 'zhang',
  lastName: 'san',
  age: 18,
  email: 'zhangsan@qq.com',
  isActive: true,
  createdAt: 2024-08-03T12:51:46.104Z,
  updatedAt: 2024-08-03T12:51:46.104Z
}
query: SELECT `User`.`id` AS `User_id`, `User`.`firstName` AS `User_firstName`, `User`.`lastName` AS `User_lastName`, `User`.`age` AS `User_age`, `User`.`email` AS `User_email`, `User`.`isActive` AS `User_isActive`, `User`.`createdAt` AS `User_createdAt`, `User`.`updatedAt` AS `User_updatedAt` FROM `user` `User` WHERE `User`.`id` IN (?) -- PARAMETERS: [1]
query: START TRANSACTION
query: UPDATE `user` SET `age` = ?, `updatedAt` = CURRENT_TIMESTAMP WHERE `id` IN (?) -- PARAMETERS: [28,1]
query: SELECT `User`.`id` AS `User_id`, `User`.`updatedAt` AS `User_updatedAt` FROM `user` `User` WHERE `User`.`id` = ? -- PARAMETERS: [1]
query: COMMIT
用户已经更新 User {
  id: 1,
  firstName: 'zhang',
  lastName: 'san',
  age: 28,
  email: 'zhangsan@qq.com',
  isActive: true,
  createdAt: 2024-08-03T12:51:46.104Z,
  updatedAt: 2024-08-03T12:51:46.000Z
}
query: SELECT `User`.`id` AS `User_id`, `User`.`firstName` AS `User_firstName`, `User`.`lastName` AS `User_lastName`, `User`.`age` AS `User_age`, `User`.`email` AS `User_email`, `User`.`isActive` AS `User_isActive`, `User`.`createdAt` AS `User_createdAt`, `User`.`updatedAt` AS `User_updatedAt` FROM `user` `User` WHERE `User`.`id` IN (?) -- PARAMETERS: [1]
query: START TRANSACTION
query: DELETE FROM `user` WHERE `id` = ? -- PARAMETERS: [1]
query: COMMIT
用户已经被删除 User {
  id: undefined,
  firstName: 'zhang',
  lastName: 'san',
  age: 28,
  email: 'zhangsan@qq.com',
  isActive: true,
  createdAt: 2024-08-03T12:51:46.104Z,
  updatedAt: 2024-08-03T12:51:46.000Z
}


query: SELECT `user`.`firstName` AS `user_firstName`, `user`.`lastName` AS `user_lastName`, `user`.`age` AS `user_age`, `user`.`id` AS `user_id` FROM `user` `user` WHERE `user`.`id` = ? AND `user`.`isActive`=? -- PARAMETERS: [2,true]
query: SELECT `user`.`firstName` AS `user_firstName`, `user`.`lastName` AS `user_lastName`, `user`.`age` AS `user_age`, `user`.`id` AS `user_id` FROM `user` `user` WHERE `user`.`id` = ? AND `user`.`isActive`=? -- PARAMETERS: [2,true]
user User { firstName: '1', lastName: '1', age: 1 }
users [ User { firstName: '1', lastName: '1', age: 1 } ]


query: DELETE FROM `user` WHERE `id`=? -- PARAMETERS: [2]
