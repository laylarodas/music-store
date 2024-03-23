import { Header } from "./components/Header"
import { Product } from "./components/Product"
import { useState, useEffect } from "react"
import { db } from "./data/db"

function App() {

  const initialCart = () => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {

    const itemExists= cart.findIndex(product => product.id === item.id);

    if (itemExists >= 0) {//item exist in cart

      if (cart[itemExists].quantity >= MAX_QUANTITY) {
        return;
      }


      const updatedCart = [...cart];//copy cart

      updatedCart[itemExists].quantity += 1;//position of item in cart increase quantity

      setCart(updatedCart);//set new cart
      

    }else{
      item.quantity = 1;
      setCart([...cart, item]);
    }

  }

  function removeFromCart(id) {
   
    setCart(prevCart => prevCart.filter(product => product.id !== id));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_QUANTITY) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item;
    })

    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    //console.log('decreaseQuantity', id);

    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_QUANTITY) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item;
    })

    setCart(updatedCart);
  }


  function clearCart() {
    setCart([]);
  }


  function saveLocalStorage() {
    
  }

  return (
    <>

      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((product) => (
            <Product key={product.id} product={product} setCart={setCart} addToCart={addToCart}/>
          ))}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
