export abstract class FileValidator {
    constructor(protected readonly validationOptions) { }
    abstract isValid(file?: any): boolean | Promise<boolean>;
}