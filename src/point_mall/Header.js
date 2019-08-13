import React from 'react'
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';


@inject('authStore', 'itemStore', 'httpService')
@observer
class Header extends React.Component {

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
        this.props.httpService.indexCategories()
            .then((categories) => {
            this.setState({
                categories: categories
            });
        });
    }

    login = () => {
        window.location.href = "/login";
    }

    logout = () => {
        const { authStore } = this.props;
        authStore.deleteToken();
    }

    render() {
        const { authStore, itemStore } = this.props;
        const username = authStore.user;
        console.log(username);
        const categories = this.state.categories.map((category) => {
            return (
                <Link key={category.id} to={'/categories/' + category.id}>{category.title}</Link>
            )
        });
        return (
            <header>
                <Link to="/">PointMall</Link>
                <span id="type_right">
                    {
                        authStore.isLoggedIn && <span>사용자: {username}</span>
                    }
                </span>
                <br></br>
                {categories}
                <div className="item-category">
                </div>

                <div className="header-right">
                    {
                        authStore.isLoggedIn && <Link to="/me/items">MyItems</Link>
                    }
                    {
                        authStore.isLoggedIn && <Link to="/users/point_charge">AddPoint</Link>
                    }
                    <Link to="/cart/items">Cart {itemStore.cartItemsCount}</Link>

                    <Link to="/register">회원가입</Link>
                    {
                        authStore.isLoggedIn ?
                            <button onClick={this.logout}>Logout</button>:
                            <button onClick={this.login}>Login</button>
                    }
                </div>

                <div className="header-right2">
                   
                </div>
            </header>
        );
    }

}

export default Header;