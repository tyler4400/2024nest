## CMS
- Admin后台管理模块 admin
- API接口模块 api
- 共享模块 shared

## 创建模块
```js
nest generate module admin
nest generate module api
nest generate module shared
```

## admin
- 后台管理模块直接使用 nest+handlerbar
  - 会话 session
- api 
   - jwt token  htmlx

## 支持会话
```
npm install cookie-parser express-session @nestjs/platform-express
```


## 支持模板引擎 
