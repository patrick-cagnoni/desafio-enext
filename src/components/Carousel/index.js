import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel as ReactCarousel } from "react-responsive-carousel";

const Carousel = props => {
  const { images, onImageChange, imageIndex } = props;
  return (
    <ReactCarousel
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      onChange={index => {
        onImageChange(index);
      }}
      selectedItem={imageIndex}
    >
      {images.map(img => (
        <div key={img}>
          <img src={img} alt={img} />
        </div>
      ))}
    </ReactCarousel>
  );
};

export default Carousel;
