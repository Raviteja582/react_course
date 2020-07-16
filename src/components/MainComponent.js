import React, { Component } from 'react';

import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Details from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch,Route,Redirect } from 'react-router-dom';
class Main extends Component {
  	constructor(props) {
		super(props);
		this.state={
            dishes: DISHES,
		};
    }
	render() {

		/* 1st way declaring a component to a route */
		const HomePage = () => {
			return (
				<Home />
			);
		}
		return (
			<div>
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					{/* 2nd way of declaring a component to a route Inline method. */}
					<Route exact path="/menu" component={() => <Menu dish={this.state.dishes} />} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default Main;
