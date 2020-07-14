import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';

    /* these funtions are used to know the lifecycle of Components. */
    /* componentDidMount(){
        console.log('MenuComponent Component componentDidMount invoked');
    }
    componentDidUpdate(){
        console.log('MenuComponent component componentDidUpdated invoked');
    } */


    /* 1st way of implemeting funtional Components using JS*/

    function RenderDish({dish}){
        return(
            <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
        );
    }
    function RenderComments({comment}){
        return(
            <div className="col-12 col-md-5 m-1">
                <b>Comments</b>
                {comment.map( (com) => {
                    return(
                        <div>
                            <p>{com.comment}</p>
                            <p>--{com.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    /* 2nd of Implementing the funtion. */
    const Details= (props) => {
        const d=props.dish;
        if(d!=null){
            return  (
                <div className="container">
                    <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comment={props.dish.comments} />
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
export default Details;