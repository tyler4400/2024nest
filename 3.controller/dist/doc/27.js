class Observable {
    constructor(_subscribe) {
        this._subscribe = _subscribe;
    }
    subscribe(observer) {
        return this._subscribe(observer);
    }
}
function of(...values) {
    return new Observable((observer) => {
        values.forEach(value => observer.next(value));
        observer.complete();
    });
}
of(1, 2, 3).subscribe({
    next: value => console.log(value),
    error: console.error,
    complete: () => console.log('completed')
});
//# sourceMappingURL=27.js.map