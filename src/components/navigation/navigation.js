import React, { Component } from 'react';
import { Navbar, Nav, Row, Col, Badge } from 'react-bootstrap';
import SearchBar from "material-ui-search-bar";
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    state = {
        active:0,
        navBackground:"none",
    }

    changeState = index => {
        this.setState({ active: index })
    }

    componentDidMount() {
        
        document.addEventListener("scroll", () => {
            const bgColor = window.scrollY < 100 ? "none":"light";
            this.setState({ navBackground: bgColor });
        })
    }

    render(){        
        let navbar = this.props.navigation.navbar.map((item, i)=>{
            let navisActive = this.state.active === i ? 'nav-link active' : 'nav-link';
                return(
                    <Link key={ i } to={ item.url } className={ navisActive } onClick={()=>this.changeState(i)}>{ item.label }</Link>
                );
        })
        return(
            <>
                <Navbar collapseOnSelect expand="lg" bg={this.state.navBackground} variant="light" sticky="top">
                    <div className="container">
                        <Navbar.Brand to="/">
                        <img
                            alt={ this.props.navigation.logo[1].title }
                            src={ this.props.navigation.logo[1].url }
                            width="120"
                            className="d-inline-block align-top"
                        />{' '}
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                { navbar }
                            </Nav>
                            <Nav>
                                <Link to="/" >Register</Link>
                                <Link to="/">
                                    Sign In
                                </Link>
                                <Link to="/cart">
                                    | <span>
                                        <FaShoppingCart /> Cart &nbsp; 
                                            <Badge pill variant="primary">
                                                {this.props.cart}
                                            </Badge>
                                    </span>
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
                
                <Row md={12} style={{ marginTop:"2%" }}>
                    <Col style={{ margin: "0 15% 3%" }}>
                        <SearchBar
                        value={this.state.value} placeholder="Search products"
                        onChange={(newValue) => console.log("test search")}
                        onRequestSearch={() => console.log("test search")}
                        />
                    </Col>
                </Row>
            </>
        );
    }
}

export default Navigation;

