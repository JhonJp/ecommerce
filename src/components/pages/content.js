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
import Signin from './signin/signin';
import Register from './signin/register';
import Forgot from './signin/forgotpswd';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class Content extends Component {

  constructor(props){
    super(props);
    this.state = {
      navigation: this.props.navigation,
      headline:this.props.headline,
      cart:[],
      cartItems:0,
    }
  }

  componentDidMount(){    
    this.updateCartCount();
    if(localStorage.getItem("_sc") !== null){
      localStorage.removeItem("_sc");
    }
  }

  componentWillUnmount() {
    if(this.state.cart.length !== 0){
      localStorage.setItem("_sc", JSON.stringify(this.state.cart));
    }
  }

  emptyCartState = () => {
    localStorage.removeItem("_sc");
    if(this.state.cart.length !== 0){
      // this.state.cart = [];
      this.setState({ cart: [], cartItems: 0 });
    }
    // console.log(this.state.cart);
    // window.location.href = "/";
  }

  updateCartCount = () => {
    if(localStorage.getItem("_sc") !== null){
      let txcart = JSON.parse(localStorage.getItem("_sc"));
        for(let a = 0; a < txcart.length; a++){
          this.state.cart.push(txcart[a]);
        }
    } else {
      localStorage.removeItem("_sc");
    }
    this.setState({ cartItems: Number(this.state.cart.length) });
  }

  addShoppingCartItem = (itemid,itemQty,itP,itN,itimg,itSTP) =>{
    try{
      //  let txcart = JSON.parse(localStorage.getItem("_sc"));
      let itemddata = {
        "itemId": ""+itemid,
        "itemName":""+itN,
        "itemQty":""+itemQty,
        "itemPrice":""+itP,
        "itemImg":""+itimg,
        "itemSTP":""+itSTP,
      }
      this.state.cart.push(itemddata);
      // localStorage.removeItem("_sc");
      // localStorage.setItem("_sc",JSON.stringify(txcart));
      // this.setState({ cart: txcart });
      this.updateCartCount();
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
      } else if(proc === 2){
        delete ucart.splice(itemIndex,1);
      } else {
        ucart[itemIndex].itemQty = (Number(ucart[itemIndex].itemQty) + 1);
        ucart[itemIndex].itemPrice = ((Number(ucart[itemIndex].itemSTP)) * (Number(ucart[itemIndex].itemQty)));
      }
      // localStorage.removeItem("_sc");
      // localStorage.setItem("_sc", JSON.stringify(ucart));
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
            updateCartItemQty={this.updateCartItemQty}
            handleLogout = {this.props.handleLogout}
            user={this.props.user} />
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
                  user={this.props.user} 
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
                  user={this.props.user} 
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
                  user={this.props.user} 
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
                  user={this.props.user} 
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
                  user={this.props.user} 
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
                  emptyCartState={this.emptyCartState} 
                  navigation={this.props.navigation}
                  upcoming={this.props.upcoming}
                  popular={this.props.popular}
                  collections={this.props.collections}
                  cart={this.state.cart}
                  user={this.props.user} 
                   />
              </Route>
              <Route path="/signin" >
                <Signin 
                  headline={this.props.headline} 
                  coupons={this.props.coupons} 
                  footer={this.props.footer} 
                  products={this.props.products}
                  navigation={this.props.navigation}
                  upcoming={this.props.upcoming}
                  popular={this.props.popular}
                  collections={this.props.collections}
                  hideSearch={true}
                  user={this.props.user} 
                  handleSignin={this.props.handleSignin}
                  handleGoogleSignin={this.props.handleGoogleSignin}
                  handleFacebookSignin={this.props.handleFacebookSignin}
                  error={this.props.error}
                  errorMsg={this.props.errorMsg}
                  />
              </Route>
              <Route path="/register" >
                <Register 
                  headline={this.props.headline} 
                  coupons={this.props.coupons} 
                  footer={this.props.footer} 
                  products={this.props.products}
                  navigation={this.props.navigation}
                  upcoming={this.props.upcoming}
                  popular={this.props.popular}
                  collections={this.props.collections}
                  hideSearch={true}
                  user={this.props.user} 
                  error={this.props.error}
                  errorMsg={this.props.errorMsg}
                  registerUser={this.props.registerUser}
                  />
              </Route>              
              <Route path="/forgot" >
                <Forgot 
                  headline={this.props.headline} 
                  coupons={this.props.coupons} 
                  footer={this.props.footer} 
                  products={this.props.products}
                  navigation={this.props.navigation}
                  upcoming={this.props.upcoming}
                  popular={this.props.popular}
                  collections={this.props.collections}
                  hideSearch={true}
                  user={this.props.user} 
                  error={this.props.error}
                  errorMsg={this.props.errorMsg}
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
                  user={this.props.user} 
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
