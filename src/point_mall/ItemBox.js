import React from 'react';
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react';


@inject('httpService')
class ItemBox extends React.Component {

    goToItem = () => {
        const item = this.props.item;
        this.props.history.push('/items/' + item.id);
    }

    render() {
        const item = this.props.item;
        const count = this.props.count;


        return (
            <div key={item.id} className="item-container" onClick={this.goToItem}>
                <img src={item.image} alt="" />
                <p className="item-title"> {item.title}</p>
                <p className="item-price">
                    {count == null ?
                        '가격: ' + item.price + ' Point':
                        '개수: ' + count}
                </p>
            </div>
        );
    }
}


export default withRouter(ItemBox);