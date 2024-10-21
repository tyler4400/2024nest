//在微服务中，etcd可以作为服务注册中心，每个微服务都可以将自己注册到etcd中，并且其它的微服务可以通过
//etcd来发现和连接这些服务
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
//注册服务，服务的名字为serviceName，服务的地址serviceAddress，ttl为租约的生存时间
async function registerService(serviceName, serviceAddress, ttl = 10) {
    //创建一个带指定生存时间的租约
    const lease = client.lease(ttl, { autoKeepAlive: false });
    await lease.put(`services/${serviceName}`).value(serviceAddress);
    console.log(`服务${serviceName}已经注册，地址为${serviceAddress}`);
    return lease;
}
async function discoverService(serviceName) {
    //从ETCD中获取注册的服务名称对应的地址
    const value = await client.get(`services/${serviceName}`).string();
    return value;
}
async function watchService(serviceName) {
    const watcher = await client.watch().key(`services/${serviceName}`).create();
    watcher.on('put', (response) => {
        console.log(`服务${serviceName}更新为: ${response.value.toString()}`);
    });
    //当键foo被删除时，触发delete事件，并打印提示信息
    watcher.on('delete', () => {
        console.log(`服务${serviceName}已经下线`);
    });
    return watcher;
}

async function main() {
    try {
        //注册服务userSerivce,地址为http://localhost:3000
        const userLease = await registerService('userSerivce', 'http://localhost:3000');
        await registerService('productSerivce', 'http://localhost:4000');
        //发现userSerivce这个服务地址
        const serviceAddress = await discoverService('userSerivce');
        console.log(`发现服务userSerivce,地址为${serviceAddress}`);
        //监听服务userSerivce的变化
        const watcher = await watchService('userSerivce');
        setTimeout(async () => {
            await registerService('userSerivce', 'http://localhost:3001');
        }, 5000);
        setTimeout(async () => {
            try {
                await userLease.revoke();//撤销租约，服务下线
                //await watcher.cancel();
                await client.close();
            } catch (error) {
                console.log(error);
            }
        }, 6000);
    } catch (error) {
        console.log(error);
    }
}
main()