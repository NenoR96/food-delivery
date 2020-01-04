import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class foodMenu extends Component {
    constructor() {
        super();
        this.state = {
            name: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.posting = this.posting.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value});
        console.log(event.target.value);
    }

    posting() {
        let name = this.state.name;
        fetch("/admin/food-menu/add", {
            method: 'POST',
            body: JSON.stringify({
              name: name
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => response.json())
            .then(json => this.props.history.push(`/sss`))        
    }
    render() {
      let name = this.state.name;

        return(            
        <div>
          {name}
        <Form.Group controlId="title">
        <Form.Label>Write name of food menu</Form.Label>
        <Form.Control as="input" name="name" type="name"
        defaultValue={this.state.name} onChange={this.handleChange} />
        </Form.Group>

        <Button type="submit" onClick={this.posting}>Post</Button>
        </div>
        ) 

    }
}

export default foodMenu;
