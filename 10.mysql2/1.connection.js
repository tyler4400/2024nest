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