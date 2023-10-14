import { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.svg";
// import Person from "./icon-person.svg";

function App() {
  const [money, setMoney] = useState("");
  const [tipp, setTipp] = useState("");
  const [num, setNum] = useState("");
  const [totalO, setTotalO] = useState("0.00"); //tip on one person
  const [tipT, setTipT] = useState("0.00"); //tip total
  const [error, setError] = useState(""); // Error message

  // Calculate results when money, tipp, or num change
  useEffect(() => {
    if (money && tipp && num && num !== "0") {
      const t = (Number(money) * Number(tipp)) / (100 * Number(num)).toFixed(2);
      const tt = (Number(money) / Number(num) + t).toFixed(2);
      setTotalO(t);
      setTipT(tt);
      setError(""); // Clear error message if valid input
    } else {
      setTotalO("0.00");
      setTipT("0.00");
      if (num === "0") {
        setError("Can't be zero");
      } else {
        setError("");
      }
    }
  }, [money, tipp, num]);

  const handleReset = () => {
    setMoney("");
    setTipp("");
    setNum("");
    setTotalO("0.00");
    setTipT("0.00");
    setError("");
  };
  return (
    <>
      <img src={logo} alt="logo" />
      {/* <p>
        {money} {tipp} {num}
      </p> */}
      <div className="main">
        <form className="form1">
          <label htmlFor="inp">
            Bill
            <input
              type="text"
              name="inp"
              id="inp"
              value={money}
              placeholder="0"
              onChange={(e) => setMoney(e.target.value)}
            />
          </label>

          <label htmlFor="buttons">
            Select Tip %
            <div id="buttons">
              <Tip tip={5} set={setTipp} />
              <Tip tip={10} set={setTipp} />
              <Tip tip={15} set={setTipp} />
              <Tip tip={25} set={setTipp} />
              <Tip tip={50} set={setTipp} />
              <Tip tip={75} set={setTipp} />
            </div>
          </label>

          <label htmlFor="ppl">
            <div className="lbl">
              Number of People
              {num === "0" && <span className="error-message">{error}</span>}
            </div>
            <input
              type="text"
              name="ppl"
              id="ppl"
              value={num}
              placeholder="0"
              onChange={(e) => setNum(e.target.value)}
              className={num === "0" ? "error" : ""}
            />
          </label>
        </form>

        <form className="form2">
          <div className="res">
            <div className="smth">
              Tip Amount <span>/ person</span>
            </div>
            <p>${totalO}</p>
          </div>

          <div className="res">
            <div className="smth">
              Total<span>/ person</span>
            </div>
            <p>${tipT}</p>
          </div>

          <button type="button" id="reset" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
    </>
  );
}

function Tip({ tip, set }) {
  return (
    <button type="button" id="tip-button" onClick={() => set(tip)}>
      {tip}%
    </button>
  );
}

export default App;
