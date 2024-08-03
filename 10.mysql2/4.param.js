const mysql = require('mysql2/promise');

async function query(){
    const connection = await  mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'orm',
        namedPlaceholders: true
    });
    try{
        const id = 1;
        //TypeError: Bind parameters must be array if namedPlaceholders parameter is not enabled
       const [results,fields] = await connection.execute('select * from tags where id=:id',{id})
       console.log(results)
       console.log(fields)
    }catch(error){
        console.log(error)
    }
}
query().catch(console.error).finally(()=>process.exit(0));