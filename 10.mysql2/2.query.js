const mysql = require('mysql2');
//创建数据库连接 
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'orm'
});
connection.connect(err=>{
    if(err){
        console.error('Error connecting'+err.stack)
    }
    console.log('connected successfully')
});
// mysql2中支持两种查询 模式 回调 promise

connection.query('select * from tags where id=?',[1],(err,results,fields)=>{
    if(err){
        console.error('Error connecting'+err.stack)
        return;
    }
    console.log(results)
    console.log(fields)
});