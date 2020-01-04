import React, { Component } from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import './adminArchive.css';

class AdminArchive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carts: [],
            sortedCarts: [
                { id: 1, month: "January", ammount: 0, cart: [] },
                { id: 2, month: "February", ammount: 0, cart: [] },
                { id: 3, month: "March", ammount: 0, cart: [] },
                { id: 4, month: "April", ammount: 0, cart: [] },
                { id: 5, month: "May", ammount: 0, cart: [] },
                { id: 6, month: "June", ammount: 0, cart: [] },
                { id: 7, month: "July", ammount: 0, cart: [] },
                { id: 8, month: "August", ammount: 0, cart: [] },
                { id: 9, month: "September", ammount: 0, cart: [] },
                { id: 10, month: "October", ammount: 0, cart: [] },
                { id: 11, month: "November", ammount: 0, cart: [] },
                { id: 12, month: "December", ammount: 0, cart: [] },
            ]
        }
        this.sortCarts = this.sortCarts.bind(this);
    }

    sortCarts() {
        console.log(this.state.sortedCarts)
        console.log(this.state.carts)
        for (var i = 0; i < this.state.sortedCarts.length; i++) {
            for (var j = 0; j < this.state.carts.length; j++) {
                if (this.state.sortedCarts[i].id === new Date(this.state.carts[j].date).getMonth() + 1) {
                    this.state.sortedCarts[i].ammount += this.state.carts[j].cost;
                    this.state.sortedCarts[i].cart.push(this.state.carts[j]);
                }
            }
        }
    }

    componentDidMount() {
        fetch("/cart").then(res => res.json())
            .then(carts => this.setState({ carts }));
    }


    render() {
        if (this.state.carts.length > 1)
            this.sortCarts()
        console.log(this.state.sortedCarts)

        return (
            <div>
                <Accordion >
                    {this.state.sortedCarts.map(item =>
                        (item.cart.length > 0 ?
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        {item.month} {item.ammount}$
                                    </Accordion.Toggle>
                                </Card.Header>
                                {(item.cart.map(cart =>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <Card>
                                                <Card.Header>Adress: {cart.adress}</Card.Header>
                                                Items: 
                                                <Card.Body>
                                                {(cart.foodItems.map(food =>
                                                    <p>{food.name}  {food.count}</p>
                                                ))}
                                                </Card.Body>
                                            </Card>

                                        </Card.Body>
                                    </Accordion.Collapse>
                                ))}
                            </Card>
                            : null)
                    )}
                </Accordion>
            </div>
        )
    }
}

export default AdminArchive;