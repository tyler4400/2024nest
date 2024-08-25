import {
  Rule, SchematicContext, Tree, apply, url,
  applyTemplates, move,
  mergeWith, chain
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { plural } from 'pluralize'
import * as path from 'path'
import * as ts from 'typescript';
export function generateFiles(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    //从选项中获取name属性并赋值给entityName
    const entityName = options.name;//获取name参数
    const title = options.path;
    //定义要应用的模板规则
    const sourceTemplateRules = apply(
      //指定模板文件所在的目录
      url('./files/src'),
      [
        //应用模板，将传入的选项传递给模板
        applyTemplates({
          entityName,
          plural,
          title,
          ...strings,//向模板里传入一些方法
        }),
        //移动生成的文件到目标目录中
        move(path.normalize('src'))
      ]
    )
    //定义要应用的模板规则
    const viewsTemplateRules = apply(
      //指定模板文件所在的目录
      url('./files/views'),
      [
        //应用模板，将传入的选项传递给模板
        applyTemplates({
          entityName,
          plural,
          title,
          ...strings,//向模板里传入一些方法
        }),
        //移动生成的文件到目标目录中
        move(path.normalize('views'))
      ]
    )
    //返回一个chain,将模板规则 与文件系统合并
    return chain([
      mergeWith(sourceTemplateRules),
      mergeWith(viewsTemplateRules),
      updateAdminModule(entityName),
      updateSharedModule(entityName)
    ])
  };
}
function updateSharedModule(entityName: string) {
  //返回一个函数，接收Tree作为参数
  return (tree: Tree) => {//此处返回的是一个schematics的规则函数
    //定义要修改的文件路径 
    const adminModulePath = 'src/shared/shared.module.ts';
    //读取并解析文件的内容为TS源文件
    const sourceFile = getSourceFile(tree, adminModulePath);
    //如果成功找到要修改的源文件 
    if (sourceFile) {
      //获取实体的类的名称(用于代码)和破折号形式(用于文件名) Role  role
      const { classifiedName, dasherizedName } = getClassifiedAndDasherizedName(entityName);
      //定义更新操作
      const updates = [
        addImportToModule(classifiedName, `./entities/${dasherizedName}.entity`),
        addImportToModule(`${classifiedName}Service`, `./services/${dasherizedName}.service`),
        addToModuleArray(`providers`, `${classifiedName}Service`),
        addToModuleArray(`exports`, `${classifiedName}Service`),
        addToMethodArray('forFeature', classifiedName)
      ]
      //应用更新保存变更到AdminModule文件
      applyTransformationAndSave(tree, adminModulePath, sourceFile, updates);
    }
    return tree;
  }
}
function addToMethodArray(methodName:string,resourceName:string):ts.TransformerFactory<ts.SourceFile>{
  return (context: ts.TransformationContext) => (rootNode: ts.SourceFile) => {
    //定义访问器函数，用于递归的遍历节点
    function visitor(node: ts.Node): ts.Node {
      if (ts.isCallExpression(node)
        && ts.isPropertyAccessExpression(node.expression)
        && node.expression.name.text === methodName
        && node.arguments.length==1
        && ts.isArrayLiteralExpression(node.arguments[0])) {
        //获取原始数组中的元素，并且添加新的元素
        const elements = [...node.arguments[0].elements,ts.factory.createIdentifier(resourceName)];
        //更新方法调用，将新数组作为参数传递
        return ts.factory.updateCallExpression(
          node,
          node.expression,
          node.typeArguments,
          [ts.factory.createArrayLiteralExpression(elements)]
        )
      }
      return ts.visitEachChild(node, visitor, context);
    }
    return ts.visitNode(rootNode, visitor) as ts.SourceFile;
  }

}
//此方法用于更新src\admin\admin.module.ts
function updateAdminModule(entityName: string) {
  //返回一个函数，接收Tree作为参数
  return (tree: Tree) => {//此处返回的是一个schematics的规则函数
    //定义要修改的文件路径 
    const adminModulePath = 'src/admin/admin.module.ts';
    //读取并解析文件的内容为TS源文件
    const sourceFile = getSourceFile(tree, adminModulePath);
    //如果成功找到要修改的源文件 
    if (sourceFile) {
      //获取实体的类的名称(用于代码)和破折号形式(用于文件名) Role  role
      const { classifiedName, dasherizedName } = getClassifiedAndDasherizedName(entityName);
      //定义更新操作
      const updates = [
        addImportToModule(`${classifiedName}Controller`, `./controllers/${dasherizedName}.controller`),
        addToModuleArray(`controllers`, `${classifiedName}Controller`)
      ]
      //应用更新保存变更到AdminModule文件
      applyTransformationAndSave(tree, adminModulePath, sourceFile, updates);
    }
    return tree;
  }
}
function addToModuleArray(arrayName: string, itemName: string): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (rootNode: ts.SourceFile) => {
    //定义访问器函数，用于递归的遍历节点
    function visitor(node: ts.Node): ts.Node {
      if (ts.isPropertyAssignment(node)
        && ts.isIdentifier(node.name)
        && node.name.text == arrayName
        && ts.isArrayLiteralExpression(node.initializer)) {
        const elements = [...node.initializer.elements.map(ele => ele.getText()), itemName];
        //返回更新后的数组属性节点
        return ts.factory.updatePropertyAssignment(node, node.name,
          ts.factory.createArrayLiteralExpression(elements.map(ele => ts.factory.createIdentifier(ele))));
      }
      return ts.visitEachChild(node, visitor, context);
    }
    return ts.visitNode(rootNode, visitor) as ts.SourceFile;
  }
}
//应用变更并保存文件 
function applyTransformationAndSave(
  tree: Tree, filePath: string, sourceFile: ts.SourceFile,
  transformations: Array<ts.TransformerFactory<ts.SourceFile>>
) {
  //应用变更并获取更新后的源文件 
  const updatedSourceFile = ts.transform(sourceFile, transformations).transformed[0];
  //将更新后的文件内容写入指定的路径
  tree.overwrite(filePath, ts.createPrinter().printFile(updatedSourceFile));

}
//在文件中添加import导入语句
function addImportToModule(importName: string, importPath: string): ts.TransformerFactory<ts.SourceFile> {
  //返回一个转换工厂函数，用于添加导入语句
  //TransformerFactory是一个高阶函数，会接收一个TransformationContext并返回另一个处理SourceFile的函数
  return (_context: ts.TransformationContext) => (rootNode: ts.SourceFile) => {
    //找到文件中的最后一个import语句
    const lastImport = rootNode.statements.filter(ts.isImportDeclaration).pop();
    //创建一个新的导入语句
    //modifiers  importClause moduleSpecifier export const a = 1; import  {RoleController}
    //import React,{createElement as ce}
    const newImport = ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(//import type 
        false,
        undefined,
        ts.factory.createNamedImports([
          ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(importName))
        ]),
      ),
      ts.factory.createStringLiteral(importPath)
    )
    const updatedStatements = ts.factory.createNodeArray([
      ...rootNode.statements.slice(0, rootNode.statements.indexOf(lastImport!) + 1),
      newImport,
      ...rootNode.statements.slice(rootNode.statements.indexOf(lastImport!) + 1),
    ])
    return ts.factory.updateSourceFile(rootNode, updatedStatements) as ts.SourceFile;
  }
}
function getClassifiedAndDasherizedName(name: string) {
  return {
    classifiedName: strings.classify(name),//获取类名形式
    dasherizedName: strings.dasherize(name),//获取 破折号形式
  }
}
//读取并解析源文件 为TS源文件对象
function getSourceFile(tree: Tree, filePath: string): ts.SourceFile {
  //读取指定的路径的文件内容，并转换为字符串
  const content = tree.read(filePath)?.toString('utf-8');
  //使用TS创建源文件对象
  return ts.createSourceFile(filePath, content!, ts.ScriptTarget.Latest, true)
}
/**
url 指定模板文件的源路径,通常是本地的文件 ,./files指的是当前目录下面的files目录里面的所有的文件 
applyTemplates 应用模板引擎，将模板文件 与上下文 数据结合生成目标文件 
move 移动生成的文件到指定的目录
apply 应用一系列的规则到文件树中,转换转后的文件树
mergeWith 将生成的文件与项目中的文件树进行合并
chain 将多个规则按顺序进行串联执行
 */
