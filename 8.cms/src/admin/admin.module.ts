import { Module } from '@nestjs/common';
import { DashboardController } from './controllers/dashboard.controller';
import { UserController } from './controllers/user.controller';
import { RoleController } from "./controllers/role.controller";
import { AccessController } from "./controllers/access.controller";
@Module({
    controllers: [DashboardController, UserController, RoleController, AccessController]
})
export class AdminModule {
}
