import React, { Component } from 'react';
import Select from 'react-select';
import { ListGroupItemHeading, ListGroupItemText, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import FoodItem from './foodItem';

class renderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portions: [],
            cost: 20,
            openModal: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getPrice = this.getPrice.bind(this);
    }

    handleSubmit(e) {
        this.props.func(this.props.item)
    }

    componentDidMount() {
        let portions = this.state.portions;
        this.props.item.portions.map(portion =>
            portions.push({ label: portion.size + "\n" + portion.price + "KM", value: portion.price })
        )
        this.setState({ portions: portions });
    }

    toggleModal(e) {
        this.setState({ openModal: !this.state.openModal });
    }

    getPrice(e) {
        this.props.item.price = e.value;
        console.log(this.props.item.price);
    }

    handleDelete() {
        fetch("/food-item/delete", {
            method: 'DELETE',
            body: JSON.stringify({id: this.props.item._id}),

            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => response.json())
          this.forceUpdate();
    }

    render() {
        let item = this.props.item;
       // let options = this.state.portions;
        let ingredients =
            item.ingredients
                .map(ing => <span key={ing}>{ing}</span>)
                .reduce((prev, curr) => [prev, ', ', curr])
        let price = (item.price > 0 ? (<b>{item.price}KM</b>) :
            <div style={{ width: '120px', float: "right", height: '10px' }}>
                <Select style={{ font: '5px' }} options={this.state.portions} onChange={this.getPrice} defaultValue={{ label: "mala", value: 2 }} />
            </div>
        )
        let admin = this.props.admin ?<b> <Button color="primary" onClick={this.toggleModal}>Edit</Button> 
        <Button color="primary" onClick={this.handleDelete}>Delete</Button> </b>:
        <Button color="primary" onClick={this.handleSubmit}>Dodaj</Button>
        return (

            <div >
                <ListGroupItemHeading>{item.name} {price}</ListGroupItemHeading>
                <ListGroupItemText>
                    {ingredients} <b>{admin}</b>
                </ListGroupItemText>

                <Modal isOpen={this.state.openModal} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
                    <ModalBody>
                <FoodItem edit={true} item={this.props.item}/>
                </ModalBody>
                </Modal>

            </div>
        )
    }

}

export default renderItem;