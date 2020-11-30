import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Footer extends Component {
    
  capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render (){
        let nav = this.props.navigation.navbar.map((item,i)=>{
          return(
            <li key={i}>
                <Link className="text-muted" to={item.url}>{this.capitalizeFirstLetter(item.label)}</Link>
            </li>
          );
        });

        let socialmedia = this.props.footer.products.map((item,i)=>{
            return(
            <li key={i}>
                <Link className="text-muted" to={item.url}>{this.capitalizeFirstLetter(item.label)}</Link>
            </li>
            );
        });

        let promotions = this.props.footer.promotions.map((item,i)=>{
            return(
            <li key={i}>
                <Link className="text-muted" to={item.url}>{this.capitalizeFirstLetter(item.label)}</Link>
            </li>
            );
        });
    return(
      <>

        <footer className="py-5 bg-light" style={{marginTop:"20px"}}>
            <div className="container container-fluid">
                <Row>
                    <Col className="col-md-4 col-md">
                        <Image src={this.props.navigation.logo[1].url}/>
                        <small className="d-block mb-3 text-muted">&copy; 2019-2021</small>
                        <p>{this.props.footer.shortAbout}</p>
                    </Col>
                    <Col>
                        <h5>Navigations</h5>
                        <ul className="list-unstyled text-small">
                            {nav}
                        </ul>
                    </Col>
                    <Col>
                        <h5>Promotions</h5>
                        <ul className="list-unstyled text-small">
                            {promotions}
                        </ul>
                    </Col>
                    <Col>
                        <h5>Social Media</h5>
                        <ul className="list-unstyled text-small">
                            {socialmedia}
                        </ul>
                    </Col>
                </Row>
            </div>
        </footer>
      </>
    );
  }
}

export default Footer;
