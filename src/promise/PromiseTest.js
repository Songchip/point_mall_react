import React from 'react'
import PromiseSample from './PromiseSample'

class PromiseTest extends React.Component{

    callback(func){
        for(let i =0; i<10; i++){
            func(i);
        }
    }

    callbackTest = () =>{
        const callbackFuc = function(i){
            console.log('callback' + i);
        };
        this.callback(callbackFuc);
    }

    promiseTest = () =>{

        const promise = new Promise((resolve, reject) =>{
            let a =1;
            const b=2;
            resolve(a + b);
            
            // reject();
        });

        promise.then((result) =>{
            console.log('promise resolve '+ result);
            return result;
        }).then(result=>{
            console.log('promise ' + result);
        }).catch(() => {
            console.log('promise reject');
        });
    }

    render(){
        return(
            <div>
                <h1>PromiseTest</h1>
                <button onClick={this.callbackTest}>Callback</button>
                <button onClick={this.promiseTest}>Promise</button>
            </div>
        );
    }
}

export default PromiseTest;
