/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 90001 (9.0.1)
 Source Host           : localhost:3306
 Source Schema         : cms-20240831

 Target Server Type    : MySQL
 Target Server Version : 90001 (9.0.1)
 File Encoding         : 65001

 Date: 14/09/2024 22:36:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for access
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` enum('module','menu','page','button') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` int NOT NULL DEFAULT 1,
  `sort` int NOT NULL DEFAULT 100,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `mpath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `parentId` int NULL DEFAULT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_17855d322d85f041aaddddc7f67`(`parentId` ASC) USING BTREE,
  CONSTRAINT `FK_17855d322d85f041aaddddc7f67` FOREIGN KEY (`parentId`) REFERENCES `access` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of access
-- ----------------------------
INSERT INTO `access` VALUES (1, '权限管理', 'module', '', '', 1, 100, '2024-08-22 11:27:08.866599', '2024-08-22 11:27:08.000000', '1.', NULL, '');
INSERT INTO `access` VALUES (2, '内容管理', 'module', '', '', 1, 100, '2024-08-22 11:27:24.436833', '2024-08-22 11:27:24.000000', '2.', NULL, '');
INSERT INTO `access` VALUES (3, '用户管理', 'menu', '/admin/users', '', 1, 100, '2024-08-22 11:27:44.011531', '2024-08-22 11:27:44.000000', '1.3.', 1, '');
INSERT INTO `access` VALUES (4, '角色管理', 'menu', '/admin/roles', '', 1, 100, '2024-08-22 11:28:11.182679', '2024-08-22 11:28:11.000000', '1.4.', 1, '');
INSERT INTO `access` VALUES (5, '资源管理', 'menu', '/admin/accesses', '', 1, 100, '2024-08-22 11:28:35.341773', '2024-08-22 11:41:52.992316', '1.5.', 1, '');
INSERT INTO `access` VALUES (6, '分类管理', 'menu', '/admin/categories', '', 1, 100, '2024-08-22 11:28:54.262331', '2024-08-22 11:30:00.000000', '2.6.', 2, '');
INSERT INTO `access` VALUES (7, '标签管理', 'menu', '/admin/tags', '', 1, 100, '2024-08-22 11:29:10.689131', '2024-08-22 11:29:53.000000', '2.7.', 2, '');
INSERT INTO `access` VALUES (8, '文章管理', 'menu', '/admin/articles', '', 1, 100, '2024-08-22 11:29:42.656081', '2024-08-22 11:29:42.000000', '2.8.', 2, '');
INSERT INTO `access` VALUES (9, '用户列表查看', 'page', '/admin/users', NULL, 1, 100, '2024-08-22 12:18:05.028090', '2024-09-08 17:50:52.140361', '1.3.', 3, '');
INSERT INTO `access` VALUES (10, '创建用户表单', 'page', '/admin/users/create', NULL, 1, 100, '2024-08-22 12:18:05.030541', '2024-09-08 17:50:52.140361', '1.3.', 3, '');
INSERT INTO `access` VALUES (11, '创建用户', 'page', '/admin/users', NULL, 1, 100, '2024-08-22 12:18:05.031648', '2024-09-08 17:50:52.140361', '1.3.', 3, '');
INSERT INTO `access` VALUES (12, '编辑用户表单', 'page', '/admin/users/:id/edit', NULL, 1, 100, '2024-08-22 12:18:05.032696', '2024-09-08 17:50:52.140361', '1.3.', 3, '');
INSERT INTO `access` VALUES (13, '更新用户', 'page', '/admin/users/:id', NULL, 1, 100, '2024-08-22 12:18:05.033862', '2024-09-08 17:50:52.140361', '1.3.', 3, '');
INSERT INTO `access` VALUES (14, '查看用户详情', 'page', '/admin/users/:id', NULL, 1, 100, '2024-08-22 12:18:05.034817', '2024-09-08 17:50:52.140361', '1.3.', 3, '');
INSERT INTO `access` VALUES (15, '删除用户', 'page', '/admin/users/:id', NULL, 1, 100, '2024-08-22 12:18:05.035544', '2024-09-08 17:50:52.140361', '1.3.', 3, '');
INSERT INTO `access` VALUES (16, '更新用户角色', 'page', '/admin/users/:id/roles', NULL, 1, 100, '2024-08-22 12:18:05.036425', '2024-09-08 17:50:52.140361', '1.3.', 3, '');
INSERT INTO `access` VALUES (17, '角色列表查看', 'page', '/admin/roles', NULL, 1, 100, '2024-08-22 12:18:05.037030', '2024-09-08 17:50:52.140361', '1.4.', 4, '');
INSERT INTO `access` VALUES (18, '创建角色表单', 'page', '/admin/roles/create', NULL, 1, 100, '2024-08-22 12:18:05.037931', '2024-09-08 17:50:52.140361', '1.4.', 4, '');
INSERT INTO `access` VALUES (19, '创建角色', 'page', '/admin/roles', NULL, 1, 100, '2024-08-22 12:18:05.038594', '2024-09-08 17:50:52.140361', '1.4.', 4, '');
INSERT INTO `access` VALUES (20, '编辑角色表单', 'page', '/admin/roles/:id/edit', NULL, 1, 100, '2024-08-22 12:18:05.039546', '2024-09-08 17:50:52.140361', '1.4.', 4, '');
INSERT INTO `access` VALUES (21, '更新角色', 'page', '/admin/roles/:id', NULL, 1, 100, '2024-08-22 12:18:05.040300', '2024-09-08 17:50:52.140361', '1.4.', 4, '');
INSERT INTO `access` VALUES (22, '查看角色详情', 'page', '/admin/roles/:id', NULL, 1, 100, '2024-08-22 12:18:05.041642', '2024-09-08 17:50:52.140361', '1.4.', 4, '');
INSERT INTO `access` VALUES (23, '删除角色', 'page', '/admin/roles/:id', NULL, 1, 100, '2024-08-22 12:18:05.042958', '2024-09-08 17:50:52.140361', '1.4.', 4, '');
INSERT INTO `access` VALUES (24, '更新角色权限', 'page', '/admin/roles/:id/accesses', NULL, 1, 100, '2024-08-22 12:18:05.044397', '2024-09-08 17:50:52.140361', '1.4.', 4, '');
INSERT INTO `access` VALUES (25, '资源列表查看', 'page', '/admin/accesses', NULL, 1, 100, '2024-08-22 12:18:05.045175', '2024-09-08 17:50:52.140361', '1.5.', 5, '');
INSERT INTO `access` VALUES (26, '创建资源表单', 'page', '/admin/accesses/create', NULL, 1, 100, '2024-08-22 12:18:05.045938', '2024-09-08 17:50:52.140361', '1.5.', 5, '');
INSERT INTO `access` VALUES (27, '创建资源', 'page', '/admin/accesses', NULL, 1, 100, '2024-08-22 12:18:05.046645', '2024-09-08 17:50:52.140361', '1.5.', 5, '');
INSERT INTO `access` VALUES (28, '编辑资源表单', 'page', '/admin/accesses/:id/edit', NULL, 1, 100, '2024-08-22 12:18:05.047339', '2024-09-08 17:50:52.140361', '1.5.', 5, '');
INSERT INTO `access` VALUES (29, '更新资源', 'page', '/admin/accesses/:id', NULL, 1, 100, '2024-08-22 12:18:05.048063', '2024-09-08 17:50:52.140361', '1.5.', 5, '');
INSERT INTO `access` VALUES (30, '查看资源详情', 'page', '/admin/accesses/:id', NULL, 1, 100, '2024-08-22 12:18:05.048737', '2024-09-08 17:50:52.140361', '1.5.', 5, '');
INSERT INTO `access` VALUES (31, '删除资源', 'page', '/admin/accesses/:id', NULL, 1, 100, '2024-08-22 12:18:05.049394', '2024-09-08 17:50:52.140361', '1.5.', 5, '');
INSERT INTO `access` VALUES (32, '分类列表查看', 'page', '/admin/categories', NULL, 1, 100, '2024-08-22 12:18:05.050096', '2024-09-08 17:50:52.140361', '2.6.', 6, '');
INSERT INTO `access` VALUES (33, '创建分类表单', 'page', '/admin/categories/create', NULL, 1, 100, '2024-08-22 12:18:05.050826', '2024-09-08 17:50:52.140361', '2.6.', 6, '');
INSERT INTO `access` VALUES (34, '创建分类', 'page', '/admin/categories', NULL, 1, 100, '2024-08-22 12:18:05.052052', '2024-09-08 17:50:52.140361', '2.6.', 6, '');
INSERT INTO `access` VALUES (35, '编辑分类表单', 'page', '/admin/categories/:id/edit', NULL, 1, 100, '2024-08-22 12:18:05.053379', '2024-09-08 17:50:52.140361', '2.6.', 6, '');
INSERT INTO `access` VALUES (36, '更新分类', 'page', '/admin/categories/:id', NULL, 1, 100, '2024-08-22 12:18:05.054928', '2024-09-08 17:50:52.140361', '2.6.', 6, '');
INSERT INTO `access` VALUES (37, '查看分类详情', 'page', '/admin/categories/:id', NULL, 1, 100, '2024-08-22 12:18:05.055620', '2024-09-08 17:50:52.140361', '2.6.', 6, '');
INSERT INTO `access` VALUES (38, '删除分类', 'page', '/admin/categories/:id', NULL, 1, 100, '2024-08-22 12:18:05.056229', '2024-09-08 17:50:52.140361', '2.6.', 6, '');
INSERT INTO `access` VALUES (39, '标签列表查看', 'page', '/admin/tags', NULL, 1, 100, '2024-08-22 12:18:05.056809', '2024-09-08 17:50:52.140361', '2.7.', 7, '');
INSERT INTO `access` VALUES (40, '创建标签表单', 'page', '/admin/tags/create', NULL, 1, 100, '2024-08-22 12:18:05.057437', '2024-09-08 17:50:52.140361', '2.7.', 7, '');
INSERT INTO `access` VALUES (41, '创建标签', 'page', '/admin/tags', NULL, 1, 100, '2024-08-22 12:18:05.058051', '2024-09-08 17:50:52.140361', '2.7.', 7, '');
INSERT INTO `access` VALUES (42, '编辑标签表单', 'page', '/admin/tags/:id/edit', NULL, 1, 100, '2024-08-22 12:18:05.058622', '2024-09-08 17:50:52.140361', '2.7.', 7, '');
INSERT INTO `access` VALUES (43, '更新标签', 'page', '/admin/tags/:id', NULL, 1, 100, '2024-08-22 12:18:05.059288', '2024-09-08 17:50:52.140361', '2.7.', 7, '');
INSERT INTO `access` VALUES (44, '查看标签详情', 'page', '/admin/tags/:id', NULL, 1, 100, '2024-08-22 12:18:05.059917', '2024-09-08 17:50:52.140361', '2.7.', 7, '');
INSERT INTO `access` VALUES (45, '删除标签', 'page', '/admin/tags/:id', NULL, 1, 100, '2024-08-22 12:18:05.060507', '2024-09-08 17:50:52.140361', '2.7.', 7, '');
INSERT INTO `access` VALUES (46, '文章列表查看', 'page', '/admin/articles', NULL, 1, 100, '2024-08-22 12:18:05.061128', '2024-09-08 17:50:52.140361', '2.8.', 8, '');
INSERT INTO `access` VALUES (47, '创建文章表单', 'page', '/admin/articles/create', NULL, 1, 100, '2024-08-22 12:18:05.061719', '2024-09-08 17:50:52.140361', '2.8.', 8, '');
INSERT INTO `access` VALUES (48, '创建文章', 'page', '/admin/articles', NULL, 1, 100, '2024-08-22 12:18:05.065524', '2024-09-08 17:50:52.140361', '2.8.', 8, '');
INSERT INTO `access` VALUES (49, '编辑文章表单', 'page', '/admin/articles/:id/edit', NULL, 1, 100, '2024-08-22 12:18:05.067233', '2024-09-08 17:50:52.140361', '2.8.', 8, '');
INSERT INTO `access` VALUES (50, '更新文章', 'page', '/admin/articles/:id', NULL, 1, 100, '2024-08-22 12:18:05.072348', '2024-09-08 17:50:52.140361', '2.8.', 8, '');
INSERT INTO `access` VALUES (51, '查看文章详情', 'page', '/admin/articles/:id', NULL, 1, 100, '2024-08-22 12:18:05.073100', '2024-09-08 17:50:52.140361', '2.8.', 8, '');
INSERT INTO `access` VALUES (52, '删除文章', 'page', '/admin/articles/:id', NULL, 1, 100, '2024-08-22 12:18:05.074252', '2024-09-08 17:50:52.140361', '2.8.', 8, '');
INSERT INTO `access` VALUES (53, '设置', 'module', '', '', 1, 100, '2024-08-24 12:38:13.413655', '2024-08-24 12:39:01.025710', '53.', NULL, '');
INSERT INTO `access` VALUES (55, '网站设置', 'module', '/admin/settings', '', 1, 100, '2024-08-24 12:39:02.661228', '2024-08-24 12:39:25.409884', '53.55.', 53, '');
INSERT INTO `access` VALUES (56, '页面上删除标签的按钮权限', 'button', '', '', 1, 100, '2024-09-08 17:34:01.373319', '2024-09-08 17:51:08.096773', '2.7.56.', 7, 'deleteTagButton');

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int NOT NULL DEFAULT 1,
  `sort` int NOT NULL DEFAULT 100,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `rejectionReason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `state` enum('draft','pending','published','rejected','withdrawn') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'draft',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, '如何学习JavaScript', '<p>JavaScript是前端开发中非常重要的语言。本文将介绍如何有效学习JavaScript。</p>', 1, 100, '2024-08-15 16:47:50.000000', '2024-08-22 18:57:57.000000', NULL, 'pending');
INSERT INTO `article` VALUES (2, '最佳旅行目的地', '<p>本文推荐了几个全球最佳旅行目的地，包括巴黎、纽约和东京。</p><p>&nbsp;</p>', 1, 100, '2024-08-15 16:44:25.000000', '2024-08-22 18:59:30.000000', NULL, 'pending');
INSERT INTO `article` VALUES (3, '生活中的小技巧', '本文分享了几个日常生活中的实用技巧，帮助你提升生活质量。', 1, 100, '2024-08-16 16:48:04.000000', '2024-08-22 19:09:24.000000', NULL, 'pending');
INSERT INTO `article` VALUES (4, '深入理解JavaScript的闭包', '本文将详细讲解JavaScript中的闭包原理以及如何使用闭包进行编程。', 1, 100, '2024-08-16 18:08:08.000000', '2024-08-22 19:10:34.000000', NULL, 'pending');
INSERT INTO `article` VALUES (5, '前端性能优化指南', '在这篇文章中，我们将介绍如何优化前端性能，提升用户体验。', 1, 100, '2024-08-16 18:08:08.000000', '2024-08-22 19:15:02.000000', NULL, 'published');
INSERT INTO `article` VALUES (6, '2024年最佳编程语言', '本文将讨论2024年最受欢迎的编程语言，包括JavaScript、Python、Rust等。', 1, 100, '2024-08-17 18:08:08.000000', '2024-08-22 19:15:20.000000', '122', 'rejected');
INSERT INTO `article` VALUES (7, '如何通过旅行减压', '旅行是减轻压力的好方法，本文推荐了一些适合减压的旅行目的地。', 1, 100, '2024-08-17 18:08:08.000000', '2024-08-22 19:22:27.000000', NULL, 'withdrawn');
INSERT INTO `article` VALUES (8, '健康生活小贴士', '本文分享了几个健康生活的小贴士，帮助你保持身心健康。', 1, 100, '2024-08-17 18:08:08.000000', '2024-09-01 15:59:48.000000', NULL, 'published');
INSERT INTO `article` VALUES (9, 'JavaScript中的原型链2', '<p>这篇文章将详细解释JavaScript中的原型链以及它的工作原理。2</p>', 1, 100, '2024-08-17 18:08:08.000000', '2024-09-01 16:00:10.000000', NULL, 'published');
INSERT INTO `article` VALUES (10, '如何高效学习编程', '学习编程的过程中，效率是关键。本文分享了一些高效学习编程的方法。', 1, 100, '2024-08-18 18:08:08.000000', '2024-09-01 16:17:07.000000', 'sss', 'rejected');
INSERT INTO `article` VALUES (11, '探索东京的文化魅力', '东京是一个充满文化魅力的城市，本文将带你领略东京的风采。', 1, 100, '2024-08-18 18:08:08.000000', '2024-09-01 16:17:22.000000', NULL, 'published');
INSERT INTO `article` VALUES (12, '如何保持积极心态', '积极的心态是生活中成功的关键，本文将分享如何保持积极心态。', 1, 100, '2024-08-18 18:08:08.000000', '2024-09-01 16:41:32.000000', NULL, 'pending');
INSERT INTO `article` VALUES (13, '现代Web开发框架比较', '本文将比较现代Web开发中常用的几个框架，如React、Vue、Angular等。', 1, 100, '2024-08-18 18:08:08.000000', '2024-09-01 16:42:36.000000', NULL, 'pending');
INSERT INTO `article` VALUES (14, '环游世界的最佳时机', '本文将推荐适合环游世界的最佳时机，帮助你规划完美的旅行。', 1, 100, '2024-08-18 18:08:08.000000', '2024-09-01 16:44:33.000000', NULL, 'published');
INSERT INTO `article` VALUES (15, '应对焦虑的有效方法', '焦虑是现代社会中的常见问题，本文分享了几种应对焦虑的有效方法。', 1, 100, '2024-08-19 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (16, 'React中的Hooks详解', '本文将深入探讨React中的Hooks以及如何在项目中使用它们。', 1, 100, '2024-08-19 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (17, '日本美食之旅', '日本是美食爱好者的天堂，本文将介绍一些必须尝试的日本美食。', 1, 100, '2024-08-19 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (18, '职场中的时间管理技巧', '在职场中，时间管理是成功的关键，本文分享了一些实用的技巧。', 1, 100, '2024-08-19 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (19, 'Vue.js的高级用法', '本文将介绍Vue.js的一些高级用法，帮助你提升项目的开发效率。', 1, 100, '2024-08-19 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (20, '巴黎的浪漫之旅', '巴黎是一个充满浪漫气息的城市，本文将介绍巴黎的经典旅游路线。', 1, 100, '2024-08-19 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (21, '自我提升的5个建议', '自我提升是一个持续的过程，本文分享了5个简单实用的建议。', 1, 100, '2024-08-19 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (22, '理解JavaScript中的异步编程', '本文将深入探讨JavaScript中的异步编程，包括Promise、async/await等。', 1, 100, '2024-08-20 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (23, '探索纽约的多元文化', '纽约是一个充满多元文化的城市，本文将带你探索这座城市的文化魅力。', 1, 100, '2024-08-20 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (24, '应对职场压力的策略', '职场压力是不可避免的，本文将分享一些应对职场压力的有效策略。', 1, 100, '2024-08-20 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (25, 'JavaScript中的事件循环详解', '本文将详细讲解JavaScript中的事件循环机制及其对异步编程的影响。', 1, 100, '2024-08-21 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (26, '探索伦敦的历史遗迹', '伦敦是一个充满历史遗迹的城市，本文将介绍一些必须参观的景点。', 1, 100, '2024-08-21 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (27, '掌握时间管理的技巧', '时间管理是现代生活中的一项重要技能，本文分享了几个有效的时间管理技巧。', 1, 100, '2024-08-21 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (28, '如何在JavaScript中处理错误', '本文将介绍JavaScript中的错误处理机制以及如何编写健壮的代码。', 1, 100, '2024-08-22 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (29, '探索悉尼的自然风光', '悉尼是一个充满自然美景的城市，本文将带你领略悉尼的自然风光。', 1, 100, '2024-08-22 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');
INSERT INTO `article` VALUES (30, '保持良好生活习惯的方法', '生活习惯对健康有重要影响，本文将分享如何培养和保持良好的生活习惯。', 1, 100, '2024-08-22 18:08:08.000000', '2024-08-22 18:57:51.210612', NULL, 'draft');

-- ----------------------------
-- Table structure for article_categories_category
-- ----------------------------
DROP TABLE IF EXISTS `article_categories_category`;
CREATE TABLE `article_categories_category`  (
  `articleId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`articleId`, `categoryId`) USING BTREE,
  INDEX `IDX_4ba35bcb36b2715f61faa696c7`(`articleId` ASC) USING BTREE,
  INDEX `IDX_5d9199768aa2bd9f91d175dc6d`(`categoryId` ASC) USING BTREE,
  CONSTRAINT `FK_4ba35bcb36b2715f61faa696c7e` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_5d9199768aa2bd9f91d175dc6d1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of article_categories_category
