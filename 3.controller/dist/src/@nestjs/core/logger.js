"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const cli_color_1 = __importDefault(require("cli-color"));
class Logger {
    static log(message, context = '') {
        const timestamp = new Date().toLocaleString();
        const pid = process.pid;
        const currentTime = Date.now();
        const timeDiff = currentTime - this.lastLogTime;
        console.log(`[${cli_color_1.default.green('Nest')}] ${cli_color_1.default.green(pid.toString())}  - ${cli_color_1.default.yellow(timestamp)}     ${cli_color_1.default.green('LOG')} [${cli_color_1.default.yellow(context)}] ${cli_color_1.default.green(message)} ${cli_color_1.default.white('+')}${cli_color_1.default.green(timeDiff)}${cli_color_1.default.white('ms')}`);
        ;
        this.lastLogTime = currentTime;
    }
}
exports.Logger = Logger;
Logger.lastLogTime = Date.now();
//# sourceMappingURL=logger.js.map