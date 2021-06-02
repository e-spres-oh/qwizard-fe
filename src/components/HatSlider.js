import React, { useCallback, useRef, useEffect } from "react";
import { HATS } from "../utils/request";
import styles from "./HatSlider.module.css";
import Slider from "react-slick";
import Hat from "./Hat";

const HatSlider = ({ selectedHat, onHatSelected }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    speed: 250,
    adaptiveHeight: true,
    adaptiveWidth: true,
    afterChange: (hat) => onHatSelected(hat),
  };

  const slickRef = useRef(null);
  const onMount = useCallback(async () => {
    const hatNumber = HATS[selectedHat];
    if (hatNumber) {
      const hatIndex = parseInt(hatNumber) - 1;
      slickRef.current.slickGoTo(hatIndex);
    }
  }, [selectedHat]);
  useEffect(() => onMount(), [onMount, selectedHat]);

  return (
    <>
      <div className={styles.sliderContainer}>
        <Slider {...settings} ref={slickRef}>
          <div className={styles.image}>
            <Hat hat="star" imageStyle={styles.slideImage} />
          </div>
          <div className={styles.image}>
            <Hat hat="earth" imageStyle={styles.slideImage} />
          </div>
          <div className={styles.image}>
            <Hat hat="spiral" imageStyle={styles.slideImage} />
          </div>
          <div className={styles.image}>
            <Hat hat="gnome" imageStyle={styles.slideImage} />
          </div>
          <div className={styles.image}>
            <Hat hat="nature" imageStyle={styles.slideImage} />
          </div>
          <div className={styles.image}>
            <Hat hat="fire" imageStyle={styles.slideImage} />
          </div>
          <div className={styles.image}>
            <Hat hat="swamp" imageStyle={styles.slideImage} />
          </div>
          <div className={styles.image}>
            <Hat hat="water" imageStyle={styles.slideImage} />
          </div>
        </Slider>
      </div>
      <div className={styles.caption}>Select your wizard hat</div>
    </>
  );
};

export default HatSlider;
