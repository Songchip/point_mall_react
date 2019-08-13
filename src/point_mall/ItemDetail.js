import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject } from 'mobx-react';


@inject('authStore', 'itemStore', 'httpService')
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
        this.props.httpService.getItem(itemId)
            .then((item) => {
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


    purchase = () => {
        const itemId = this.state.item.id;
        const count = this.state.count;
        this.props.httpService.purchaseItem(
            itemId,
            count
        ).then((response) => {
            // console.log(response.data);
            this.props.history.push('/me/items')
        }).catch((error) => {
            console.log(error)
            if (error.response.status === 402) {
                alert("포인트가 부족합니다.")
                this.props.history.push('/users/point_charge/')
            }
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
        itemStore.addItemToCart(item, count);
        this.props.history.push('/');

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
                        name="countname" />

                    <button onClick={this.purchase}>구입</button>
                    <button onClick={this.addToCart}>장바구니에 담기</button>
                </div>
            </div>
        );
    }
}

export default withRouter(ItemDetail);