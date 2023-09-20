import { useEffect, useState } from "react";
import "./style.css";

function MainComponent() {
  const [currentValue, setCurrentValue] = useState();
  const [currentCurrency, setCurrentCurrency] = useState();
  const [outputCurrency, setOutputCurrency] = useState();
  const [resultVisible, setResultVisible] = useState(false);
  const [codeSymbol, setCodeSymbol] = useState([]);
  const [totalAmount, setTotalAmount] = useState();

  let objectEntries;

  const fetchAPI = async () => {
    try {
      const resp = await fetch("https://api.exchangerate.host/symbols");
      const data = await resp.json();
      const objectValuesArray = Object.values(data.symbols);
      setCodeSymbol(objectValuesArray);
    } catch (error) {
      console.log("Ha ocurrido un error. ", error.message);
    }
  };

  const handleChange = async () => {
    const resp = await fetch(
      `https://api.exchangerate.host/convert?from=${currentCurrency}&to=${outputCurrency}`
    );
    const data = await resp.json();

    setTotalAmount(
      (Math.round(data.result * currentValue * 100) / 100).toFixed(2)
    );
  };

  const handleCurrentChange = (e) => {
    const inputValue = e.target.value;
    // Utiliza una expresión regular para permitir solo números y el carácter "." para decimales
    const numericValue = inputValue.replace(/[^0-9.]/g, "");

    setCurrentValue(numericValue);
    setResultVisible(false);
  };

  const handleDropdownMenuCurrent = (e) => {
    setCurrentCurrency(e.target.value);
    setResultVisible(false);
  };

  const handleDropdownMenuOutput = (e) => {
    setOutputCurrency(e.target.value);
    setResultVisible(false);
  };

  const buttonHandler = (e) => {
    e.preventDefault();
    handleChange();
    setResultVisible(true);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="Main">
      <div className="container">
        <div id="headerContainer">
          <img src={`CurrencyIcon.svg`} alt="Imagen de la aplicación" />
          <h2>CurrencyConverter</h2>
        </div>
        <div id="currencyInput">
          <div id="currencyContainer">
            <h2>Cantidad</h2>
            <input
              type="text"
              value={currentValue}
              style={{ textAlign: "center", fontSize: "1.4rem" }}
              onChange={handleCurrentChange}
              placeholder="Introduce cantidad"
              required
            />
          </div>

          <div id="selectCurrencyContainer">
            <select
              value={currentCurrency}
              onChange={handleDropdownMenuCurrent}
              required
            >
              <option value=""></option>
              {codeSymbol.map((s, id) => {
                return (
                  <option value={`${s.code}`} key={id}>{`${s.code}`}</option>
                );
              })}
            </select>
            <select value={outputCurrency} onChange={handleDropdownMenuOutput} required>
              <option value=""></option>
              {codeSymbol.map((s, id) => {
                return (
                  <option value={`${s.code}`} key={id}>{`${s.code}`}</option>
                );
              })}
            </select>
          </div>
        </div>

        <div id="buttonCalculate">
          <button onClick={buttonHandler}>Calcular</button>
        </div>

        <div className={`result ${resultVisible ? "visible" : ""}`}>
          <h3>{`${currentValue} ${currentCurrency} = ${totalAmount} ${outputCurrency}`}</h3>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
