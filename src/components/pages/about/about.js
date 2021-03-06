import React, { Component } from 'react';
import Particle from 'particles-bg';
import { Row, Col, Image } from 'react-bootstrap';
import { Spring } from 'react-spring/renderprops';
import Coupons from '../coupons/coupons';

class About extends Component {

  capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  render (){
    return(
      <>
        <Particle type="cobweb" bg={true} />
        <div className="position-relative overflow-hidden p-md-5 text-center" style={{ minHeight: "450px" }}>
          <Row>
            <Col>
              <Spring
                    from={{ opacity:0 }}
                    to={{ opacity:1 }}
                    config={{ delay: 0, duration: 1000 }}
                    > 
                    {ps=>(
                        <Image
                        src={this.props.headline.about.logo}
                        className="img-fluid" style={{ height:"250px" }}/>
                    )}
                  </Spring>
                  <div>
                        <h1 className="display-4 font-weight-normal">{ this.props.headline.about.label }</h1>
                        <p>{ this.props.headline.about.message }</p>
                    </div>
            </Col>
          </Row>
        </div>
        
        <Coupons coupons={this.props.coupons} />
      </>
    );
  }
}

export default About;
