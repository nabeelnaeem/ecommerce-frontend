import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home"
import Login from "./pages/user/Login.jsx";
import Signup from "./pages/user/Signup.jsx";
import ProductsStore from "./pages/product/ProductsStore.jsx";
import ProductDetail from "./pages/product/ProductDetail.jsx";

const App = () => {
  const MAIN_CONTAINER_CLASS = "flex flex-col min-h-screen";
  const FLEX_GROW_CLASS = "flex-grow";


  return (
    <BrowserRouter>
      <div className={MAIN_CONTAINER_CLASS}>
        <Header />

        <div className={FLEX_GROW_CLASS}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<ProductsStore />} />
            <Route path="/products/:id" element={<ProductDetail />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
