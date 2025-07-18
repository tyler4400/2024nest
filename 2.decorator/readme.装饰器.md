# 装饰器（Decorators）学习指南

## 什么是装饰器？

装饰器是一种特殊的声明，可以附加到类、方法、属性、参数或访问器上，用来修改它们的行为。装饰器使用 `@` 符号作为前缀。

```typescript
// 装饰器示例
@Controller('/users')
class UserController {
  @Get('/list')
  getUsers() {
    return [];
  }
}
```

## 装饰器的三种工作模式

装饰器可以像高阶函数一样包裹原始类或函数，但**不是所有装饰器都必须返回新的定义**。装饰器有三种主要的工作模式：

### 1. 观察模式（Observer Pattern）
装饰器只观察，不修改原始定义：

```typescript
// 观察模式 - 不返回任何东西
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
  // 没有 return，原类保持不变
}

@Logger
class Person {
  name = 'Max';
  
  constructor() {
    console.log('Creating person object...');
  }
}

// 等价于：
// class Person { ... }
// Logger(Person);
```

### 2. 修改模式（Modification Pattern）
装饰器修改原始定义：

```typescript
// 修改模式 - 返回修改后的描述符
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log('Before method execution');
    const result = originalMethod.apply(this, args);
    console.log('After method execution');
    return result;
  };
  
  return descriptor; // 返回修改后的描述符
}

class Product {
  @Log
  getPriceWithTax() {
    return this.price * 1.2;
  }
}
```

### 3. 替换模式（Replacement Pattern）
装饰器完全替换原始定义：

```typescript
// 替换模式 - 返回新的类定义
function ReplaceClass<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = "new value";
    hello = "override";
    
    constructor(...args: any[]) {
      super(...args);
      console.log('Extended constructor called');
    }
  };
}

@ReplaceClass
class Person {
  name = 'Max';
  
  constructor() {
    console.log('Original constructor called');
  }
}

// 现在 Person 类被完全替换了
const person = new Person();
console.log(person.newProperty); // "new value"
console.log(person.hello); // "override"
```

### 装饰器工作模式对比

| 模式 | 返回值 | 作用 | 适用场景 |
|------|--------|------|----------|
| 观察模式 | 无返回值 | 只观察，不修改 | 日志记录、注册、分析 |
| 修改模式 | 返回描述符 | 修改原始行为 | 方法增强、验证、缓存 |
| 替换模式 | 返回新定义 | 完全替换原始定义 | 类继承、功能扩展 |

### 实际验证示例

```typescript
// 1. 观察模式
function ObserverLogger(constructor: Function) {
  console.log('Observer: Class', constructor.name, 'is being defined');
}

// 2. 修改模式
function ModifyLogger(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log('Modify: Before calling', propertyName);
    const result = originalMethod.apply(this, args);
    console.log('Modify: After calling', propertyName);
    return result;
  };
  
  return descriptor;
}

// 3. 替换模式
function ReplaceLogger<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log('Replace: Extended constructor called');
    }
    
    newMethod() {
      console.log('Replace: This is a new method');
    }
  };
}

@ObserverLogger
@ReplaceLogger
class Example {
  @ModifyLogger
  method() {
    console.log('Original method executed');
  }
}

const example = new Example();
example.method();
example.newMethod(); // 新方法，来自替换装饰器
```

**输出结果：**

## 装饰器的标准化历程

### 当前状态
- **ECMAScript 标准**：装饰器还没有正式纳入标准
- **TypeScript**：通过 `experimentalDecorators` 选项提供实验性支持
- **Babel**：也提供了装饰器插件支持

### 标准化进程

#### 第一阶段（已废弃）
```typescript
// 第一阶段的语法（已废弃）
// 主要特点：装饰器是函数，直接调用
function simpleDecorator(target) {
  console.log('Decorating:', target);
}

@simpleDecorator
class Example {
  @simpleDecorator
  method() {}
}
```

