import React, { Component } from 'react';
import Content from './components/pages/content';
// import { apiCall } from './components/api/api';
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
      allProducts:[],
      collections:[],
      popular:[],
      upcoming:[],
      cart:[],
      user:[],
      appended: false,
      error: false,
      errorMsg: '',
    }
    
   // console.log(this.state.user)
  }

  //detect if view has mounted
  componentDidMount(){
    window.addEventListener('beforeunload', () =>{
        this.setState({ appended: true});
    });
    
    this.getNavigations();
    this.getCollections();
    this.getAllproducts();
    this.getPopular();
    this.getCoupons();
    this.getFooterNav();
    this.getUpcoming();
    this.getHeadline();
    
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
      
      window.location.href = "/";
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
    });
    // console.log(this.state.user)
  }

  //get user data onload 
  getUserInfo(uid){
    fire.database().ref().child('users')
      .orderByChild('id')
      .equalTo(uid)
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          let userData = snapshot.val();
          this.setState({ user: userData[uid], loading: false });
        }
      });
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
      let un = result.user.displayName.split(" ");
      fire.database().ref('users/'+result.user.uid).set({
        id: result.user.uid,
        firstName: un[0],
        lastName: un[1],
        email: result.user.email,
        phone: result.user.phoneNumber,
        userType: 'customer',
        address: ''
      });
      this.setState({ user: result.user });
      this.setState({ loading: false });
      window.location.href = "/";
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
      let un = result.user.displayName.split(" ");
      fire.database().ref('users/'+result.user.uid).set({
        id: result.user.uid,
        firstName: un[0],
        lastName: un[1],
        email: result.user.email,
        phone: result.user.phoneNumber,
        userType: 'customer',
        address: ''
      });
      this.setState({ user: result.user });
      this.setState({ loading: false });
      window.location.href = "/";
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
        this.getUserInfo(u.uid);
      } else {
        this.setState({ user: null });
      }
    })
  }

  loadingState = () =>{
    this.setState({ loading: true });
    setTimeout(()=> this.setState({ loading: false }), 3000);
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
          userType: 'customer',
          address: '',
        });
        
        this.setState({ loading: false, error: true, errorMsg: 'Account has been registered, please use your email address and password to login.'});

        setTimeout(()=> { window.location.href = "/"},2000);
      })

    }catch(err){
      this.setState({ loading: false, error: true, errorMsg: 'Register encountered and error.' });
    }
  }

  // createShoppingCart(){
  //   localStorage.setItem("_sc",JSON.stringify(this.state.cart));
  //   // console.log("created localstorage");
  // }
 
  assignState = (result,state) => {
    switch(state){
      case "navigation":
        this.setState({ 
          navigations: result
         });
         //console.log(this.state.navigations);
         break;
      case "headline":
        this.setState({ 
          headline: result,
          loading:false
         });
         //console.log(this.state.headline);
         break;
      case "footer":
        this.setState({ 
          footer: result
         });
         //console.log(this.state.footer);
         break;
      case "coupons":
        this.setState({ 
          coupons: result
         });
        //console.log(this.state.coupons);
         break;
      case "upcoming":
        this.setState({ upcoming: result }); 
        //console.log(this.state.upcoming);
        break;
      case "popular":
        this.setState({ popular: result }); 
        //console.log(this.state.popular);
        break;
      case "allProducts":
        this.setState({ allProducts: result });
        //console.log(this.state.allProducts);
        break;
      case "collections":
        this.setState({ collections: result });
        //console.log(this.state.collections);
        break;
      default:break;
    }
  }

  getDataFromDB = async(dbname) =>{
    firebase.database().ref(dbname)
       .on('value', snapchat => {
          const exists = snapchat.val() !== null;
          if(exists){
            let data = snapchat.val();
            this.assignState(data,dbname);
          }
       });       
  }

  getNavigations() {
     try{
       this.getDataFromDB('navigation');
      // apiCall(this.navigationURL, 'GET').then((res) => {
      //     this.setState({ 
      //       navigations: res, 
      //       footer:  this.state.footer, 
      //       coupons:  this.state.coupons, 
      //       headline: this.state.headline, 
      //       allproducts:this.state.allproducts,
      //       upcoming:this.state.upcoming,
      //       popular:this.state.popular,
      //       collections:this.state.collections,
      //      });
      //  });
     }catch(err){
       console.log(err);
     }
   }

  getCoupons() {
    try{
      this.getDataFromDB('coupons');
    //  apiCall(this.couponsURL, 'GET').then((res) => {
    //      this.setState({ 
    //        navigations:  this.state.navigations, 
    //        coupons: res, 
    //        footer:  this.state.footer, 
    //        headline: this.state.headline,            
    //        allproducts: this.state.allproducts,
    //        upcoming: this.state.upcoming,
    //        popular: this.state.popular,
    //        collections: this.state.collections,
    //       });
    //   });
    }catch(err){
      console.log(err);
    }
  }

  getCollections() {
    try{
      this.getDataFromDB('collections');
    //  apiCall(this.collectionsURL, 'GET').then((res) => {
    //      this.setState({ 
    //        navigations:  this.state.navigations, 
    //        coupons: this.state.coupons, 
    //        footer:  this.state.footer, 
    //        headline: this.state.headline, 
    //        allproducts: this.state.allproducts,
    //        upcoming: this.state.upcoming,
    //        popular: this.state.popular,
    //        collections: res,
    //       });
    //   });
    }catch(err){
      console.log(err);
    }
  }

  getFooterNav() {
    try{
      this.getDataFromDB('footer');
    //  apiCall(this.footerURL, 'GET').then((res) => {
    //      this.setState({ 
    //        footer: res, 
    //        coupons:  this.state.coupons, 
    //        navigations:  this.state.navigations, 
    //        headline: this.state.headline,          
    //        allproducts: this.state.allproducts,
    //        upcoming: this.state.upcoming,
    //        popular: this.state.popular,
    //        collections: this.state.collections, 
    //       });
    //   });
    }catch(err){
      console.log(err);
    }
  }

  getHeadline() {
    try{
      this.getDataFromDB('headline');
      // apiCall(this.headlineURL, 'GET').then((res) => {
      //    this.setState({ 
      //      navigations: this.state.navigations, 
      //      coupons:  this.state.coupons, 
      //      footer:  this.state.footer, 
      //      headline: res, 
      //      loading: false,            
      //      allproducts: this.state.allproducts,
      //      upcoming: this.state.upcoming,
      //      popular: this.state.popular,
      //      collections: this.state.collections, 
      //     })
      // });
    }catch(err){
      console.log(err);
    }
  }
  
  getUpcoming() {
    try{
      this.getDataFromDB('upcoming');
    //  apiCall(this.upcomingURL, 'GET').then((res) => {
    //      this.setState({ 
    //        footer: this.state.footer, 
    //        coupons:  this.state.coupons, 
    //        navigations:  this.state.navigations, 
    //        headline: this.state.headline,         
    //        allproducts: this.state.allproducts,
    //        upcoming: res,
    //        popular: this.state.popular,
    //        collections: this.state.collections,
    //       });
    //   });
    }catch(err){
      console.log(err);
    }
  }
  
  getPopular() {
    try{
     this.getDataFromDB('popular');
    }catch(err){
      console.log(err);
    }
  }
  
  getAllproducts() {
    try{
      this.getDataFromDB('allProducts');
    //  apiCall(this.allproductsURL, 'GET').then((res) => {
    //      this.setState({ 
    //        footer: this.state.footer, 
    //        coupons:  this.state.coupons, 
    //        navigations:  this.state.navigations, 
    //        headline: this.state.headline,          
    //        allproducts: res,
    //        upcoming: this.state.upcoming,
    //        popular: this.state.popular,
    //        collections: this.state.collections,
    //       });
    //   });
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
          products={this.state.allProducts}
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
          loadingState={this.loadingState}
          />
      </>
    );
    
  }
}

export default App;
