let providerInstances = {
    Service:new Service()
}
let moduleProviers = {
    moduleA:new Set(Service),
    moduleB:new Set(Service)
}
let globalProviders =new Set(Service)
class Service {}
let moduleA = {
    providers: [Service],
    exports: [Service]
}
let moduleB = {
    providers: [Service],
    exports: [Service]
}
let AppModule = {
    imports: [moduleA, moduleB]
}