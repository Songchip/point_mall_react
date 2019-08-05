import React from 'react';
import axios from 'axios';
import ItemBox from './ItemBox';




class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.getItem();
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.categoryId !== prevProps.match.params.categoryId){
            this.getItem();
        }
       
    }

    getItem = () => {
        const categoryId = this.props.match.params.categoryId;
        axios.get('http://localhost:8001/categories/' + categoryId + '/items/')
            .then((response) => {
                const items = response.data;
                this.setState({
                    items: items
                })
            });
    }

    render() {
        const items = this.state.items.map((item) => {
            return (
                <ItemBox key={item.id} item={item} />
            )
        });
        console.log(items);
        return (
            <div>
                <div id="container">
                    <div id="item-list-container">
                        {items}
                    </div>
                </div>
            </div>
        );
    }

}


export default Categories;