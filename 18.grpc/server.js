const grpc = require('@grpc/grpc-js');
//导入proto文件加载器，用于解析.proto文件
const protoLoader = require('@grpc/proto-loader');
//同步加载hello.proto这个文件，并解析为定义包
const packageDefinition = protoLoader.loadSync('hello.proto', {});
//用gRPC加载解析后的proto定义，生成服务对象
const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;
//定义sayHello方法，用于处理客户端的请求
function sayHello(call, callback) {
    //获取客户端传递过来的name参数
    let name = call.request.name;
    //生成响应消息
    const replyMessage = `Hello,${name}`;
    //通过回调返回响应消息
    callback(null, { message: replyMessage });
}
function sayHelloStream(call, callback) {
    let name = call.request.name;// http    express   request.query request.params
    const prefixs = ['hello', 'hi', 'welcome'];
    prefixs.forEach((prefix, index) => {
        setTimeout(() => {
            call.write({ message: `${prefix},${name}` });//response.write
            if (index === prefixs.length - 1) {
                call.end();//如果是发送的最后一条消息，则关闭响应
            }
        }, 1000 * (index + 1));
    });
}
function main() {
    //创建一个gRPC服务器的实例，对外提供gRPC服务
    const server = new grpc.Server();
    //注册Greeter服务，将sayHello方法绑定到服务中
    server.addService(helloProto.Greeter.service, {
        sayHello,
        sayHelloStream
    });
    //绑定服务器到指定的地址和端口，并启动服务器
    server.bindAsync(
        '0.0.0.0:50051',
        grpc.ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                console.log(`绑定失败`, error);
                return;
            }
            console.log(`gRPC服务器在${port}端口上启动成功`);
        }
    );
}
main();