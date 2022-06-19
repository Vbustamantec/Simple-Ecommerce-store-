import React from "react";

import "./StoreItem.scss";
import { useGlobalContext } from "../../context/GlobalContextProvider";

const StoreItem = ({ image, category, price, name, alt, id }) => {
  const { setCartItems, cartItems, handleNewItem } = useGlobalContext();

  const handleAddToCart = () => {
    const newCartItem = {
      id: id,
      name: name,
      price: price,
      image: image,
    };

    if (cartItems.length === 0) {
      setCartItems([newCartItem, ...cartItems]);
      handleNewItem();
    } else if (cartItems.length > 0) {
      let ids = [];
      cartItems.forEach((item) => {
        ids.push(item.id);
      });
      if (ids.includes(id)) {
        alert("Item already in cart");
      } else {
        setCartItems([newCartItem, ...cartItems]);
        handleNewItem();
      }
    }
  };

  return (
    <div className="store__item">
      <div className="store__item-img">
        <img src={image} alt={alt} />
        <button type="button" onClick={() => handleAddToCart()}>
          ADD TO CART
        </button>
      </div>
      <p className="p-bold">{category}</p>
      <h2>{name}</h2>
      <p className="p-price">${price}</p>
    </div>
  );
};

export default StoreItem;
