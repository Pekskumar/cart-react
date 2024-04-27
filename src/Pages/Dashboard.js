import React from "react";
import HeroBanner from "../Components/HeroBanner";
import HotCategories from "../Components/HotCategories";
import TrendingThisWeek from "../Components/TrendingThisWeek";
import YouMightLike from "../Components/YouMightLike";
import BrandSlider from "../Components/BrandSlider";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const ProductShowData = useSelector(
    (state) => state.GlobalShowProduct.GlobalShowProducts
  );

  return (
    <div>
      <HeroBanner data={ProductShowData} />
      <HotCategories data={ProductShowData} />
      <TrendingThisWeek />      
      <YouMightLike data={ProductShowData} />
      <BrandSlider data={ProductShowData} />
      <section className="free-service-section">
        <div className="container">
          <div className="free-service-content">
            <div className="inner">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-truck"
                >
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </span>
              <h3>Free Shipping</h3>
              <p>Pair text with an icon to focus on your store's features.</p>
            </div>
            <div className="inner">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  ></path>
                </svg>
              </span>
              <h3>Free Returns</h3>
              <p>Pair text with an icon to focus on your store's features.</p>
            </div>
            <div className="inner">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-credit-card"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </span>
              <h3>Secure Payment</h3>
              <p>Pair text with an icon to focus on your store's features.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
