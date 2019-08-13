import React from 'react';
import ItemBox from './ItemBox';
import { inject } from 'mobx-react';


@inject('httpService')
class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.indexItems();
    }


    // 카테고리 하나 누른다음 다른 카테고리 누르면 화면에서 바로 바뀔수 있게 해줌
    componentDidUpdate(prevProps){
        if(this.props.match.params.categoryId !== prevProps.match.params.categoryId){
            this.indexItems();
        }
       
    }

    indexItems() {
        const categoryId = this.props.match.params.categoryId;
        this.props.httpService.indexCategoryItems(categoryId)
            .then((items) => {
                this.setState({
                    items: items
                });
            });
    }


    render() {
        const items = this.state.items.map((item) => {
            return (
                <ItemBox key={item.id} item={item} />
            )
        });

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