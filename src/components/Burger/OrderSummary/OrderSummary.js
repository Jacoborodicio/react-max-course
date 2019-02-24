import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    /**
     * This could be a stateless component, it doesn't have to be a class. 
     * Just debbugging purpouses!
     */
    componentWillUpdate() {
        console.log("[OrderSummary.js] WillUpdate");
    }
    render() {
        const ingredients = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
                )
            });
        return (
            <>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <p>Total Price: {this.props.price.toFixed(2)}</p>
                <p>Continue to checkout?</p>
                <Button buttonType='Danger' clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button buttonType='Success' clicked={this.props.purchaseContinued}>Continue</Button>
            </>
        );
    }
};

export default OrderSummary;