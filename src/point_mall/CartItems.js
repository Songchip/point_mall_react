import React from 'react';
import axios from 'axios';
import ItemBox from './ItemBox';
import { withRouter } from 'react-router-dom'
import DataHelper from '../DataHelper';


class CartItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            count: 1,
        }
    }

    componentDidMount() {
        this.indexItems();
    }

    indexItems = () => {
        let cartItems = localStorage.getItem('cart_items');
        if (cartItems == null || cartItems.length < 1) {
            cartItems = [];
        }
        else {
            cartItems = JSON.parse(cartItems);
        }

        this.setState({
            cartItems
        });
    }


    purchase = () => {
        const items = [];
        for (let cartItem of this.state.cartItems) {
            items.push({
                item_id: cartItem.item.id,
                count: cartItem.count
            })
        }
        axios.post(DataHelper.baseURL() + '/items/purchase/',
            {
                items
            },
            {
                headers: {
                    'Authorization': DataHelper.getAuthToken()
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


    render() {

        const items = this.state.cartItems.map((cartItem) => {
            const item = cartItem.item;
            return (
                <ItemBox key={item.id}
                    item={item}
                    count={cartItem.count} />
            )
        });
        console.log(items);
        return (
            <div>
                <div id="container">
                    <h1>장바구니</h1>
                    <button onClick={this.purchase}>구입</button>
                    <div id="item-list-container">
                        {items}
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(CartItems);