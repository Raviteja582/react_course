import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle } from 'reactstrap';

class Menu extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        const menu = this.props.dish.map((dis) => {
            return (
              <div key={dis.id} className="col-12 col-md-5 m-1">
                <Card onClick={() => this.props.onClick(dis.id)}>
                  <CardImg width="100%" src={dis.image} alt={dis.name} />
                  <CardImgOverlay>
                      <CardTitle>{dis.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
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
}

export default Menu;