import React, { Component } from 'react';
import Select from 'react-select';
import { Form, Button, Col } from 'react-bootstrap';
import './foodItem.css';

class foodItem extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: 0,
      input: '',
      ingredients: [],
      menu: '',
      menus: [],
      portions: [{ size: "mala", price: 0 }, { size: "srednja", price: 0 }, { size: "velika", price: 0 }],
      openPortions: false,
      checkBox: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.posting = this.posting.bind(this);
    this.getMenu = this.getMenu.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.handlePortionsPrice = this.handlePortionsPrice.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  }

  componentDidMount() {
    fetch("/food-menu").then(res => res.json())
      .then(menus => menus.map(menu =>
        this.state.menus.push({ label: menu.name, value: menu._id })));

    if (this.props.edit) {
      console.log(this.props.item)
      this.setState({
        name: this.props.item.name,
        price: this.props.item.price,
        portions: this.props.item.portions,
        ingredients: this.props.item.ingredients,
        menu: this.props.item.category
      })
    }
  }

  handleEdit() {
    var item = new Object();
    item.name = this.state.name;
    item.price = this.state.price;
    item.portions = this.state.portions;
    item.menu = this.state.menu;
    item.ingredients = this.state.ingredients;
    console.log(item);
  }

  posting() {
    var name = this.state.name, price = this.state.price, menu = this.state.menu;
    var ingredients = this.state.ingredients;
    var category = this.state.menu;
    var portions = this.state.portions;

    // let item = { name: this.state.name, price: this.state.price, menu: this.state.menu, ingredients: this.state.ingredients }
    if (this.props.edit) {
      var id = this.props.item._id;
      fetch("/food-item/edit", {
        method: 'POST',
        body: JSON.stringify({
          _id: id,
          name: name,
          price: price,
          menu: menu,
          ingredients: ingredients,
          portions: portions,
          category: category
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => response.json())
    } else {
      fetch("/admin/food-item/add", {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          price: price,
          menu: menu,
          ingredients: ingredients,
          portions: portions,
          category: category
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => response.json(), this.props.history.push(`/`))
    }
  }

  getMenu(e) {
    console.log(e.value);
    this.setState({ menu: e.value });
  }

  handleIngredients() {
    var joined = this.state.ingredients.concat(this.state.input);
    this.setState({ input: '', ingredients: joined });
    this.forceUpdate();
  }

  handlePortionsPrice(e) {
    console.log(e.target.name, e.target.value)
    let portions = this.state.portions;
    if (e.target.name === "mala") {
      portions[0].price = e.target.value;
    }
    if (e.target.name === "srednja") {
      portions[1].price = e.target.value;
    }
    if (e.target.name === "velika") {
      portions[2].price = e.target.value;
    }
    this.setState({ portions: portions });
  }

  render() {
    console.log(this.state);
    let menus = this.state.menus;
    let input = this.state.input;
    let admin = this.props.edit ? <Button type="submit" onClick={this.posting}>Edit</Button>
      : <Button type="submit" onClick={this.posting}>Post</Button>

    let ingredients = (this.state.ingredients.length > 0) ? (
      this.state.ingredients
        .map(ing => <span key={ing}>{ing}</span>)
        .reduce((prev, curr) => [prev, ', ', curr])
    ) : (
        <div></div>
      );
    let portions = (this.state.openPortions) ? (<div>  <Form.Row>
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label>Mala</Form.Label>
        <Form.Control as="input" name="mala" type="input" defaultValue="0" onChange={this.handlePortionsPrice} />
      </Form.Group>
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>
          <Form.Check type="checkbox" onClick={() => this.setState({ checkBox: !this.state.checkBox })} label="Srednja" />
        </Form.Label>
        <Form.Control as="input" name="srednja" disabled={(this.state.checkBox ? true : false)} type="input" defaultValue="0" onChange={this.handlePortionsPrice} />
      </Form.Group>
      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>Velika</Form.Label>
        <Form.Control as="input" name="velika" type="input" defaultValue="0" onChange={this.handlePortionsPrice} />
      </Form.Group>
    </Form.Row></div>)
      :
      (<div> <Form.Control as="input" name="price" type="price" value={this.state.price} onChange={this.handleChange} /></div>);
    return (
      <div className="content">
        <Form.Group controlId="title">
          <Form.Label>Write name of food item</Form.Label>
          <Form.Control as="input" name="name" type="name" defaultValue={this.state.name} onChange={this.handleChange} />
          <Form.Label>Write price or sort it to <Button onClick={() => this.setState({ openPortions: !this.state.openPortions })}>portions</Button></Form.Label>
          {portions}
          <Form.Label>Write ingredients</Form.Label>
          <Form.Control as="input" name="input" type="input" value={input} onChange={this.handleChange} />
          <Button type="submit" onClick={this.handleIngredients}>Add</Button>
          <Form.Label>{ingredients}</Form.Label><br></br>
          <Form.Label>Meni</Form.Label>
          <Select options={menus} onChange={this.getMenu} />
          {admin}        
        </Form.Group>
      </div>
    )

  }
}

export default foodItem;
