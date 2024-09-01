import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const PlaceOrder = () => (
  <div>
    <Header />
    <div className="place-bg-cont">
      <div className="place-cont">
        <img
          src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723650007/check-circle.1_1_ovvwid.png"
          alt="success"
        />
        <h1 className="place-heading">Payment Successful</h1>
        <p className="place-para">
          Thank you for ordering Your payment is successfully completed.
        </p>
        <Link to="/" className="link-but">
          <button type="button" className="succbutton">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default PlaceOrder
