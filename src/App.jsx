import { useState, useEffect } from "react"
import { db } from "./data/db"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import Footer from "./components/Footer"

function App() {

  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);



  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  function addToCart(item) {
    const itemExists = cart.findIndex((i) => i.id === item.id);
    if(itemExists >= 0){
      const updateCart = [...cart];
      updateCart[itemExists].quantity += 1;
      setCart(updateCart);
    }else{
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter((guitar) => guitar.id !== id));
  }

  function incressQuantity(id) {
    const updateCart = [...cart];
    const itemExists = cart.findIndex((i) => i.id === id);
    if(updateCart[itemExists].quantity < MAX_QUANTITY){
      updateCart[itemExists].quantity += 1;
      setCart(updateCart);
    }
  }

  function decressQuantity(id) {
    const updateCart = [...cart];
    const itemExists = cart.findIndex((i) => i.id === id);
    if(updateCart[itemExists].quantity > MIN_QUANTITY){
      updateCart[itemExists].quantity -= 1;
      setCart(updateCart);
    }
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        incressQuantity={incressQuantity}
        decressQuantity={decressQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart}/>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
