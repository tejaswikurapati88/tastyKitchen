import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginPage extends Component {
  state = {inpUserName: '', inpPass: '', showError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = msg => {
    this.setState({errorMsg: msg, showError: true})
  }

  onLogin = async event => {
    event.preventDefault()
    const {inpUserName, inpPass} = this.state
    const userDetails = {username: inpUserName, password: inpPass}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
    this.setState({inpUserName: '', inpPass: ''})
  }

  onUserInput = event => {
    this.setState({inpUserName: event.target.value})
  }

  onPassInput = event => {
    this.setState({inpPass: event.target.value})
  }

  render() {
    const {inpUserName, inpPass, errorMsg, showError} = this.state
    const {history} = this.props
    return (
      <div>
        {Cookies.get('jwt_token') !== undefined ? (
          <div>
            <Redirect to="/" />
            {history.goBack()}
          </div>
        ) : (
          <div className="bg-login-container">
            <div className="left-login-cont">
              <form onSubmit={this.onLogin} className="login-card-cont">
                <img
                  src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723014144/Group_7420_w1gsby.png"
                  alt="website logo"
                />
                <h1 className="login-logo-name">Tasty Kitchens</h1>
                <h1 className="heading-login">Login</h1>
                <div className="inp-cont">
                  <label htmlFor="user" className="label">
                    USERNAME
                  </label>
                  <input
                    value={inpUserName}
                    onChange={this.onUserInput}
                    id="user"
                    className="login-inp"
                    type="text"
                  />
                </div>
                <div className="inp-cont">
                  <label htmlFor="pass" className="label">
                    PASSWORD
                  </label>
                  <input
                    value={inpPass}
                    onChange={this.onPassInput}
                    id="pass"
                    className="login-inp"
                    type="password"
                  />
                </div>
                <button type="submit" className="login-butn">
                  Login
                </button>
                {showError && <p className="err">{errorMsg}</p>}
              </form>
            </div>
            <div className="right-cont">
              <img
                src="https://res.cloudinary.com/dkvptcm7q/image/upload/v1723012311/Rectangle_1456_lmed5t.png"
                alt="website login"
                className="img"
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default LoginPage
