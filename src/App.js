import React, { useState } from "react";
import ShoeList from "./components/ShoeList";
import Cart from "./components/Cart";

function App() {

    const [cart, setCart] = useState([]);

    const shoes = [
      { id: 1, name: "Shoes 1", price: 120, image: "https://assets.ajio.com/medias/sys_master/root/20230505/QY69/6454ea9cd55b7d0c63972928/-473Wx593H-441340548-white-MODEL4.jpg" },
      { id: 2, name: "Adidas", price: 140, image: "https://assets.ajio.com/medias/sys_master/root/20230505/bYbI/6454f21c42f9e729d7696985/-473Wx593H-441340548-sky-MODEL.jpg" },
      { id: 3, name: "Puma", price: 100, image: "https://assets.ajio.com/medias/sys_master/root/20230505/Fnuh/6454ed55d55b7d0c639758c3/-473Wx593H-441340548-sky-MODEL3.jpg" },
    ];

    const addToCart = (shoe) => {
      const exist = cart.find( (item) => item.id === shoe.id );
      if(exist) {
        setCart(
          cart.map( (item) =>
            item.id === shoe.id ? { ...item, quantity:item.quantity+1 } : item
          )
        );
      }else{
        setCart( [...cart, {...shoe, quantity:1}] );
      }
    };

    const removeFromCart = (id) => {
      setCart(
        cart.map( (item) => 
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter( (item) => item.quantity > 0 )
      );
    };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Assignment-3: Online Shoe Store</h2>
      <div className="row">
        <div className="col-md-6">
          <ShoeList shoes = {shoes} addToCart = {addToCart}/>
        </div>
        <div className="col-md-6"> 
            <Cart cartItems = {cart} removeFromCart = {removeFromCart} />
        </div>
      </div>
      
    </div>
  );
}

export default App;
