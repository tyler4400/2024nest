// watch监听键的变化
//通过Watch机制，可以监听某个键的变化，并且在键被更新的时候执行相应的回调
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
//使用配置创建一个新的etcd客户端实例
const client = new Etcd3(etcdConfig);

async function watchKey() {
    //创建一个watcher,监听foo的变化
    const watcher = await client.watch().key('foo').create();
    //当键foo被更新 时候，触发put事件，并打印新的值
    watcher.on('put', (res) => {
        console.log(`key foo was updated with value ${res.value.toString()}`);
    });
    //当键foo被删除时，触发delete事件，并打印提示信息
    watcher.on('delete', (res) => {
        console.log(`key foo was deleted`);
    });
    //模拟更新键 foo,将它的值更新为new_value
    await client.put('foo').value('new_value')
    //模拟删除键的操作
    await client.delete().key('foo')
}
watchKey();