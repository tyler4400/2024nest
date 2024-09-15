import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class ConfigurationService{
   constructor(private configService:ConfigService){}
   get mysqlHost():string {
    return this.configService.get<string>('MYSQL_HOST');
   }
   get mysqlPort():number {
    return this.configService.get<number>('MYSQL_PORT');
   }
   get mysqlDB():string {
    return this.configService.get<string>('MYSQL_DB');
   }
   get mysqlUser():string {
    return this.configService.get<string>('MYSQL_USER');
   }
   get mysqlPassword():string {
    return this.configService.get<string>('MYSQL_PASSWORD');
   }
   get mysqlConfig(){
    return {
        host:this.mysqlHost,
        port:this.mysqlPort,
        database:this.mysqlDB,
        username:this.mysqlUser,
        password:this.mysqlPassword
    }
   }
   get cosSecretId():string {
    return this.configService.get<string>('COS_SECRET_ID');
   }
   get cosSecretKey():string {
    return this.configService.get<string>('COS_SECRET_KEY');
   }
   get cosBucket():string {
    return this.configService.get<string>('COS_BUCKET');
   }
   get cosRegion():string {
    return this.configService.get<string>('COS_REGION');
   }
   get smtpHost():string {
    return this.configService.get<string>('SMTP_HOST');
   }
   get smtpPort():string {
    return this.configService.get<string>('SMTP_PORT');
   }
   get smtpUser():string {
    return this.configService.get<string>('SMTP_USER');
   }
   get smtpPass():string {
    return this.configService.get<string>('SMTP_PASS');
   }
   get mongodbHost():string{
    return this.configService.get<string>('MONGO_HOST');
   }
   get mongodbPort():string{
    return this.configService.get<string>('MONGO_PORT');
   }
   get mongodbDB():string{
    return this.configService.get<string>('MONGO_DB');
   }
   get mongodbUser():string{
    return this.configService.get<string>('MONGO_USER');
   }
   get mongodbPassword():string{
    return this.configService.get<string>('MONGO_PASSWORD');
   }
   get mongodbConfig(){
    return {
        uri:`mongodb://${this.mongodbHost}:${this.mongodbPort}/${this.mongodbDB}`
    }
   }
   get ipApiUrl ():string{
    return this.configService.get<string>('IP_API_URL');
   }
   get weatherApiKey ():string{
    return this.configService.get<string>('WEATHER_API_KEY');
   }
   get weatherApiUrl ():string{
    return this.configService.get<string>('WEATHER_API_URL');
   }
   get redisHost ():string{
    return this.configService.get<string>('REDIS_HOST');
   }
   get redisPort ():number{
    return this.configService.get<number>('REDIS_PORT');
   }
   get redisPassword ():string{
    return this.configService.get<string>('REDIS_PASSWORD');
   }
   get jwtSecret():string{
    return this.configService.get<string>('JWT_SECRET');
   }
}