import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row } from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';
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


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handlelogin=this.handlelogin.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handlelogin(values){
        this.props.postComment(this.props.dishId, values.rating, values.username, values.Comment);
        this.toggleModal();
    }
    render(){
        return(
            <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handlelogin(values)}>
                        <Row className="form-group">
                            <Label htmlFor="username">Rating</Label>
                            <Control.select model=".rating" name="rating" id="rating" className="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="username">Your Name</Label>
                            <Control.text model=".username" id="username" name="username"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".username"
                                show="touched"
                                messages={{
                                    required: 'Required ',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="Comment" md={2}>Comment</Label>
                            <Control.textarea model=".Comment" id="Comment" name="Comment"
                                rows="6"
                                className="form-control">
                            </Control.textarea>
                        </Row>
                        <Button type="submit" value="submit" className="bg-primary">
                            Submit
                        </Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        );
    }
}
    /* 1st way of implemeting funtional Components using JS*/
function RenderDish({dish}){
    return(
        <div className="col-12 col-md-5 m-1">
        <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>
    );
}
function RenderComments({comment, postComment, dishId}){
    return(
        <div className="col-12 col-md-5 ml-1">
            <b>Comments</b>
            {comment.map( (com) => {
                return(
                    <div>
                    <p>{com.comment}</p>
                    <p>--{com.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</p>
                    </div>
                );
            })}
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    );
}

/* 2nd of Implementing the funtion. */

const Details = (props) => {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish!=null){
        return  (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comment={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
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