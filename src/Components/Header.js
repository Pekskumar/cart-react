import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CartIcon from "../Assets/Images/CartIcon";
import HeartIcon from "../Assets/Images/HeartIcon";
import mainlogo from "../Assets/Images/LogoMain.jpg";
import SearchIcon from "../Assets/Images/SearchIcon";
import UserIcon from "../Assets/Images/UserIcon";
import SearchModal from "../CustomModal/SearchModal";
import { GlobalShowProductsSlice } from "../ReactToolkit/ProductSlice";
import Data from "../Common/Data.json";

const Header = () => {
  const Wishlist = useSelector((state) => state.GlobalShowProduct.Wishlist);
  const AllCartData = useSelector((state) => state.GlobalShowProduct.AddToCart);
  const [modal, setModal] = useState(false);
  const [TotalCount, setTotalCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle navbar class
  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the state
  };

  useEffect(() => {
    if (AllCartData?.length > 0) {
      let temp = 0;
      AllCartData?.forEach((element) => {
        temp = element.qty + temp;
      });
      setTotalCount(temp);
    } else {
      setTotalCount(0);
    }
  }, [AllCartData]);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://dummyjson.com/products?limit=100"
  //       );
  //       if (
  //         response?.data?.products !== "" &&
  //         response?.data?.products !== undefined &&
  //         response?.data?.products !== null
  //       ) {
  //         dispatch(GlobalShowProductsSlice(response?.data?.products));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <header>
        <div className="container">
          <div className="bottom-header">
            <div className="left">
              <div className="logo">
                <div
                  onClick={() => navigate("/")}
                  className="d-flex align-item-center"
                >
                  <img src={mainlogo} alt="" />
                </div>
              </div>
            </div>
            <div className="center">
              <div className="menu-btn" onClick={toggleMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  role="presentation"
                  className="icon icon-hamburger"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>

              <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
                <ul className="main-menu">
                  <li
                    onClick={() => setIsMenuOpen(false)}
                    className="list-items"
                  >
                    <NavLink exact to="/">
                      Home
                    </NavLink>
                  </li>
                  <li
                    onClick={() => setIsMenuOpen(false)}
                    className="list-items"
                  >
                    <NavLink to="/category">Category</NavLink>
                  </li>
                  <li
                    onClick={() => setIsMenuOpen(false)}
                    className="list-items"
                  >
                    <NavLink to="/product">Products</NavLink>
                  </li>
                  <li
                    onClick={() => setIsMenuOpen(false)}
                    className="list-items"
                  >
                    <NavLink to="/wishlist">Wishlist</NavLink>
                  </li>
                  <li
                    onClick={() => setIsMenuOpen(false)}
                    className="list-items"
                  >
                    <NavLink to="/cart">Cart</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="right">
              <a className="search" onClick={() => toggleModal()}>
                <SearchIcon />
              </a>
              {/* <a className="user" href="">
                <UserIcon />
              </a> */}
              <Link className="shop" to={"/wishlist"}>
                <HeartIcon />
                <span className="count">
                  {Wishlist?.length > 0 ? Wishlist?.length : 0}
                </span>
              </Link>
              <Link className="shop" to={"/cart"}>
                <CartIcon />
                <span className="count">{TotalCount}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {modal && <SearchModal toggleModal={toggleModal} />}
    </>
  );
};

export default Header;
