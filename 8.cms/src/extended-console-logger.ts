import { ConsoleLogger } from "@nestjs/common";
export class ExtendedConsoleLogger extends ConsoleLogger{
    log(message:any,stack?:string,context?:string){
        super.log(message,stack,context);
    }
}