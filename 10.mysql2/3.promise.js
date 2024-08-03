const mysql = require('mysql2/promise');

async function query(){
    const connection = await  mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'orm'
    });
    try{
       const [results,fields] = await connection.execute('select * from tags where id=?',[1])
       console.log(results)
       console.log(fields)
    }catch(error){
        console.log(error)
    }
}
query().catch(console.error).finally(()=>process.exit(0));