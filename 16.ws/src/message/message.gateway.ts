import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
//使用WebSocketGateway装饰器声明一个WebSocket网关类
@WebSocketGateway()
export class MessageGateway {
    //可以使用WebSocketServer装饰器注入socket.io的server的实例
    @WebSocketServer()
    server: Server

    private rooms:Set<string> = new Set()

    @SubscribeMessage('userJoined')
    handleUserJoined(@MessageBody() data: { username: string }, @ConnectedSocket() socket: Socket) {
        //通过@ConnectedSocket可以获取当前已经连接的socket实例， 这里可以将username和client socket进行关系
        socket.data.username = data.username;
        //通过ws服务器向所有连接的客户端进行广播
        this.server.emit('userJoined', data);
    }

    @SubscribeMessage('createMessage')
    handleCreateMessage(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() socket: Socket) {
        const { username, message, recipient,room } = createMessageDto;
        if (recipient) {
            //需要通过用户名找到这个用户名对应的 socket,然后通过那个socket向对方发送消息
            let recipientSocket = Array.from(this.server.sockets.sockets.values()).find(socket => socket.data.username == recipient)
            if (recipientSocket) {
                recipientSocket.emit('messageCreated', { username, message });
                socket.emit('messageCreated', { username, message });
            }
        }else if(room){
            this.server.to(room).emit('messageCreated', { username, message });
        } else {
            //向所有的客户端发送消息
            this.server.emit('messageCreated', { username, message });
        }
    }
    @SubscribeMessage('requestRooms')
    handleRequestRooms(@ConnectedSocket() socket: Socket){
        socket.emit('roomList',Array.from(this.rooms));
    }
    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() data: {username:string,room:string},@ConnectedSocket() socket: Socket){
        const {username,room} = data;
        socket.join(room);//让当前连接的客户端加入room这个房间 scoket.leave(room)
        socket.data.username = username;
        //向此房间内的用户发送消息，表示有人加入这个房间了
        //向某个房间内的所有客户端发送消息，有人加入此房间了
        this.server.to(room).emit('userJoinedRoom',data);
        socket.emit('roomList',Array.from(this.rooms));
    }
    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@MessageBody() data: {username:string,room:string},@ConnectedSocket() socket: Socket){
        const {username,room} = data;
        socket.leave(room);//让当前连接的客户端加入room这个房间 scoket.leave(room)
        socket.data.username = username;
        //向此房间内的用户发送消息，表示有人加入这个房间了
        //向某个房间内的所有客户端发送消息，有人加入此房间了
        this.server.to(room).emit('userLeavedRoom',data);
        socket.emit('roomList',Array.from(this.rooms));
    }
    @SubscribeMessage('createRoom')
    handleCreateRoom(@MessageBody() data: {roomName:string},@ConnectedSocket() socket: Socket){
        const {roomName} = data;
        if(!this.rooms.has(roomName)){
            this.rooms.add(roomName);
            this.server.emit('roomList',Array.from(this.rooms));
        }
    }
}