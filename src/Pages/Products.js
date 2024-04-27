import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import React, { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import { useSelector } from "react-redux";
import SingleCard from "../Components/SingleCard";
import CloseIcon from "../Assets/Images/CloseIcon";
import { useNavigate } from "react-router-dom";
import FilterIcon from "../Assets/Images/FilterIcon";
import ModalCloseIcon from "../Assets/Images/ModalCloseIcon";

const Products = () => {
  let navigate = useNavigate();
  const [SelectedCategoryList, setSelectedCategoryList] = useState([]);
  const [isSliderMoved, setIsSliderMoved] = useState(false);
  const [SelectedBrandList, setSelectedBrandList] = useState([]);
  const ProductShowData = useSelector(
    (state) => state.GlobalShowProduct.GlobalShowProducts
  );
  const [value, setValue] = useState([400, 1600]);
  const [MaxPrice, setMaxPrice] = useState();
  const [IsFilterOpen, setIsFilterOpen] = useState(false);
  const [MoreButtonCategory, setMoreButtonCategory] = useState(5);
  const [MoreButtonBrand, setMoreButtonBrand] = useState(5);
  const [MoreTextCategory, setMoreTextCategory] = useState("More");
  const [MoreTextBrand, setMoreTextBrand] = useState("More");
  const [CategoryList, setCategoryList] = useState({});
  const [BrandList, setBrandList] = useState({});
  const [ProductFilterData, setProductFilterData] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    let PriceArray = ProductShowData.map((item) => {
      return item.price;
    });
    let tempprice = PriceArray[0];
    PriceArray.forEach((element) => {
      if (element > tempprice) {
        tempprice = element;
      }
    });
    setValue([1, tempprice]);
    setMaxPrice(tempprice);

    let tempObj = {};
    let tempBrand = {};
    ProductShowData.forEach((element) => {
      if (tempObj[element.category]) {
        tempObj[element.category] = {
          ...tempObj[element.category],
          value: tempObj[element.category].value + 1,
        };
      } else {
        tempObj[element.category] = {
          ...tempObj[element.category],
          value: 1,
        };
      }
      if (tempBrand[element.brand]) {
        tempBrand[element.brand] = {
          ...tempBrand[element.brand],
          value: tempBrand[element.brand].value + 1,
        };
      } else {
        tempBrand[element.brand] = {
          ...tempBrand[element.brand],
          value: 1,
        };
      }
    });
    setCategoryList(tempObj);
    setBrandList(tempBrand);
  }, [ProductShowData]);

  useEffect(() => {
    let tempArray = [];
    ProductShowData.forEach((element) => {
      if (
        (SelectedCategoryList.length === 0 ||
          SelectedCategoryList.includes(element.category)) &&
        (SelectedBrandList.length === 0 ||
          SelectedBrandList.includes(element.brand)) &&
        parseInt(element.price) >= parseInt(value[0]) &&
        parseInt(element.price) <= parseInt(value[1])
      ) {
        tempArray.push(element);
      }
    });
    setProductFilterData(tempArray);
    setFiltersApplied(
      SelectedCategoryList.length > 0 ||
        SelectedBrandList.length > 0 ||
        isSliderMoved
    );
  }, [value, SelectedCategoryList, SelectedBrandList, isSliderMoved]);

  const productCategoryWise = (SelectedCategoryList, type) => {
    if (type === "category") {
      let tempArray = [];
      if (SelectedCategoryList.length === 0) {
        tempArray = ProductShowData;
      } else {
        SelectedCategoryList.forEach((element) => {
          ProductShowData.forEach((element1) => {
            if (element === element1.category) {
              tempArray.push(element1);
            }
          });
        });
      }
      setProductFilterData(tempArray);
    }
    if (type === "brand") {
      let tempArray = [];
      if (SelectedBrandList.length === 0) {
        tempArray = ProductShowData;
      } else {
        SelectedBrandList.forEach((element) => {
          ProductShowData.forEach((element1) => {
            if (element === element1.brand) {
              tempArray.push(element1);
            }
          });
        });
      }
      setProductFilterData(tempArray);
    }
  };

  function fnHandleCheckbox(e, type) {
    const { value, checked } = e.target;
    if (type === "category") {
      if (checked) {
        setSelectedCategoryList((prev) => [...prev, value]);
      } else {
        setSelectedCategoryList((prev) =>
          prev.filter((item) => item !== value)
        );
      }
    }
    if (type === "brand") {
      if (checked) {
        setSelectedBrandList((prev) => [...prev, value]);
      } else {
        setSelectedBrandList((prev) => prev.filter((item) => item !== value));
      }
    }
  }

  function fnShowMore(type) {
    if (type === "category") {
      setMoreTextCategory(MoreButtonCategory === 5 ? "Less" : "More");
      setMoreButtonCategory(
        MoreButtonCategory === 5 ? Object.keys(CategoryList).length : 5
      );
    }
    if (type === "brand") {
      setMoreTextBrand(MoreButtonBrand === 5 ? "Less" : "More");
      setMoreButtonBrand(
        MoreButtonBrand === 5 ? Object.keys(BrandList).length : 5
      );
    }
  }

  function fnRemoveAll() {
    setValue([1, MaxPrice]);
    setSelectedCategoryList([]);
    setSelectedBrandList([]);
    setIsSliderMoved(false);
  }

  function fnClickCardData(data) {
    navigate(`/product-detail/${data.id}`);
  }
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (IsFilterOpen) {
    document.body.classList.add("active-filter");
  } else {
    document.body.classList.remove("active-filter");
  }

  return (
    <div className="container">
      <div className="product-heading">
        <h4>PRODUCTS</h4>
        <h6>
          {ProductFilterData.length} of {ProductShowData.length} products
        </h6>
      </div>
      <div className="product-content">
        <div className="mobile-filter d-flex justify-space-between">
          <div className="mobile-filter-heading d-flex justify-space-between align-item-center">
            <h5>Filter:</h5>
            <div
              className="primary-btn d-flex align-item-center"
              onClick={() => {
                setIsFilterOpen(!IsFilterOpen);
              }}
            >
              <FilterIcon />
              Filter and sort
            </div>
          </div>
          <div className="mobile-filter-content">
            {filtersApplied && (
              <h5 onClick={() => fnRemoveAll()}>Remove All</h5>
            )}
            {filtersApplied && (
              <div className="d-flex justify-space-between filterd-data">
                {isSliderMoved && (
                  <div className="d-flex justify-space-between align-item-center filterd-data-one">
                    <span>
                      ${value[0].toFixed(2)}-${value[1].toFixed(2)}
                    </span>
                    <CloseIcon
                      onClick={() => {
                        setValue([400, 1600]);
                        setIsSliderMoved(false);
                      }}
                    />
                  </div>
                )}
                {SelectedCategoryList.length > 0 &&
                  SelectedCategoryList.map((item, index) => (
                    <div
                      className="d-flex justify-space-between align-item-center filterd-data-one"
                      key={index}
                    >
                      <span>Category : {item}</span>
                      <CloseIcon
                        onClick={() =>
                          setSelectedCategoryList((prev) =>
                            prev.filter((f) => f !== item)
                          )
                        }
                      />
                    </div>
                  ))}
                {SelectedBrandList.length > 0 &&
                  SelectedBrandList.map((item, index) => (
                    <div
                      className="d-flex justify-space-between align-item-center filterd-data-one"
                      key={index}
                    >
                      <span>Brand : {item}</span>
                      <CloseIcon
                        onClick={() =>
                          setSelectedBrandList((prev) =>
                            prev.filter((f) => f !== item)
                          )
                        }
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className={`product-content-left ${IsFilterOpen ? "active" : ""}`}>
          <div className="d-flex justify-space-between gray-border">
            <div className="d-flex align-item-center justify-space-between filter-title mobile-close-filter">
              <h5>Filter:</h5>
              <ModalCloseIcon onClick={() => setIsFilterOpen(false)} />
            </div>
            <div className="d-flex justify-space-between filter-title ">
              {!IsFilterOpen && <h5>Filter:</h5>}
              {filtersApplied && (
                <h5 onClick={() => fnRemoveAll()}>Remove All</h5>
              )}
            </div>
            {filtersApplied && (
              <div className="d-flex justify-space-between filterd-data">
                {isSliderMoved && (
                  <div className="d-flex justify-space-between align-item-center filterd-data-one">
                    <span>
                      ${value[0].toFixed(2)}-${value[1].toFixed(2)}
                    </span>
                    <CloseIcon
                      onClick={() => {
                        setValue([400, 1600]);
                        setIsSliderMoved(false);
                      }}
                    />
                  </div>
                )}
                {SelectedCategoryList.length > 0 &&
                  SelectedCategoryList.map((item, index) => (
                    <div
                      className="d-flex justify-space-between align-item-center filterd-data-one"
                      key={index}
                    >
                      <span>Category : {item}</span>
                      <CloseIcon
                        onClick={() =>
                          setSelectedCategoryList((prev) =>
                            prev.filter((f) => f !== item)
                          )
                        }
                      />
                    </div>
                  ))}
                {SelectedBrandList.length > 0 &&
                  SelectedBrandList.map((item, index) => (
                    <div
                      className="d-flex justify-space-between align-item-center filterd-data-one"
                      key={index}
                    >
                      <span>Brand : {item}</span>
                      <CloseIcon
                        onClick={() =>
                          setSelectedBrandList((prev) =>
                            prev.filter((f) => f !== item)
                          )
                        }
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>

          <Accordion>
            <AccordionItem
              header="Price"
              className="gray-border price-main"
              initialEntered
            >
              <p>
                The highest price is <b>${MaxPrice?.toFixed(2)}</b>
              </p>
              <RangeSlider
                min={1}
                max={MaxPrice}
                step={0}
                value={value}
                onInput={(newValue) => {
                  setValue(newValue);
                  setIsSliderMoved(true);
                }}
              />
              <h6>
                Price: ${value[0]?.toFixed(2)} - ${value[1]?.toFixed(2)}
              </h6>
            </AccordionItem>
            <AccordionItem
              header={`Category (${Object.keys(CategoryList)?.length})`}
              className="gray-border"
              initialEntered
            >
              {Object.keys(CategoryList).map(
                (itemc, indexc) =>
                  indexc < MoreButtonCategory && (
                    <p className="comment-form-cookies-consent" key={indexc}>
                      <input
                        id={itemc}
                        name={itemc}
                        type="checkbox"
                        value={itemc}
                        checked={SelectedCategoryList.includes(itemc)}
                        onChange={(e) => fnHandleCheckbox(e, "category")}
                      />
                      <label htmlFor={itemc}>
                        <span>{itemc}</span>
                        <span>{CategoryList[itemc].value}</span>
                      </label>
                    </p>
                  )
              )}
              <p
                className="show-more-btn"
                onClick={() => fnShowMore("category")}
              >
                <b>
                  {MoreButtonCategory === 5 ? "+" : "-"} Show {MoreTextCategory}
                </b>
              </p>
            </AccordionItem>
            <AccordionItem
              header={`Brand (${Object.keys(BrandList)?.length})`}
              initialEntered
            >
              {Object.keys(BrandList).map(
                (itemb, indexb) =>
                  indexb < MoreButtonBrand && (
                    <p className="comment-form-cookies-consent" key={indexb}>
                      <input
                        id={itemb}
                        name={itemb}
                        type="checkbox"
                        value={itemb}
                        checked={SelectedBrandList.includes(itemb)}
                        onChange={(e) => fnHandleCheckbox(e, "brand")}
                      />
                      <label htmlFor={itemb}>
                        <span>{itemb}</span>
                        <span>{BrandList[itemb].value}</span>
                      </label>
                    </p>
                  )
              )}
              <p className="show-more-btn" onClick={() => fnShowMore("brand")}>
                <b>
                  {MoreButtonBrand === 5 ? "+" : "-"} Show {MoreTextBrand}
                </b>
              </p>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="product-content-right trending you-might-like-section">
          {ProductFilterData?.length > 0 ? (
            <>
              <div className="trending-content">
                {ProductFilterData?.map((item) => (
                  <SingleCard
                    data={item}
                    fnClickCardData={fnClickCardData}
                    key={item.id}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="products empty-cart">
                <div>
                  <h5>No products found</h5>
                  <a className="primary-btn" onClick={() => fnRemoveAll()}>
                    clear all
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
