import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }
    orderHandler = event => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Jacobo Rodicio', 
                address: 'Street',
                zipCode: '32004',
                country: 'Germany'
            },
            email: 'test@test.com',
            delivertyMethod: 'fastest'
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
    render () {
        let form = (<form>
            <input className={classes.Input} type='text' name='name' placeholder='Introduce your Name' />
            <input className={classes.Input} type='email' name='email' placeholder='Introduce your Mail' />
            <input className={classes.Input} type='text' name='street' placeholder='Introduce your Street' />
            <input className={classes.Input} type='text' name='postal' placeholder='Introduce your Postal Code' />
            <Button buttonType='Success' clicked={this.orderHandler}>
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