//导入Etcd3这个类
const { Etcd3 } = require('etcd3');
//配置ETCD连接选项，包括主机地址、连接超时时间，认证信息
const etcdConfig = {
    hosts: ['http://localhost:2379'],//etcd服务器的地址
    dailTimeout: 5000,//连接超时时间
    auth: {//etcd服务器的用户名和密码
        username: 'root',
        password: 'root'
    }
}

async function main() {
    //使用配置创建一个新的etcd客户端实例
    const client = new Etcd3(etcdConfig);
    try {
        //在etcd中存储键foo,并且把它的值设置为bar   set(key,value)
        await client.put('foo').value('bar');
        console.log(`存储键foo的值为bar`);
        //获取键foo的值
        const value = await client.get('foo').string();
        console.log(`获取键foo对应的值为:${value}`);
        //删除键foo
        await client.delete().key('foo');
        console.log(`删除键 foo`);
    } catch (error) {
        console.error('操作过程 中发生了错误', error.message);
    } finally {
        await client.close();
    }
}
main();