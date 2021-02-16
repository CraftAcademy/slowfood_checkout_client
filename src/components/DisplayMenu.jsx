import React, { Component } from "react";
import { getData } from "../modules/productData";
import { Container, Item } from "semantic-ui-react";

class DisplayMenu extends Component {
  state = {
    productData: [],
  };

  componentDidMount() {
    this.getProductData();
  }

  async getProductData() {
    let result = await getData();
    this.setState({ productData: result });
  }

  render() {
    const { productData } = this.state;
    let dataIndex = productData.map((item) => {
      return (
        <Item key={item.id} data-cy={`product-${item.id}`}>
          <Item.Content>
            <Item.Header style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.name}
            </Item.Header>
            <Item.Description>{item.ingredients}</Item.Description>
            <Item.Extra> {item.price}</Item.Extra>
          </Item.Content>
        </Item>
      );
    });

    return <Container data-cy='menu'>{dataIndex}</Container>;
  }
}

export default DisplayMenu;
