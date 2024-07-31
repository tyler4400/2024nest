const Handlebars = require('handlebars');
//模板
const source = `
{{#if isAdmin}}
  <p>welcome admin</p>
{{else}}
  <p>welcome user</p>
{{/if}}
`;
//上下文对象
const context = {isAdmin:false};
//编译模板
const template = Handlebars.compile(source);
const result = template(context);
console.log(result)

