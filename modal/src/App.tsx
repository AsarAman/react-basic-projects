import { useState } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="App">
      <h1>Basic Modal component</h1>
      <button onClick={() => setShowModal(true)}>open modal</button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>This is modal data</h2>
            <button onClick={() => setShowModal(false)}>Close modal</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
