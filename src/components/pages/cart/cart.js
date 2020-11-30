import React, { Component } from 'react';
import { Spinner, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { FaMoneyBillAlt, FaTrash, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Coupons from '../coupons/coupons';

class Cart extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading:true,
      cart:[],
      modalShow: false,
    }
  }

  componentDidMount(){
    this.obtainCartItems();
  }

  emptyCart = () => {
    console.log(localStorage.getItem("shoppingCart"));
    if(localStorage.getItem("shoppingCart") !== null) {
      localStorage.removeItem("shoppingCart");
    }
    window.location.href = "/";
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
    for(let i = 0; i < this.state.cart.length; i++ ){
      item.push(
        <tr key={i}>
          <td>{i + 1}</td>
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
                <span style={{ fontWeight:"bold" }}>{this.state.cart[i].itemQty} pc(s)</span>
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
          <div className="container" style={{ margin:"5%", overflow:"hidden" }}>
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
            <Button variant="primary" onClick={()=>this.emptyCart()}>
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
                          <th>Item Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                        <tbody>
                            { item }
                        </tbody>
                    </Table>
                    <Col style={{ padding: "0" }}>
                        <Button variant="info" >
                        <span>
                            <FaMoneyBillAlt />
                        </span> Proceed Checkout
                        </Button>
                        &nbsp;
                        <Button variant="danger" onClick={() => this.handleModal() }>
                        <span>
                            <FaTrash />
                        </span> Empty Cart
                        </Button>
                    </Col>
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
