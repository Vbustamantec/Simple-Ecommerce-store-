import { HiX } from "react-icons/hi";
import React, { useEffect, useState } from "react";

import "./Filter.scss";
import { useGlobalContext } from "../../context/GlobalContextProvider";

const Filter = ({ toggle, setToggle }) => {
  const { categories, priceRanges, products, setDisplayedItems, setPageCount } =
    useGlobalContext();
  const [categoryFlag, setCategoryFlag] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);

  //CONVERTIR EN HOOK
  const handlePrice = (e) => {
    if (e === priceFilter) {
      setPriceFilter("");
    } else {
      setPriceFilter(e);
    }
  };

  const handleCategory = (value) => {
    if (categoryFilter.includes(value)) {
      setCategoryFilter(categoryFilter.filter((item) => item !== value));
      if (categoryFlag === value) {
        setCategoryFlag("");
      }
    } else {
      setCategoryFlag(value);
      return categoryFilter.push(value);
    }
  };

  const handleFilters = () => {
    let newFilteredItems = [];
    if (categoryFilter.length === 0 && priceFilter === "") {
      newFilteredItems = products;
    } else if (categoryFilter.length >= 1 && priceFilter === "") {
      categoryFilter.forEach((category) => {
        newFilteredItems = [
          ...newFilteredItems,
          ...products.filter((product) => product.category === category),
        ];
      });
    } else if (categoryFilter.length >= 1 && priceFilter !== "") {
      categoryFilter.forEach((category) => {
        newFilteredItems = [
          ...newFilteredItems,
          ...products.filter((product) => product.category === category),
        ];
      });

      switch (priceFilter) {
        case "low":
          newFilteredItems = newFilteredItems.filter(
            (item) => item.tag === "low"
          );
          break;
        case "midlow":
          newFilteredItems = newFilteredItems.filter(
            (item) => item.tag === "midlow"
          );
          break;
        case "mid":
          newFilteredItems = newFilteredItems.filter(
            (item) => item.tag === "mid"
          );
          break;
        case "high":
          newFilteredItems = newFilteredItems.filter(
            (item) => item.tag === "high"
          );
          break;
      }
    } else if (categoryFilter.length === 0 && priceFilter !== "") {
      switch (priceFilter) {
        case "low":
          newFilteredItems = products.filter((item) => item.tag === "low");
          break;
        case "midlow":
          newFilteredItems = products.filter((item) => item.tag === "midlow");
          break;
        case "mid":
          newFilteredItems = products.filter((item) => item.tag === "mid");
          break;
        case "high":
          newFilteredItems = products.filter((item) => item.tag === "high");
      }
    }

    setDisplayedItems(newFilteredItems);
    setPageCount(Math.ceil(newFilteredItems.length / 6));
  };

  const handleClear = () => {
    setCategoryFlag("");
    setCategoryFilter([]);
    setPriceFilter("");
    setDisplayedItems(products);
    setPageCount(Math.ceil(products.length / 6));
  };

  useEffect(() => {
    handleFilters();
  }, [categoryFlag, categoryFilter, priceFilter]);

  return (
    <div className="filter__container">
      <div className="filter__wrapper">
        <h3>Category</h3>
        <div className="filter__categories-filter">
          {categories.map((category) => (
            <div key={category}>
              <input
                type="checkbox"
                id={category}
                checked={categoryFilter.includes(category) ? "checked" : false}
                onChange={(e) => handleCategory(e.target.value)}
                value={category}
              />
              <label htmlFor={category}>
                <span></span>
                {category}
              </label>
            </div>
          ))}
        </div>
        <hr className="separator-categories" />
        <h3>Price Range</h3>
        <div className="filter__prices-filter">
          {priceRanges.map((ranges) => (
            <div key={ranges}>
              <input
                type="radio"
                name="price__ranges"
                id={ranges}
                checked={ranges == priceFilter}
                onChange={(e) => handlePrice(e.target.value)}
                onClick={(e) => handlePrice(e.target.value)}
                value={ranges}
              />
              <label htmlFor={ranges}>
                <span></span>
                {ranges === "low"
                  ? "Lower than $20"
                  : ranges === "midlow"
                  ? "$20 - $100"
                  : ranges === "mid"
                  ? "$100 - $200"
                  : "More than $200"}
              </label>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="filter__categories_button"
          onClick={() => handleClear()}
        >
          CLEAR
        </button>
      </div>

      {/* Toggle menu used in mobile mode */}
      {toggle && (
        <div className="filter__toggle_container">
          <div className="filter__toggle_header">
            <h3>Filter</h3>
            <HiX onClick={() => setToggle(!toggle)} />
          </div>
          <div className="filter__toggle_categories-filter">
            {categories.map((category) => (
              <div key={category}>
                <input
                  type="checkbox"
                  id={category}
                  name={category}
                  value={category}
                  checked={
                    categoryFilter.includes(category) ? "checked" : false
                  }
                  onChange={(e) => handleCategory(e.target.value)}
                />
                <label>{category}</label>
              </div>
            ))}
          </div>
          <hr className="separator-categories" />
          <h3>Price Range</h3>
          <div className="filter__toggle_prices-filter">
            {priceRanges.map((ranges) => (
              <div key={ranges}>
                <input
                  type="checkbox"
                  id={ranges}
                  value={ranges}
                  checked={ranges == priceFilter}
                  onChange={(e) => handlePrice(e.target.value)}
                  onClick={(e) => handlePrice(e.target.value)}
                />
                <label>
                  {ranges === "low"
                    ? "Lower than $20"
                    : ranges === "midlow"
                    ? "$20 - $100"
                    : ranges === "mid"
                    ? "$100 - $200"
                    : "More than $200"}
                </label>
              </div>
            ))}
          </div>
          <div className="filter__toggle_buttons">
            <button className="button-white" onClick={() => handleClear()}>
              CLEAR
            </button>
            <button className="button-black" onClick={() => setToggle(!toggle)}>
              SAVE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
