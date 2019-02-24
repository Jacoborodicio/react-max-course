import React, {Component}  from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        console.log("Ingredients before setState: ", ingredients)
        this.setState({ingredients: ingredients})
    }
    
    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    
    onCheckoutContinuedHandler = () => {
        console.log("Props en checkout: ", this.props);
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.onCheckoutCancelledHandler}
                    onCheckoutContinued={this.onCheckoutContinuedHandler} />
            </div>
        );

    }
}

export default Checkout;