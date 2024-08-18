const winston = require('winston');
//创建一个日志记录器的实例
const logger = winston.createLogger({
    //设置日志的级别
    level:'info',
    //设置日志的格式
    format:winston.format.json(),
    //配置日志的传输方式
    transports:[
        new winston.transports.Console(),//写入控制台
        new winston.transports.File({filename:'combined.log'})//写入文件
    ]
})
logger.error('这是一条error日志');//错误级别
logger.warn('这是一条warn日志');//警告
logger.info('这是一条info日志');//消息
logger.debug('这是一条debug日志');//详细
logger.verbose('这是一条verbose日志');//调试
logger.silly('这是一条silly日志');//无意义