-- ----------------------------
INSERT INTO `article_categories_category` VALUES (1, 3);
INSERT INTO `article_categories_category` VALUES (2, 4);
INSERT INTO `article_categories_category` VALUES (3, 2);
INSERT INTO `article_categories_category` VALUES (4, 3);
INSERT INTO `article_categories_category` VALUES (5, 3);
INSERT INTO `article_categories_category` VALUES (6, 1);
INSERT INTO `article_categories_category` VALUES (7, 4);
INSERT INTO `article_categories_category` VALUES (8, 2);
INSERT INTO `article_categories_category` VALUES (9, 3);
INSERT INTO `article_categories_category` VALUES (9, 4);
INSERT INTO `article_categories_category` VALUES (10, 1);
INSERT INTO `article_categories_category` VALUES (11, 4);
INSERT INTO `article_categories_category` VALUES (12, 2);
INSERT INTO `article_categories_category` VALUES (13, 1);
INSERT INTO `article_categories_category` VALUES (14, 4);
INSERT INTO `article_categories_category` VALUES (15, 2);
INSERT INTO `article_categories_category` VALUES (16, 3);
INSERT INTO `article_categories_category` VALUES (17, 4);
INSERT INTO `article_categories_category` VALUES (18, 2);
INSERT INTO `article_categories_category` VALUES (19, 3);
INSERT INTO `article_categories_category` VALUES (20, 4);
INSERT INTO `article_categories_category` VALUES (21, 2);
INSERT INTO `article_categories_category` VALUES (22, 3);
INSERT INTO `article_categories_category` VALUES (23, 4);
INSERT INTO `article_categories_category` VALUES (24, 2);
INSERT INTO `article_categories_category` VALUES (25, 3);
INSERT INTO `article_categories_category` VALUES (26, 4);
INSERT INTO `article_categories_category` VALUES (27, 2);
INSERT INTO `article_categories_category` VALUES (28, 3);
INSERT INTO `article_categories_category` VALUES (29, 4);
INSERT INTO `article_categories_category` VALUES (30, 2);

