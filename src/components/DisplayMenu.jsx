import React, { Component } from "react";
import { getAllProducts } from "../modules/productData";
import { Button, Container, Item } from "semantic-ui-react";
import { createOrder } from "../modules/orderService";

class DisplayMenu extends Component {
  state = {
    productData: [],
  };

  componentDidMount() {
    this.getProductData();
  }

  async getProductData() {
    let result = await getAllProducts();
    this.setState({ productData: result });
  }

  addToOrder = async (event) => {
    let productId = parseInt(event.target.dataset.id);
    let response = await createOrder(productId)
    this.setState({ message: response.message });
    let orderItemsLength = response.order.items.length;
    this.setState({ orderItems: orderItemsLength });
  };

  render() {
    const { productData, message, orderItems } = this.state;
    let dataIndex = productData.map((item) => {
      return (
        <Item key={item.id} data-cy={`product-${item.id}`}>
          <Item.Content>
            <Item.Header style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.name}
            </Item.Header>
            <Item.Description>Ingredients: {item.ingredients}</Item.Description>
            <Item.Extra>Price: {item.price}kr</Item.Extra>
            {this.props.authenticated && (
              <Button
                data-id={item.id}
                data-cy="order-button"
                onClick={(event) => this.addToOrder(event)}
              >
                Add to order
              </Button>
            )}
          </Item.Content>
        </Item>
      );
    });

    return (
      <Container data-cy="menu">
        {orderItems && (
          <Container data-cy="order">
            You have {orderItems} pizza in your order
          </Container>
        )}
        {message && <p data-cy="success-message">{message}</p>}
        {dataIndex}
      </Container>
    );
  }
}

export default DisplayMenu;
