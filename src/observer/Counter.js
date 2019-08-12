export default class Counter {
    constructor() {
        this._observers = [];
        this._count = 0;
        console.log(1);
    }

    addObserver(observer) {
        console.log(3);
        this._observers.push(observer);
    }

    get count() {
        console.log("언제");
        return this._count;
    }

    set count(count) {
        console.log(5);
        this._count = count;
        for (let observer of this._observers){
            console.log(6);
            observer.forceUpdate();
        }
    }

}