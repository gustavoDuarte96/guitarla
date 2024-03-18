import { useCart } from "./hooks/useCart"

import Header from "./components/Header"
import Guitar from "./components/Guitar"
import Footer from "./components/Footer"

function App() {

  const { data, cart, addToCart, removeFromCart, incressQuantity, decressQuantity, clearCart, isEmpy, cartTotal } = useCart();

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        incressQuantity={incressQuantity}
        decressQuantity={decressQuantity}
        clearCart={clearCart}
        isEmpy={isEmpy}
        cartTotal={cartTotal}
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
