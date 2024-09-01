import {Component} from 'react'

import './index.css'

class Counter extends Component {
  constructor(props) {
    super(props)
    const {cartItemsDetails} = props
    this.state = {cartItems: cartItemsDetails, activeCount: 1}
  }

  onIncrement = () => {
    this.setState(prevState => ({activeCount: prevState.activeCount + 1}))
  }

  onDecrement = () => {
    this.setState(prevState => ({activeCount: prevState.activeCount - 1}))
  }

  render() {
    const {activeCount, cartItems} = this.state
    const cartItemsLocal = cartItems.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.imageUrl,
      cost: eachItem.cost,
      quantity: activeCount,
      name: eachItem.name,
    }))
    const stringedData = JSON.stringify(cartItemsLocal)

    localStorage.setItem('cartData', stringedData)
    return (
      <>
        {activeCount === 0 ? (
          <p>Your cart is empty. Add something from the menu.</p>
        ) : (
          <div className="counter-container">
            <button
              data-testid="decrement-quantity"
              type="button"
              className="minus-button"
              onClick={this.onDecrement}
            >
              -
            </button>

            <p data-testid="item-quantity">{activeCount}</p>
            <button
              data-testid="increment-quantity"
              type="button"
              className="plus-button"
              onClick={this.onIncrement}
            >
              +
            </button>
          </div>
        )}
      </>
    )
  }
}

export default Counter
