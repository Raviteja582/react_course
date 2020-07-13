import React, { Component } from 'react';
import {Media, ToastHeader} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import Details from './DishdetailComponent';
class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
        console.log('Menu Components constructor is Called')
    }
    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }
    renderComment(dish){
        if(dish!=null){
            const com=dish.comments.map((c) =>{
                return(
                    <div>
                        <li>
                        {c.comment}<br></br>
                        --{c.author}, {c.date}
                        </li>
                        <br></br>
                    </div>
                );    
            });
            return(
                <div>
                    <h4>Comments</h4><br></br>
                    <ul className="list-unstyled">
                        {com}
                    </ul>
                </div>
                
            );
        }
        else{
            return(
                <div>
                </div>
            );
        }
    }
    renderDish(dish) {
        console.log("Render dish is called");
        if (dish != null)
            return(
                <Details dish={this.state.selectedDish} />
            );
        else
            return(
                <div></div>
            );
    }
    componentDidMount(){
        console.log('Menu Components ComponentDid Mount is Called')
    }
    render(){
        const menu = this.props.dishes.map((dish) => {
            return (
              <div  className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                  onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });
        console.log('Menu Components Render is Called')
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 ml-1">
                        {this.renderDish(this.state.selectedDish)}
                    </div>
                    <div className="col-12 col-md-5 mr-1">
                        {this.renderComment(this.state.selectedDish)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;