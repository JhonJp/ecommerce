import React, { Component } from 'react';
import '../../assets/css/default.min.css';

import Home from './home/home';
import About from './about/about';
import Collections from './collections/collections';
import Products from './products/products';
import View from './view/view';
import Cart from './cart/cart';
import Footer from './footer/footer';
import Navigation from '../navigation/navigation';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class Content extends Component {

  state = {
    navigation: this.props.navigation,
    headline:this.props.headline,
    cart:[],
  }

  componentDidMount(){
    if(localStorage.getItem("shoppingCart") === null){
      localStorage.setItem("shoppingCart",JSON.stringify(this.state.cart));
    }
    this.updateCartCount();
  }

  updateCartCount = () => {
    let txcart = JSON.parse(localStorage.getItem("shoppingCart"));
    if(txcart.length !== 0){
      this.setState({ cart: txcart });
    }
  }

  addShoppingCartItem = (itemid,itemQty,itP,itN,itimg,itSTP) =>{
    try{
      let txcart = JSON.parse(localStorage.getItem("shoppingCart"));
      let itemddata = {
        "itemId": ""+itemid,
        "itemName":""+itN,
        "itemQty":""+itemQty,
        "itemPrice":""+itP,
        "itemImg":""+itimg,
        "itemSTP":""+itSTP,
      }
      txcart.push(itemddata);
      localStorage.removeItem("shoppingCart");
      localStorage.setItem("shoppingCart",JSON.stringify(txcart));
      this.setState({ cart: txcart });
    }catch(e){
      console.log(e);
    }
  }

  updateCartItemQty = (itemIndex, proc) => {
    try{
      let ucart = this.state.cart;
      if(proc === 0) {
        if((Number(ucart[itemIndex].itemQty) - 1) <= 0){
          delete ucart.splice(itemIndex,1);
          //console.log(ucart[itemIndex].itemId);
        } else {
          ucart[itemIndex].itemQty = (Number(ucart[itemIndex].itemQty) - 1);
          ucart[itemIndex].itemPrice = ((Number(ucart[itemIndex].itemSTP)) * (Number(ucart[itemIndex].itemQty)));
        }
        this.setState({ cart: ucart })
      } else if(proc === 2){
        delete ucart.splice(itemIndex,1);
      } else {
        ucart[itemIndex].itemQty = (Number(ucart[itemIndex].itemQty) + 1);
        ucart[itemIndex].itemPrice = ((Number(ucart[itemIndex].itemSTP)) * (Number(ucart[itemIndex].itemQty)));
        this.setState({ cart: ucart })
      }
      localStorage.removeItem("shoppingCart");
      localStorage.setItem("shoppingCart", JSON.stringify(ucart));
      this.setState({ cart: ucart });
    }catch(e){
      console.log(e);
    }
  }
    
  render (){
    return(
      <>
        <Router>
          <Navigation 
            navigation={this.props.navigation} 
            cart={Number(this.state.cart.length)} 
            updateCartItemQty={this.updateCartItemQty} />
          <Switch>
              <Route exact path="/" >
                <Home 
                  headline={this.props.headline} 
                  coupons={this.props.coupons} 
                  footer={this.props.footer} 
                  products={this.props.products}
                  navigation={this.props.navigation}
                  upcoming={this.props.upcoming}
                  popular={this.props.popular}
                  collections={this.props.collections}
                  addShoppingCartItem={this.addShoppingCartItem}
                  />
              </Route>
              <Route path="/about" >
                <About 
                  headline={this.props.headline} 
                  coupons={this.props.coupons} 
                  footer={this.props.footer} 
                  products={this.props.products}
                  navigation={this.props.navigation}
                  upcoming={this.props.upcoming}
                  popular={this.props.popular}
                  collections={this.props.collections}
                  addShoppingCartItem={this.addShoppingCartItem}
                  />
              </Route>
              <Route path="/collections" >
                <Collections 
                  headline={this.props.headline} 
                  coupons={this.props.coupons} 
                  footer={this.props.footer} 
                  navigation={this.props.navigation}
                  products={this.props.products}
                  upcoming={this.props.upcoming}
                  popular={this.props.popular}
                  collections={this.props.collections}
                  addShoppingCartItem={this.addShoppingCartItem}
                  />
              </Route>
              <Route path="/products" >
                <Products 
                  headline={this.props.headline} 
                  coupons={this.props.coupons} 
                  footer={this.props.footer} 
                  products={this.props.products}
                  navigation={this.props.navigation}
                  upcoming={this.props.upcoming}
                  popular={this.props.popular}
                  collections={this.props.collections}
                  addShoppingCartItem={this.addShoppingCartItem}
                  />
              </Route>
              <Route path="/view/:id">
                <View 
                  headline={this.props.headline} 
                  coupons={this.props.coupons} 
                  footer={this.props.footer} 
                  products={this.props.products}  
                  navigation={this.props.navigation} 
                  upcoming={this.props.upcoming}
                  popular={this.props.popular}
                  collections={this.props.collections}               
                  addShoppingCartItem={this.addShoppingCartItem}
                  />
              </Route>
              <Route path="/cart">
                <Cart 
                  headline={this.props.headline} 
                  coupons={this.props.coupons} 
                  footer={this.props.footer} 
                  products={this.props.products}
                  addShoppingCartItem={this.addShoppingCartItem}
                  updateCartItemQty={this.updateCartItemQty} 
                  navigation={this.props.navigation}
                  upcoming={this.props.upcoming}
                  popular={this.props.popular}
                  collections={this.props.collections}
                  cart={this.state.cart}
                   />
              </Route>
              <Route path="*">
                <Home 
                  headline={this.props.headline} 
                  coupons={this.props.coupons} 
                  footer={this.props.footer} 
                  products={this.props.products}
                  navigation={this.props.navigation} 
                  upcoming={this.props.upcoming}
                  popular={this.props.popular}
                  collections={this.props.collections}               
                  addShoppingCartItem={this.addShoppingCartItem}
                  />
              </Route>
          </Switch>

          <Footer navigation={this.props.navigation } footer={this.props.footer} />
        </Router>
      </>
    );
  }
}

export default Content;
