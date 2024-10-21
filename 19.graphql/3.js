const express = require('express');
const { graphqlHTTP } = require('express-graphql');
//从graphql模块中引入buildSchema方法，用于构建GraphQL的schema
const { buildSchema } = require('graphql');
//定义GraphQl schema，定义一个查询类型的Query一个用户类型的User
//定义一个查询 叫user,参数为id(类型为字符串，且是必填项)，返回User类型
const schema = buildSchema(`
    type User {
      id:String
      name:String
      email:String
    }
    type Query{
     user(id:String!):User
    }
    type Mutation{
     addUser(name:String!,email:String!):User
    }
`);
//定义一个用户数组，模拟用户的数据
const users = [
    {
        id: '1', name: 'zhangsan', email: 'zhangsan@qq.com'
    },
    {
        id: '2', name: 'lisi', email: 'lisi@qq.com'
    }
]
//定义root解析器，其实findUserById方法可以根据ID查找对应的用户
const rootValue = {
    user: ({ id }) => users.find(user => user.id === id),
    addUser: ({ id, name, email }) => {
        const newUser = { id: String(users.length + 1), name, email };
        users.push(newUser);
        return newUser;
    }
}
//创建一个express应用
const app = express();
app.use('/graphql', graphqlHTTP({
    schema,//使用定义的schema
    rootValue,//使用定义的解析器
    graphiql: true,//开启graphql的调试页面，方便我们在浏览器调试
}));
app.listen(4000, () => {
    console.log(`Running a GraphQL API server at http://localhost:4000/graphql`);
});

/**
query getUser($userId: String!) {
  user(id: $userId) {
    id
    name
    email
  }
}
mutation ($name: String!, $email:String!) {
  addUser(name: $name,email:$email) {
    id
    name
    email
  }
}

 */