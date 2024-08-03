const mysql = require('mysql2');
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'orm',
    namedPlaceholders: true,
    connectionLimit:10,//连接池中的连接限制数量
    waitForConnections:true,//是否等待连接
    queueLimit:10,
});
pool.query('select * from tags where id=?',[1],(err,results,fields)=>{
    if(err){
        console.error('Error connecting'+err.stack)
        return;
    }
    console.log(results)
    console.log(fields)
});