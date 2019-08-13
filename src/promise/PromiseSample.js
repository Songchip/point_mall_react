class PromiseSample {
    constructor(func){
        this._then = function () { };
        this._catch = function () { };

        const callThen = function(){
            this._then();
        };
        const callCatch = function () {
            this._catch();
        };
        func(callThen, callCatch);
    }

    then(func){
        this._then = func;
        return this;
    }

    catch(func){
        this.catch = func;
        return this;
    }
}

export default PromiseSample;