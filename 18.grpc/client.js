const grpc = require('@grpc/grpc-js');
//导入proto文件加载器，用于解析.proto文件
const protoLoader = require('@grpc/proto-loader');
//同步加载hello.proto这个文件，并解析为定义包
const packageDefinition = protoLoader.loadSync('hello.proto', {});
//用gRPC加载解析后的proto定义，生成服务对象
const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

function main() {
    //创建一个gRPC客户端，连接本地的gRPC服务器localhost:50051
    //使用不加密的凭证进行通信
    const client = new helloProto.Greeter(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );
    //调用sayHello方法，发送一个包含name字段的请求对象
    client.sayHello({ name: 'zhangsan' }, (error, response) => {
        if (error) {
            console.log('调用服务出错', error);
        }
        console.log(`服务器响应结果 :`, response.message);
    });
    //客户端可以调用服务器的流式返回数据的接口
    //如果客户端收到服务器发送的消息，就触发data事件，打印消息
    client.sayHelloStream({ name: 'lisi' }).on('data', (response) => {
        console.log(`服务器响应`, response.message);
    }).on('end', () => {
        console.log(`响应结束`,);
    });
}
main();