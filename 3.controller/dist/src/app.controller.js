"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const custom_pipe_1 = require("./custom.pipe");
const zod_validation_pipe_1 = require("./zod-validation.pipe");
const create_cat_dto_1 = require("./create-cat.dto");
const create_user_dto_1 = require("./create-user.dto");
var Roles;
(function (Roles) {
    Roles["Admin"] = "Admin";
    Roles["VIP"] = "VIP";
})(Roles || (Roles = {}));
let AppController = class AppController {
    getHello(id) {
        return id + '-hello';
    }
    getNumber(id) {
        return `The number is ${id}`;
    }
    getFloat(value) {
        return `The float value is ${value}`;
    }
    getBool(flag) {
        return `The boolean value is ${flag}`;
    }
    getArray(values) {
        return `The arra values are ${values}`;
    }
    getUUID(id) {
        return `The UUID is  ${id}`;
    }
    getRole(role) {
        return `The role is  ${role}`;
    }
    getDefault(username) {
        return `The username is  ${username}`;
    }
    getCustom(value, age) {
        return `value:  ${value}`;
    }
    async createCat(createCatDto) {
        console.log('createCatDto', createCatDto);
        return 'This action adds a new cat';
    }
    async createUser(createUserDto) {
        console.log('createUserDto', createUserDto);
        return 'This action adds a new user';
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)("hello/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)("number/:id"),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getNumber", null);
__decorate([
    (0, common_1.Get)("float/:value"),
    __param(0, (0, common_1.Param)('value', common_1.ParseFloatPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getFloat", null);
__decorate([
    (0, common_1.Get)("bool/:flag"),
    __param(0, (0, common_1.Param)('flag', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getBool", null);
__decorate([
    (0, common_1.Get)("array/:values"),
    __param(0, (0, common_1.Param)('values', new common_1.ParseArrayPipe({ items: String, separator: '@' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getArray", null);
__decorate([
    (0, common_1.Get)("uuid/:id"),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUUID", null);
__decorate([
    (0, common_1.Get)("admin/:role"),
    __param(0, (0, common_1.Param)('role', new common_1.ParseEnumPipe(Roles))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRole", null);
__decorate([
    (0, common_1.Get)("default"),
    __param(0, (0, common_1.Query)('username', new common_1.DefaultValuePipe("Guest"))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getDefault", null);
__decorate([
    (0, common_1.Get)("custom/:value"),
    __param(0, (0, common_1.Param)('value', custom_pipe_1.CustomPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCustom", null);
__decorate([
    (0, common_1.Post)('cats'),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_cat_dto_1.createCatSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createCat", null);
__decorate([
    (0, common_1.Post)('create/user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createUser", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map