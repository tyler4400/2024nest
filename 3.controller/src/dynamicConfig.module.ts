
import {Module,DynamicModule} from '@nestjs/common'
export interface Config{
    apiKey:string;
}
@Module({
    providers:[
        {
            provide:'PREFIX',
            useValue:'prefix'
        }
    ],
    exports:['PREFIX']
})
export class DynamicConfigModule{
    static forRoot(apiKey):DynamicModule|Promise<DynamicModule>{
        //极据参数动态创建providers
        const providers = [
            {
                provide:'CONFIG',
                useValue:{apiKey}
            }
        ]
        const controllers = []
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve({
                    module:DynamicConfigModule,
                    controllers,
                    providers,
                    exports:providers.map(provider=>provider instanceof Function?provider:provider.provide)
                });
            },3000)
        });
/*         return {
            module:DynamicConfigModule,
            controllers,
            providers,
            exports:providers.map(provider=>provider instanceof Function?provider:provider.provide)
        } */
    }
}