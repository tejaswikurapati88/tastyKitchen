import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

import CounterQuantity from '../CounterQuantity'

class Cart extends Component {
  state = {cartDataList: []}

  componentDidMount() {
    this.getLocalStorageData()
  }

  getLocalStorageData = () => {
    const cartDataLocal = localStorage.getItem('cartData')
    const cartData = JSON.parse(cartDataLocal)

    this.setState({
      cartDataList: cartData,
    })
  }

  render() {
    const {cartDataList} = this.state
    const cartDataLocalRender = localStorage.getItem('cartData')
    console.log(cartDataList)
    const cartLocalRenderParses = JSON.parse(cartDataLocalRender)
    const costs = []
    let totalCost = 0
    if (cartDataLocalRender !== null) {
      for (let i = 0; i < cartLocalRenderParses.length; ) {
        const originalPrice = cartLocalRenderParses[i].cost
        const prices =
          parseInt(cartLocalRenderParses[i].quantity, 10) *
          parseInt(originalPrice, 10)
        costs.push(prices)
        i += 1
      }

      for (let i = 0; i < costs.length; ) {
        totalCost += parseInt(costs[i], 10)
        i += 1
      }
    }

    return (
      <>
        <Header />

        {cartDataLocalRender === null ? (
          <div className="cart-bg-container">
            <div className="no-items-container">
              <img
                src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723619737/Layer_2_oifydi.png"
                alt="empty cart"
              />
              <h1 className="empty-heading">No Order Yet!</h1>
              <p className="empty-para">
                Your cart is empty. Add something from the menu.
              </p>
              <Link to="/" className="linkCart">
                <button className="order-now-btn" type="button">
                  Order now
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="cart-bg-con">
              <div className="cart-container">
                <div className="cart-items-container">
                  <h1 className="cart-head">Item</h1>
                  <h1 className="cart-head">Quantity</h1>
                  <h1 className="cart-head">Price</h1>
                </div>
                <ul className="ul-cart">
                  {cartDataList.map(eachCartItem => (
                    <li className="container-list" key={eachCartItem.id}>
                      <div
                        data-testid="cartItem"
                        className="cart-items-container"
                      >
                        <div className="img-cont-cart">
                          <img
                            className="cart-img"
                            src={eachCartItem.imageUrl}
                            alt={eachCartItem.id}
                          />
                          <h1 className="name-cart">{eachCartItem.name}</h1>
                        </div>

                        <CounterQuantity
                          testid="item-quantity"
                          className="counter"
                          cartItemsDetails={cartDataList}
                        />

                        <p className="price-cart display">
                          Rs. {eachCartItem.cost}.00
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <hr className="hrline" />
                <div className="total-cart-cont">
                  <h1 className="order-total-cart">Order Total :</h1>
                  <p
                    data-testid="total-price"
                    className="order-total-cart total"
                  >
                    Rs. {totalCost}.00
                  </p>
                </div>
                <div className="butn-cont-cart">
                  <Link to="/placeOrder" className="linkCart">
                    <button className="place-order-butn" type="button">
                      Place Order
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <Footer />
          </>
        )}
      </>
    )
  }
}
export default Cart
