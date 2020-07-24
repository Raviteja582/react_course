import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './loadingComponent';
import { baseUrl } from '../shared/baseUrl';


    /* these funtions are used to know the lifecycle of Components. */
    /* componentDidMount(){
        console.log('MenuComponent Component componentDidMount invoked');
    }
    componentDidUpdate(){
        console.log('MenuComponent component componentDidUpdated invoked');
    } */


    /* 1st way of implemeting funtional Components using JS*/
    function RenderMenuItem({dish,onClick}){
        return(
            <Card>
                <Link to={`/menu/${dish.id}`}>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
        );
    }

    /* 2nd way of implementing funtional Component using JSX */

    const Menu= (props) => {
        const menu = props.dishes.dishes.map((dis) => {
            return (
              <div key={dis.id} className="col-12 col-md-5 m-1">
                  <RenderMenuItem dish={dis} onClick={props.onClick} />
              </div>
            );
        }); 
        if (props.dishes.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.dishes.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.dishes.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else 
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>      
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
    }
export default Menu;