-- ----------------------------
-- Table structure for article_tags_tag
-- ----------------------------
DROP TABLE IF EXISTS `article_tags_tag`;
CREATE TABLE `article_tags_tag`  (
  `articleId` int NOT NULL,
  `tagId` int NOT NULL,
  PRIMARY KEY (`articleId`, `tagId`) USING BTREE,
  INDEX `IDX_9b7dd28292e2799512cd70bfd8`(`articleId` ASC) USING BTREE,
  INDEX `IDX_5fee2a10f8d6688bd2f2c50f15`(`tagId` ASC) USING BTREE,
  CONSTRAINT `FK_5fee2a10f8d6688bd2f2c50f15e` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_9b7dd28292e2799512cd70bfd81` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of article_tags_tag
-- ----------------------------
INSERT INTO `article_tags_tag` VALUES (1, 1);
INSERT INTO `article_tags_tag` VALUES (2, 3);
INSERT INTO `article_tags_tag` VALUES (3, 2);
INSERT INTO `article_tags_tag` VALUES (4, 1);
INSERT INTO `article_tags_tag` VALUES (5, 1);
INSERT INTO `article_tags_tag` VALUES (6, 1);
INSERT INTO `article_tags_tag` VALUES (7, 3);
INSERT INTO `article_tags_tag` VALUES (8, 4);
INSERT INTO `article_tags_tag` VALUES (9, 1);
INSERT INTO `article_tags_tag` VALUES (10, 1);
INSERT INTO `article_tags_tag` VALUES (11, 3);
INSERT INTO `article_tags_tag` VALUES (12, 2);
INSERT INTO `article_tags_tag` VALUES (13, 1);
INSERT INTO `article_tags_tag` VALUES (14, 3);
INSERT INTO `article_tags_tag` VALUES (15, 2);
INSERT INTO `article_tags_tag` VALUES (16, 1);
INSERT INTO `article_tags_tag` VALUES (17, 3);
INSERT INTO `article_tags_tag` VALUES (18, 2);
INSERT INTO `article_tags_tag` VALUES (19, 1);
INSERT INTO `article_tags_tag` VALUES (20, 3);
INSERT INTO `article_tags_tag` VALUES (21, 2);
INSERT INTO `article_tags_tag` VALUES (22, 1);
INSERT INTO `article_tags_tag` VALUES (23, 3);
INSERT INTO `article_tags_tag` VALUES (24, 2);
INSERT INTO `article_tags_tag` VALUES (25, 1);
INSERT INTO `article_tags_tag` VALUES (26, 3);
INSERT INTO `article_tags_tag` VALUES (27, 2);
INSERT INTO `article_tags_tag` VALUES (28, 1);
INSERT INTO `article_tags_tag` VALUES (29, 3);
INSERT INTO `article_tags_tag` VALUES (30, 2);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int NOT NULL DEFAULT 1,
  `sort` int NOT NULL DEFAULT 100,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `mpath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `parentId` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_23c05c292c439d77b0de816b50`(`name` ASC) USING BTREE,
  INDEX `FK_d5456fd7e4c4866fec8ada1fa10`(`parentId` ASC) USING BTREE,
  CONSTRAINT `FK_d5456fd7e4c4866fec8ada1fa10` FOREIGN KEY (`parentId`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '技术', 1, 100, '2024-08-19 12:34:27.291191', '2024-09-08 12:02:07.518333', '1.', NULL);
INSERT INTO `category` VALUES (2, '生活', 1, 100, '2024-08-20 12:34:27.318555', '2024-09-08 12:02:11.588987', '2.', NULL);
INSERT INTO `category` VALUES (3, '编程', 1, 100, '2024-08-21 12:34:27.319725', '2024-09-08 12:02:14.248927', '1.1.', 1);
INSERT INTO `category` VALUES (4, '旅游', 1, 100, '2024-08-22 12:34:27.320783', '2024-08-22 12:34:27.320783', '2.1.', 2);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int NOT NULL DEFAULT 1,
  `sort` int NOT NULL DEFAULT 100,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_ae4578dcaed5adff96595e6166`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '管理员', 1, 100, '2024-08-22 11:24:09.577335', '2024-08-22 11:24:09.577335');
