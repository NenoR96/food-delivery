import React, { Component } from 'react';
import { Card, ListGroup, Button, Collapse, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import StripeCheckout from "react-stripe-checkout";

import './cart.css';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            preOrder: false,
            items: [],
            item: {},
            //
            cost: 0,
            phone: '',
            adress: '',
            note: "",
            deleting: false
        }
        this.handleOrder = this.handleOrder.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.submitOrder = this.submitOrder.bind(this);
        this.handleToken = this.handleToken.bind(this);
    }

    handleChange(e) {
        console.log(e.target.name, e.target.value)
        if(e.target.name === "phone") {
            this.state.phone = e.target.value;
        }
        if(e.target.name === "adress") {
            this.state.adress = e.target.value;
        }
        if(e.target.name === "note") {
            this.state.note = e.target.value;
        }                
    }

    submitOrder(e) {
        let items = this.state.items;
        const url = "/cart";
        var foodItems = [];
        this.state.items.map(item => 
        foodItems.push({name: item.item.name, price: item.item.price, count: item.count}))
        console.log(foodItems)
        var item =JSON.stringify({
            phone: this.state.phone,
            cost: this.state.cost,
            adress: this.state.adress,
            note: this.state.note,
            foodItems: foodItems
        })
        console.log(item)
        fetch(url, {
            method: 'POST',
            body: item,
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        this.handleOrder(e);
    }

    handleOrder(e) {
        this.setState({ preOrder: !this.state.preOrder })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.item && nextProps.item === this.props.item) {
            if(nextState.preOrder !== this.state.preOrder) return true;
            let items = this.state.items;
            var item = this.props.item;
            var cost = this.state.cost;
            for(var i = 0; i < items.length; i++) {
                if(items[i].item._id === item._id) { items[i].count++; this.state.cost += this.props.cost; console.log(cost); break; }
            }   
        }
            return true;
        }

    componentDidUpdate(prevProps) {
        let items = this.state.items;
        var item = this.props.item;
        var exist = false;
        if(prevProps.item !== null && prevProps.item !== this.props.item) {
            for(var i = 0; i < items.length; i++) {
                if(items[i].item._id === item._id) { exist = true; }
            }                          
            if(!exist) items.push( {item, count: 0 });   
            this.setState({items:items, item: this.props.item, cost: this.state.cost+this.props.cost});
        }  
    }

    handleCost(price) {
        var cost = this.state.cost+price;
        this.setState({ cost: cost});
    }

    handleToken(token) {
        console.log(token)
        console.log(this.state.items)
        var items = this.state.cost;
        fetch("/", {
            method: 'POST',
            body: JSON.stringify({token, items}),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => response.json());
          this.submitOrder();
    }

    removeItem(index) {
        let items = this.state.items;
        var cost = this.state.cost;
        if(items[index].count === 1) {
            this.state.cost -= items[index].item.price;
            items.splice(index, 1);
        } else {
            items[index].count--;
            this.state.cost -= items[index].item.price;
        }
        //this.setState({ items: items });
        this.forceUpdate()
    }

    render() {
        var preOrder = this.state.preOrder;
        let items= this.state.items;
        var cost = this.state.cost;
        return (
            <Card>
                <Card.Header ><FontAwesomeIcon icon={faShoppingCart} /> <span className="shop">Cart</span></Card.Header>
                <ListGroup className="items" variant="flush">
                {items.map((item, i) => <ListGroup.Item className="item" key={i}>{item.item.name} <b>{item.count}x     
                    <Button size="sm" type="submit" onClick={this.removeItem.bind(this,i)}>x</Button></b></ListGroup.Item>
                )}
                <ListGroup.Item className="item">Total  <b>{cost}$</b></ListGroup.Item>
                <ListGroup.Item className="item"> <Button onClick={this.handleOrder} className={(preOrder ? 'hidden' : 'show')} aria-controls="example-collapse-text" aria-expanded={preOrder}>Order</Button>
                    <Collapse in={preOrder}>
                        <Form.Group controlId="title">
                            <Form.Label>Vas broj telefona:</Form.Label>
                            <Form.Control as="input" name="phone" type="phone" defaultValue="" onChange={this.handleChange} />
                            <Form.Label>Vasa adresa:</Form.Label>
                            <Form.Control as="input" name="adress" type="adress" defaultValue="" onChange={this.handleChange} />    
                            <Form.Label>NAPOMENA:</Form.Label>
                            <Form.Control as="textarea" name="note" type="note" defaultValue="" onChange={this.handleChange} />   
                        </Form.Group>
                    </Collapse>
                    <Button onClick={this.submitOrder} className={(preOrder ? 'show' : 'hidden')}>Order</Button><b>
                    <StripeCheckout
            stripeKey="pk_test_1mT9DqSkHWQazQKf68k1e0KG00gU2nEcgz"
            token={this.handleToken}
            amount={this.state.cost * 100}
            name="Food shop"
            />
                        </b></ListGroup.Item>
                </ListGroup>

            </Card>
        )
    }
}

export default Cart;