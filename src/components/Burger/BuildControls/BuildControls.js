import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';


const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
];

const buildControls = props => (

    <div className={classes.BuildControls} >
        <h3>Current price:  {props.price.toFixed(2)} €</h3>
            {
            controls.map(ctrl => (
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                ingredientAdded={() => props.ingredientAdded(ctrl.type)}
                ingredientRemoved={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                />
            ))
            }
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable} onClick={props.purchase}>Order now!</button>
    </div>
);

export default buildControls;