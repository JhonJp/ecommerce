import React, { Component } from 'react';
import Content from './components/pages/content';
import { apiCall } from './components/api/api';
import Spinner from 'react-bootstrap/Spinner';

class App extends Component {

  navigationURL = "navigation.json";
  headlineURL = "headline.json";
  footerURL = "footer.json";
  couponsURL = "coupons.json";
  productsURL = "products.json";

  constructor(){
    super();
    this.state = {
      loading:true,
      navigations:[],
      headline:[],
      footer:[],
      coupons:[],
      products:[],
      cart:[],
    }
  }

  //detect if view has mounted
  componentDidMount(){
    if(localStorage.getItem("shoppingCart") === null){
      this.createShoppingCart();
    } else{
      this.setState({ cart: localStorage.getItem("shoppingCart")});
    }
    this.loadNavigations();
  }

  createShoppingCart(){
    localStorage.setItem("shoppingCart",JSON.stringify(this.state.cart));
    console.log("created localstorage");
  }

  loadHeadline () {
    return new Promise(() => setTimeout(() => this.getHeadline(), 1500));
  }

  loadNavigations () {
    return new Promise(() => setTimeout(() => this.getNavigations(), 1500));
  }

  loadFooter () {
    return new Promise(() => setTimeout(() => this.getFooterNav(), 1500));
  }

  loadCoupons () {
    return new Promise(() => setTimeout(() => this.getCoupons(), 1500));
  }

  loadProducts () {
    return new Promise(() => setTimeout(() => this.getProducts(), 1500));
  }
 
  async getNavigations() {
     try{
      await apiCall(this.navigationURL, 'GET').then((res) => {
          this.setState({ navigations: res, footer:  this.state.footer, coupons:  this.state.coupons, headline: this.state.headline, loading: this.state.loading, products:this.state.products });
          if(this.state.loading)
          {
            this.getFooterNav();
          }
       });
     }catch(err){
       console.log(err);
     }
   }

  async getCoupons() {
    try{
     await apiCall(this.couponsURL, 'GET').then((res) => {
         this.setState({ navigations:  this.state.navigations, coupons: res, footer:  this.state.footer, headline: this.state.headline, loading: this.state.loading, products:this.state.products });
         if(this.state.loading)
         {
           this.getProducts();
         }
      });
    }catch(err){
      console.log(err);
    }
  }

  async getProducts() {
    try{
     await apiCall(this.productsURL, 'GET').then((res) => {
         this.setState({ navigations:  this.state.navigations, coupons: this.state.coupons, footer:  this.state.footer, headline: this.state.headline, loading: this.state.loading, products:res });
         if(this.state.loading)
         {
           this.getHeadline();
         }
      });
    }catch(err){
      console.log(err);
    }
  }

  async getFooterNav() {
    try{
     await apiCall(this.footerURL, 'GET').then((res) => {
         this.setState({ footer: res, coupons:  this.state.coupons, navigations:  this.state.navigations, headline: this.state.headline, loading: this.state.loading,products:this.state.products });
         if(this.state.loading)
         {
           this.getCoupons();
         }
      });
    }catch(err){
      console.log(err);
    }
  }

  async getHeadline() {
    try{
      await apiCall(this.headlineURL, 'GET').then((res) => {
         this.setState({ navigations: this.state.navigations, coupons:  this.state.coupons, footer:  this.state.footer, headline: res, loading: !this.state.loading,products:this.state.products  })
      });
    }catch(err){
      console.log(err);
    }
  }

  render (){
    let loading = this.state.loading;

    if(loading){
      return(
        <>
        <div className="main-content text-center lg-12 md-12" style={{ padding:"20%", overflow:"hidden" }}>
            <Spinner animation="grow" variant="info" size="md" />
        </div>
        </>
      );
    }

    return(
      <>
        <Content 
          navigation={this.state.navigations}
          headline={this.state.headline} 
          coupons={this.state.coupons} 
          footer={this.state.footer} 
          products={this.state.products}
          />
      </>
    );
  }
}

export default App;
