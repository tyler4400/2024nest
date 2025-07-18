/**
 *
 * @param target 装饰的目标对象，如果是静态成员，则是类的构造函数，如果是实例成员，则是类的原型对象
 * @param propertyKey 装饰的成员名称
 * @param descriptor 成员的属性描述符
 */
function Log(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
	console.log('=== 装饰器信息 ===');
	console.log('Target:', target);
	console.log('Target constructor:', target.constructor);
	console.log('Property Key:', propertyKey);
	console.log('是原型？', target === TestClass.prototype)
	console.log('是构造函数？', target === TestClass)
	console.log('=== 结束 ===');
}

class TestClass {
	// 实例方法 - target 是 TestClass.prototype
	@Log
	instanceMethod() {
		console.log('Instance method called');
	}

	// 静态方法 - target 是 TestClass 构造函数
	@Log
	static staticMethod() {
		console.log('Static method called');
	}
}

// 验证
console.log('TestClass.prototype:', TestClass.prototype);
console.log('TestClass:', TestClass);

/*
=== 装饰器信息 ===
Target: {}
Target constructor: [class TestClass]
Property Key: instanceMethod
target === TestClass.prototype true   // ！
=== 结束 ===
=== 装饰器信息 ===
Target: [class TestClass]
Target constructor: [Function: Function]
Property Key: staticMethod
target === TestClass.prototype false  // ！
=== 结束 ===
TestClass.prototype: {}
TestClass: [class TestClass]

 */
