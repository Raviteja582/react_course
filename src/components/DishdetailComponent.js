import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody } from 'reactstrap';
class Details extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const d=this.props.dish;
        if(d!=null){
            return  (
                <div className="container">
                    <div className="row">
                    <div className="col-12 col-md-5 m-1">
                    <Card>
                       <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                           <CardBody>
                           <CardTitle>{this.props.dish.name}</CardTitle>
                           <CardText>{this.props.dish.description}</CardText>
                               </CardBody>
                       </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                      <b>Comments</b>
                        {this.props.dish.comments.map( (comment) => {
                            return(
                                <div>
                                    <p>{comment.comment}</p>
                                    <p>--{comment.author} , {comment.date}</p>
                                </div>
                            );
                        })}
                    </div>
                    </div>
                </div>
                       
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
}

export default Details;