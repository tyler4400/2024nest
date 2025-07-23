/**
 * 当您在tsconfig.json中配置了：
 * {
 *   "experimentalDecorators": true,
 *   "emitDecoratorMetadata": true
 * }
 * TypeScript编译器会自动为被装饰器装饰的类生成元数据，包括：
 * design:type - 属性的类型元数据
 * design:paramtypes - 构造函数参数的类型元数据
 * design:returntype - 方法返回值的类型元数据
 * 2. @Injectable的作用
 * @Injectable装饰器的作用不是注册元数据，而是：
 * 触发TypeScript编译器生成元数据：只有被装饰器装饰的类，编译器才会生成类型元数据
 * 标记类：表明这个类参与依赖注入系统
 */

import 'reflect-metadata'

// 定义一些测试用的类. 不能右键文件运行，要npm run test
class Oil {
  constructor(public capacity: number) {}
}

class Engine {
  constructor(public power: number) {}
}

// 通用装饰器 - 支持类装饰器和方法装饰器
function Injectable(target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
  if (propertyKey && descriptor) {
    // 方法装饰器
    console.log(`${target.constructor.name}.${propertyKey} 方法被装饰器装饰了`)
  } else {
    // 类装饰器
    console.log(`${target.name} 类被装饰器装饰了`)
  }
}

// 实验1：没有装饰器的类
class CarWithoutDecorator {
  constructor(private engine: Engine, private oil: Oil, private year: number) {}
}

// 实验2：有装饰器的类
@Injectable
class CarWithDecorator {
  constructor(private engine: Engine, private oil: Oil, private year: number) {}
}

// 实验3：不同参数类型的类
@Injectable
class ComplexClass {
  constructor(
    private stringParam: string,
    private numberParam: number,
    private booleanParam: boolean,
    private objectParam: Oil,
    private arrayParam: string[]
  ) {}
}

// 验证实验
console.log('=== TypeScript元数据自动生成验证实验 ===\n')

// 测试1：对比有无装饰器的元数据差异
console.log('1. 有无装饰器的元数据对比:')
const metadataWithoutDecorator = Reflect.getMetadata('design:paramtypes', CarWithoutDecorator)
const metadataWithDecorator = Reflect.getMetadata('design:paramtypes', CarWithDecorator)

console.log('   没有装饰器的类元数据:', metadataWithoutDecorator)
console.log('   有装饰器的类元数据:', metadataWithDecorator)
console.log('   是否相等:', metadataWithoutDecorator === metadataWithDecorator)

// 测试2：详细查看参数类型数组
console.log('\n2. 参数类型详细信息:')
if (metadataWithDecorator) {
  metadataWithDecorator.forEach((type: any, index: number) => {
    console.log(`   参数${index}: ${type.name}`)
  })
} else {
  console.log('   未找到参数类型元数据')
}

// 测试3：复杂参数类型的元数据
console.log('\n3. 复杂参数类型元数据:')
const complexMetadata = Reflect.getMetadata('design:paramtypes', ComplexClass)
console.log('   ComplexClass参数类型:', complexMetadata)
if (complexMetadata) {
  const typeNames = complexMetadata.map((type: any) => type.name || type)
  console.log('   参数类型名称:', typeNames)
}

// 测试4：验证编译器生成的其他元数据
console.log('\n4. 其他自动生成的元数据:')

class TestMethodMetadata {
  @Injectable
  testMethod(param1: string, param2: number): boolean {
    return true
  }
}

const methodParamTypes = Reflect.getMetadata(
  'design:paramtypes',
  TestMethodMetadata.prototype,
  'testMethod'
)
const methodReturnType = Reflect.getMetadata(
  'design:returntype',
  TestMethodMetadata.prototype,
  'testMethod'
)

console.log(
  '   方法参数类型:',
  methodParamTypes?.map((t: any) => t.name)
)
console.log('   方法返回类型:', methodReturnType?.name)

// 测试5：动态创建实例验证
console.log('\n5. 动态创建实例验证:')
if (metadataWithDecorator) {
  try {
    const mockEngine = new Engine(100)
    const mockOil = new Oil(50)
    const mockYear = 2024

    const carInstance = new CarWithDecorator(mockEngine, mockOil, mockYear)
    console.log('   成功创建CarWithDecorator实例:', !!carInstance)
  } catch (error) {
    console.log('   创建实例失败:', (error as Error).message)
  }
}

// 总结
console.log('\n=== 总结 ===')
if (metadataWithDecorator) {
  console.log('✅ 元数据生成成功！')
  console.log('1. TypeScript编译器正确生成了design:paramtypes元数据')
  console.log('2. 装饰器成功触发了元数据生成')
  console.log('3. 依赖注入框架可以获取类型信息')
} else {
  console.log('❌ 元数据生成失败！')
  console.log('请检查tsconfig.json配置是否正确')
}
