import React, { Component } from 'react';
import { Row, Col, Button, Image, Table } from 'react-bootstrap';
import { FaMoneyBillAlt } from 'react-icons/fa';
import Paypal from './paypal/paypal';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class Choice extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading:true,
      cart:[],
      modalShow: false,
      checkOut: false,
    }
  }

  paypalCheckout = () => {
    this.setState({ checkOut : !this.state.checkOut });
  }

  componentDidMount(){
    this.obtainCartItems();
  }

  obtainCartItems = () => {
    try{
      let openCart = this.props.cart;
      this.setState({ cart: openCart, loading:false });
    }catch(e){}
  }

  capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  render (){
    //console.log(this.props.user);
    let cartObject = [];
    for(let i = 0; i < this.state.cart.length; i++ ){
      let amt = Number(Number(this.state.cart[i].itemPrice) / 50).toFixed(1);
      let obj = {
        description: this.capitalizeFirstLetter((this.state.cart[i].itemName).split('-')[0]).toString(),
        amount: {
          currency_code: "USD",
          value: Number(amt).toFixed(2).toString(),
        },
      }
      cartObject.push(obj)
    }

    let item = [];
    let totalSum = 0;
    for(let i = 0; i < this.state.cart.length; i++ ){
      totalSum += Number(this.state.cart[i].itemPrice);
      item.push(
        <tr key={i}>
          <td> { (i+1) } </td>
          <td> { this.state.cart[i].itemQty+" x "+this.state.cart[i].itemName } </td>
          <td style={{ textAlign:"center" }}> 
          { "Php. "+Number(this.state.cart[i].itemPrice).toFixed(2) } </td>
        </tr>
      )
    }

    return(
      <>
        <div className="container">
          <Row style={{ margin: "5%"}}>
            <Col md={6} style={{ borderRight: "1px solid #d1cbcb" }}>
              { 
                this.props.user !== null ? (
                  <>
                  <Row>
                    <h5>Receiver</h5>
                    <Table responsive>
                      <tbody>
                      <tr>
                        <td>
                          <h5>{this.props.user.firstName+" "+this.props.user.lastName}</h5>
                          <small>{this.props.user.address}</small>
                          <br />
                          <small>{this.props.user.email}</small>
                          <br />
                          <small>{this.props.user.phone}</small>
                        </td>
                      </tr>
                      </tbody>
                    </Table>
                  </Row>
                  </>
                ) : 
                (
                  <>
                  </>
                )
              }

              <hr />

              <Row>
                  <h5>Order Details</h5>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Quantity x Item</th>
                        <th style={{ textAlign:"center" }}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      { item }
                    </tbody>
                    <tfoot>
                      <tr>
                        <td></td>
                        <td style={{ textAlign:"right" }}><b>Total:</b></td>
                        <td style={{ textAlign:"center" }}>Php. {Number(totalSum).toFixed(2)} </td>
                      </tr>
                    </tfoot>                    
                  </Table>
              </Row>
              
            </Col>
            <Col md={6} style={{ margin: "5% 0" }}>
              <Row>
                <Col md={12} className="text-center" style={{ margin: "15px"}}>
                  <Image src={ this.props.navigation.logo[1].url } alt={this.props.navigation.logo[1].title } className="img-thumbnail" />
                </Col>
                <Col md={12}>
                  You are selecting your <i><b>"Mode of Payment"</b></i> for this transaction, please make sure that the left side items are correct before choosing your payment options.
                </Col>
                <Col md={12} style={{ margin: "3% 0" }}>
                <div>
                    <label><b>Mode of Payment</b></label>
                    <br />
                    <br />
                  { 
                  this.props.user === null ? (
                    <>
                      <Col>
                        <Link to="/signin">
                            <Button variant="primary" className="btn btn-block btn-lg">
                                <FaUserCircle /> &nbsp; Please Sign In
                            </Button>
                        </Link>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col>
                          <Button variant="danger" className="btn btn-block btn-lg">
                              <FaMoneyBillAlt /> Cash On Delivery (C.O.D.)</Button>
                      </Col>
                      <Col style={{ margin: "3% 0" }}>
                        <Paypal 
                          data={cartObject}
                          totalSum={Number(totalSum).toFixed(2)} 
                          emptyCartState={this.props.emptyCartState} 
                          user={this.props.user}
                          loadingState={this.props.loadingState}
                          />
                      </Col>
                    </>
                  ) 
                  }
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

export default Choice;
