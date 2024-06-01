import React from "react";
import { incrementQuantity, decrementQuantity, removeItem } from "../../slices/CartSlice";
import { useDispatch } from "react-redux";

function CartItem({ id, image, title, price, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto border md:border-gray-200 md:p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="w-1/4">
          <div className="text-gray-700 mb-2">Product</div>
          <img className="w-32 h-32 object-cover" src={image} alt="item" />
        </div>
        <div className="w-1/4">
          <p className="text-gray-700 text-lg">{title}</p>
        </div>
        <div className="flex flex-col items-center mb-6">
        <div className="text-gray-700 mb-2">Qty</div>
        <div className="flex items-center justify-center md:border border-gray-400 px-2 py-2 rounded-md space-x-4">
          <button
            className=""
            onClick={() => dispatch(decrementQuantity(id))}
          >
            -
          </button>
          <p className="mx-2">{quantity}</p>
          <button
            className=""
            onClick={() => dispatch(incrementQuantity(id))}
          >
            +
          </button>
        </div></div>
        <div className="w-1/4 flex flex-col items-end">
          <div className="text-gray-700 mb-2">Price</div>
          <div className="text-gray-900 font-medium text-lg">$ {price}</div>
          <button
            className="text-red-500 mt-2"
            onClick={() => dispatch(removeItem(id))}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
