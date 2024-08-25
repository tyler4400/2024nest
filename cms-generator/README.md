package.json中的schematics字段指示该包是一个schematics集合
它指定了schematics集合的入口文件
```js
"schematics": "./src/collection.json",
```

collection.json
```js
{
  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "generateFiles": {
      "description": "A blank schematic.",
      "factory": "./cms-generator/index#generateFiles"
    }
  }
}
```

- $schema 指定了用于验证和解释此JSON文件的模式schema.它指向了collection-schema.json文件 ，它可以确保文件 的结构符合schematics集合标准格式
- schematics 是配置的核心部分，定义了该集合所有的schematics
- generateFiles是schematics的名称，在运行这个schematics的时候，可以通过命令行使用这个名称执行此generateFiles
  - description 对此schematics的描述
  - factory  指定了规则工厂函数的位置，这个规则工厂函数就是schematics的真正逻辑
  - 表示规则工厂函数位于./cms-generator/index文件 中
  - 并且规则工厂函数名称为generateFiles


Rule 是一个函数，它接收一个Tree对象并且返回一个新Tree对象，用于定义文件系统 的变更规则
SchematicContext 提供了有关当前运行中的原理图上下文信息和工厂,比如说日志记录和任务调度
Tree 是一个虚拟的文件系统，用于暂存和记录对实际文件系统的更新，直到提交时才应用



## 如何编译 
```
npm run build
tsc
```

## 如何运行
```js
schematics .:generateFiles --name=role --path=角色 --no-dry-run

RoleManger

```

```js
nest g generateFiles role 角色 --collection=D:/aproject/2024nest/cms-generator
```

```js
import { Module } from '@nestjs/common';
import { DashboardController } from './controllers/dashboard.controller';
import { UserController } from './controllers/user.controller';
@Module({
    controllers: [DashboardController, UserController]
})
export class AdminModule {
}
```


1.定义要修改的文件路径 
2.读取指定的路径的文件内容，并转换为字符串
3.根据源代码字符串创建对应AST抽象语法树 ts.SourceFile
4.定义TS转换工厂函数，函数的参数就是AST语法树的根节点
  1.找到文件中的最后一个import语句
  2.创建一个新的导入语句 import { RoleController } from './controllers/role.controller';
  3.创建新的语句数组，插入最的 import语句
  4.更新语法树，四条statements变成五条statements
5.应用变更并获取更新后的源文件 
6.将更新后的文件内容写入指定的路径





