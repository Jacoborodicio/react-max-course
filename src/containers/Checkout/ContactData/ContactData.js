import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: ''
            }, 
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street',
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zip code',
                },
                value: ''
            }, 
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your coutry',
                },
                value: ''
            }, 
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                value: ''
            }, 
            delivertyMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: ''
            }, 
        },
        loading: false,
    }
    orderHandler = event => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let formIdentifier in this.state.orderForm) {
            formData[formIdentifier] = this.state.orderForm[formIdentifier].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response =>  {
                console.log(response);   
                this.setState({loading: false}); 
                this.props.history.push('/');            
            }).catch(err =>  {
                console.log(err);
                this.setState({loading: false});             
            })
    }   

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(elem => (
                <Input 
                    key={elem.id} 
                    elementType={elem.config.elementType} 
                    elementConfig={elem.config.elementConfig} 
                    value={elem.value} 
                    changed={(event) => this.inputChangeHandler(event, elem.id)} 
                    />
            ))}
            <Button buttonType='Success'>
                Order
            </Button>                
            
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData }>
                <h4>Enter your contact data</h4>
                {form} 
            </div>
        );
    }
}

export default ContactData;