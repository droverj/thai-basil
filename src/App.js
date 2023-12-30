import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { CartProvider } from './providers/CartContext';
import { SupabaseProvider } from './providers/SupabaseContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './components/Home';
import Menu from './components/Menu';
import Checkout from './components/Checkout';
import Contact from './components/Contact';
import Cart from './components/Cart';
import './App.scss';

function App() {
  // const [cart, setCart] = useState([]);

  const { user } = useAuth0();

  const userId = user ? user.sub : null;

  // API data
  // const [reviews, setReviews] = useState([]);


  // useEffect(() => {

  //   const fetchData = async () => {
  //     try {
  //       const { data: reviews } = await supabase.from('reviews').select('*');
  //       setReviews(reviews);

  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       // Handle errors here (e.g., display an error message to the user)
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const updateReviews = async () => {
  //   try {
  //     // Use Supabase client to fetch the latest reviews
  //     const { data: updatedReviews, error } = await supabase.from('reviews').select('*');

  //     if (error) {
  //       throw error;
  //     }

  //     // Update the state with the latest reviews
  //     setReviews(updatedReviews);
  //   } catch (error) {
  //     console.error('Error fetching updated reviews:', error);
  //   }
  // };

  // const removeFromCart = (item) => {
  //   const updatedCart = cart.filter((cartItem) => cartItem.name !== item.name);
  //   setCart(updatedCart);
  // };

  useEffect(() => {
    // Add an event listener to the window object
    const handleRouteChange = () => {
      document.body.classList.remove('no-scroll');
    };

    // Listen for the "popstate" event, which is triggered when the URL changes
    window.addEventListener('popstate', handleRouteChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <SupabaseProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <ScrollToTop />
          <div className="main-body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout userId={userId} />} />
              <Route
                path="/contact"
                // element={<Contact userId={userId} reviews={reviews} updateReviews={updateReviews} />}
                element={<Contact userId={userId} />}
              />
              <Route
                path="/menu"
                element={<Menu />}
              />
              <Route
                path="/cart"
                element={<Cart />}
              />
              <Route
                path="/temp"
                element={<Cart />}
              // element={<Cart cart={cart} removeFromCart={removeFromCart} />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </SupabaseProvider>
  );
}

export default App;
