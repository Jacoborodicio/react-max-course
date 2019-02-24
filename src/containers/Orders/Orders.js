import React, {Component} from 'react';
import Order from './Order';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }
    componentDidMount() {
        this.setState({loading: true})
        axios.get('/orders.json')
            .then(response => {
                const auxOrders = [];
                for (let key in response.data) {
                    auxOrders.push({...response.data[key], id: key});
                }
                this.setState({loading: false, orders: auxOrders})

            }).catch(err => {
                this.setState({loading: false});
                console.log(err);
            })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                   return <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}             
                />
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);