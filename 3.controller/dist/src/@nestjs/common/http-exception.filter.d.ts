import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
export declare class GlobalHttpExectionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
}
