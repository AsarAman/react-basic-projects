import React, { useState } from "react";

import "./App.css";

type SlideType = {
  title: string;
  description: string;
};

function App() {
  const [index, setIndex] = useState<number>(0);


  //slides data
  const sliderData: SlideType[] = [
    {
      title: "Slider 1",
      description: "Hello from slider 1",
    },
    {
      title: "Slider 2",
      description: "Hello from slider 2",
    },
    {
      title: "Slider 3",
      description: "Hello from slider 3",
    },
  ];

  //currently active slide

  const activeSlide = sliderData[index];

  //going to next slide
  const nextSlide = () => {
    if (index >= sliderData.length - 1) {
      return setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  //going to prevslide
  const prevslide = () => {
    if (index < 1) {
      setIndex(sliderData.length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  };
  return (
    <div className="App">
      <h1>Basic Slider</h1>
      <div className="content">
        <h2>{activeSlide.title}</h2>
        <p>{activeSlide.description}</p>
      </div>
      <div className="btns">
        <button onClick={prevslide}>Prev</button>
        <button onClick={nextSlide}>next</button>
      </div>
    </div>
  );
}

export default App;
