import React from 'react';
import axios from 'axios';
import ItemBox from './ItemBox';


class MyItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userItems: []
        }
    }

    componentDidMount() {
        this.getUser();
        this.indexItems();
    }

    indexItems = () => {
        axios.get('http://localhost:8001/me/items/',
            {
                headers: {
                    'Authorization': localStorage.getItem('authorization')
                }
            }
        ).then((response) => {
            const items = response.data;
            this.setState({
                userItems: items
            })
        });
    }

    getUser = () => { 
        axios.get(
            'http://localhost:8001/me/', {
                headers: {
                    'Authorization': localStorage.getItem('authorization')
                }
            }
        ).then((response) => {
            const user = response.data;
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
                    user = {user}
                    count={userItem.count} />
            )
        });
        console.log(items);
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