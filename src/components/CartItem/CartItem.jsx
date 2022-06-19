import React from "react";

import "./CartItem.scss";
import { useGlobalContext } from "../../context/GlobalContextProvider";

const CartItem = ({ price, name, image, id }) => {
  const { deleteCartItem } = useGlobalContext();
  return (
    <>
      <div className="cart__dropdown_menu-flex">
        <div>
          <p className="cart__dropdown_menu-textBlack">{name}</p>
          <p className="cart__dropdown_menu-textGrey">${price}</p>
        </div>
        <img src={image} alt={name} />
      </div>
      <hr className="separator" />
      <button
        type="button"
        onClick={() => {
          deleteCartItem(id);
        }}
      >
        CLEAR
      </button>
    </>
  );
};

export default CartItem;
