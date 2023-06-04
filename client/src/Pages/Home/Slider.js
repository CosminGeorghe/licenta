import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import "./Slider.css";
import { useState } from "react";
import { sliderItems } from "../../data";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    const numebrOfSlides = sliderItems.length - 1;
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : numebrOfSlides);
    } else if (direction === "right") {
      setSlideIndex(slideIndex < numebrOfSlides ? slideIndex + 1 : 0);
    }
  };
  console.log(`translate(${slideIndex} * -100vw)`);
  return (
    <div className="slider_container">
      <div
        className="slider_arrow slider_arrow_left"
        onClick={() => handleClick("left")}
      >
        <ArrowLeftOutlined />
      </div>
      <div
        className="slider_wrapper"
        style={{ transform: `translate(${slideIndex * -100}vw)` }}
      >
        {sliderItems.map((item) => (
          <div className="slider_slide" key={item.id}>
            <div className="slider_image_container"></div>
            <div
              className="slider_info_container"
              style={{
                backgroundImage: `url("${item.img}")`,
              }}
            >
              <h1 className="slider_title">{item.title}</h1>
              <p className="slider_description">{item.desc}</p>
              <button className="slider_button">SHOP NOW</button>
            </div>
          </div>
        ))}
      </div>
      <div
        className="slider_arrow slider_arrow_right"
        onClick={() => handleClick("right")}
      >
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;
