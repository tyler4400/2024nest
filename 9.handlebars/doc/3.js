const Handlebars = require('handlebars');
Handlebars.registerHelper('uppercase',function(str){
  return str.toUpperCase();
});
//模板
const source = `
<ul>
{{#each items}}
  <li>{{uppercase this}}</li>
{{/each}}
</ul>


`;
//上下文对象
const context = {items:["item1","item2","item3"]};
//编译模板
const template = Handlebars.compile(source);
const result = template(context);
console.log(result)

