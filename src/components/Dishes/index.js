import './index.css'
import {Component} from 'react'
import Counter from '../Counter'

class Dishes extends Component {
  constructor(props) {
    super(props)
    const {foodDetails} = props
    const formattedFoodDetailss = {
      cost: foodDetails.cost,
      foodType: foodDetails.food_type,
      id: foodDetails.id,
      imageUrl: foodDetails.image_url,
      name: foodDetails.name,
      foodRating: foodDetails.rating,
    }
    this.state = {
      formattedFoodDetails: formattedFoodDetailss,
      isAdded: false,
      cartItems: [],
    }
  }

  onAdd = () => {
    const {formattedFoodDetails} = this.state
    const item = formattedFoodDetails
    this.setState(prevState => ({
      cartItems: [...prevState.cartItems, item],
      isAdded: true,
    }))
  }

  render() {
    const {isAdded, formattedFoodDetails, cartItems} = this.state
    const {cost, id, imageUrl, name, foodRating} = formattedFoodDetails

    return (
      <li className="dish-list">
        <div data-testid="foodItem" className="dish-list-cont">
          <img className="dish-img" src={imageUrl} alt={id} />
          <div className="food-cont">
            <h1 className="food-name">{name}</h1>
            <p className="food-price">Rs. </p>
            <p className="food-price">{cost}</p>
            <img
              src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723563874/7_Rating_fyj5pw.png"
              alt="star"
            />
            <p className="food-rating">{foodRating}</p>
            <div>
              {isAdded ? (
                <Counter cartItemsDetails={cartItems} />
              ) : (
                <button
                  onClick={this.onAdd}
                  type="button"
                  className="add-button"
                >
                  ADD
                </button>
              )}
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default Dishes
