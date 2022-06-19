import React, { createContext, useContext, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import db from "././../firebase/firebaseConfig";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  /* ---------------STORE ITEMS STATES--------------- */
  //Array of all products in the database
  const [products, setProducts] = useState([]);
  //Displays the actual items in the store section
  const [displayedItems, setDisplayedItems] = useState([]);

  /* ---------------CART STATES--------------- */
  //Array of items in the cart
  const [cartItems, setCartItems] = useState([]);
  //Opens and close the cart dropdown
  const [cartToggle, setCartToggle] = useState(false);
  //displays the newly added item in the cart
  const [itemToggle, setItemToggle] = useState(false);

  /* ---------------FILTERS STATES--------------- */
  //state to sort by ascending descending order
  const [sortingToggle, setSortingToggle] = useState(true);
  //state to know if the user wants to sort the items by alphabetical order or by price
  const [sortingValue, setSortingValue] = useState("price");
  //state used to filter by category
  const [categories, setCategories] = useState([]);
  //state used to filter by price range
  const [priceRanges, setPriceRanges] = useState([]);

  /* ---------------MOBILE MENU STATE--------------- */
  //Toggles the mobile menu for the filters
  const [toggle, setToggle] = useState(false);

  /* ---------------PAGINATION STATES--------------- */
  //Helps React-paginate to know which page the user is on
  const [currentPage, setCurrentPage] = useState(0);
  //Helps React-paginate to know how many pages there are
  const [pageCount, setPageCount] = useState(Math.ceil(products.length / 6));

  /* ---------------CART FUNCTIONS--------------- */
  //Show the new item added to the cart in the cart dropdown and hide it after a short delay
  const handleNewItem = () => {
    setItemToggle(true);
    setTimeout(() => {
      setItemToggle(false);
    }, 1500);
  };

  //delete items from the cart
  const deleteCartItem = (id) => {
    let updatedTodos = [...cartItems].filter((items) => items.id !== id);
    setCartItems(updatedTodos);
    if (cartItems === 0) {
      setItemToggle(false);
    }
  };

  /* ---------------DATABASE FUNCTIONS AND QUERIES--------------- */
  //Database reference
  const colRef = collection(db, "products");

  //Query to get the products
  const defaultQuery = query(
    colRef,
    where("featured", "==", false),
    orderBy("price", "asc")
  );
  //Query to get the featured products
  const featuredQuery = query(colRef, where("featured", "==", true));

  //Function to get the products from the database
  const getData = async (query) => {
    const datos = await getDocs(query);
    let products = [];
    datos.docs.forEach((dato) => {
      products.push({ ...dato.data(), id: dato.id });
    });

    return products;
  };

  /* ---------------FILTER FUNCTIONS--------------- */
  //Function that sorts the items by price and alphabetically
  const handleSorting = () => {
    let newProducts = [...displayedItems];

    if (sortingToggle && sortingValue === "price") {
      newProducts.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortingToggle && sortingValue === "alphabetical") {
      newProducts.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (!sortingToggle && sortingValue === "price") {
      newProducts.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (!sortingToggle && sortingValue === "alphabetical") {
      newProducts.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    setDisplayedItems(newProducts);
    return newProducts;
  };

  return (
    <GlobalContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartToggle,
        setCartToggle,
        deleteCartItem,
        itemToggle,
        setItemToggle,
        handleNewItem,
        featuredQuery,
        getData,
        defaultQuery,
        sortingToggle,
        setSortingToggle,
        sortingValue,
        setSortingValue,
        products,
        setProducts,
        categories,
        setCategories,
        priceRanges,
        setPriceRanges,
        handleSorting,
        toggle,
        setToggle,
        currentPage,
        setCurrentPage,
        displayedItems,
        setDisplayedItems,
        pageCount,
        setPageCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
