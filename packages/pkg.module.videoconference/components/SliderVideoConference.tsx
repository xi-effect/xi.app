/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';

export function SliderVideoConference() {
  const settings = {
    dots: true,
    slidesToShow: 2,
    infinite: false,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h2>Hello 1</h2>
        </div>
        <div>
          <h2>Hello 2</h2>
        </div>
        <div>
          <h2>Hello 3</h2>
        </div>
        <div>
          <h2>Hello 4</h2>
        </div>
      </Slider>
    </div>
  );
}
