import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody } from 'reactstrap';
class Details extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Card key={this.props.dish.id}>
                <CardImg width="200%" height="200%" src={this.props.dish.image} alt={this.props.dish.name} />
                <CardImgOverlay>
                    <CardTitle>{this.props.dish.name}</CardTitle>
                </CardImgOverlay>
                <CardBody>
                    <CardTitle>{this.props.dish.name}</CardTitle>
                    <CardText>{this.props.dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}

export default Details;