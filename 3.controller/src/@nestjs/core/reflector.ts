import { SetMetadata } from '@nestjs/common';
import 'reflect-metadata';
export class Reflector {
    get(metadataKey, target, key?) {
        return key ? Reflect.getMetadata(metadataKey, target, key) : Reflect.getMetadata(metadataKey, target);
    }
    static createDecorator() {
        function decoratorFactory(metadataValue) {
            //target=AccountController.prototype  propertyKey=index descriptor.value=index函数
            return SetMetadata(decoratorFactory, metadataValue);
        }
        return decoratorFactory;
    }
}