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
schematics .:generateFiles --name=roleManage --path=角色 --no-dry-run

RoleManger

```

```js

```

