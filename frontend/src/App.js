import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap"
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
  return (
    <Router>
    <Header />
    <main className="py-3">
      <Container>
          <Route path="/login" component={LoginScreen}  />
          <Route path="/order/:id" component={OrderScreen}  />
          <Route path="/placeorder" component={PlaceOrderScreen}  />
          <Route path="/payment" component={PaymentScreen}  />
          <Route path="/shipping" component={ShippingScreen}  />
          <Route path="/register" component={RegisterScreen}  />
          <Route path="/profile" component={ProfileScreen}  />
          <Route path="/product/:id" component={ProductScreen}  />
          <Route path="/cart/:id?" component={CartScreen}  />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} />
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact/>
          <Route path="/admin/userList" component={UserListScreen} exact />
          <Route path="/admin/productList" component={ProductListScreen} exact />
          <Route path="/admin/productList/:pageNumber" component={ProductListScreen} exact />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} eact />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} eact />
          <Route path="/admin/orderList" component={OrderListScreen} eact />
      </Container>
    </main>
    <Footer /> 
    </Router>
  ); 
}

export default App;
