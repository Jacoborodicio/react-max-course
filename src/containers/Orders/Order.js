import React from 'react';
import classes from './Order.css';

const Order = props => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        const ingredient = {};
        ingredient["name"] = ingredientName;
        ingredient["cuantity"] = props.ingredients[ingredientName];
        ingredients.push(ingredient);
    }
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients.map(ingredient => {
                return <span
                    style={{
                        padding: '4px',
                        border: '1px solid #ccc',
                        margin: '0 4px',
                        backgroundColor: '#eee',
                        borderRadius: '8px'
                    }}
                    key={ingredient.name}
                >{ingredient.name} ({ingredient.cuantity})</span>
            })}</p>
            <p>Price: <strong>{props.price.toFixed(2)} €</strong></p>
        </div>
    );
}

export default Order;