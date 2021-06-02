import React from "react";
import ReactSlider from "react-slider";
import styles from "./Slider.module.css";

const Slider = ({ label, onChange, value, min, max }) => {
  return (
    <div className={styles.slider}>
      <label className={styles.label}>{label}</label>
      <ReactSlider
        value={value}
        onAfterChange={onChange}
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        min={min}
        max={max}
        renderThumb={(props, state) => (
          <div className={"thumb"} {...props}>
            <span className={"slider-value"}>{state.valueNow}</span>
          </div>
        )}
      />
    </div>
  );
};

export default Slider;