INSERT INTO `role` VALUES (2, '编辑', 1, 100, '2024-08-22 11:24:15.490950', '2024-09-08 15:46:22.000000');

-- ----------------------------
-- Table structure for role_accesses_access
-- ----------------------------
DROP TABLE IF EXISTS `role_accesses_access`;
CREATE TABLE `role_accesses_access`  (
  `roleId` int NOT NULL,
  `accessId` int NOT NULL,
  PRIMARY KEY (`roleId`, `accessId`) USING BTREE,
  INDEX `IDX_9ff787dad07d47363576d5fb9b`(`roleId` ASC) USING BTREE,
  INDEX `IDX_d6e843cf738eed733886acb343`(`accessId` ASC) USING BTREE,
  CONSTRAINT `FK_9ff787dad07d47363576d5fb9b7` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d6e843cf738eed733886acb343c` FOREIGN KEY (`accessId`) REFERENCES `access` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role_accesses_access
-- ----------------------------
INSERT INTO `role_accesses_access` VALUES (1, 1);
INSERT INTO `role_accesses_access` VALUES (1, 2);
INSERT INTO `role_accesses_access` VALUES (1, 3);
INSERT INTO `role_accesses_access` VALUES (1, 4);
INSERT INTO `role_accesses_access` VALUES (1, 5);
INSERT INTO `role_accesses_access` VALUES (1, 6);
INSERT INTO `role_accesses_access` VALUES (1, 7);
INSERT INTO `role_accesses_access` VALUES (1, 8);
INSERT INTO `role_accesses_access` VALUES (1, 9);
INSERT INTO `role_accesses_access` VALUES (1, 10);
INSERT INTO `role_accesses_access` VALUES (1, 11);
INSERT INTO `role_accesses_access` VALUES (1, 12);
INSERT INTO `role_accesses_access` VALUES (1, 13);
INSERT INTO `role_accesses_access` VALUES (1, 14);
INSERT INTO `role_accesses_access` VALUES (1, 15);
INSERT INTO `role_accesses_access` VALUES (1, 16);
INSERT INTO `role_accesses_access` VALUES (1, 17);
INSERT INTO `role_accesses_access` VALUES (1, 18);
INSERT INTO `role_accesses_access` VALUES (1, 19);
INSERT INTO `role_accesses_access` VALUES (1, 20);
INSERT INTO `role_accesses_access` VALUES (1, 21);
INSERT INTO `role_accesses_access` VALUES (1, 22);
INSERT INTO `role_accesses_access` VALUES (1, 23);
INSERT INTO `role_accesses_access` VALUES (1, 24);
INSERT INTO `role_accesses_access` VALUES (1, 25);
INSERT INTO `role_accesses_access` VALUES (1, 26);
INSERT INTO `role_accesses_access` VALUES (1, 27);
INSERT INTO `role_accesses_access` VALUES (1, 28);
INSERT INTO `role_accesses_access` VALUES (1, 29);
INSERT INTO `role_accesses_access` VALUES (1, 30);
INSERT INTO `role_accesses_access` VALUES (1, 31);
INSERT INTO `role_accesses_access` VALUES (1, 32);
INSERT INTO `role_accesses_access` VALUES (1, 33);
INSERT INTO `role_accesses_access` VALUES (1, 34);
INSERT INTO `role_accesses_access` VALUES (1, 35);
INSERT INTO `role_accesses_access` VALUES (1, 36);
INSERT INTO `role_accesses_access` VALUES (1, 37);
INSERT INTO `role_accesses_access` VALUES (1, 38);
INSERT INTO `role_accesses_access` VALUES (1, 39);
INSERT INTO `role_accesses_access` VALUES (1, 40);
INSERT INTO `role_accesses_access` VALUES (1, 41);
INSERT INTO `role_accesses_access` VALUES (1, 42);
INSERT INTO `role_accesses_access` VALUES (1, 43);
INSERT INTO `role_accesses_access` VALUES (1, 44);
INSERT INTO `role_accesses_access` VALUES (1, 45);
INSERT INTO `role_accesses_access` VALUES (1, 46);
INSERT INTO `role_accesses_access` VALUES (1, 47);
INSERT INTO `role_accesses_access` VALUES (1, 48);
INSERT INTO `role_accesses_access` VALUES (1, 49);
INSERT INTO `role_accesses_access` VALUES (1, 50);
INSERT INTO `role_accesses_access` VALUES (1, 51);
INSERT INTO `role_accesses_access` VALUES (1, 52);
INSERT INTO `role_accesses_access` VALUES (1, 53);
INSERT INTO `role_accesses_access` VALUES (1, 55);
INSERT INTO `role_accesses_access` VALUES (2, 2);
INSERT INTO `role_accesses_access` VALUES (2, 6);
INSERT INTO `role_accesses_access` VALUES (2, 7);
INSERT INTO `role_accesses_access` VALUES (2, 8);
INSERT INTO `role_accesses_access` VALUES (2, 32);
INSERT INTO `role_accesses_access` VALUES (2, 37);
INSERT INTO `role_accesses_access` VALUES (2, 39);
INSERT INTO `role_accesses_access` VALUES (2, 40);
INSERT INTO `role_accesses_access` VALUES (2, 41);
INSERT INTO `role_accesses_access` VALUES (2, 42);
INSERT INTO `role_accesses_access` VALUES (2, 43);
INSERT INTO `role_accesses_access` VALUES (2, 44);
INSERT INTO `role_accesses_access` VALUES (2, 46);
INSERT INTO `role_accesses_access` VALUES (2, 47);
INSERT INTO `role_accesses_access` VALUES (2, 48);
INSERT INTO `role_accesses_access` VALUES (2, 49);
INSERT INTO `role_accesses_access` VALUES (2, 50);
INSERT INTO `role_accesses_access` VALUES (2, 51);
INSERT INTO `role_accesses_access` VALUES (2, 52);
INSERT INTO `role_accesses_access` VALUES (2, 56);

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int NOT NULL DEFAULT 1,
  `sort` int NOT NULL DEFAULT 100,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_6a9775008add570dc3e5a0bab7`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (1, 'JavaScript', 1, 100, '2024-08-19 12:34:27.321712', '2024-09-08 12:01:49.532743');
INSERT INTO `tag` VALUES (2, '生活技巧', 1, 100, '2024-08-20 12:34:27.322800', '2024-09-08 12:01:54.463802');
INSERT INTO `tag` VALUES (3, '旅行', 1, 100, '2024-08-21 12:34:27.000000', '2024-09-08 12:01:58.780156');
INSERT INTO `tag` VALUES (4, '健康', 1, 100, '2024-08-22 12:34:27.324755', '2024-08-22 12:34:27.324755');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mobile` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` int NOT NULL DEFAULT 1,
  `is_super` tinyint NOT NULL DEFAULT 0,
  `sort` int NOT NULL DEFAULT 100,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'super', '$2b$10$ZGAAu1F6hgFiNnRB2nMGqOhzWIVL1BedUQbiab9/spX5lIJZB4oT2', NULL, '2901862939@qq.com', 1, 1, 100, '2024-08-15 11:23:11.000000', '2024-09-01 16:43:08.517572');
