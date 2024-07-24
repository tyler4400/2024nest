declare class Observable {
    private _subscribe;
    constructor(_subscribe: any);
    subscribe(observer: any): any;
}
declare function of(...values: any[]): Observable;
