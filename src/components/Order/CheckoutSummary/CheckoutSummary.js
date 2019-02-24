import React from 'react';
import Burguer from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burguer ingredients={props.ingredients} />
            </div>
            <Button buttonType="Danger"
                clicked={props.onCheckoutCancelled}>Cancel</Button>
            <Button buttonType="Success"
                clicked={props.onCheckoutContinued}>Continue</Button>

        </div>
    );
}

export default checkoutSummary;