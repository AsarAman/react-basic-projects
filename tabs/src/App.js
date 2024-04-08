import "./App.css";
import Tabs from "./Tabs";

function App() {
  const tabsData = ["content of tab 1", "content of tab 2", "content of tab 3"];

  return (
    <div className="App">
      <Tabs tabsData={tabsData} />
    </div>
  );
}

export default App;
