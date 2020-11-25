import React, { Component } from 'react'
import { getData } from '../modules/productData'

class DisplayMenu extends Component {
  state = {
    productData: []
  }

  componentDidMount() {
    this.getProductData()
  }

  async getProductData() {
    let result = await getData();
    this.setState({ productData: result })
  }

  render() {
    let dataIndex
    if (Array.isArray(this.state.productData) && this.state.productData.length) {
      dataIndex = (
        <div id="menu">
          {this.state.productData.map(item => {
            return (
              <div key={item.id} data-cy={`product-${item.id}`}>
                {item.name}{item.description}{item.price}
              </div>
            )
          })
          }
        </div>
      )
    } else {
      return (
        <h3 id="no-menu">There is no available menu.</h3>
      )
    }

    return (
      <div>
        {dataIndex}
      </div>
    )
  }
}

export default DisplayMenu