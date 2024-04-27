import React from "react";
import Slider from "react-slick";
import tempImg from "../Assets/Images/imagePlaceholder1.png";
import { Link } from "react-router-dom";

const HeroBanner = (props) => {
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    className: "myCustomCarousel",
  };
  return (
    <section className="hero-banner">
      <div className="hero-banner-slider">
        <Slider {...settings}>
          {props?.data?.length > 0 &&
            props?.data
              ?.filter((f) => f.category === "laptops")
              .map((item, index) => index < 4 && (
                <div key={index} className="hero-banner-content">
                  <div className="container inner-content">
                    <div className="dashboard-image-bg">
                      <img className="sliderbg-img" src={item.thumbnail} />
                    </div>
                    <div className="dashboard-content">
                      <h2>UP TO {item.discountPercentage}% DISCOUNT</h2>
                      <h1>{item.title}</h1>
                      <p>{item.description}</p>
                      <Link className="primary-btn " to={"/product"}>
                        Shop now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </Slider>
      </div>
    </section>
  );
};

export default HeroBanner;
