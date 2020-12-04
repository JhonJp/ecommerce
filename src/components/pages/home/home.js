import React, { Component } from 'react';
import Particle from 'particles-bg';
import { Row, Col, Carousel, Image, Tab, Nav, Card, Pagination, Button } from 'react-bootstrap';
import { Spring } from 'react-spring/renderprops';
import { FaCartPlus, FaEye, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Coupons from '../coupons/coupons';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      value:'',
      products:'emote',
      currentPage:1,
      productPerPage:6,
      currentupcomingPage:1,
      allproducts:this.props.products,
    }
    this.handlePage = this.handlePage.bind(this);
    this.handleupcomingPage = this.handleupcomingPage.bind(this);
  }

  handlePage(index){
    this.setState({
      currentPage: Number(index.target.id),
    });
  }

  handleupcomingPage(index){
    this.setState({
      currentupcomingPage: Number(index.target.id),
    });
  }

  setProductCategory = index => {
    this.setState({
      value:'',
      products:index,
    });
  }

  capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render (){
    let btnClass = this.props.headline.buttonCls.btnClass ? this.props.headline.buttonCls.btnClass : "btn btn-outline-secondary";
    let btnLabel = this.props.headline.buttonCls.label ? this.props.headline.buttonCls.label : "Explore More";
    let btnTarget = this.props.headline.buttonCls.target ? this.props.headline.buttonCls.target : "/";
    let headl = this.props.headline.mainHeadline.mainTitle ? this.props.headline.mainHeadline.mainTitle : "Welcome headline";
    let sub = this.props.headline.mainHeadline.subTitle.map((item,i)=> {
      return(
        <Carousel.Item key={i} interval={3000} controls={false} style={{ height:"175px" }}>
          <Carousel.Caption>
            <p>{ item.message }</p>
            <Link className={btnClass} to={btnTarget} >{ btnLabel }</Link>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });
    let slideImg = this.props.headline.mainHeadline.subTitle.map((item,i)=>{
      return(
          <Carousel.Item key={i} interval={3000} controls={false} >    
            <Image
                  src={item.image}
                  className="img-fluid"/>
          </Carousel.Item>
      );
    })
    
    //collection items
    let indexofLastProducts = this.state.currentPage * this.state.productPerPage;
    let indexofFirstProducts = indexofLastProducts - this.state.productPerPage;
    let filterd = this.state.allproducts.filter((y) => y.item.type === this.state.products);
    let currentProducts = filterd.slice(indexofFirstProducts,indexofLastProducts);

    //upcoming items
    let indexofLastUpcoming = this.state.currentupcomingPage * this.state.productPerPage;
    let indexofFirstUpcoming = indexofLastUpcoming - this.state.productPerPage;
    let currentUpcoming = this.props.upcoming.slice(indexofFirstUpcoming,indexofLastUpcoming);
    
    //collection items loop per item
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
                  <Button variant="outline-dark" className="btn-sm" onClick={()=>this.props.addShoppingCartItem(item.itemId,"1",item.store.cost,
                  this.capitalizeFirstLetter(item.item.name)+"-"+this.capitalizeFirstLetter(item.item.type)+"-"+this.capitalizeFirstLetter(item.item.rarity),
                  item.item.images.background,
                  Number(item.store.cost))}>
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

    //upcoming items loop per item
    let produpcomingItem = currentUpcoming.map((item,index) => {
      return(
        <Col md={3} sm={4} lg={2} key={index} style={{ marginTop:"5px" }}>
            <Card className="text-center" style={{ backgroundColor:"#c7c7c7" }}>
              <Card.Img variant="top" src={item.item.images.background} style={{ padding:"5%" }} />
              <Card.Footer>
                <Card.Title style={{ fontSize: "16px" }}>
                  <Link to={`/view/${item.itemId}`} >
                    { this.capitalizeFirstLetter(item.item.name) }
                  </Link>
                </Card.Title>      
                <p>Php. {Number(item.store.cost).toFixed(2)}</p>
              </Card.Footer>
            </Card>
        </Col>
      );
    });
    
    //collection items
    let pageNumbers = [];
    for(let i = 1; i <= Math.ceil(filterd.length / this.state.productPerPage); i++ ){
      pageNumbers.push(
        <Pagination.Item key={i} active={i === this.state.currentPage} id={i} onClick={this.handlePage}>
          {i}
        </Pagination.Item>
      );
    }

    //upcoming item
    let upcomingPageNum = [];
    for(let i = 1; i <= Math.ceil(this.props.upcoming.length / 6); i++ ){
      upcomingPageNum.push(
        <Pagination.Item key={i} active={i === this.state.currentupcomingPage} id={i} onClick={this.handleupcomingPage}>
          {i}
        </Pagination.Item>
      );
    }

    let cateList = ['emote','music','outfit','pickaxe','glider','bundle','wrap'];
    let cate = [];
    let tabpane = [];
    for(let x=0;x < cateList.length; x++ ){
      cate.push(
        <Nav.Item key={x}>
          <Nav.Link eventKey={cateList[x]} onClick={()=>this.setProductCategory(cateList[x])} name={cateList[x]}>
            <FaChevronRight /> {this.capitalizeFirstLetter(cateList[x]) +" Class"}
          </Nav.Link>
        </Nav.Item>
      );
    }
    for(let x=0;x < cateList.length; x++ ){
      tabpane.push(
        <Tab.Pane eventKey={cateList[x]} key={x}>
          <Row style={{ marginRight:"0",marginLeft:"0" }}>
            {prodItem}
            <Col md={12} className="text-right" style={{ marginTop:"25px" }}>
              <Pagination >{pageNumbers}</Pagination>
            </Col>
          </Row>
        </Tab.Pane>
      );
    }

    return(
      <>
      <Particle type="cobweb" bg={true} />
      <div className="position-relative overflow-hidden p-md-3 text-center">
        
        <Row>
          <Col md={5}>
            <Spring
                from={{ opacity:0 }}
                to={{ opacity:1 }}
                config={{ delay: 0, duration: 1000 }}
                > 
                {ps=>(
                    <Carousel style={ps} controls={false} indicators={false}>
                    { slideImg }
                  </Carousel>
                )}
              </Spring>
          </Col>
          <Col md={7} style={{ margin: "5% 0 0 0"}} className="text-center">
            <Spring
              from={{ opacity:0 }}
              to={{ opacity:1 }}
              config={{ delay: 0, duration: 1000 }}
              > 
              {pr=>(
                <div style={pr}>
                    <h1 className="display-4 font-weight-normal">{ headl }</h1>
                    <Carousel controls={false} indicators={false}>
                      { sub }
                    </Carousel>
                </div>
              )}
            </Spring>
          </Col>
        </Row>
      </div>

      {/* Another list here below the main header or banner */}
      <Coupons coupons={this.props.coupons}/>

      {/* Collections */}
      <Row>
        <Col style={{ padding: "3%" }}>
          <h3 className="text-center">Our Collections</h3>
        </Col>
      </Row>
      <Tab.Container id="left-tabs-example" defaultActiveKey="emote">
        <Row>
          <Col sm={2}>
            <Nav variant="tabs" className="flex-column">
              {cate}
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              {tabpane}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* Upcoming */}
      <Row>
        <Col style={{ padding: "3%" }}>
          <h3 className="text-center">Upcoming Items</h3>
        </Col>
      </Row>
      <Row style={{ marginRight:"0",marginLeft:"0" }}>
        {produpcomingItem}
        <Col md={12} className="text-right" style={{ marginTop:"25px" }}>
          <Pagination style={{ justifyContent: "center" }}>{upcomingPageNum}</Pagination>
        </Col>
      </Row>
      </>
    );
  }
}

export default Home;
