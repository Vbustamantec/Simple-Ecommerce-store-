import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

import "./Navbar.scss";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import { images } from "../../constants";
import CartItem from "../CartItem/CartItem";

const Navbar = () => {
  const { cartItems, itemToggle, cartToggle, setCartToggle, deleteCartItem } =
    useGlobalContext();

  return (
    <header aria-label="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <img src={images.logo} alt="logo bejamas" />
        </div>
        <button
          type="button"
          className="navbar__cart"
          onClick={() => setCartToggle(!cartToggle)}
        >
          <AiOutlineShoppingCart />
          <span className="navbar__cart-qty">{cartItems.length}</span>
        </button>

        {cartToggle && (
          <div className="cart__dropdown_menu">
            <div className="cart__dropdown_menu-container">
              <MdOutlineClose onClick={() => setCartToggle(!cartToggle)} />
              {cartItems.length === 0 && (
                <h4>You don't have any items in the cart yet</h4>
              )}
              {cartItems.map((item) => (
                <>
                  {/* <div className="cart__dropdown_menu-flex">
                    <div>
                      <p className="cart__dropdown_menu-textBlack">
                        {item?.name}
                      </p>
                      <p className="cart__dropdown_menu-textGrey">
                        ${item?.price}
                      </p>
                    </div>
                    <img src={item?.image} alt={item?.name} />
                  </div>
                  <hr className="separator" />
                  <button
                    type="button"
                    onClick={() => {
                      deleteCartItem(item.id);
                    }}
                  >
                    CLEAR
                  </button> */}
                  <CartItem
                    key={item.id}
                    price={item.price}
                    name={item.name}
                    id={item.id}
                    image={item.image}
                  />
                </>
              ))}
            </div>
          </div>
        )}

        {itemToggle && (
          <div className="cart__dropdown">
            <div className="cart__dropdown-container">
              <div className="cart__dropdown-flex">
                <div>
                  <p className="cart__dropdown-textBlack">
                    {cartItems[0]?.name}
                  </p>
                  <p className="cart__dropdown-textGrey">
                    ${cartItems[0]?.price}
                  </p>
                </div>
                <img src={cartItems[0]?.image} alt={cartItems[0]?.name} />
              </div>
              <hr className="separator" />
            </div>
          </div>
        )}
      </div>
      <hr className="separator" />
    </header>
  );
};

export default Navbar;
