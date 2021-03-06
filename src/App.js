import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './point_mall/Home';
import Login from './point_mall/Login';
import Header from './point_mall/Header';
import Footer from './point_mall/Footer';
import ItemDetail from './point_mall/ItemDetail';
import MyItems from './point_mall/MyItems';
import Categories from './point_mall/Categories';
import CartItems from './point_mall/CartItems';
import ObserverTest from './observer/ObserverTest';
import Register from './point_mall/Register'
import AddPoint from './point_mall/AddPoint'
import PromiseTest from './promise/PromiseTest';
import MyHistory from './point_mall/MyHistory';
import Tags from './point_mall/Tags'


function App() {
  return (

      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/items/:itemId" component={ItemDetail} />
          <Route exact path="/me/items" component={MyItems} />
          <Route exact path="/categories/:categoryId" component={Categories} />
          <Route exact path="/tags/:tag" component={Tags} />
          <Route exact path="/cart/items" component={CartItems} />
          <Route exact path="/observer-test" component={ObserverTest}/>
          <Route exact path="/users/point_charge" component={AddPoint} />
          <Route exact path="/promise-test" component={PromiseTest} />
          <Route exact path="/me/history" component={MyHistory} />

        </Switch>
        <Footer />
      </div>


  );
}

export default App;
