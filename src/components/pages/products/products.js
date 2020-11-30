import React, { Component } from 'react';
import { Row, Col, Card, Pagination, Button } from 'react-bootstrap';
import { FaCartPlus, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Coupons from '../coupons/coupons';

class Products extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      value:'',
      currentPage:1,
      productPerPage:24,
      allproducts:this.props.products,
    }

    this.handlePage = this.handlePage.bind(this);
  }

  handlePage(index){
    this.setState({
      currentPage: Number(index.target.id),
    });
  }

  setProductCategory = index => {
    this.setState({
      value:'',
      currentPage:1,
      allproducts:this.props.products,
    });
  }

  capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  render (){

    let indexofLastProducts = this.state.currentPage * this.state.productPerPage;
    let indexofFirstProducts = indexofLastProducts - this.state.productPerPage;
    let currentProducts = this.state.allproducts.slice(indexofFirstProducts,indexofLastProducts);
    
    let prodItem = currentProducts.map((item,index) => {
      return(
        <Col md={3} sm={4} lg={2} key={index} style={{ marginTop:"5px" }}>
            <Card className="text-center" style={{ backgroundColor:"#c7c7c7" }}>
              <Card.Img variant="top" src={item.item.images.background} style={{ padding:"5%" }} />
              {/* <Card.Body>
                <Link to={`/view/${item.itemId}`} >
                  <Card.Title style={{ fontSize: "16px" }}>{this.capitalizeFirstLetter(item.item.name)}</Card.Title>
                </Link>                
                <p>Php. {Number(item.store.cost).toFixed(2)}</p>
              </Card.Body> */}
              <Card.Footer>
                <Link to={`/view/${item.itemId}`} >
                  <Card.Title style={{ fontSize: "16px" }}>
                    { this.capitalizeFirstLetter(item.item.name) }
                  </Card.Title>
                </Link>                
                <p>Php. {Number(item.store.cost).toFixed(2)}</p>
                <div style={{ display: "flex", justifyContent: "space-between"}} >
                  <Button variant="outline-dark" className="btn-sm" onClick={()=>
                  this.props.addShoppingCartItem(item.itemId,"1",item.store.cost,
                  this.capitalizeFirstLetter(item.item.name)+"-"+this.capitalizeFirstLetter(item.item.type)+"-"+this.capitalizeFirstLetter(item.item.rarity),
                  item.item.images.background,
                  Number(item.store.cost)
                  )}>
                    <span title="Add to Cart">
                      <FaCartPlus />
                    </span>
                  </Button>
                  
                  <Link to={`/view/${item.itemId}`} >
                    <span className="btn btn-sm btn-outline-info" title="View">
                      <FaEye />
                    </span>
                  </Link>
                </div>
              </Card.Footer>
            </Card>
        </Col>
      );
    });
    
    let pageNumbers = [];
    for(let i = 1; i <= Math.ceil(this.state.allproducts.length / this.state.productPerPage); i++ ){
      pageNumbers.push(
        <Pagination.Item key={i} active={i === this.state.currentPage} id={i} onClick={this.handlePage}>
          {i}
        </Pagination.Item>
      );
    }

    return(
      <>
      {/* All Products */}
        <div>
          <Row md={12}>
            <Col md={12}>
              <Row style={{ marginRight:"0",marginLeft:"0" }}>
                <Col md={12} className="text-right" style={{ marginTop:"25px" }}>
                  <Pagination style={{ justifyContent: "flex-start" }}>{pageNumbers}</Pagination>
                </Col>

                {prodItem}

                <Col md={12} className="text-right" style={{ marginTop:"25px" }}>
                  <Pagination>{pageNumbers}</Pagination>
                </Col>
              </Row>
            </Col>
            {/* <Col md={3}>
              
            </Col> */}
          </Row>

          <Coupons coupons={this.props.coupons} />
        </div>
      </>
    );
  }
}

export default Products;
