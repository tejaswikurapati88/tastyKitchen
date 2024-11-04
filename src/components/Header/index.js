import {withRouter, Link} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'
import {GiHamburger} from 'react-icons/gi'
import {useState} from 'react'

const Header = props => {
  const [isHam, setHam] = useState(false)
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const onham = () => {
    setHam(!isHam)
    console.log(isHam)
  }
  return (
    <div className="bg-container-header">
      <Link to="/" className="link">
        <div className="logo-cont-head">
          <img
            src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723014144/Group_7420_w1gsby.png"
            alt="website logo"
            className="header-logo"
          />
          <h1 className="login-logo-name">Tasty Kitchens</h1>
        </div>
      </Link>

      <GiHamburger onClick={onham} className="hamburger" />
      {isHam === true && (
        <ul className="buttonshame">
          <li to="/">
            <Link to="/" className="header-butn">
              Home
            </Link>
          </li>
          <li to="/Cart">
            <Link to="/cart" className="header-butn">
              Cart
            </Link>
          </li>
          <button type="button" onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </ul>
      )}
      <ul className="buttons">
        <li to="/">
          <Link to="/" className="header-butn">
            Home
          </Link>
        </li>
        <li to="/Cart">
          <Link to="/cart" className="header-butn">
            Cart
          </Link>
        </li>
        <button type="button" onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </ul>
    </div>
  )
}

export default withRouter(Header)
