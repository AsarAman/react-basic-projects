import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [finalPassword, setFinalPassword] = useState("");
  const [upperCase, setUpperCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwordLength, setPasswordLength] = useState(8);
  const [copyMsg, setCopyMsg] = useState("");

  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "1234567890";
  const specialSymbols = "|{?><!#$%&()}";

  const generatePassword = () => {
    let password = "";
    const avalaibleChars =
      (upperCase ? upperCaseLetters : "") +
      (numbers ? nums : "") +
      (symbols ? specialSymbols : "") +
      lowerCase;

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * avalaibleChars.length);
      password += avalaibleChars[randomIndex];
    }

    setFinalPassword(password);
  };

  const copyToClipBoard = () => {
    if (finalPassword) {
      navigator.clipboard
        .writeText(finalPassword)
        .then(() => {
          setCopyMsg("Password Copied Successfully!");
        })
        .catch((err) => {
          setCopyMsg("Failed to Copy Password");
        });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopyMsg("");
    }, 4000);

    return () => clearTimeout(timer);
  },[copyMsg]);

  return (
    <div className="App">
      <h1>Password Gemerator</h1>
      <button onClick={copyToClipBoard}>Copy </button>
      <h2>{copyMsg}</h2>
      <div className="generate">
        <h3>password is {finalPassword} </h3>
        <div>
          <input
            onChange={() => setUpperCase(!upperCase)}
            checked={upperCase}
            type="checkbox"
            id="uppercase"
            name="uppercase"
          />
          <label htmlFor="uppercase">Include UpperCase</label>
          <input
            onChange={() => setNumbers(!numbers)}
            checked={numbers}
            type="checkbox"
            id="numbers"
            name="numbers"
          />
          <label htmlFor="numbers">Include Numbers</label>
          <input
            onChange={() => setSymbols(!symbols)}
            checked={symbols}
            type="checkbox"
            id="symbols"
            name="symbols"
          />
          <label htmlFor="symbols">Include Symbols</label>
          <input
            onChange={(e) => setPasswordLength(Number(e.target.value))}
            min={5}
            max={50}
            type="range"
            value={passwordLength}
            id="length"
            name="length"
          />
          <label htmlFor="length">Length {passwordLength}</label>
        </div>
        <button onClick={generatePassword}>Generate</button>
      </div>
    </div>
  );
}

export default App;
