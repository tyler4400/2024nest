
## 1.生成迁移文件 
```js
npx ts-node ./node_modules/typeorm/cli migration:create ./src/migrations/addAge
```

## 2.执行迁移文件 
```js
npx ts-node ./node_modules/typeorm/cli migration:run -d ./src/data-source.ts
```

## 3.根据代码和数据库的差异自动生成迁移文件 
```js
npx ts-node ./node_modules/typeorm/cli migration:generate ./src/migrations/addEmailAndAge -d ./src/data-source.ts
```

## 2.回滚上一次执行的迁移
```js
npx ts-node ./node_modules/typeorm/cli migration:revert -d ./src/data-source.ts
```
