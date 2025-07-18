## Reflect
- Reflect其实ES6新引入的一个内置对象，它提供一些反射方法
- 其实以前这些方法都分散在Object或Function上

## reflect-metadata 
- reflect-metadata 是一个用于TS和ECMA的元数据反射库提案
- 它通过提供对元数据定义和检查的支持，简化了装饰 器的使用
- 可以在类、方法、参数、属性上设置和获取元数据

## reflect-metadata 与 JavaScript Reflect 的关系

### 两者没有直接关系
`reflect-metadata` 这个库和 JavaScript 的 `Reflect` 语言标准**没有直接关系**，它们是两个不同的概念：

#### JavaScript 的 Reflect 标准
```javascript
// JavaScript 标准的 Reflect 对象，用于对象操作
const obj = { name: 'John', age: 30 };

Reflect.get(obj, 'name');        // 'John'
Reflect.set(obj, 'age', 31);     // true
Reflect.has(obj, 'name');        // true
Reflect.ownKeys(obj);            // ['name', 'age']
```

#### reflect-metadata 库
```typescript
// reflect-metadata 提供的元数据 API
import 'reflect-metadata';

Reflect.defineMetadata('key', 'value', target);
Reflect.getMetadata('key', target);
Reflect.hasMetadata('key', target);
```

### 为什么名字相似？
`reflect-metadata` 选择使用 `Reflect` 作为命名空间，是因为它扩展了标准的 `Reflect` 对象：

```typescript
// 标准的 Reflect 方法
Reflect.get(obj, 'name');

// reflect-metadata 扩展的方法
Reflect.defineMetadata('key', 'value', obj);
Reflect.getMetadata('key', obj);
```

### 两者可以同时使用
```typescript
import 'reflect-metadata';

const obj = { name: 'John' };

// 使用标准 Reflect
console.log(Reflect.get(obj, 'name')); // 'John'

// 使用 reflect-metadata
Reflect.defineMetadata('type', 'string', obj, 'name');
console.log(Reflect.getMetadata('type', obj, 'name')); // 'string'
```

| 特性 | JavaScript Reflect | reflect-metadata |
|------|-------------------|------------------|
| 来源 | 语言标准 | 第三方库 |
| 功能 | 对象操作 | 元数据管理 |
| 关系 | 无直接关系 | 扩展了 Reflect 对象 |
| 使用场景 | 对象反射操作 | 装饰器、依赖注入等 |

## 名词解释
### 元数据
元数据是"描述数据的数据"，简单来说就是附加在代码上的额外信息。比如
```ts
// 普通的类
class User {
  name: string;
  age: number;
}

// 带有元数据的类
@Controller('/users')  // 这个装饰器添加了元数据：路由路径
class UserController {
  @Get('/list')       // 这个装饰器添加了元数据：HTTP方法
  getUsers() {
    // ...
  }
}
```

## reflect-metadata 解决什么问题？

### 1. 依赖注入问题
在没有元数据的情况下，框架无法知道构造函数需要什么类型的参数：
```ts
// 没有元数据 - 框架不知道注入什么
class UserService {
  constructor(private database: Database) {} // 框架不知道这里需要 Database 类型
}

// 有元数据 - 框架知道需要注入 Database 类型
class UserService {
  constructor(@Inject() private database: Database) {} // 通过装饰器添加元数据
}
```

### 2. 路由注册问题
框架需要知道哪些方法是API端点：
```ts
// 没有元数据 - 需要手动注册路由
app.get('/users', userController.getUsers);

// 有元数据 - 自动发现和注册路由
@Controller('/users')
class UserController {
  @Get('/list')
  getUsers() { /* ... */ }
}
```

### 3. 验证和序列化问题
需要知道属性的类型和验证规则：
```ts
class User {
  @IsString()           // 验证元数据
  @ApiProperty()        // API文档元数据
  name: string;
}
```

## reflect-metadata 的主要功能
根据 reflect-metadata 官方文档，它提供了以下核心API：

### 1. 定义元数据
```ts
// 在类上定义元数据
Reflect.defineMetadata('key', 'value', MyClass);

// 在属性上定义元数据
Reflect.defineMetadata('key', 'value', MyClass.prototype, 'propertyName');
```

### 2. 获取元数据
```ts
// 获取元数据（会查找原型链）
const value = Reflect.getMetadata('key', instance, 'propertyName');

// 获取自有元数据（不查找原型链）
const value = Reflect.getOwnMetadata('key', instance, 'propertyName');
```

### 3. 检查元数据
```ts
// 检查是否存在元数据
const exists = Reflect.hasMetadata('key', instance, 'propertyName');
```

### 4. 装饰器语法糖
```ts
// 装饰器语法（更简洁）
@Reflect.metadata('key', 'value')
class MyClass {
	@Reflect.metadata('key', 'value')
	method() {}
}

// 等价于
Reflect.defineMetadata('key', 'value', MyClass);
Reflect.defineMetadata('key', 'value', MyClass.prototype, 'method');
```

## 元数据存储机制

### 元数据存储在哪里？
元数据不是存储在对象本身的属性中，而是存储在对象的 内部元数据表 中：
```ts
// 当你调用
Reflect.defineMetadata('key1', 'value1', instance, 'myProperty');

// 实际做的事情是：

// reflect-metadata 的实际实现（简化版）
const Metadata = new WeakMap();

if (!Metadata.has(instance)) {
	Metadata.set(instance, new Map());
}
const instanceMetadata = Metadata.get(instance);
if (!instanceMetadata.has('myProperty')) {
	instanceMetadata.set('myProperty', new Map());
}
instanceMetadata.get('myProperty').set('key1', 'value1');
```

### 元数据不影响对象本身
`Reflect.defineMetadata` 不会改变对象本身，它所做的操作与对象的实际属性没有直接关系：

```ts
class MyClass {
  private myProperty: string = 'original value';
}

const instance = new MyClass();

// 添加元数据
Reflect.defineMetadata('key1', 'value1', instance, 'myProperty');

// 对象本身没有变化
console.log(instance.myProperty); // 仍然是 'original value'
console.log(Object.getOwnPropertyNames(instance)); // 没有新增属性

// 但元数据存在
console.log(Reflect.hasMetadata('key1', instance, 'myProperty')); // true
```

### 元数据存储位置
元数据存储在对象的内部元数据表中，而不是对象的属性中：
- 不会污染对象
- 不会影响TypeScript的类型检查
- 框架可以添加自己的元数据而不冲突

## 配置要求

### 安装依赖
```bash
npm install reflect-metadata
```

### TypeScript 配置
在 `tsconfig.json` 中启用：
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### 导入
在项目入口文件（如 `main.ts`）中导入：
```ts
import 'reflect-metadata';
```
## 总结

reflect-metadata 是一个强大的工具，它让JavaScript/TypeScript能够：
- 在运行时获取类型信息
- 实现依赖注入
- 自动注册路由
- 进行数据验证
- 生成API文档

这就是为什么现代框架（如NestJS、Angular）都依赖它的原因。它让代码更加声明式和自动化，减少了大量的样板代码。

