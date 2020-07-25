import React, { Component } from 'react';

import Menu from './MenuComponent';
import Details from './DishdetailComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch,Route,Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedBack } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps= state =>{
	return {
		dishes: state.dishes,
		comments: state.comments,
		leaders: state.leaders,
		promotions: state.promotions
	}
}

const mapDispatchToProps = dispatch => ({
  
	postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
	postFeedBack: (firstname, lastname, telnum, email, agree, contactType, message, id) => dispatch(postFeedBack(firstname, lastname, telnum, email, agree, contactType, message, id)),
	fetchDishes: () => {dispatch(fetchDishes())},
	resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
	fetchComments: () => dispatch(fetchComments()),
	fetchPromos: () => dispatch(fetchPromos()),
	fetchLeaders: () => dispatch(fetchLeaders())
});

class Main extends Component {

	componentDidMount(){
		this.props.fetchDishes();
		this.props.fetchComments();
		this.props.fetchPromos();
		this.props.fetchLeaders();
	}

	render() {
		/* The DishDetail Component is called because the each dish in the menu is associated with a link '/menu/id' 
			So hence by clicking a dish it immediatly generate the link with /menu/id and pass to the router of react.*/

		const DishWithId = ({match}) => {
			return(
				<Details dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
					isLoading={this.props.dishes.isLoading}
					errMess={this.props.dishes.errMess}
					comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
					commentsErrMess={this.props.comments.errMess}  
					postComment={this.props.postComment} />
			);
		  };
		/* 1st way declaring a component to a route */
		const HomePage = () => {
			return (
				<Home 
					dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
					dishesLoading={this.props.dishes.isLoading}
					dishesErrMess={this.props.dishes.errMess}
					promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
					promoLoading={this.props.promotions.isLoading}
              		promoErrMess={this.props.promotions.errMess}
					leader={this.props.leaders.leaders.filter((lead) => lead.featured)[0]}
					leadersLoading={this.props.leaders.isLoading}
              		leadersErrMess={this.props.leaders.errMess}
          		/>
			);
		}

		return (
			<div>
				<Header />
				<TransitionGroup>
            		<CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
						<Switch>
							<Route path="/home" component={HomePage} />
							{/* 2nd way of declaring a component to a route Inline method. */}
							<Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
							<Route path='/menu/:dishId' component={DishWithId} />
							<Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedBack={this.props.postFeedBack} />} />
							<Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
							<Redirect to="/home" />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
