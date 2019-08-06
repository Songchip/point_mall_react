import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataHelper from '../DataHelper';
import { observer } from 'mobx-react'

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
        this.helper.deleteToken();
    }

    render() {
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
                    {
                        this.helper.isLoggedIn ?
                        <button onClick={this.logout}>Logout</button> :
                        <Link to="/login">Login</Link>
                    }
                </div>
                <br></br>
                <div className="header-right2">
                    <Link to="/me/items">MyItems</Link>
                    <Link to="/cart/items">Cart</Link>

                </div>
            </header>
        );
    }

}

export default Header;