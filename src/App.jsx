import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home"
import Login from "./pages/user/Login.jsx";
import Signup from "./pages/user/Signup.jsx";
import ProductsStore from "./pages/product/ProductsStore.jsx";
import ProductDetail from "./pages/product/ProductDetail.jsx";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/cart/Cart.jsx";
import Profile from "./pages/user/Profile.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import Thankyou from "./pages/checkout/Thankyou.jsx";
import Orders from './pages/orders/Orders';
import OrderDetail from './pages/orders/OrderDetail';
import { AuthProvider } from './context/AuthContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { CartProvider } from './context/CartContext.jsx';

const App = () => {
  const MAIN_CONTAINER_CLASS = "flex flex-col min-h-screen";
  const FLEX_GROW_CLASS = "flex-grow";


  return (
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <ProductProvider>
            <div className={MAIN_CONTAINER_CLASS}>

              <Header />
              <ToastContainer position="top-center" autoClose={1000} />

              <div className={FLEX_GROW_CLASS}>
                <Routes>
                  {/* Root */}
                  <Route path="/" element={<Home />} />
                  {/* User */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<Profile />} />
                  {/* Orders */}
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:order_id" element={<OrderDetail />} />
                  {/* Product */}
                  <Route path="/products" element={<ProductsStore />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  {/* Cart */}
                  <Route path="/cart" element={<Cart />} />
                  {/* Checkout */}
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/thank-you" element={<Thankyou />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </ProductProvider>
        </AuthProvider>
      </CartProvider>

    </BrowserRouter >
  )
}

export default App
