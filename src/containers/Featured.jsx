import { useEffect, useState } from "react";

import "./Featured.scss";
import { useGlobalContext } from "../context/GlobalContextProvider";

const Featured = () => {
  const { setCartItems, cartItems, handleNewItem, getData, featuredQuery } =
    useGlobalContext();
  const [featuredItem, setfeaturedItem] = useState({});

  //Getting the featured element from the database
  useEffect(() => {
    getData(featuredQuery).then((data) => setfeaturedItem(data[0]));
  }, []);

  const handleAddToCart = () => {
    const newCartItem = {
      id: featuredItem?.id,
      name: featuredItem?.name,
      price: featuredItem?.price,
      image: featuredItem?.image?.url,
    };

    if (cartItems.length === 0) {
      setCartItems([newCartItem, ...cartItems]);
      handleNewItem();
    } else if (cartItems.length > 0) {
      let ids = [];
      cartItems.forEach((item) => {
        ids.push(item.id);
      });
      if (ids.includes(featuredItem.id)) {
        alert("Item already in cart");
      } else {
        setCartItems([newCartItem, ...cartItems]);
        handleNewItem();
      }
    }
  };

  return (
    <section aria-label="Featured">
      <div className="featured__container">
        <div className="featured__title">
          <h2>{featuredItem.name}</h2>
          <button type="button" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
        <div className="featured__image">
          <img src={featuredItem.image?.url} alt="featured"></img>
          <p>Photo of the day</p>
        </div>
        <div className="button-mobile">
          <button
            type="button"
            className="button-mobile"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>

        <div className="featured__flex">
          <div className="featured__desc">
            <h3>About the {featuredItem.name}</h3>
            <p className="p-bold">{featuredItem.category}</p>
            <p className="featured__desc-text">
              {featuredItem.details?.description}
            </p>
          </div>
          <div className="featured__also-buy">
            <h3>People also buy</h3>
            <div className="featured__also-buy_images">
              {featuredItem.details?.recommendations?.map((item) => (
                <img key={item?.alt} src={item?.url} alt={item?.alt} />
              ))}
            </div>
            <h3>Details</h3>
            <p>
              Size: {featuredItem.details?.dimentions?.width} x{" "}
              {featuredItem.details?.dimentions?.heigth} pixel
            </p>
            <p>Size: {featuredItem.details?.size} mb</p>
          </div>
        </div>
      </div>
      <hr className="separator-featured" />
    </section>
  );
};

export default Featured;
