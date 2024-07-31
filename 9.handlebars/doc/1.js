const Handlebars = require('handlebars');
//模板
const source = `<p>hello {{name}}</p>`;
//上下文对象
const context = {name:'zhangsan'};
//编译模板
const template = Handlebars.compile(source);
const result = template(context);
console.log(result)

