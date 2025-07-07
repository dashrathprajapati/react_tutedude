import React from "react";

const Cart = ( {cartItems, removeFromCart } ) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);


    return (
        <div>
            <h4>Shopping Cart</h4>
            {cartItems.length === 0 ?
                <p>No Items in a Cart</p>
                : (
                    <ul className="list-group">
                        {cartItems.map( (item) => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            
                                <span>
                                    {item.name} X {item.quantity} - Rs. {item.price * item.quantity}
                                </span>
                                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id) }>
                                    Remove
                                </button>
                            
                            </li>
                        ))}
                       
                    </ul>
                )
            }
            <h5 className="mt-3">Total: Rs.{total}</h5>
        </div>
        
    );
};

export default Cart;