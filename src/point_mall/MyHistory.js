import React from 'react';
import ItemBox from './ItemBox';
import { inject } from 'mobx-react';


@inject('httpService')
class MyHistory extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            histories: []
        }
    }

    componentDidMount(){
        this.indexHistory();
    }

    indexHistory(){
        this.props.httpService.indexHistory()
            .then(histories => {
                this.setState({
                    histories
                })
            });
    }

    refund = (historyId) =>{
        this.props.httpService.refundHistory(historyId)
            .then(history => {
                this.indexHistory()
            });
    }

    render(){
        const histories = this.state.histories.map((history) =>{
            const items = history.items.map((historyItem)=>{
                const item = historyItem.item;
                return (
                    <ItemBox 
                        key={item.id} 
                        item={item}
                        count = {historyItem.count} />
                )
            });

            return (
                <div className="history-container" key={history.id}>
                    <h1>{history.created}</h1>
                    <div>
                        {!history.is_refunded &&
                            <button onClick={ () => {this.refund(history.id)} }>
                                Refund
                            </button>}
                    </div>
                    {items}
                </div>
            )
        });
        return (
            <div>
                {histories}
            </div>
        )
    }
}


export default MyHistory;