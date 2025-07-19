const path = require('path')
const prefix = '/cats/'
const pathMetadata= '///create'
console.log(path.posix.join(prefix,'/','\er\w',pathMetadata)) // 打印： /cats/erw/create

/**
 * path.posix 的基本概念
 * path.posix 是Node.js中path模块的一个属性，它提供了POSIX系统（Unix、Linux、macOS等）风格的路径操作方法。POSIX是一套标准，定义了Unix系统的接口规范。
 *
 * 为什么需要path.posix
 * 在不同操作系统中，文件路径的表示方式不同：
 * Windows系统：使用反斜杠\作为路径分隔符，如C:\Users\name\file.txt
 * POSIX系统（Unix/Linux/macOS）：使用正斜杠/作为路径分隔符，如/home/user/file.txt
 *
 * Node.js的path模块默认会根据当前运行的操作系统来处理路径，但有时我们需要强制使用特定风格的路径格式。
 *
 * path.posix的主要作用
 *
 * 1. 统一路径格式
 * 无论代码运行在什么系统上，path.posix都会生成Unix风格的路径，确保路径格式的一致性。
 * 2. Web开发中的URL处理
 * 在Web开发中，URL路径总是使用正斜杠/，即使服务器运行在Windows上。使用path.posix可以确保生成的路径符合URL规范。
 *

 * 这里使用path.posix.join()而不是普通的path.join()，是因为：
 * 确保URL兼容性：Web路由路径必须使用正斜杠/
 * 跨平台一致性：无论服务器运行在Windows还是Linux上，生成的路由都是一样的
 * 避免Windows问题：如果在Windows上使用path.join()，可能会生成包含反斜杠的路径，导致路由匹配失败
 * path.posix vs path.win32 vs path
 * path.posix：强制使用Unix风格路径（正斜杠）
 * path.win32：强制使用Windows风格路径（反斜杠）
 * path：根据当前系统自动选择风格
 *
 * 总结
 * path.posix主要解决的是跨平台路径格式统一的问题。在Web开发、API路由、URL处理等场景中，我们通常希望路径格式保持一致，使用Unix风格的正斜杠分隔符。这样可以避免因为开发环境和生产环境操作系统不同而导致的路径问题。
 */
