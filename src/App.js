import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './point_mall/Home';
import Login from './point_mall/Login';
import Header from './point_mall/Header';
import Footer from './point_mall/Footer';
import ItemDetail from './point_mall/ItemDetail';
import MyItems from './point_mall/MyItems';
import Categories from './point_mall/Categories';
import CartItems from './point_mall/CartItems';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/items/:itemId" component={ItemDetail} />
          <Route exact path="/me/items" component={MyItems} />
          <Route exact path="/categories/:categoryId" component={Categories} />
          <Route exact path="/cart/items" component={CartItems} />
        </Switch>
        <Footer />
      </div>
    </Router>

  );
}

export default App;
