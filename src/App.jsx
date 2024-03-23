import { Header } from "./components/Header"
import { Product } from "./components/Product"
import { useState } from "react"
import { db } from "./data/db"

function App() {

  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  function addToCart(item) {

    const itemExists= cart.findIndex(product => product.id === item.id);

    if (itemExists >= 0) {//item exist in cart

      const updatedCart = [...cart];//copy cart

      updatedCart[itemExists].quantity += 1;//position of item in cart increase quantity

      setCart(updatedCart);//set new cart
      

    }else{
      item.quantity = 1;
      setCart([...cart, item]);
    }

    
  }

  return (
    <>

      <Header />

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
