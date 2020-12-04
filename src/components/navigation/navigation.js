import React, { Component } from 'react';
import { Navbar, Nav, Row, Col, Badge, NavDropdown } from 'react-bootstrap';
import SearchBar from "material-ui-search-bar";
import { FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class Navigation extends Component {

    constructor(props){
        super(props);
        this.state = {
            active:0,
            navBackground:"none",
            hideSearch: false,
        }
    }
    
    changeState = index => {
        this.setState({ active: index })
        if((index === 5) || (index === 4)){
            this.setState({ hideSearch: true });
        } else {
            this.setState({ hideSearch: false });
        }
    }

    componentDidMount = () => {
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
        });

        if(this.state.hideSearch) {
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
                                    { this.props.user === null ? (
                                        <>
                                        <Link to="/register"  onClick={()=>this.changeState(4)} className={this.state.active === 4 ? 'active' : ''}>Register</Link>
                                        <Link to="/signin" onClick={()=>this.changeState(5)} className={this.state.active === 5 ? 'active' : ''}>
                                            Sign In
                                        </Link>
                                        </>
                                    ) : (
                                        <>
                                        <NavDropdown title={this.props.user.displayName === null ? 'Welcome User' : 'Welcome '+this.props.user.displayName} id="basic-nav-dropdown" style={{ padding: "0 0.5rem !important" }}>
                                            <div style={{ display: "inline-grid" }}>
                                                <Link to="/" style={{ padding: "10px " }}>Profile</Link>
                                                <Link to="/" style={{ padding: "10px " }}>Address</Link>
                                                <NavDropdown.Item onClick={(e) => this.props.handleLogout(e)} style={{ padding: "10px " }}>Sign Out</NavDropdown.Item>
                                            </div>
                                        </NavDropdown>
                                        </>
                                    ) }
                                    
                                    <Link to="/cart">
                                        | <span>
                                            <FaShoppingBag /> Bag &nbsp; 
                                                <Badge pill variant="dark">
                                                    {this.props.cart}
                                                </Badge>
                                        </span>
                                    </Link>
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                    </Navbar>          
                </>
            );
        }

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
                                { this.props.user === null ? (
                                        <>
                                        <Link to="/register"  onClick={()=>this.changeState(4)} className={this.state.active === 4 ? 'active' : ''}>Register</Link>
                                        <Link to="/signin" onClick={()=>this.changeState(5)} className={this.state.active === 5 ? 'active' : ''}>
                                            Sign In
                                        </Link>
                                        </>
                                    ) : (
                                        <>
                                        <NavDropdown title={this.props.user.displayName === null ? 'Welcome User' : 'Welcome '+this.props.user.displayName} id="basic-nav-dropdown" style={{ padding: "0 0.5rem !important" }}>
                                            <div style={{ display: "inline-grid" }}>
                                                <Link to="/" style={{ padding: "10px " }}>Profile</Link>
                                                <Link to="/" style={{ padding: "10px " }}>Address</Link>
                                                <NavDropdown.Item onClick={(e) => this.props.handleLogout(e)} style={{ padding: "10px " }}>Sign Out</NavDropdown.Item>
                                            </div>
                                        </NavDropdown>
                                        </>
                                ) } 
                                <Link to="/cart">
                                    | <span>
                                        <FaShoppingBag /> Bag &nbsp; 
                                            <Badge pill variant="dark">
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

