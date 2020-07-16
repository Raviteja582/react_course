import React, { Component } from 'react';

import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Details from './DishdetailComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch,Route,Redirect } from 'react-router-dom';

import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';


class Main extends Component {
  	constructor(props) {
		super(props);
		this.state={
            dishes: DISHES,
			comments: COMMENTS,
			promotions: PROMOTIONS,
			leaders: LEADERS
		};
	}
	render() {
		/* The DishDetail Component is called because the each dish in the menu is associated with a link '/menu/id' 
			So hence by clicking a dish it immediatly generate the link with /menu/id and pass to the router of react.*/

		const DishWithId = ({match}) => {
			return(
				<Details dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
				  comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
			);
		  };
		/* 1st way declaring a component to a route */
		const HomePage = () => {
			return (
				<Home 
					dish={this.state.dishes.filter((dish) => dish.featured)[0]}
					promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
					leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          		/>
			);
		}
		return (
			<div>
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					{/* 2nd way of declaring a component to a route Inline method. */}
					<Route exact path="/menu" component={() => <Menu dish={this.state.dishes} />} />
					<Route path='/menu/:dishId' component={DishWithId} />
					<Route exact path="/contactus" component={Contact} />
					<Route exact path="/aboutus" component={() => <About leaders={this.state.leaders} />} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default Main;
