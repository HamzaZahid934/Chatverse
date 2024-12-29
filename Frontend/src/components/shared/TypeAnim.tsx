import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypeAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Powered by AI, tailored for you.",
        1000,
        "Need help? Just type it out!",
        2000,
        "Transforming ideas into conversations.",
        1000,
        "Your personal assistant, 24/7.",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "70px",
        color: "white",
        display: "inline-block",
        textShadow: "2px 2px 4px #000000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypeAnim;
