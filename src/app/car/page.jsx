"use client";

import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        background: "green",
        right: "5%",
        zIndex: "1",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        background: "green",
        left: "5%",
        zIndex: "1",
        
      }}
      onClick={onClick}
    />
  );
}

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    // autoplay: true,
    // // speed: 2000,
    // autoplaySpeed: 200,
    // cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <section className="px-">
      <Slider {...settings}>
        <div className="w-full  h-[40em] bg-black">
          <div className="w-full h-[40em] bg-[#ffffff28] flex items-center justify-center">
            <h3 className="text-bold text-[45px]">First Slide</h3>
          </div>
        </div>
        <div className="w-full h-[40em] bg-[pink]">
          <h3>2</h3>
        </div>
        <div className="w-full  h-[40em] bg-[#9a4150]">
          <h3>3</h3>
        </div>
        <div className="w-full  h-[40em] bg-[#b60421]">
          <h3>4</h3>
        </div>
        <div className="w-full  h-[40em] bg-[#c6ffc0]">
          <h3>5</h3>
        </div>
        <div className="w-full  h-[40em] bg-[#1e4aa1]">
          <h3>6</h3>
        </div>
      </Slider>
    </section>
  );
}
