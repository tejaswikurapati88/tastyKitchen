import './App.css'
import {Route, Switch} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import PlaceOrder from './components/PlaceOrder'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute exact path="/placeOrder" component={PlaceOrder} />
    <Route component={NotFound} />
  </Switch>
)

export default App
