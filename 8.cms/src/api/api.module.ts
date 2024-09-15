import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports:[
    JwtModule.register({
      global:true,
      signOptions:{expiresIn:'7d'}
    })
  ],
  controllers: [UserController, AuthController]
})
export class ApiModule {}
