import { Injectable } from '@nestjs/common';
import * as si from 'systeminformation';
function toGB(value:number){
    return (value/1024/1024/1024).toFixed(2)+'G';
}
@Injectable()
export class SystemService {
    async getSystemInfo(){
        //获取当前的CPU负载信息
        const cpu = await si.currentLoad();
        //获取 内存使用情况
        const memory = await si.mem();
        //获取磁盘的使用情况
        const disk = await si.fsSize();
        //获取操作系统 信息
        const osInfo = await si.osInfo();
        //获取网络接口信息
        const networkInterfaces = await si.networkInterfaces();
        return {
            cpu:{
                cores:cpu.cpus.length,//CPU的核心数
                userLoad:cpu.currentLoadUser.toFixed(2),//用户进程占用的CPU负载百分比
                systemLoad:cpu.currentLoadSystem.toFixed(2),//系统进程占用的CPU百分比
                idle:cpu.currentLoadIdle.toFixed(2)//空闲的CPU负载百分比
            },
            memory:{
                total:toGB(memory.total),//总内存
                used:toGB(memory.used),//已使用内存
                free:toGB(memory.free),//空闲内存
                usage:((memory.used/memory.total)*100).toFixed(2),//内存使用百分比
            },
            disks:disk.map(d=>({
                mount:d.mount,//挂载点 也就是盘符
                filesystem:d.fs,//文件系统类型
                type:d.type,//磁盘的类型
                size:toGB(d.size),//磁盘的总大小
                used:toGB(d.used),//已经使用的磁盘
                available:toGB(d.available),//可用的
                usage:d.use.toFixed(2)//使用效率
            })),
            server:{
                hostname:osInfo.hostname,//主机名
                ip:networkInterfaces[0]?.ip4||'N/A',//IP地址
                os:osInfo.distro,//操作系统发行版
                arch:osInfo.arch,//系统架构
            }
        }
    }
}
