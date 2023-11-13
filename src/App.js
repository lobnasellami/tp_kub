import './App.css';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs';
import Cart from './pages/Cart';
import Shop from './pages/Shop/Shop';
import ShopDetails from './pages/ShopDetails/ShopDetails';
import CheckOut from './pages/CheckOut';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import { LanguageProvider } from './LanguageContext';
import { CartProvicer, CartProvider } from './CartContext'
import ScrollToTop from './ScrollToTop';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import { ArticlesProvider } from './articlesContext';
import Admin from './pages/Admin';

function App() {

  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
  
  return (
    <LanguageProvider>
      <ArticlesProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route exact path={routes.HOME} element={<Home />} />
              <Route exact path={routes.ABOUTUS} element={<AboutUs />} />
              <Route exact path={routes.CART} element={<Cart />} />
              <Route exact path={routes.CHECKOUT} element={<CheckOut />} />
              <Route path={routes.SHOP} element={<Shop />} />
              <Route path={routes.SHOPDETAILS} element={<ShopDetails />} />
              <Route path={routes.ADMIN} element={<Admin />} />
              <Route path={routes.BLOG} element={<Blog />} />
              <Route path={routes.BLOGDETAILS} element={<BlogDetails />} />
              <Route path={routes.NOT_FOUND_PAGE} element={<Home />} />
            </Routes>
          </Router>
        </CartProvider>
      </ArticlesProvider>
    </LanguageProvider>
  );
}

export default App;
