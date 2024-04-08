import React, { useState } from "react";

function Tabs({ tabsData }) {
  const [index, setIndex] = useState(0);
  const tabBtns = ["Tab 1", "Tab 2", "Tab 3"];
  const activeTab = tabsData[index];
  return (
    <>
      <div className="btns">
        {tabBtns.map((btn, btnIndex) => {
          return (
            <button
              className={`btn ${index === btnIndex && "active-btn"}`}
              onClick={() => setIndex(btnIndex)}
              key={btnIndex}
            >
              {btn}
            </button>
          );
        })}
      </div>
      <div>
        <h1>{activeTab}</h1>
      </div>
    </>
  );
}

export default Tabs;
