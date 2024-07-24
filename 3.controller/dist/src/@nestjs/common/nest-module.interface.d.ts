import { MiddlewareConsumer } from './middleware-consumer.interface';
export interface NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
