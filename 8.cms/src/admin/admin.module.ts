import { Module } from '@nestjs/common';
import { DashboardController } from './controllers/dashboard.controller';
import { UserController } from './controllers/user.controller';
import { RoleController } from "./controllers/role.controller";
@Module({
    controllers: [DashboardController, UserController]
})
export class AdminModule {
}
