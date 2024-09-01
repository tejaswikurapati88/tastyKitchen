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
    console.log(cartItems)
    const cartItemsLocal = cartItems.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.imageUrl,
      cost: eachItem.cost,
      quantity: activeCount,
      name: eachItem.name,
    }))
    console.log(cartItemsLocal)
    const stringedData = JSON.stringify(cartItemsLocal)

    localStorage.setItem('cartData', stringedData)
    return (
      <>
        {activeCount === 0 ? (
          <button onClick={this.onAdd} type="button" className="add-button">
            ADD
          </button>
        ) : (
          <div className="counter-container">
            <button
              data-testid="decrement-count"
              type="button"
              className="minus-button"
              onClick={this.onDecrement}
            >
              -
            </button>

            <p data-testid="active-count">{activeCount}</p>
            <button
              data-testid="increment-count"
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
