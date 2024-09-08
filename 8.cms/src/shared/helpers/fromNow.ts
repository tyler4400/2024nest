import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import * as relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn');
dayjs.extend(relativeTime)
export function fromNow(date:string){
    return dayjs(date).fromNow();
}