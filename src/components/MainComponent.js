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
import { addComment,fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';


const mapStateToProps= state =>{
	return {
		dishes: state.dishes,
		comments: state.comments,
		leaders: state.leaders,
		promotions: state.promotions
	}
}

const mapDispatchToProps = dispatch => ({
  
	addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
	fetchDishes: () => {dispatch(fetchDishes())},
	resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
  
});

class Main extends Component {
	
  	constructor(props) {
		super(props);
	}

	componentDidMount(){
		this.props.fetchDishes();
	}

	render() {
		/* The DishDetail Component is called because the each dish in the menu is associated with a link '/menu/id' 
			So hence by clicking a dish it immediatly generate the link with /menu/id and pass to the router of react.*/

		const DishWithId = ({match}) => {
			return(
				<Details dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
					isLoading={this.props.dishes.isLoading}
					errMess={this.props.dishes.errMess}
				  	comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
				  	addComment={this.props.addComment} />
			);
		  };
		/* 1st way declaring a component to a route */
		const HomePage = () => {
			return (
				<Home 
					dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
					dishesLoading={this.props.dishes.isLoading}
					dishesErrMess={this.props.dishes.errMess}
					promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
					leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          		/>
			);
		}
		
		return (
			<div>
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					{/* 2nd way of declaring a component to a route Inline method. */}
					<Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
					<Route path='/menu/:dishId' component={DishWithId} />
					<Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
					<Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
