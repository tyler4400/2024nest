//在分布式系统中， 服务可能会动态注册到etch里，并需要注册的信息有生命周期，通过租约机制，我们可以为键
//设置有效期，租约到期后，键值会自动失效

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
async function lease() {
    //创建一个5秒的租约，且不自动续期
    const lease = client.lease(5, { autoKeepAlive: false });
    //在租约内，设置键service/foo的值为temporary_value
    await lease.put('service/foo').value('temporary_value');
    console.log(`创建一个5秒租约，并设置键service/foo的值为temporary_value`);
    //开始监听service/foo键的变化
    const watcher = await client.watch().key('service/foo').create();
    //当键foo被更新 时候，触发put事件，并打印新的值
    watcher.on('put', (response) => {
        console.log(`key service/foo' was updated with value ${response.value.toString()}`);
    });
    //当键foo被删除时，触发delete事件，并打印提示信息
    watcher.on('delete', () => {
        console.log(`key service/foo' was deleted`);
    });

    setTimeout(async () => {
        //等待6秒后检查 键service/foo的值，租约过期后键会自动删除
        const value = await client.get('service/foo').string();
        console.log(`6秒后，键service/foo的值为 ${value || '已过期'}`);
    }, 6000);

    setTimeout(async () => {
        watcher.cancel();//取消对键service/foo的监听
        console.log('取消监听');
        await client.close();
    }, 10000);

}
lease();