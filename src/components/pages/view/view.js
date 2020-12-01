import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, Table, Button, Spinner } from 'react-bootstrap';
import { FaCartPlus, FaMoneyBill } from 'react-icons/fa';
import Coupons from '../coupons/coupons';

const View = (props) => {
    const [itemInfo, setInfo] = useState([]);
    let {id} = useParams();

    useEffect(() => {
        loadData();
    });

    const capitalizeFirstLetter = (str) => {
        if(str === undefined){
            return str === undefined ? '' : str.charAt(0).toUpperCase() + str.slice(1);
        } else if(str === null) {
            return str === null ? '' : str.charAt(0).toUpperCase() + str.slice(1);
        } else {
            return str === '' ? '' : str.charAt(0).toUpperCase() + str.slice(1);
        }        
    }

    const loadData = async () => {
        try{
            const response = await fetch("https://flcosmetics-34043.firebaseio.com/allProducts.json?print=pretty");
            const data = await response.json();
            const spec = data.filter((y) => y.itemId === id);
            setInfo(spec);
            // const response = await fetch("https://fortnite-api.theapinetwork.com/item/get?id="+id);
            // const data = await response.json();
            // let x = [];
            // x.push(data.data);
            // setInfo(x);
        }catch(e){
            console.log(e);
        }
    }

    let item = itemInfo.map((item,index) => {
        return (
            <div key={index}>
                <Row>
                    <h3> {capitalizeFirstLetter(item.item.name)} - {capitalizeFirstLetter(item.item.description)} </h3>
                </Row>
                <br/>
                <Row md={10} >
                    <Col md={4}>
                        <Row>
                            <Image src={item.item.images.background}
                                className="img-fluid img-thumbnail" style={{ backgroundColor:"#c7c7c7"}} />
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Table responsive bordered>
                            <tbody>
                                <tr>
                                    <td style={{ width: "20%" }}><b>Name</b></td>
                                    <td>{capitalizeFirstLetter(item.item.name)}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "20%" }}><b>Description</b></td>
                                    <td>{capitalizeFirstLetter(item.item.description)}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "20%" }}><b>Rarity</b></td>
                                    <td>{capitalizeFirstLetter(item.item.rarity)}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "20%" }}><b>Item Type</b></td>
                                    <td>{capitalizeFirstLetter(item.item.type)}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "20%" }}><b>Available Stock</b></td>
                                    <td>{Number(item.stock)}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "20%" }}><b>Price</b></td>
                                    <td>Php. {Number(item.store.cost).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Col style={{ padding: "0" }}>
                            <Button variant="info" onClick={()=>{
                                    props.addShoppingCartItem(item.itemId,"1",
                                    item.store.cost,
                                    capitalizeFirstLetter(item.item.name)+"-"+capitalizeFirstLetter(item.item.type)+"-"+capitalizeFirstLetter(item.item.rarity),
                                    item.item.images.background,
                                    Number(item.item.cost)
                                    )
                                }
                            }>
                            <span>
                                <FaCartPlus />
                            </span> Add to Cart
                            </Button>
                            &nbsp;
                            <Button variant="success">
                            <span>
                                <FaMoneyBill />
                            </span> Buy Now
                            </Button>
                        </Col>
                    </Col>
                    <Col md={2} style={{ boxShadow:"1px 1px 3px 2px #888888", border:"0.5px solid #c7c7c7"}} >
                        <div>Side content</div>
                    </Col>
                </Row>
                <br />
                <Row>
                    
                </Row>
            </div>
        );
    })

    if(item.length === 0){
        return(
            <>
            <div className="main-content text-center lg-12 md-12" style={{ padding:"20%", overflow:"hidden" }}>
                <Spinner animation="grow" variant="info" size="md" />
            </div>
            </>
          );
    }

    return(
        <>
            <div className="container">
                
                {item}

            </div>
            <Coupons coupons={props.coupons} />
        </>
    );
}


export default View;