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


const mapStateToProps= state =>{
	return {
		dishes: state.dishes,
		comments: state.comments,
		leaders: state.leaders,
		promotions: state.promotions
	}
}

class Main extends Component {
	
  	constructor(props) {
		super(props);
	}

	render() {
		/* The DishDetail Component is called because the each dish in the menu is associated with a link '/menu/id' 
			So hence by clicking a dish it immediatly generate the link with /menu/id and pass to the router of react.*/

		const DishWithId = ({match}) => {
			return(
				<Details dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
				  comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
			);
		  };
		/* 1st way declaring a component to a route */
		const HomePage = () => {
			return (
				<Home 
					dish={this.props.dishes.filter((dish) => dish.featured)[0]}
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
					<Route exact path="/menu" component={() => <Menu dish={this.props.dishes} />} />
					<Route path='/menu/:dishId' component={DishWithId} />
					<Route exact path="/contactus" component={Contact} />
					<Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps)(Main));
