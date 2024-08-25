import {strings} from '@angular-devkit/core';
import {plural} from 'pluralize'
//将字符串转为驼峰命令名，一般用于变量名
console.log(strings.camelize('my-string'));//myString
//将字符串中的空格和大写字母转换为短横线分隔小写格式，一般用于文件名
console.log(strings.dasherize('myString'));//my-string
//字符串首字母大写
console.log(strings.capitalize('my string'));//My string
//将字符串转换为类名式命名法
console.log(strings.classify('my-string'));//MyString
//将单数形式转成复数
console.log(plural('category'));//categories