#### 第二阶段（当前主流）
```typescript
// 第二阶段的语法（当前 TypeScript 支持）
// 主要特点：支持装饰器工厂、更丰富的参数

// 装饰器工厂
function decoratorFactory(options) {
  return function(target, propertyKey, descriptor) {
    console.log('Decorating with options:', options);
    console.log('Target:', target);
    console.log('Property:', propertyKey);
    console.log('Descriptor:', descriptor);
  };
}

@decoratorFactory({ name: 'test' })
class Example {
  @decoratorFactory({ validate: true })
  method() {}
}
```

#### 第三阶段（新提案）
```typescript
// 第三阶段的语法（新提案）
// 主要特点：更简洁的语法、更好的类型推断

// 新的装饰器语法
@decorator
class Example {
  @decorator
  method() {}
  
  // 新的特性：装饰器可以返回新的类定义
  @decorator
  get property() {}
  
  @decorator
  set property(value) {}
}

// 装饰器可以返回新的类
function replaceClass<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = "new value";
    hello = "override";
  };
}

@replaceClass
class Example {
  property = "original";
}
```

### 主要差异对比

| 特性 | 第一阶段 | 第二阶段 | 第三阶段 |
|------|----------|----------|----------|
| 语法复杂度 | 简单函数 | 支持工厂和参数 | 更简洁的语法 |
| 参数支持 | 只有 target | 支持 propertyKey 和 descriptor | 更丰富的参数类型 |
| 返回值处理 | 不能返回新定义 | 可以返回新的描述符 | 可以返回新的类定义 |
| 类型支持 | 基本类型支持 | 更详细的类型 | 更好的类型推断 |

## 装饰器的类型

### 1. 类装饰器 (Class Decorator)

类装饰器应用于类的构造函数，可以用来观察、修改或替换类定义。

```typescript
// 简单的类装饰器
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Max';
  
  constructor() {
    console.log('Creating person object...');
  }
}

// 装饰器工厂（返回装饰器函数）
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger('LOGGING - PERSON')
class Person {
  name = 'Max';
  
  constructor() {
    console.log('Creating person object...');
  }
}
```

### 2. 方法装饰器 (Method Decorator)

方法装饰器应用于类的方法，可以用来观察、修改或替换方法定义。

```typescript
// 方法装饰器
/**
 * @param target 装饰的目标对象，如果是静态成员，则是类的构造函数，如果是实例成员，则是类的原型对象
 * @param propertyName 装饰的成员名称
 * @param descriptor 成员的属性描述符
 */
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  console.log('Method decorator!');
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
}

class Product {
  title: string;
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  @Log
  getPriceWithTax() {
    return this.price * 1.2;
  }
}
```

### 3. 属性装饰器 (Property Decorator)

属性装饰器应用于类的属性，可以用来观察、修改或替换属性定义。

```typescript
// 属性装饰器
/**
 *
 * @param target 装饰的目标对象，对于静态属性来说就是类的构造函数，对于实例属性来说就是类的原型对象
 * @param propertyName 装饰的属性名称
 */
function Log(target: any, propertyName: string) {
  console.log('Property decorator!');
  console.log(target);
  console.log(propertyName);
}

class Product {
  @Log
  title: string;
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}
```

### 4. 访问器装饰器 (Accessor Decorator)

访问器装饰器应用于类的访问器（getter/setter）。

```typescript
// 访问器装饰器
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
}

class Product {
  private _price: number;

  constructor(price: number) {
    this._price = price;
  }

  @Log
  get price() {
    return this._price;
  }

  @Log
  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }
}
```

### 5. 参数装饰器 (Parameter Decorator)

参数装饰器应用于类构造函数或方法的参数。

