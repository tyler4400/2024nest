
## 1.生成迁移文件 
```js
npx typeorm-ts-node-esm migration:create ./src/migrations/addEmailField
npx ts-node ./node_modules/typeorm/cli  migration:create ./src/migrations/addEmailField
```

## 2.执行迁移文件 
```js
npx typeorm-ts-node-esm migration:run -d ./src/data-source.ts

npx typeorm-ts-node-esm migration:run -- -d path-to-datasource-config

npm run typeorm -- migration:run -d ./src/data-source.ts
npx typeorm migration:run -- -d ./src/data-source.ts

```

## 3.根据代码和数据库的差异自动生成迁移文件 
```js
npx typeorm-ts-node-esm migration:generate ./src/migrations/change -d ./src/data-source.ts
```

```js
npx ts-node ./node_modules/typeorm/cli  migration:run -d ./src/data-source.ts
```