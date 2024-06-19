import clc from 'cli-color'
export class Logger{
    private static lastLogTime = Date.now()
    //定义了一个用来打印日志的工具方法
    static log(message:string,context:string=''){
        //获取当前的时间戳
        const timestamp = new Date().toLocaleString()
        //获取当前的进程ID
        const pid = process.pid;
        const currentTime = Date.now();
        const timeDiff = currentTime - this.lastLogTime;
        console.log(`[${clc.green('Nest')}] ${clc.green(pid.toString())}  - ${clc.yellow(timestamp)}     ${clc.green('LOG')} [${clc.yellow(context)}] ${clc.green(message)} ${clc.white('+')}${clc.green(timeDiff)}${clc.white('ms')}`);;
        this.lastLogTime = currentTime;
    }
}