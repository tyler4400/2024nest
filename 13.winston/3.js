const winston = require('winston');
const {combine,timestamp,printf} = winston.format;
const myFormat = printf(({level,message,timestamp})=>{
   return `${timestamp} ${level} ${message}`
})
//创建一个日志记录器的实例
const logger = winston.createLogger({
    //设置日志的级别
    level:'info',
    //设置日志的格式
    //结合时间戳和自定义格式化函数
    format:combine(
        timestamp({format:''}),//添加时间戳
        myFormat//应用自定义格式
    ),
    //配置日志的传输方式
    transports:[
        new winston.transports.Console(),//写入控制台
        new winston.transports.File({filename:'combined.log'}),//写入文件
        new winston.transports.File({filename:'error.log',level:"error"})//写入文件
    ]
})
logger.info('这是一条info日志');//错误级别