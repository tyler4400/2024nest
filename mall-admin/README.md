默认情况下是一个仓库一个项目

nest g app mall-api

apps 是一个文件夹，存放多个应用，每个应用都是一个独立的Nest.js应用或微服务
它们可以是不同的微服务 API网关 或任何其它类型的应用

libs 是一个文件夹，存放可重用的模块或者库，如常用的服务 DTO(数据传输对象)
验证逻辑

libs中的库可以被 apps里的应用进行引用，从而避免重复开发

nest g library shared
