import React from "react";
import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../redux/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <tr>
      <td>
        <img src={item.image} alt={item.title} width={50} />
      </td>
      <td>{item.title}</td>
      <td>₹{item.price}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => dispatch(decreaseQty(item.id))}
          >
            -
          </button>
          {item.qty}
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => dispatch(increaseQty(item.id))}
          >
            +
          </button>
        </div>
      </td>
      <td>₹{item.price * item.qty}</td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
