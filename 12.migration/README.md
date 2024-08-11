
## 1.生成迁移文件 
```js
npx ts-node ./node_modules/typeorm/cli migration:create ./src/migrations/init
```

## 2.执行迁移文件 
```js
npx ts-node ./node_modules/typeorm/cli migration:run -d ./src/data-source.ts
```

## 3.根据代码和数据库的差异自动生成迁移文件 
```js
npx ts-node ./node_modules/typeorm/cli migration:generate ./src/migrations/change -d ./src/data-source.ts
```
