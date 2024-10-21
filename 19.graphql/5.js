const express = require('express');
const { graphqlHTTP } = require('express-graphql');
//从graphql模块中引入buildSchema方法，用于构建GraphQL的schema
const { buildSchema } = require('graphql');
//使用DataLoader用于批量加载数据，避免N+1的查询问题
const DataLoader = require('dataloader');
//根据某些用户的ID批量查询它们的帖子
const batchPosts = async (userIds) => {
    console.log('batchPosts userIds', userIds);
    //模拟贴子数据
    const posts = [
        { id: '101', userId: '1', title: 'post1' },
        { id: '201', userId: '2', title: 'post2' },
        { id: '301', userId: '3', title: 'post3' }
    ]
    let result = userIds.map(userId => posts.filter(post => post.userId == userId));
    return result;
}
const postLoader = new DataLoader(userIds => batchPosts(userIds));
//定义GraphQl schema，定义一个查询类型的Query一个用户类型的User
//定义一个查询 叫user,参数为id(类型为字符串，且是必填项)，返回User类型
const schema = buildSchema(`
    type Post {
      id:String
      userId:String 
      title:String
    }
    type User {
      id:String
      name:String
      email:String
      posts:[Post]
    }
    type Query{
     user(id:String!):User
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
//定义一个User类，用于解析中返回用户对象，并包含获取帖子的方法
class User {
    constructor(userData) {
        this.id = userData.id;
        this.name = userData.name;
        this.email = userData.email;
    }
    //定义post方法，当请求User的posts字段的时候调用
    posts() {
        //使用DataLoader来加载用户的帖子
        return postLoader.load(this.id)
    }

}
//定义root解析器，其实findUserById方法可以根据ID查找对应的用户
const rootValue = {
    user: ({ id }) => {
        console.log('id=', id);
        //查找对应的用户的数据
        const userData = users.find(user => user.id == id);
        console.log('userData', userData);
        //如果找到了用户，则返回User类型的实例，否则 返回null
        return userData ? new User(userData) : null;
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