INSERT INTO `user` VALUES (2, 'admin', '$2b$10$27StZ1bOxnA5w8HCnejM4u7kqAkzJZFITZsZKtYK.lFL4S0v6ijN6', NULL, 'user1@qq.com', 1, 0, 100, '2024-08-16 11:23:26.000000', '2024-08-22 18:04:48.740094');
INSERT INTO `user` VALUES (3, 'editor', '$2b$10$K6a8bRh4x8rP1BciJmyMBeHotP4qFzd3gPa/fSLBMmirPblShOT5G', NULL, 'user2@qq.com', 1, 0, 100, '2024-08-17 11:23:42.000000', '2024-09-08 15:48:02.000000');
INSERT INTO `user` VALUES (4, 'user2', '$2b$10$K6a8bRh4x8rP1BciJmyMBeHotP4qFzd3gPa/fSLBMmirPblShOT5G', NULL, NULL, 0, 0, 100, '2024-08-18 18:03:14.000000', '2024-08-24 17:33:51.000000');
INSERT INTO `user` VALUES (5, 'user3', '$2b$10$K6a8bRh4x8rP1BciJmyMBeHotP4qFzd3gPa/fSLBMmirPblShOT5G', NULL, NULL, 1, 0, 100, '2024-08-18 18:03:26.000000', '2024-08-22 18:11:05.521236');
INSERT INTO `user` VALUES (6, 'user4', '$2b$10$K6a8bRh4x8rP1BciJmyMBeHotP4qFzd3gPa/fSLBMmirPblShOT5G', NULL, NULL, 1, 0, 100, '2024-08-20 18:03:31.000000', '2024-08-22 18:05:03.107025');
INSERT INTO `user` VALUES (7, 'user5', '$2b$10$K6a8bRh4x8rP1BciJmyMBeHotP4qFzd3gPa/fSLBMmirPblShOT5G', NULL, NULL, 1, 0, 100, '2024-08-21 18:03:36.000000', '2024-08-22 18:05:06.275776');
INSERT INTO `user` VALUES (8, 'user6', '$2b$10$K6a8bRh4x8rP1BciJmyMBeHotP4qFzd3gPa/fSLBMmirPblShOT5G', NULL, NULL, 1, 0, 100, '2024-08-22 18:03:41.000000', '2024-08-22 18:05:11.367712');
INSERT INTO `user` VALUES (9, 'user7', '$2b$10$K6a8bRh4x8rP1BciJmyMBeHotP4qFzd3gPa/fSLBMmirPblShOT5G', NULL, NULL, 1, 0, 100, '2024-08-22 18:05:27.000000', '2024-08-22 18:05:33.248271');
INSERT INTO `user` VALUES (10, 'user8', '$2b$10$K6a8bRh4x8rP1BciJmyMBeHotP4qFzd3gPa/fSLBMmirPblShOT5G', NULL, NULL, 1, 0, 100, '2024-08-22 18:05:41.995507', '2024-08-22 18:05:46.252938');

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS `user_roles_role`;
CREATE TABLE `user_roles_role`  (
  `userId` int NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`userId`, `roleId`) USING BTREE,
  INDEX `IDX_5f9286e6c25594c6b88c108db7`(`userId` ASC) USING BTREE,
  INDEX `IDX_4be2f7adf862634f5f803d246b`(`roleId` ASC) USING BTREE,
  CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
INSERT INTO `user_roles_role` VALUES (1, 1);
INSERT INTO `user_roles_role` VALUES (2, 1);
INSERT INTO `user_roles_role` VALUES (3, 2);

SET FOREIGN_KEY_CHECKS = 1;
