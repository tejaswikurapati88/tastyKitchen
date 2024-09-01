import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import Dishes from '../Dishes'

class RestaurantDetails extends Component {
  state = {isdetailsLoading: true, details: []}

  componentDidMount() {
    this.getDetailsRestaurant()
  }

  getDetailsRestaurant = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      mathod: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const urlDetails = `https://apis.ccbp.in/restaurants-list/${id}`
    const response = await fetch(urlDetails, options)
    const restaurantdetailsData = await response.json()
    const formattedDetails = {
      costForTwo: restaurantdetailsData.cost_for_two,
      cuisine: restaurantdetailsData.cuisine,
      foodItems: restaurantdetailsData.food_items,
      id: restaurantdetailsData.id,
      imageUrl: restaurantdetailsData.image_url,
      location: restaurantdetailsData.location,
      itemsCount: restaurantdetailsData.items_count,
      name: restaurantdetailsData.name,
      opensAt: restaurantdetailsData.opens_at,
      rating: restaurantdetailsData.rating,
      reviewsCount: restaurantdetailsData.reviews_count,
    }
    console.log(formattedDetails)
    this.setState({isdetailsLoading: false, details: formattedDetails})
  }

  renderRestaurantDetails = () => {
    const {details} = this.state
    const {
      costForTwo,
      cuisine,
      foodItems,
      imageUrl,
      location,
      name,
      rating,
      reviewsCount,
    } = details
    let ratingNum = 0
    if (reviewsCount < 200 && reviewsCount > 150) {
      ratingNum = '150 +'
    } else if (reviewsCount < 250 && reviewsCount > 200) {
      ratingNum = '200 +'
    } else if (reviewsCount < 150 && reviewsCount > 100) {
      ratingNum = '100 +'
    }
    return (
      <div className="details-bg-container">
        <div className="top-img-container">
          <img src={imageUrl} className="rest-img-class" alt="restaurant" />
          <div className="resta-details-cont">
            <h1 className="details-heading">{name}</h1>
            <p className="details-para">{cuisine}</p>
            <p className="details-para">{location}</p>
            <div className="rating-price-details-cont">
              <div className="rating-sub-cont">
                <img
                  src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723555314/7_Rating_b8qqso.png"
                  alt="white-star"
                />
                <p className="details-white">{rating}</p>
                <p className="details-white-para">{ratingNum} Ratings</p>
              </div>
              <div className="cost-cont">
                <p className="cost-white">Rs {costForTwo}</p>
                <p className="details-white-para">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dishes-cont">
          <ul className="ul-dished-cont">
            {foodItems.map(eachfood => (
              <Dishes key={eachfood.id} foodDetails={eachfood} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isdetailsLoading} = this.state
    return (
      <div>
        <Header />
        <div>
          {isdetailsLoading ? (
            <div data-testid="restaurant-details-loader">
              <Loader type="TailSpin" color="#F7931E" />
            </div>
          ) : (
            this.renderRestaurantDetails()
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
