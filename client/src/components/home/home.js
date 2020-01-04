import React, { Component } from 'react';
import { Navbar, Nav, ListGroup, Row, Col } from 'react-bootstrap';

import RenderItem from '../foodItem/renderItem';

import Cart from '../cart/cart';
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            items: [],
            item: {},
        }
        this.output = this.output.bind(this);
    }

    componentDidMount() {
        fetch("/food-menu").then(res => res.json())
            .then(menus => this.setState({ menus }));
        fetch("/food-item").then(res => res.json())
            .then(items => this.setState({ items }));
    }

    output(evt) {
        console.log("With love from parent P land :)", evt)
        this.setState({ item: evt })
    }

    render() {
        let cart = (Object.keys(this.state.item).length !== 0) ? (<Cart item={this.state.item} />) : (<Cart />);
        return (
            <div className="content">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        {this.state.menus.map(menu => <Nav.Link key={menu._id}>{menu.name}</Nav.Link>)}
                    </Nav>
                </Navbar>
                <Row>
                    <Col xs="8">
                        {this.state.menus.map(menu =>
                            <ListGroup as="ul" bsclass="content" key={menu._id}>
                                <ListGroup.Item as="li" active key={menu._id}>{menu.name} </ListGroup.Item>
                                {this.state.items.map(item =>
                                    (item.category === menu._id ?
                                        <ListGroup.Item as="li" key={item._id}><RenderItem key={item._id} item={item} func={this.output} /></ListGroup.Item>
                                        : null)
                                )}
                            </ListGroup>
                        )}
                    </Col>
                    <Col xs="4">
                        {cart}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home;