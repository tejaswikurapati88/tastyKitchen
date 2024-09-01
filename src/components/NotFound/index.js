import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="notfound-bg-cont">
    <div className="notfound-cont">
      <img
        src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723789002/Group_1_d4khzc.png"
        alt="not found"
      />
      <h1 className="fond-heading">Page Not Found</h1>
      <p className="fond-para">
        We are sorry, the page you requested could not be found. <br /> Please
        go back to the homepage
      </p>
      <Link to="/" className="link-fond">
        <button className="button-fond" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
