import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';



class ItemDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            count: 0
        };
    }

    componentDidMount() {
        this.getItem();
    }

    getItem = () => {
        const itemId = this.props.match.params.itemId;
        axios.get('http://localhost:8003/items/' + itemId)
            .then((response) => {
                const item = response.data;
                this.setState({
                    item: item
                })
            });
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name == 'countname') {
            this.setState({
                count: target.value
            });
        }
    }


    puurchase = () => {
        const itemId = this.state.item.id;
        const count = this.state.count;
        axios.post('http://localhost:8003/items/' + itemId + '/purchase/',
            {
                count: count
            },
            {
                headers: {
                    'Authorization': localStorage.getItem('authorization')
                }
            }
        ).then((response) => {
            // console.log(response.data);
            this.props.history.push('/me/items')
        });
    }

    render() {

        const item = this.state.item;
        const title = this.state.item ? item.title : '';
        const desc = this.state.item ? item.description : '';
        const image = this.state.item ? item.image : null;

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

                    <input type="number" value={this.state.count}
                        onChange={this.onInputChanged}
                        name = "countname" />

                    <button onClick={this.puurchase}>구입</button>
                </div>
            </div>
        );
    }
}

export default withRouter(ItemDetail);