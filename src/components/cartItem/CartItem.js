import React from "react";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../../slices/CartSlice";
import { useDispatch } from "react-redux";

function CartItem({ id, image, title, price, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto">
      <div className="flex md:space-x-24 items-center ">
        <div>
          <div>product</div>
          <img className="w-32" src={image} alt="item" />
        </div>
          <p className="flex items-center">{title}</p>

            <div className="flex space-x-4 border rounded-md border-slate-800 py-2 px-4">
              <button onClick={() => dispatch(decrementQuantity(id))}>-</button>
              <p className="">{quantity}</p>
              <button onClick={() => dispatch(incrementQuantity(id))}>+</button>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="">price</div>
            <div className="flex items-center font-medium">$ {price}</div>
            <div className="">
            <button
              className=""
              onClick={() => dispatch(removeItem(id))}
            >
              Remove
            </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default CartItem;
