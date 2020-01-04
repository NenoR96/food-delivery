import React, { Component } from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';

class AdminArchive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carts: [],
            sortedCarts: [
                { id: 1, month: "Januar", cart: [] },
                { id: 2, month: "Februar", cart: [] },
                { id: 3, month: "Mart", cart: [] },
                { id: 4, month: "April", cart: [] },
                { id: 5, month: "Maj", cart: [] },
                { id: 6, month: "Jun", cart: [] },
                { id: 7, month: "Juli", cart: [] },
                { id: 8, month: "Avgust", cart: [] },
                { id: 9, month: "Septembar", cart: [] },
                { id: 10, month: "Oktobar", cart: [] },
                { id: 11, month: "Novembar", cart: [] },
                { id: 12, month: "Decembar", cart: [] },
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
                    console.log("jes")
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
                                        {item.month}
                                    </Accordion.Toggle>
                                </Card.Header>
                                {(item.cart.map(cart =>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                        <Card>
                                        <Card.Header>{cart.adress}</Card.Header>
                                        {(cart.foodItems.map(food =>
                                        <Card.Body>{food.name}  {food.count}x</Card.Body>
                                             ))}
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