import './index.css'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="footer-bg-cont">
      <div className="logo-cont-head">
        <img
          src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723478068/Group_7420_vqa5ka.png"
          alt="website-footer-logo"
          className="header-logo-footer"
        />
        <h1 className="login-logo-name footer">Tasty Kitchens</h1>
      </div>
      <p className="footer-para">
        The only thing we are serious about is food.
        <br /> Contact us on
      </p>
      <ul className="footer-cont">
        <li className="footer-li">
          <FaPinterestSquare
            className="icons-footer"
            testid="pintrest-social-icon"
          />
        </li>
        <li className="footer-li">
          <FaInstagram
            className="icons-footer"
            testid="instagram-social-icon"
          />
        </li>
        <li className="footer-li">
          <FaTwitter className="icons-footer" testid="twitter-social-icon" />
        </li>
        <li className="footer-li">
          <FaFacebookSquare
            className="icons-footer"
            testid="facebook-social-icon"
          />
        </li>
      </ul>
    </div>
  )
}
