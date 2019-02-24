import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.8,
    cheese: 0.4,
    meat: 1.2,
    bacon: 0.9
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: null,
                bacon: null,
                cheese: null,
                meat: null
            },
            price: 2,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: null
        };
    }

    componentDidMount() {
        axios.get("https://react-my-burger-e2564.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data});
            }).catch (error => {
                this.setState({error: error});
            });
    }

    updatePurchaseState (ingredients) {
        const sumIngredients = Object.keys(ingredients).map(ingredient => {
            return ingredients[ingredient];
        }).reduce ((sumIngredients, elem) => {
            return sumIngredients + elem;
        }, 0);

        this.setState({
            purchasable: sumIngredients > 0
        });
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            price: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0)
            return;
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            price: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }
    
    purchaseContinueHandler = () => {

        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.price,
        //     customer: {
        //         name: 'Jacobo Rodicio', 
        //         address: 'Street',
        //         zipCode: '32004',
        //         country: 'Germany'
        //     },
        //     email: 'test@test.com',
        //     delivertyMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(response =>  {
        //         console.log(response);   
        //         this.setState({loading: false, purchasing: false});             
        //     }).catch(err =>  {
        //         console.log(err);
        //         this.setState({loading: false, purchasing: false});             
        //     })

        this.props.history.push('/checkout');
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded...</p> : <Spinner />

        if(this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        purchase={this.purchaseHandler}
                        purchasable={this.state.purchasable}
                        price={this.state.price}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                    />
                </>
            );
            orderSummary = <OrderSummary 
            price={this.state.price}
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <>
                <Modal showModal={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);