const express = require('express');
//从apollo-server-express 引入ApolloServer和gql，用于定义graphQl服务器
const { ApolloServer, gql } = require('apollo-server-express');
//引入PubSub来处理graphql吕的发布订阅机制
const { PubSub } = require('graphql-subscriptions');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
//用于处理Graphql查询和订阅
const { execute, subscribe } = require('graphql');
//用于构建可执行的Graphql Schema
const { makeExecutableSchema } = require('@graphql-tools/schema');
const pubsub = new PubSub();
const typeDefs = gql`
    type User {
      id:String
      name:String
      email:String
    }
    type Mutation{
     addUser(name:String!,email:String!):User
    }
    type Query{
      user(id:String!):User
    }
    type Subscription{
      userAdded:User
    }
`
let users = [
    {
        id: '1', name: 'zhangsan', email: 'zhangsan@qq.com'
    },
    {
        id: '2', name: 'lisi', email: 'lisi@qq.com'
    }
]
const resolvers = {
    Query: {
        user: (_, { id }) => users.find(user => user.id === id)
    },
    Mutation: {
        addUser: (_, { name, email }) => {
            const newUser = { id: String(users.length + 1), name, email };
            users.push(newUser);
            //添加用户之后，发布USER_ADDED事件
            pubsub.publish('USER_ADDED', { userAdded: newUser });
            return newUser;
        }
    },
    //Subscription Resolver，用于订阅USER_ADDED事件
    Subscription: {
        //当有新的用户添加的时候，使用pubsub.asyncIterator监听USER_ADDED事件
        userAdded: {
            subscribe: () => pubsub.asyncIterator(['USER_ADDED'])
        }
    }
}
//使用typeEefs和resolvers创建可执行的GraphQL Schema
const schema = makeExecutableSchema({ typeDefs, resolvers });
async function main() {
    const app = express();
    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();
    //将apolloServer中间件添加到app应用里
    apolloServer.applyMiddleware({ app });
    const httpServer = createServer(app);
    SubscriptionServer.create(
        {
            schema,//使用GraphQL schema
            execute,//处理查询
            subscribe//处理订阅
        },
        {
            server: httpServer,//ws服务器不能单独，需要配合http服务一起工作
            path: apolloServer.graphqlPath
        }
    );
    const PORT = 5000;
    console.log('apolloServer.graphqlPath', apolloServer.graphqlPath);
    httpServer.listen(PORT, () => {
        console.log(`sever is runing at http://localhost:5000${apolloServer.graphqlPath}`);
        console.log(`SubscriptionServer is ready at ws://localhost:5000${apolloServer.graphqlPath}`);
    });
}
main();