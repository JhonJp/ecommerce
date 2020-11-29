import React, { Component } from 'react';
import InfiniteCarousel from 'react-leaf-carousel';
import { Row, Col, Image } from 'react-bootstrap';

class Coupons extends Component {
  render (){
    let coupon = this.props.coupons.map((item,i)=> {
        return(
          <div key={i}>
            <Image 
              src={item.img_url}
              alt={item.label}
            />
          </div>
        );
      });
    return(
      <>
        <Row className="text-center" style={{ margin:"2% 0"}}>
            <Col>
                <InfiniteCarousel
                breakpoints={[
                    {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        swipe:true,
                        arrows:false
                    },
                    },
                    {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        swipe:true,
                        arrows:true
                    },
                    },
                    {
                    breakpoint: 1080,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows:true
                    },
                    },
                ]}
                dots={true}
                showSides={true}
                sidesOpacity={.5}
                sideSize={.1}
                slidesToScroll={1}
                slidesToShow={3}
                scrollOnDevice={true}
                arrows={true}
                >
                    {coupon}
            </InfiniteCarousel>
            </Col>
        </Row>
      </>
    );
  }
}

export default Coupons;
