import React from 'react'
import PromiseSample from './PromiseSample'



class PromiseTest extends React.Component {
    constructor(props) {
        super(props);
        this.count = 0;
        this.resolves = [];
        this.rejects = [];
    }

    createPromise = () => {
        new Promise((resolve, reject) => {

            new Promise((resolve1, reject1) => {
                this.resolves.push(()=>{
                    resolve1();
                });
                this.rejects.push(()=>{
                    reject1();
                });
            }).then(value => {
                console.log('then1: ' + this.count++);
                resolve();
            }).catch(error => {
                console.log('error1: ' + this.count--);
                reject();
            });
        }).then(value => {
            console.log('then: ' + this.count++);
        }).catch(error => {
            console.log('error: ' + this.count--);
        });
    }

    resolve = () => {
        for (let resolve of this.resolves) {
            resolve();
        }
        this.resolves =  [];
    }

    reject = () => {
        for (let reject of this.rejects) {
            reject();
        }
        this.rejects = [];
    }

    render() {
        return (
            <div>
                <h1>PromiseTest</h1>
                <button onClick={this.createPromise}>Create Promise</button>
                <button onClick={this.resolve}>Resolve</button>
                <button onClick={this.reject}>Reject</button>
            </div>
        );
    }
}

export default PromiseTest;
