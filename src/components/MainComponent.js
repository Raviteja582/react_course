import React, { Component } from 'react';

import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Details from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
class Main extends Component {
  	constructor(props) {
		super(props);
		this.state={
            dishes: DISHES,
            selectedDish: null
		};
    }
    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId});
    }
	render() {
		return (
			<div>
				<Header />
				<Menu dish={this.state.dishes} 
                    onClick={(dishId) => this.onDishSelect(dishId)} />
				<Details dish={this.state.dishes.filter((dis) => dis.id === this.state.selectedDish)[0]} />
				<Footer />
			</div>
		);
	}
}

export default Main;
