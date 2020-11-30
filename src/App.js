import React, { Component } from 'react';
import Content from './components/pages/content';
import { apiCall } from './components/api/api';
import Spinner from 'react-bootstrap/Spinner';

class App extends Component {

  navigationURL = "navigation.json";
  headlineURL = "headline.json";
  footerURL = "footer.json";
  couponsURL = "coupons.json";
  //new
  collectionsURL = "collections.json";
  allproductsURL = "allProducts.json";
  popularURL = "popular.json";
  upcomingURL = "upcoming.json";

  constructor(){
    super();
    this.state = {
      loading:true,
      navigations:[],
      headline:[],
      footer:[],
      coupons:[],
      allproducts:[],
      collections:[],
      popular:[],
      upcoming:[],
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
    this.loadAllProducts();
    this.loadPopular();
    this.loadUpcoming();
    this.loadCollections();
    
    this.loadNavigations();
  }

  createShoppingCart(){
    localStorage.setItem("shoppingCart",JSON.stringify(this.state.cart));
    // console.log("created localstorage");
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

  loadCollections () {
    return new Promise(() => setTimeout(() => this.getCollections(), 1500));
  }

  loadUpcoming () {
    return new Promise(() => setTimeout(() => this.getUpcoming(), 1500));
  }

  loadPopular () {
    return new Promise(() => setTimeout(() => this.getPopular(), 1500));
  }

  loadAllProducts () {
    return new Promise(() => setTimeout(() => this.getAllproducts(), 1500));
  }
 
  async getNavigations() {
     try{
      await apiCall(this.navigationURL, 'GET').then((res) => {
          this.setState({ 
            navigations: res, 
            footer:  this.state.footer, 
            coupons:  this.state.coupons, 
            headline: this.state.headline, 
            loading: this.state.loading, 
            allproducts:this.state.allproducts,
            upcoming:this.state.upcoming,
            popular:this.state.popular,
            collections:this.state.collections,
           });
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
         this.setState({ 
           navigations:  this.state.navigations, 
           coupons: res, 
           footer:  this.state.footer, 
           headline: this.state.headline, 
           loading: this.state.loading,            
           allproducts: this.state.allproducts,
           upcoming: this.state.upcoming,
           popular: this.state.popular,
           collections: this.state.collections,
          });
         if(this.state.loading)
         {
           this.getCollections();
         }
      });
    }catch(err){
      console.log(err);
    }
  }

  async getCollections() {
    try{
     await apiCall(this.collectionsURL, 'GET').then((res) => {
         this.setState({ 
           navigations:  this.state.navigations, 
           coupons: this.state.coupons, 
           footer:  this.state.footer, 
           headline: this.state.headline, 
           loading: this.state.loading,
           allproducts: this.state.allproducts,
           upcoming: this.state.upcoming,
           popular: this.state.popular,
           collections: res,
          });
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
         this.setState({ 
           footer: res, 
           coupons:  this.state.coupons, 
           navigations:  this.state.navigations, 
           headline: this.state.headline, 
           loading: this.state.loading,            
           allproducts: this.state.allproducts,
           upcoming: this.state.upcoming,
           popular: this.state.popular,
           collections: this.state.collections, 
          });
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
         this.setState({ 
           navigations: this.state.navigations, 
           coupons:  this.state.coupons, 
           footer:  this.state.footer, 
           headline: res, 
           loading: !this.state.loading,            
           allproducts: this.state.allproducts,
           upcoming: this.state.upcoming,
           popular: this.state.popular,
           collections: this.state.collections, 
          })
      });
    }catch(err){
      console.log(err);
    }
  }
  
  async getUpcoming() {
    try{
     await apiCall(this.upcomingURL, 'GET').then((res) => {
         this.setState({ 
           footer: this.state.footer, 
           coupons:  this.state.coupons, 
           navigations:  this.state.navigations, 
           headline: this.state.headline, 
           loading: this.state.loading,            
           allproducts: this.state.allproducts,
           upcoming: res,
           popular: this.state.popular,
           collections: this.state.collections,
          });
         if(this.state.loading)
         {
           this.loadPopular();
         }
      });
    }catch(err){
      console.log(err);
    }
  }
  
  async getPopular() {
    try{
     await apiCall(this.popularURL, 'GET').then((res) => {
         this.setState({ 
           footer: this.state.footer, 
           coupons:  this.state.coupons, 
           navigations:  this.state.navigations, 
           headline: this.state.headline, 
           loading: this.state.loading,            
           allproducts: this.state.allproducts,
           upcoming: this.state.upcoming,
           popular: res,
           collections: this.state.collections,
          });
      });
    }catch(err){
      console.log(err);
    }
  }
  
  async getAllproducts() {
    try{
     await apiCall(this.allproductsURL, 'GET').then((res) => {
         this.setState({ 
           footer: this.state.footer, 
           coupons:  this.state.coupons, 
           navigations:  this.state.navigations, 
           headline: this.state.headline, 
           loading: this.state.loading,            
           allproducts: res,
           upcoming: this.state.upcoming,
           popular: this.state.popular,
           collections: this.state.collections,
          });
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
          products={this.state.allproducts}
          upcoming={this.state.upcoming}
          popular={this.state.popular}
          collections={this.state.collections}
          />
      </>
    );
  }
}

export default App;
