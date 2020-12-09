import React, { Component } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaGooglePlusSquare } from 'react-icons/fa';

class CashDelivery extends Component {

  constructor(props){
    super(props);
  }

  capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  render (){
    return(
      <>
        <div className="container">
          <Row style={{ margin: "5%"}}>
            <Col md={6}>
              <Row style={{ borderRight: "1px solid #d1cbcb" }}>
                <form style={{ margin: "5% 10%" }}  >
                  <h3>Register Form</h3>
                  <Row md={8}>
                    { this.props.error ? (
                      <>
                        <Col md={12}>
                          <span style={{ color: "#ff3737" }}> {this.props.errorMsg} </span>
                        </Col>
                    </>
                    ) : '' }
                    <Col md={12} style={{ margin:"2% 0" }}>
                      <label>First Name <span style={{ color: "red" }}>*</span></label>
                      <input type="text" maxLength="20" className="form-control" placeholder="Enter first name" id="fname" name="fname" required onChange={(e) => this.setValue(e)} />
                    </Col>
                    <Col md={12} style={{ margin:"2% 0" }}>
                      <label>Last Name <span style={{ color: "red" }}>*</span></label>
                      <input type="text" maxLength="20" className="form-control" placeholder="Enter last name" id="lname" name="lname" required onChange={(e) => this.setValue(e)}/>
                    </Col>
                    <Col md={12} style={{ margin:"2% 0" }}>
                      <label>Email <span style={{ color: "red" }}>*</span></label>
                      <input type="email" maxLength="50" className="form-control" placeholder="Enter email address" id="email" name="email" required onChange={(e) => this.setValue(e)}/>
                    </Col>
                    <Col md={12} style={{ margin:"2% 0" }}>
                      <label>Mobile Number <span style={{ color: "red" }}>*</span></label>
                      <input type="text" maxLength="11" className="form-control" placeholder="Enter 11 digit number" id="mobile" name="mobile" required onChange={(e) => this.setValue(e)}/>
                    </Col>                    
                    <Col md={12} style={{ margin:"2% 0" }}>
                      <label>Password <span style={{ color: "red" }}>*</span></label>
                      <input type="password" maxLength="50" className="form-control" placeholder="Enter your desired password" id="paswd" name="password" required onChange={(e) => this.setValue(e)}/>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md={12}>
                      <Button variant="primary" className="btn btn-block btn-lg" type="submit">Register</Button>
                    </Col>               
                    <br/>   
                    <br/>   
                    <Col className="text-center">
                      Already have an account? <Link to="/signin">
                        Sign In
                      </Link>
                    </Col>
                  </Row>
                </form>
              </Row>
            </Col>
            <Col md={6} style={{ margin: "5% 0" }}>
              <Row>
                <Col md={12} className="text-center" style={{ margin: "15px"}}>
                  <Image src={ this.props.navigation.logo[1].url } alt={this.props.navigation.logo[1].title } className="img-thumbnail" />
                </Col>
                <Col md={12}>
                  By Clicking "Register", you agree to our Terms and Conditions in using your information for the purpose of our business or website to fullfill the delivery of items and other services that we are providing. 
                </Col>
                <Col md={12} style={{ margin: "3% 0" }}>
                <div>
                    <label>Use Social Media</label>
                        <Col style={{ margin: "3% 0" }}>
                            <Button variant="primary" className="btn btn-block btn-lg" onClick={(e) => this.props.handleFacebookSignin(e)}>
                                <FaFacebookSquare /> Facebook</Button>
                        </Col>
                        <Col>
                            <Button variant="danger" className="btn btn-block btn-lg" onClick={(e) => this.props.handleGoogleSignin(e)}>
                                <FaGooglePlusSquare /> Google+</Button>
                        </Col>
                    <br/>
                </div>
                </Col>
              </Row>
            </Col>
          </Row> 
          
        </div>
      </>
    );
  }
}

export default CashDelivery;
