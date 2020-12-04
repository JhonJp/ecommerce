import React, { Component } from 'react';
import Content from './components/pages/content';
import { apiCall } from './components/api/api';
import Spinner from 'react-bootstrap/Spinner';
import fire from './components/firebase';
import firebase from 'firebase/app';

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
      user:{},
      appended: false,
      error: false,
      errorMsg: '',
    }
  }

  //detect if view has mounted
  componentDidMount(){
    window.addEventListener('beforeunload', () =>{
        this.setState({ appended: true});
    });
    
    this.loadAllProducts();
    this.loadFooter();
    this.loadPopular();
    this.loadUpcoming();
    this.loadCollections();
    this.loadCoupons();
    this.loadNavigations();

    this.loadHeadline();
    
    this.authListener();
  }

  //handle firebase signin user
  handleSignin = async(e, email, password) => {
    this.setState({ loading: true });
    e.preventDefault();
    await fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.setState({ user: result.user });
      this.setState({ loading: false });
    }).catch((err) => {
      // console.log(err);
      this.setState({ loading: true, error:true, errorMsg: err.message });
    });
    // console.log(this.state.user)
  }

  //handle signout of firebase
  handleLogout = async(e) => {
    this.setState({ loading: true });
    e.preventDefault();
    await fire.auth().signOut().then(() => {
      this.setState({ loading: false });
      window.location.href = "/";
    }).catch((error) => {
      console.log(error.message);
    });
  }

  //handle signin using google
  handleGoogleSignin = async(e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const provider = new firebase.auth.GoogleAuthProvider();
    await fire.auth().signInWithPopup(provider)
    .then((result) => {
      this.setState({ user: result.user });
      this.setState({ loading: false });
    }).catch((err) => {
      switch(err.code){
        case "auth/popup-closed-by-user":
          this.setState({ loading: false, error: true, errorMsg: err.message });
          break;
        case "auth/user-token-expired":
          this.setState({ loading: false, error: true, errorMsg: err.message });
          break;
        case "auth/user-disabled":
          this.setState({ loading: false, error: true, errorMsg: err.message });
          break;
        case "auth/network-request-failed":
          this.setState({ loading: false, error: true, errorMsg: err.message });
          break;
        case "auth/unauthorized-domain":
          this.setState({ loading: false, error: true, errorMsg: err.message });
          break;
          default:
            this.setState({ loading: false, error: true, errorMsg: err.message });
            break;
      }
      // console.log(err);
    });
    // console.log(this.state.user)
  }

  //handle signin using facebook
  handleFacebookSignin = async(e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const provider = new firebase.auth.FacebookAuthProvider();
    await fire.auth().signInWithPopup(provider)
    .then((result) => {
      this.setState({ user: result.user });
      this.setState({ loading: false });
    }).catch((err) => {
      switch(err.code){
        case "auth/popup-closed-by-user":
          this.setState({ loading: false, error: true, errorMsg: err.message });
          break;
        case "auth/user-token-expired":
          this.setState({ loading: false, error: true, errorMsg: err.message });
          break;
        case "auth/user-disabled":
          this.setState({ loading: false, error: true, errorMsg: err.message });
          break;
        case "auth/network-request-failed":
          this.setState({ loading: false, error: true, errorMsg: err.message });
          break;
        case "auth/unauthorized-domain":
          this.setState({ loading: false, error: true, errorMsg: err.message });
          break;
          default:
            this.setState({ loading: false, error: true, errorMsg: err.message});
            break;
      }
      // console.log(err);
    });
    // console.log(this.state.user)
  }

  //authenticate user
  authListener()
  {
    fire.auth().onAuthStateChanged((u) =>{
      if(u){
        this.setState({ user: u });
      } else {
        this.setState({ user: null });
      }
    })
  }

  //handle register user and other information of the user
  registerUser = async(e, fn, ln, mail, mobile, pswd) => {
    e.preventDefault();
    this.setState({ loading: true });
    try{
      await fire.auth().createUserWithEmailAndPassword(mail,pswd)
      .then((res) => {
        fire.database().ref('users/'+res.user.uid).set({
          id: res.user.uid,
          firstName: fn,
          lastName: ln,
          email: mail,
          phone: mobile,
          userType: 'customer'
        });
        
        this.setState({ loading: false, error: true, errorMsg: 'Account has been registered, please use your email address and password to login.'});
      })

    }catch(err){
      this.setState({ loading: false, error: true, errorMsg: 'Register encountered and error.' });
    }
  }

  // createShoppingCart(){
  //   localStorage.setItem("_sc",JSON.stringify(this.state.cart));
  //   // console.log("created localstorage");
  // }

  loadHeadline () {
    return new Promise(() => setTimeout(() => this.getHeadline(), 2000));
  }

  loadNavigations () {
    return new Promise(() => setTimeout(() => this.getNavigations(), 2000));
  }

  loadFooter () {
    return new Promise(() => setTimeout(() => this.getFooterNav(), 2000));
  }

  loadCoupons () {
    return new Promise(() => setTimeout(() => this.getCoupons(), 2000));
  }

  loadCollections () {
    return new Promise(() => setTimeout(() => this.getCollections(), 2000));
  }

  loadUpcoming () {
    return new Promise(() => setTimeout(() => this.getUpcoming(), 2000));
  }

  loadPopular () {
    return new Promise(() => setTimeout(() => this.getPopular(), 2000));
  }

  loadAllProducts () {
    return new Promise(() => setTimeout(() => this.getAllproducts(), 2000));
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

    if(this.state.appended){
      return false;
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
          user={this.state.user}
          handleSignin={this.handleSignin}
          handleLogout={this.handleLogout}
          handleGoogleSignin={this.handleGoogleSignin}
          handleFacebookSignin={this.handleFacebookSignin}
          registerUser={this.registerUser}
          error={this.state.error}
          errorMsg={this.state.errorMsg}
          />
      </>
    );
    
  }
}

export default App;
