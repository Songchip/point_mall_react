import React from 'react'
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';


@inject('authStore', 'itemStore', 'httpService', 'history')
@observer
class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            searchText: ''
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

    onInputChanged = (event) =>{
        const target = event.target;
        if(target.name === 'search'){
            this.setState({
                searchText: target.value
            });
        }
    }

    search = () =>{
        this.props.history.push('/tags/' + this.state.searchText);
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
                    {
                        authStore.isLoggedIn && <Link to="/me/history">History</Link>
                    }
                    <Link to="/cart/items">Cart {itemStore.cartItemsCount}</Link>

                    <Link to="/register">회원가입</Link>
                    {
                        authStore.isLoggedIn ?
                            <button onClick={this.logout}>Logout</button>:
                            <button onClick={this.login}>Login</button>
                    }
                    <br></br>
                    <span id="type_right">
                        <input style={{ marginLeft: 'lem' }}
                            value={this.state.searchText}
                            onChange={this.onInputChanged}
                            type="text" name="search" />
                        <button onClick={this.search}>search</button>
                    </span>
                </div>

                
            </header>
        );
    }

}

export default Header;