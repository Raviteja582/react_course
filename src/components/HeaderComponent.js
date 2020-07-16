import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler,Collapse,NavItem, Jumbotron} from 'reactstrap';
import {NavLink} from 'react-router-dom';
class Header extends Component{
    constructor(props){
        super(props);
        this.toggleNav=this.toggleNav.bind(this);
        this.state={
            isNavOpen:false
        };
    }

    toggleNav(){
        this.setState({
            isNavOpen:!this.state.isNavOpen
        });
    }

    /* <> </> is a shortform 
        So in here we'll return, in here we can make use of what is called as React fragment which enables us to group together a bunch of React elements and then return it. 
        Now when you use a React fragment here this is the short form syntax for using the React fragment. 
        The long form would be to say, React.Fragment like this here. 
        Now I'm going to use the short form for this and this enables us to group together a bunch of React elements and then return it.
        And also ensures that their alternative they're going to use a div to enclose all the React elements. 
        Now if you use a div that'll add in one more node into our DOM by using the React fragment, you don't add in an extra node into the DOM, you just add in the React elements directly into the DOM. 
        So that's the reason for using the React fragment here.
    */
   
    render(){
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="30" width="30" alt="My Restaurent" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span>Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"></span>AboutUs
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"></span>Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span>contactus
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6"> 
                                <h1>Priyadarshi Hotel</h1>
                                <p>We take Responsibilty for taste, u take taste of our receipe.Make sure u enjoy yourselves and dive in the taste of sea.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default Header;