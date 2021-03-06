import React from 'react';
import ItemBox from './ItemBox';
import { inject } from 'mobx-react';


@inject('httpService')
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    componentDidMount() {
        this.indexItems();
    }

    indexItems() {
        this.props.httpService.indexItems()
            .then((items) => {
                this.setState({
                    items: items
                });
            });

            // axios.get(DataHelper.baseURL() + '/items/')
            // .then((response) => {
            //     const items = response.data;
            //     this.setState({
            //         items: items
            //     })
            // });
    }

    render() {

        // for문으로 item에 들어있는 모든 객체 탐색하여 ItemBox에 props를 넘김 그리고 items에 하나씩 list로 저장됨
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

export default Home;