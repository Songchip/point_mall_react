import React from 'react';
import ItemBox from './ItemBox';
import { inject } from 'mobx-react';


@inject('httpService' ,'history')
class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.tag != prevProps.match.params.tag) {
            this.indexItems();
        }

    }

    componentDidMount() {
        this.indexItems();
    }



    indexItems() {
        const tag = this.props.match.params.tag;
        this.props.httpService.indexTagItems(tag)
            .then((items) => {
                this.setState({
                    items: items
                });
            }).catch((error) => {
                if (error.response.status === 500) {
                    alert("해당 tag가 없습니다.");
                }
                this.props.history.push('/');
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


export default Tags;