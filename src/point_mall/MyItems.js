import React from 'react';
import ItemBox from './ItemBox';
import { inject } from 'mobx-react';



@inject('authStore', 'httpService')
class MyItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userItems: []
        }
    }

    componentDidMount() {
        this.getMe();
        this.indexMyItems();
    }

    indexMyItems = () => {
        this.props.httpService.indexMyItems()
            .then((userItems) => {
                this.setState({
                    userItems: userItems
                })
            });
    }

    getMe = () => {
        this.props.httpService.getMe()
            .then((user) => {
                this.setState({
                    user: user
                });
            });
    }

    render() {
        const user = this.state.user;
        const point = user ? user.point : 0;
        const items = this.state.userItems.map((userItem) => {
            const item = userItem.item;
            return (
                <ItemBox key={item.id}
                    item={item}
                    user={user}
                    count={userItem.count} />
            )
        });

        return (
            <div>
                <div id="container">
                    <h1>내 아이템 목록</h1>
                    <h2>현재 잔고 : {point} Point</h2>
                    <div id="item-list-container">
                        {items}
                    </div>

                </div>
            </div>
        );
    }
}

export default MyItems;