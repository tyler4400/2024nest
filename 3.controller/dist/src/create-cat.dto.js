"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCatSchema = void 0;
const zod_1 = require("zod");
exports.createCatSchema = zod_1.z.object({
    name: zod_1.z.string(),
    age: zod_1.z.number()
}).required();
//# sourceMappingURL=create-cat.dto.js.map