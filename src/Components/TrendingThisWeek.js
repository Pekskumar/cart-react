import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleCard from "./SingleCard";
import Loader, { LoaderType } from "../Common/Loader";
import Prod1 from '../Assets/Images/prod1.jpg'
import Prod2 from '../Assets/Images/prod2.jpg'

const TrendingThisWeek = () => {
  let navigate = useNavigate();
  const [ProducData, setProducData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Productlimit, setProductlimit] = useState(8);
  const fetchData = async (number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${number}`
      );
      setLoading(false);
      if (response.data) {
        setProducData(response.data.products);
      } else {
        setProducData((prev) => [...prev], response.data.products);
      }
      if (response.data.limit > 8) {
        setProductlimit(response.data.limit);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(Productlimit);
  }, [Productlimit]);

  function fnLoadMore() {
    setProductlimit(Productlimit + 8);
  }
  function fnClickCardData(data) {
    navigate(`/product-detail/${data.id}`);
  }


  return (
    <section className="trending">
      <div className="heading">
        <h2>Trending This Week</h2>
      </div>
      <div className="container">
        <div className="trending-content">
          {ProducData?.length > 0 ? (
            <>
              {ProducData?.map((item, index) => (
                <SingleCard
                  key={index}
                  data={item}
                  fnClickCardData={fnClickCardData}
                />
              ))}
            </>
          ) : (
            <>no data</>
          )}

        </div>
        {Loading && <Loader type={LoaderType.ProductCard} count={4} />}

        {ProducData?.length < 100 && (
          <div className="trending-content-btn">
            <div onClick={() => fnLoadMore()} className="primary-btn load-more">
              {Loading ? "Loading..." : "Load More"}
            </div>
          </div>
        )}
        <section className="shopify">
          <div className="shopify-content">
            <div className="left width">
              <img
                src={Prod1}
                alt={Prod1}
              />
              <div className="left-content">
                <h2>Top Style Trends</h2>
                <p>
                  3 lights lndenpant kitchen islang
                  <br />
                  on your store's features
                </p>
                <button
                  onClick={() => navigate("/product")}
                  className="primary-btn"
                >
                  Shop Now
                </button>
              </div>
            </div>
            <div className="left right-width width">
              <img
                src={Prod2}
                alt={Prod2}
              />
              <div className="right-content">
                <h2>
                  8.84% Up To Discount
                </h2>
                <p>
                  American Vintage Wood Pendant Light
                  <br />
                  on your store's features
                </p>
                <button
                  onClick={() => navigate("/product")}
                  className="primary-btn"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default TrendingThisWeek;
