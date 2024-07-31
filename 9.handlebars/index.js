const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
   helpers:{
    multiply:function(a,b){
      return a*b;
    },
    increase:function(value){
      return parseInt(value)+1;
    }
   }
});
const app = express();
app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');
app.set('views','./views');
const tree = [
  {
    name:'parent1',
    children:[
      {
        name:'parent1-child1',
        children:[
          {name:'parent1-child1-grandson1',children:[]}
        ]
      },
      {name:'parent1-child2',children:[]}
    ]
  }
]
app.get('/',(req,res)=>{
  res.render('home',{title:'home'});
});
app.get('/tree',(req,res)=>{
  res.render('tree',{tree});
});
app.listen(3600);