import { useState, useEffect } from "react"
import { db } from "../data/db"

export const useCart = () => {

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

    /*const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    
    const addToCart = (product) => {
        setCart([...cart, product]);
        setTotal(total + product.price);
    };
    
    const removeFromCart = (product) => {
        const newCart = cart.filter((item) => item.id !== product.id);
        setCart(newCart);
        setTotal(total - product.price);
    };*/
    
    return { 
        data, 
        cart, 
        addToCart, 
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
    }

}