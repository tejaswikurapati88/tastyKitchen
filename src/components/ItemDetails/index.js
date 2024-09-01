import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'

class ItemDetails extends Component {
  render() {
    const {restaurantDetails} = this.props
    const {id, imageUrl, cuisine, userRating, name} = restaurantDetails
    const formattedUserRatings = {
      rating: userRating.rating,
      totalReviews: userRating.total_reviews,
    }
    const {rating, totalReviews} = formattedUserRatings
    return (
      <li className="list">
        <Link
          className="link"
          testid="restaurant-item"
          to={`/restaurant/${id}`}
        >
          <div className="list-rest-cont">
            <img src={imageUrl} className="rest-img" alt="restaurant" />
            <div className="rest-cont">
              <h1 className="rest-name">{name}</h1>
              <p className="rest-cuisine">{cuisine}</p>
              <div className="rating-cont">
                <img
                  className="star-img"
                  src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723457554/7_Rating_mwyagn.png"
                  alt="star"
                />
                <p className="rateing-points">{rating}</p>
                <p className="rateing-num">({totalReviews} ratings)</p>
              </div>
            </div>
          </div>
        </Link>
      </li>
    )
  }
}

export default ItemDetails
