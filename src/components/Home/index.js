import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Slider from 'react-slick'
import ItemDetails from '../ItemDetails'
import Footer from '../Footer'

import Header from '../Header'

const sortByOptions = [
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
]

class Home extends Component {
  state = {
    isLoading: true,
    carousalLoading: true,
    offersImgs: [],
    restaurantData: [],
    sortOption: sortByOptions[0].value,
    pageNo: 1,
  }

  componentDidMount() {
    this.getCarouselImgs()
    this.getDishesData()
  }

  getCarouselImgs = async () => {
    const carousalUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      mathod: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(carousalUrl, options)
    const carousalImgs = await response.json()

    const {offers} = carousalImgs
    const formatedOffers = offers.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
    }))
    this.setState({carousalLoading: false, offersImgs: formatedOffers})
  }

  getDishesData = async () => {
    const {pageNo, sortOption} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const LIMIT = 9
    const offset = (pageNo - 1) * LIMIT

    const restaurantDataUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortOption}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(restaurantDataUrl, options)
    const restData = await response.json()

    if (response.ok === true) {
      const {restaurants} = restData
      const formattedRestData = restaurants.map(each => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        id: each.id,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        userRating: each.user_rating,
      }))

      this.setState({isLoading: false, restaurantData: formattedRestData})
    }
  }

  onChangeSort = event => {
    this.setState({sortOption: event.target.value}, this.getDishesData)
  }

  onpageNoDecrease = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        this.getDishesData,
      )
    }
  }

  onpageNoIncrease = () => {
    const {pageNo} = this.state
    if (pageNo < 20) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo + 1}),
        this.getDishesData,
      )
    }
  }

  render() {
    const {
      isLoading,
      carousalLoading,
      offersImgs,
      restaurantData,
      sortOption,
      pageNo,
    } = this.state
    console.log(pageNo)
    const settings = {
      className: '',
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,

      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
    }
    return (
      <>
        <Header />
        <div className="home-bg-cont">
          {carousalLoading ? (
            <div data-testid="restaurants-offers-loader">
              <Loader type="TailSpin" color="#F7931E" />
            </div>
          ) : (
            <div className="rend">
              <div className="slider-container">
                <Slider {...settings}>
                  {offersImgs.map(eachimg => (
                    <div key={eachimg.id}>
                      <img
                        src={eachimg.imageUrl}
                        alt="offer"
                        className="offer-imgs"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}
          {isLoading ? (
            <div data-testid="restaurants-list-loader">
              <Loader type="TailSpin" color="#F7931E" />
            </div>
          ) : (
            <div className="rest-bg-cont">
              <div className="rest-top">
                <h1 className="popular-heading">Popular Restaurants</h1>
                <div className="cont">
                  <p className="para">
                    Select Your favourite restaurant special dish and make your
                    day happy...
                  </p>
                  <div className="sort-cont">
                    <img
                      src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723115800/Round_yiaxab.png"
                      alt="sort"
                      className="sort-img"
                    />
                    <div className="cont-dis">
                      <p className="sort-by">Sort By</p>
                      <select
                        onChange={this.onChangeSort}
                        className="sort-by-box"
                        value={sortOption}
                      >
                        {sortByOptions.map(eachoption => (
                          <option
                            key={eachoption.id}
                            className="sort-by"
                            value={eachoption.value}
                          >
                            {eachoption.displayText}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="hr" />
              <ul className="dishes-ul">
                {restaurantData.map(eachitem => (
                  <ItemDetails key={eachitem.id} restaurantDetails={eachitem} />
                ))}
              </ul>
              <div className="page-cont">
                <button
                  data-testid="pagination-left-button"
                  type="button"
                  className="left-button"
                  onClick={this.onpageNoDecrease}
                >
                  <img
                    className="arr-imgs-page"
                    src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723481279/Icon_aflu3j.png"
                    alt=""
                  />
                  <span>.</span>
                </button>
                <p
                  data-testid="active-page-number"
                  className="para-footer"
                  value={pageNo}
                >
                  {pageNo}
                </p>
                <p className="para-footer displayinline"> of 20</p>
                <button
                  data-testid="pagination-right-button"
                  type="button"
                  className="left-button"
                  onClick={this.onpageNoIncrease}
                >
                  <img
                    className="arr-imgs-page"
                    src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723481368/Icon_czd7sj.png"
                    alt=""
                  />
                  <span>.</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
