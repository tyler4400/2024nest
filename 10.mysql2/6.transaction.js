const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'orm',
    namedPlaceholders: true,
    connectionLimit: 10,//连接池中的连接限制数量
    waitForConnections: true,//是否等待连接
    queueLimit: 10,
});

(async function performTransaction() {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await connection.query(`insert into tags(name) values('good')`);
        await connection.query(`insert into tags(name) values('top')`);
        await connection.commit();
    } catch (error) {
        await connection.rollback()
        console.error(error)
    }finally{
        //不管成功还是失败，把连接 释放回连接 池
        connection.release();
    }
})()