import React, { useEffect, useState } from "react";
import SingleCard from "../Components/SingleCard";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalCloseIcon from "../Assets/Images/ModalCloseIcon";
import ModalSearchIcon from "../Assets/Images/ModalSearchIcon";

const SearchModal = (props) => {
  let navigate = useNavigate();
  const ProductShowData = useSelector(
    (state) => state.GlobalShowProduct.GlobalShowProducts
  );
  const [SearchValue, setSearchValue] = useState("");
  const [SearchList, setSearchList] = useState([]);
  function fnClickCardData(data) {
    navigate(`/product-detail/${data.id}`);
    props.toggleModal();
  }
  useEffect(() => {
    // debugger;
    if (SearchValue) {
      var temp = [];
      if (ProductShowData?.length > 0) {
        temp = ProductShowData?.filter(
          (f) =>
            f?.title.toLowerCase().includes(SearchValue) ||
            f?.price.toString().includes(SearchValue)
        );
      }
      setSearchList(temp);
    }
  }, [ProductShowData, SearchValue]);

  return (
    <div className="modal">
      <div onClick={props.toggleModal} className="overlay"></div>
      <div className="d-flex justify-space-between">
        <div className="d-flex search-box">
          <ModalSearchIcon/>
          <input
            type="text"
            value={SearchValue}
            placeholder="Search our store"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <ModalCloseIcon onClick={props.toggleModal}/>
        {/* <button className="close-modal" onClick={props.toggleModal}>
          CLOSE
        </button> */}
      </div>
      <div className="modal-content ">
        {SearchList?.length > 0 ? (
          <div className=" trending you-might-like-section">
            <div className="trending-content">
              {SearchList?.map((item) => (
                <SingleCard data={item} fnClickCardData={fnClickCardData} />
              ))}
            </div>
          </div>
        ) : (
          <div className=" empty-cart">
            <div>
              <h5>Your SearchList is currently empty.</h5>
              <p className="primary-btn" onClick={()=>props.toggleModal()}>Continue Browsing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
