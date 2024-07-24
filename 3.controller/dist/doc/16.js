class User {
}
const plainUser = { name: 'nick', age: 18 };
const user = plainToInstance(User, plainUser);
console.log(user instanceof User);
const plainObject = instanceToPlain(user);
console.log(plainObject);
console.log(plainObject instanceof User);
function plainToInstance(Clazz, obj) {
    let instance = new Clazz();
    for (let key in obj) {
        instance[key] = obj[key];
    }
    return instance;
}
function instanceToPlain(instance) {
    return JSON.parse(JSON.stringify(instance));
}
//# sourceMappingURL=16.js.map