import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const BrandSlider = (props) => {
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    let tempArray = [];
    props?.data?.forEach((element) => {
      if (element?.brand) {
        tempArray.push(element?.brand);
      }
    });
    let final = [...new Set(tempArray)];
    setBrandList(final);
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    slidesToShow: 6,
    speed: 8000,
    pauseOnHover: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="branding-client-logo">
      <div className="branding-logos slider">
        <Slider {...settings}>
          {brandList?.map((itemb, indexb) => (
            <div key={indexb}>
              <div className="slide-brand">{itemb}</div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BrandSlider;
