import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createCoverageMap } from 'istanbul-lib-coverage';


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories : []
        };
    }

    componentDidMount(){
        this.indexCategories();
    }

    indexCategories() {
        axios.get('http://localhost:8001/categories/').then((response) => {
            const categories = response.data;
            this.setState({
                categories: categories
            });
        });
    }

    render() {
        const categories = this.state.categories.map((category) =>{
            return (
                <Link key = {category.id} to={'/categories/' + category.id}>{category.title}</Link>
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
                    <Link to="/login">Login</Link>
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