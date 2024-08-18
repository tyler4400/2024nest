// 假设当前URL是: https://example.com/?param1=value1&param2=value2
 
// 首先，创建一个新的URLSearchParams实例
const params = new URLSearchParams(window.location.search);
 
// 获取单个参数
const param1 = params.get('param1'); // 返回 'value1'
 
// 检查参数是否存在
const hasParam2 = params.has('param2'); // 返回 true
 
// 获取所有指定的参数
const allParams = params.getAll('param1'); // 返回 ['value1']
 
// 获取所有参数的迭代器
for (const [key, value] of params) {
  console.log(key, value);
}
 
// 示例输出:
// param1 value1
// param2 value2