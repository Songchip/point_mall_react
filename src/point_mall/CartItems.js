import React from 'react';
import axios from 'axios';
import ItemBox from './ItemBox';
import { withRouter } from 'react-router-dom'
import DataHelper from '../DataHelper';
import { inject, observer } from 'mobx-react';



@inject('authStore', 'itemStore')
@observer
class CartItems extends React.Component {
    

    purchase = () => {
        const items = [];
        const { authStore, itemStore } = this.props;
        for (let cartItem of itemStore.cartItems) {
            items.push({
                item_id: cartItem.item.id,
                count: cartItem.count
            });
        }
        axios.post(DataHelper.baseURL() + '/items/purchase/',
            {
                items
            },
            {
                headers: {
                    'Authorization': authStore.authToken
                }
            }
        ).then((response) => {
            localStorage.removeItem('cart_items')
            this.props.history.push('/me/items')
        }).catch((error) => {
            console.log(error)
            if (error.response.status === 402) {
                alert("포인트가 부족합니다.")
            }
        });
    }

    clearItems = () => {
        const { itemStore } = this.props;
        itemStore.clearCartItems();
    }

    render() {
        const { itemStore } = this.props;
        const items = itemStore.cartItems.map((cartItem) => {
            const item = cartItem.item;
            return (
                <ItemBox key={item.id}
                    item={item}
                    count={cartItem.count} />
            )
        });

        return (
            <div>
                <div id="container">
                    <h1>장바구니</h1>
                    <button onClick={this.purchase}>구입</button>
                    <button onClick={this.clearItems}>비우기</button>
                    <div id="item-list-container">
                        {items}
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(CartItems);