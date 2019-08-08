 import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import DataHelper from '../DataHelper';
import { inject } from 'mobx-react';


@inject('authStore', 'itemStore')
class ItemDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            count: 1
        };
    }

    componentDidMount() {
        this.getItem();
    }

    getItem = () => {
        const itemId = this.props.match.params.itemId;
        axios.get(DataHelper.baseURL() + '/items/' + itemId)
            .then((response) => {
                const item = response.data;
                this.setState({
                    item: item
                })
            });
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'countname') {
            this.setState({
                count: target.value
            });
        }
    }


    puurchase = () => {
        const itemId = this.state.item.id;
        const {authStore} = this.props;
        const count = this.state.count;
        axios.post(DataHelper.baseURL() + '/items/' + itemId + '/purchase/',
            {
                count: count
            },
            {
                headers: {
                    'Authorization': authStore.authToken
                }
            }
        ).then((response) => {
            // console.log(response.data);
            this.props.history.push('/me/items')
        });
    }


    addToCart = () => {
        // [
        //     {
        //         item:{
        //             id: 1,
        //             title: 'dsf',
        //         },
        //         count: 1
        //     }
        // ]
        const { itemStore } = this.props;
        const item = this.state.item;
        const count = this.state.count;
        itemStore.addItemToCart(item);

   
    }

    render() {

        const item = this.state.item;
        const title = this.state.item ? item.title : '';
        const desc = this.state.item ? item.description : '';
        const image = this.state.item ? item.image : null;
        const count = this.state.count ? this.state.count : 1;

        return (
            <div id="container">
                <div className="item-image-container">
                    <img src={image} alt="" />
                </div>
                <div className="item-detail-container">
                    <p>
                        <b>{title}</b>
                    </p>
                    <p>
                        {desc}
                    </p>

                    <input type="number" value={count}
                        onChange={this.onInputChanged}
                        name = "countname" />

                    <button onClick={this.puurchase}>구입</button>
                    <button onClick={this.addToCart}>장바구니에 담기</button>
                </div>
            </div>
        );
    }
}

export default withRouter(ItemDetail);