```typescript
// 参数装饰器
/**
 * @param target 装饰的目标对象，对于静态属性来说就是类的构造函数，对于实例属性来说就是类的原型对象
 * @param propertyName 参数所属的方法名称
 * @param parameterIndex 参数在参数列表中的索引 0
 */
function Log(target: any, propertyName: string, paramIndex: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(propertyName);
  console.log(paramIndex);
}

class Product {
  title: string;
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getPriceWithTax(@Log taxRate: number) {
    return this.price * (1 + taxRate);
  }
}
```

## 装饰器的实际应用

### 1. 验证装饰器

```typescript
// 验证装饰器
function MinLength(length: number) {
  return function(target: any, propertyName: string) {
    let value: string;
    
    const getter = function() {
      return value;
    };
    
    const setter = function(newVal: string) {
      if (newVal.length < length) {
        throw new Error(`${propertyName} should be at least ${length} characters long`);
      }
      value = newVal;
    };
    
    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter
    });
  };
}

class User {
  @MinLength(3)
  username: string;
  
  constructor(username: string) {
    this.username = username;
  }
}

const user = new User('ab'); // 会抛出错误
```

### 2. 自动绑定装饰器

```typescript
// 自动绑定装饰器
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works!';

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage); // 不需要 bind
```

### 3. 路由装饰器（类似 NestJS）

```typescript
// 路由装饰器
function Controller(prefix: string) {
  return function(constructor: Function) {
    console.log(`Controller ${constructor.name} registered with prefix: ${prefix}`);
  };
}

function Get(path: string) {
  return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    console.log(`GET route ${path} registered for method ${propertyName}`);
  };
}

@Controller('/users')
class UserController {
  @Get('/list')
  getUsers() {
    return ['user1', 'user2'];
  }
  
  @Get('/:id')
  getUser(id: string) {
    return { id, name: 'John' };
  }
}
```

## 装饰器的执行顺序

```typescript
// 装饰器执行顺序
function Logger1() {
  console.log('Logger 1');
  return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    console.log('Logger 1 - method');
  };
}

function Logger2() {
  console.log('Logger 2');
  return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    console.log('Logger 2 - method');
  };
}

class Example {
  @Logger1()
  @Logger2()
  method() {
    console.log('Method executed');
  }
}

// 执行顺序：
// Logger 1
// Logger 2
// Logger 2 - method
// Logger 1 - method
```

### 执行顺序规则

1. **装饰器工厂**：从上到下执行
2. **装饰器函数**：从下到上执行
3. **类装饰器**：在类定义之后执行
4. **方法/属性装饰器**：在属性定义时执行

## 配置要求

### TypeScript 配置

在 `tsconfig.json` 中启用装饰器：

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,  // 启用实验性装饰器
    "emitDecoratorMetadata": true    // 生成装饰器元数据
  }
}
```

### Babel 配置

如果使用 Babel，需要安装装饰器插件：

```bash
npm install --save-dev @babel/plugin-proposal-decorators
```

```json
// .babelrc
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}
```

### 导入 reflect-metadata

```typescript
import 'reflect-metadata';
```

## 现代框架中的装饰器应用

### 1. NestJS 框架

```typescript
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }
}
```

### 2. Angular 框架

```typescript
@Component({
  selector: 'app-user',
  template: '<div>User</div>'
})
class UserComponent {}
```

### 3. TypeORM 实体

```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

## 总结

装饰器是 TypeScript 中非常强大的功能，它们可以：

1. **观察**：记录方法调用、属性访问等
2. **修改**：改变方法行为、添加验证等
3. **替换**：完全替换方法实现
4. **元数据**：为框架提供额外的信息

虽然装饰器还没有正式纳入 ECMAScript 标准，但在实际开发中：

- **广泛使用**：NestJS、Angular、TypeORM 等框架都大量使用
- **工具链支持**：TypeScript、Babel、各种 IDE 都有良好支持
- **标准化进程**：正在 TC39 委员会中讨论，预计未来会正式纳入

装饰器让代码更加声明式和可读，是构建现代 TypeScript 应用的重要工具。
