import { useState } from "react";
import "./App.css";

const data = [
  { id: 1, title: "What is your name?", answer: "My name is syed asar aman" },
  { id: 2, title: "Where are you from?", answer: "I am from Pakistan" },
  { id: 3, title: "How old are you?", answer: "i am 24 years old" },
];

function App() {
  return (
    <div className="App">
      <h1>Basic accordian</h1>
      <div>
        {data.map((item) => (
          <Accordian key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default App;

type AccordianProps = {
  title: string;
  answer: string;
};

function Accordian({ title, answer }: AccordianProps) {
  const [showAccord, setShowAccord] = useState<boolean>(false);

  const toggleAccordian = () => {
    setShowAccord(!showAccord);
  };
  return (
    <div>
      <h3 onClick={toggleAccordian}>{title}</h3>
      {showAccord && <p>{answer}</p>}
    </div>
  );
}
