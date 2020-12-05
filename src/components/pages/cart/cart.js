import React, { Component } from 'react';
import { Spinner, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { FaTrash, FaEye, FaMoneyBillAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Paypal from '../paypal/paypal';

import Coupons from '../coupons/coupons';

class Cart extends Component {

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

  handleModal = () => {
    this.setState({ modalShow: !this.state.modalShow });
  }
  
  render (){
    let loading = this.state.loading;

    let item = [];
    let totalSum = 0;
    let totalQty = 0;
    for(let i = 0; i < this.state.cart.length; i++ ){
      totalSum += Number(this.state.cart[i].itemPrice);
      totalQty += Number(this.state.cart[i].itemQty);
      item.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td style={{ justifyContent: "center" }} className="text-center">
            <img alt={this.state.cart[i].itemName} src={this.state.cart[i].itemImg} className="img-fluid img-thumbnail" style={{ backgroundColor:"#c7c7c7", width: "50px" }} />
          </td>
          <td>{this.capitalizeFirstLetter(this.state.cart[i].itemName)}</td>
          <td style={{ textAlign:"center" }}>
            <Row>
              <Col>
                <Button 
                  variant="outline-dark" 
                  className="btn-sm" 
                  onClick={()=>this.props.updateCartItemQty(i,0) }>-</Button>
              </Col>
              <Col>
                <span style={{ fontWeight:"bold" }}>{this.state.cart[i].itemQty}</span>
              </Col>
              <Col>                
                <Button 
                  variant="outline-dark" 
                  className="btn-sm"
                  onClick={()=>this.props.updateCartItemQty(i,1) }>+</Button>
              </Col>
            </Row>
          </td>
          <td>Php. {Number(this.state.cart[i].itemPrice).toFixed(2)}</td>
          <td>
            <div style={{ display: "flex", justifyContent:"center" }} >
              <Button 
                variant="outline-danger" 
                className="btn-sm" 
                style={{ margin: "0 5px" }}
                onClick={()=>this.props.updateCartItemQty(i,2) }>
                <span title="Delete">
                  <FaTrash />
                </span>
              </Button>
              <Link to={`/view/${this.state.cart[i].itemId}`} >
                <span className="btn btn-sm btn-outline-info" title="View">
                  <FaEye />
                </span>
              </Link>
            </div>
          </td>
        </tr>
      )
    }

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

    if(loading){
      return(
          <>
          <div className="main-content text-center lg-12 md-12" style={{ padding:"20%", overflow:"hidden" }}>
              <Spinner animation="grow" variant="info" size="md" />
          </div>
          </>
        );
    }

    if(this.state.cart.length === 0){
      return(
        <>
          <div className="container" style={{ margin:"10% 15%", overflow:"hidden" }}>
            <Row md={12}>
              <Col>
                <h3 className="text-center"> Your Shopping Cart is Empty </h3>
              </Col>
            </Row>
          </div>
          <Coupons coupons={this.props.coupons} />
        </>
      );
    }

    return(
      <>
        <div className="container">

            <Modal show={this.state.modalShow} onHide={()=>this.handleModal()}>  
              <Modal.Header closeButton>
                <Modal.Title>Empty shopping cart.?</Modal.Title>
              </Modal.Header>
              <Modal.Body>Woohoo, you are about to EMPTY your shopping cart.<br/> Are you sure to continue?</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={()=>{
                  this.props.emptyCartState();
                  this.handleModal();
                } }>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>

            <Row>
                <h3> Your Shopping Cart </h3>
            </Row>
            <br/>
            <Row md={10} >
                <Col md={10}>
                    <Table responsive bordered>
                      <thead>
                        <tr style={{ textAlign:"center" }}>
                          <th>#</th>
                          <th>Image</th>
                          <th>Item Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                        <tbody>
                            { item }
                        </tbody>
                        <tfoot>
                          <tr>
                            <td></td>
                            <td></td>
                            <td style={{ fontWeight: "bold",textAlign:"right" }}>Total :</td>
                            <td className="text-center">{totalQty} pc(s)</td>
                            <td className="text-center">Php. {Number(totalSum).toFixed(2)}</td>
                            <td></td>
                          </tr>
                        </tfoot>
                    </Table>
                    <Row style={{ padding: "0" }}>
                      <Col md={6}>
                        { this.props.user === null ? (
                          <>
                            <label>Register / Login to check our payment options.</label>
                            <Link to="/signin">
                              <Button variant="info">
                              <span>
                                  <FaMoneyBillAlt />
                              </span> Checkout Now
                              </Button>
                            </Link>
                          </>
                        ) : (
                          <>
                            <label>Checkout With Paypal</label>
                            <Paypal 
                              data={cartObject}
                              totalSum={Number(totalSum).toFixed(2)} 
                              emptyCartState={this.props.emptyCartState} 
                              user={this.props.user}
                              loadingState={this.props.loadingState}
                              />
                          </>
                        )}
                      </Col>
                      <Col className="text-right inline">
                        <label>Delete Items on your cart?</label>
                        <br />
                        <Button variant="danger" onClick={() => 
                        this.handleModal()
                       }>
                          <span>
                              <FaTrash />
                          </span> Empty Cart
                        </Button>
                      </Col>
                    </Row>
                </Col>
                <Col md={2} style={{ boxShadow:"1px 1px 3px 2px #888888", border:"0.5px solid #c7c7c7"}} >
                    <div>Side content</div>
                </Col>
            </Row>

        </div>
        <Coupons coupons={this.props.coupons} />
      </>
    );
  }
}

export default Cart;
