import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataHelper from '../DataHelper';
import { observer, inject } from 'mobx-react';


@inject('authStore', 'itemStore')
@observer
class Header extends React.Component {
    helper = new DataHelper();

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };

    }

    componentDidMount() {
        this.indexCategories();
    }

    indexCategories() {
        axios.get(DataHelper.baseURL() + '/categories/').then((response) => {
            const categories = response.data;
            this.setState({
                categories: categories
            });
        });
    }

    logout = () =>{
        const { authStore } = this.props;
        authStore.deleteToken();
    }

    render() {
        const { authStore, itemStore } = this.props;
        const categories = this.state.categories.map((category) => {
            return (
                <Link key={category.id} to={'/categories/' + category.id}>{category.title}</Link>
            )
        });
        return (
            <header>
                <Link to="/">PointMall</Link>
                <br></br>
                {categories}

                <div className="item-category">
                </div>

                <div className="header-right">
                    <Link to="/register">회원가입</Link>
                    {
                        authStore.isLoggedIn ?
                        <button onClick={this.logout}>Logout</button> :
                        <Link to="/login">Login</Link>
                    }
                </div>

                <div className="header-right2">
                    {
                        authStore.isLoggedIn && <Link to="/me/items">MyItems</Link>
                    }
                    
                    <Link to="/cart/items">Cart {itemStore.cartItemsCount}</Link>

                </div>
            </header>
        );
    }

}

export default Header;