import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const HotCategories = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="hot-categories">
      <div className="heading">
        <h2>Hot Categories</h2>
      </div>
      <div className="container">
        <div className="hot-categories-slider">
          <Slider {...settings}>
            {props?.data
              ?.filter((f) => f.category === "smartphones")
              .map((item, index) => (
                <div className="hot-categories-content" key={index}>
                  <div className="hot-categories-content-img">
                    <img src={item.thumbnail} alt={item.thumbnail} />
                    <Link className="primary-btn " to={"/product"}>
                      Shop now
                    </Link>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCategories;
