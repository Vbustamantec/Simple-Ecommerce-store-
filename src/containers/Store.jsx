import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from "react-icons/io";

import Filter from "../components/Filter/Filter";
import StoreItem from "../components/StoreItem/StoreItem";
import { images } from "../constants";
import "./Store.scss";
import { useGlobalContext } from "../context/GlobalContextProvider";

const Store = () => {
  const {
    getData,
    handleSorting,
    defaultQuery,
    sortingToggle,
    setSortingToggle,
    setSortingValue,
    sortingValue,
    setProducts,
    toggle,
    setToggle,
    currentPage,
    setCurrentPage,
    setCategories,
    setPriceRanges,
    displayedItems,
    setDisplayedItems,
    pageCount,
    setPageCount,
  } = useGlobalContext();
  //Pagination logic using React-paginate
  //const usersPerPage = 6;
  const pageVisited = currentPage * 6;
  const displayUsers = displayedItems.slice(pageVisited, pageVisited + 6);
  // const pageCount = Math.ceil(products.length / usersPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  //Query for the store items return 19 items in an array
  useEffect(() => {
    getData(defaultQuery).then((data) => {
      setProducts(data);
      setDisplayedItems(data);
      setPageCount(Math.ceil(data.length / 6));
      const categoryList = data.map((item) => item.category);
      const priceRanges = data.map((item) => item.tag);
      const uniquePriceRanges = [...new Set(priceRanges)];
      const uniqueCategoryList = [...new Set(categoryList)];
      setPriceRanges(uniquePriceRanges);
      setCategories(uniqueCategoryList);
    });
  }, []);

  useEffect(() => {
    setDisplayedItems(handleSorting());
  }, [sortingToggle, sortingValue]);

  return (
    <section aria-label="Photo Store">
      <div className="store__container">
        <div className="store__header">
          <h2>
            Photography / <span>Premium Photos</span>
          </h2>
          <div className="store__select">
            <p>
              <button
                type="button"
                className="store__select-sorting"
                onClick={() => setSortingToggle(!sortingToggle)}
              >
                {sortingToggle ? (
                  <IoMdArrowDropupCircle />
                ) : (
                  <IoMdArrowDropdownCircle />
                )}
              </button>
              {"  "}Sort By
            </p>
            <select
              name="select"
              onChange={(e) => setSortingValue(e.target.value)}
            >
              <option value="price">Price</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
            <button
              type="button"
              className="store__select_toggleButton"
              onClick={() => setToggle(!toggle)}
            >
              <img src={images.filterToggle} alt="toggle filter" />
            </button>
          </div>
        </div>
      </div>

      <div className="store__section">
        <Filter toggle={toggle} setToggle={setToggle} />
        <div className="store__items">
          {displayUsers.map((product) => (
            <StoreItem
              key={product?.id}
              category={product?.category}
              name={product?.name}
              price={product?.price}
              image={product?.image?.url}
              alt={product?.image?.alt}
              id={product?.id}
            />
          ))}
        </div>
      </div>
      <ReactPaginate
        previousLabel={<MdArrowBackIosNew />}
        nextLabel={<MdArrowForwardIos />}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"store__pagination"}
        pageLinkClassName={"store__pagination-link"}
        previousLinkClassName={"store__pagination-previous"}
        nextLinkClassName={"store__pagination-next"}
        disabledClassName={"store__pagination-disabled"}
        activeLinkClassName={"store__pagination-active"}
      />
    </section>
  );
};

export default Store;
