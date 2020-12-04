import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fire from '../../firebase';

class Forgot extends Component {

  constructor(props){
    super(props);
    this.state = {
      user:{},
      email:'',
      message:'',
    }
  }

  setValue(e){
    // console.log(e.target.value)
    if(e.target.id === "inputEmail"){
      this.setState({ email: e.target.value })
    }   
  }

  capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  paswordReset = async(e) => {
      e.preventDefault();
      try{
          console.log(this.state.email)
        await fire.auth().sendPasswordResetEmail(this.state.email)
        .then(() => {
            this.setState({ message: 'Password reset link has been sent to your email. Please check your email and follow other instructions provided by the email, thank you.' });
        }).catch((res) =>{
            console.log(res);
        });
      }catch(err){

      }
    
  }
  
  render (){
    return(
      <>
        <div className="container text-center">
            <Col md={4} style={{ display: "inline-block", padding:"30px" }}>
                <form className="form-signin" onSubmit={(e)=>this.paswordReset(e) }>
                    <img className="mb-4" src={this.props.navigation.logo[1].url} alt="" height="72" />
                    <br />

                    { this.state.message !== '' ? (
                      <>
                      <span style={{ color: "#ff3737" }}> {this.state.message} </span>
                      </>
                    ) : '' }
                    
                    <br/>
                    <br/>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus onChange={(e)=> this.setValue(e)} value={this.state.email} />
                    <br/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Send Password Reset Link</button>
                </form>
                <br/>
                <hr />
                <div>
                    <Row>
                        <Col>
                            <Link to="/register">Create Account</Link>
                        </Col>
                        <Col>
                            <Link to="/signin">Sign In Here</Link>
                        </Col>
                    </Row>
                    <br/>
                </div>
                <hr />
               
            </Col>
        </div>
      </>
    );
  }
} 

export default Forgot;
