import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaFacebookSquare, FaGooglePlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class Signin extends Component {

  constructor(props){
    super(props);
    this.state = {
      user:{},
      email:'',
      password:'',
    }
  }

  setValue(e){
    // console.log(e.target.value)
    if(e.target.id === "inputEmail"){
      this.setState({ email: e.target.value })
    } else {
      this.setState({ password: e.target.value })
    }    
  }

  capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  render (){
    return(
      <>
        <div className="container text-center">
            <Col md={4} style={{ display: "inline-block", padding:"30px" }}>
                <form className="form-signin" onSubmit={(e)=>this.props.handleSignin(e, this.state.email, this.state.password)}>
                    <img className="mb-4" src={this.props.navigation.logo[1].url} alt="" height="72" />
                    <br />

                    { this.props.error ? (
                      <>
                      <span style={{ color: "#ff3737" }}> Error encountered. {this.props.errorMsg} Please consider changing your password and try again. </span>
                      </>
                    ) : '' }
                    
                    <br/>
                    <br/>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus onChange={(e)=> this.setValue(e)} value={this.state.email} />
                    <br/> 
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={(e) => this.setValue(e)}  value={this.state.password} />
                    <br/> 
                    <div className="checkbox mb-3">
                      <Row>
                        <Col>
                          <label>
                              <input type="checkbox" value="remember-me" /> Remember me
                          </label>
                        </Col>
                        <Col>
                          <label>
                              <Link to="/forgot"> Forgot password? </Link>
                          </label>
                        </Col>
                      </Row>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
                <br/>
                <hr />
                <div>
                    <label>Use Social Media</label>
                    <Row>
                        <Col>
                            <Button variant="primary" className="btn btn-block" onClick={(e) => this.props.handleFacebookSignin(e)}>
                                <FaFacebookSquare /> Facebook</Button>
                        </Col>
                        <Col>
                            <Button variant="danger" className="btn btn-block" onClick={(e) => this.props.handleGoogleSignin(e)}>
                                <FaGooglePlusSquare /> Google+</Button>
                        </Col>
                    </Row>
                    <br/>
                </div>
                <hr />
                <Link to="/register">Create An Account</Link>
            </Col>
        </div>
      </>
    );
  }
} 

export default Signin;
