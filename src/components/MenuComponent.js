import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle } from 'reactstrap';

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
            <Card onClick={() => onClick(dish.id)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
            </Card>
        );
    }

    /* 2nd way of implementing funtional Component using JSX */

    const Menu= (props) => {
        const menu = props.dish.map((dis) => {
            return (
              <div key={dis.id} className="col-12 col-md-5 m-1">
                  <RenderMenuItem dish={dis} onClick={props.onClick} />
              </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
export default Menu;