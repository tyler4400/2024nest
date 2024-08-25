import { Rule, SchematicContext, Tree,apply,url,
  applyTemplates,move,
  mergeWith,chain
 } from '@angular-devkit/schematics';
 import {strings} from '@angular-devkit/core';
import {plural} from 'pluralize'
import * as path from 'path'
export function generateFiles(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    //从选项中获取name属性并赋值给entityName
    const entityName = options.name;//获取name参数
    //定义要应用的模板规则
    const sourceTemplateRules = apply(
      //指定模板文件所在的目录
      url('./files/src'),
      [
        //应用模板，将传入的选项传递给模板
        applyTemplates({
          entityName,
          plural,
          ...strings,//向模板里传入一些方法
        }),
        //移动生成的文件到目标目录中
        move(path.normalize('src'))
      ]
    )
    //返回一个chain,将模板规则 与文件系统合并
    return chain([
      mergeWith(sourceTemplateRules)
    ])
  };
}
/**
url 指定模板文件的源路径,通常是本地的文件 ,./files指的是当前目录下面的files目录里面的所有的文件 
applyTemplates 应用模板引擎，将模板文件 与上下文 数据结合生成目标文件 
move 移动生成的文件到指定的目录
apply 应用一系列的规则到文件树中,转换转后的文件树
mergeWith 将生成的文件与项目中的文件树进行合并
chain 将多个规则按顺序进行串联执行
 */
