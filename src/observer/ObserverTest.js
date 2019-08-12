import React from 'react';
import Counter from './Counter';


export default class ObserverTest extends React.Component{

    constructor(props) {
        super(props);
        this.counter = new Counter();
        console.log(2);
        this.counter.addObserver(this);
    }

    increase = () =>{
        console.log(4);
        this.counter.count++;
    }

    decrease = () => {
        this.counter.count--;
    }
    render() {
        return (
            <div>
                <h1>ObserverTest</h1>
                <h2>{this.counter.count}</h2>
                <button onClick={this.increase}>Increase</button>
                <button onClick={this.decrease}>Decrease</button>
            </div>
        );
    }
}