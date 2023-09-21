import { useEffect, useState } from "react";
import "./style.css";

const url_symbols =
  "https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "970d4e8724msh0af10a4207e09adp16f8f4jsn0aa601995d22",
    "X-RapidAPI-Host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
  },
};

const options_converter = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "970d4e8724msh0af10a4207e09adp16f8f4jsn0aa601995d22",
    "X-RapidAPI-Host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
  },
};

function MainComponent() {
  const [currentValue, setCurrentValue] = useState();
  const [currentCurrency, setCurrentCurrency] = useState();
  const [outputCurrency, setOutputCurrency] = useState();
  const [resultVisible, setResultVisible] = useState(false);
  const [adviceVisible, setAdviceVisible] = useState(false);
  const [codeSymbol, setCodeSymbol] = useState([]);
  const [totalAmount, setTotalAmount] = useState();

  const fetchAPI = async () => {
    try {
      const response = await fetch(url_symbols, options);
      const result = await response.json();
      const data = result.symbols;
      const arraySimbolos = [];
      for (const clave in data) {
        if (data.hasOwnProperty(clave)) {
          const nuevoObjeto = {
            clave: clave,
            valor: data[clave],
          };
          arraySimbolos.push(nuevoObjeto);
        }
      }
      //Ordenamos alfabeticamente los simbolos que hemos obtenido
      arraySimbolos.sort((a, b) => a.clave.localeCompare(b.clave));

      setCodeSymbol(arraySimbolos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async () => {
    try {
      const response = await fetch(
        `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${currentCurrency}&to=${outputCurrency}&amount=${currentValue}`,
        options_converter
      );
      const result = await response.json();

      setTotalAmount((Math.round(result.result * 100) / 100).toFixed(2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSwitchCurrency = () => {
    setCurrentCurrency(outputCurrency);
    setOutputCurrency(currentCurrency);
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

    if (currentValue && currentCurrency && outputCurrency) {
      handleChange();
      setAdviceVisible(false);
      setResultVisible(true);
    } else {
      setAdviceVisible(true);
      console.log("Te faltan cosas manin");
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="Main">
      <div className="container">
        <div id="headerContainer">
          <img src={`CurrencyIcon_3.svg`} alt="Imagen de la aplicación" />
          <h2>CurrencyConverter</h2>
        </div>
        <form onSubmit={buttonHandler}>
          <div id="currencyInput">
            <div id="currencyContainer">
              <label htmlFor="currency">Cantidad</label>
              <input
                id="currency"
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
                    <option
                      value={`${s.clave}`}
                      key={id}
                    >{`${s.clave}`}</option>
                  );
                })}
              </select>
              {resultVisible && (
                <button onClick={handleSwitchCurrency} id="buttonExchange">
                  <img src="/icons/exchange.svg" alt="" />
                </button>
              )}

              <select
                value={outputCurrency}
                onChange={handleDropdownMenuOutput}
                required
              >
                <option value=""></option>
                {codeSymbol.map((s, id) => {
                  return (
                    <option
                      value={`${s.clave}`}
                      key={id}
                    >{`${s.clave}`}</option>
                  );
                })}
              </select>
            </div>
          </div>

          <div id="buttonCalculate">
            <button type="submit">Calcular</button>
          </div>
        </form>

        <div className={`result ${resultVisible ? "visible" : ""}`}>
          <h3>{`${currentValue} ${currentCurrency} = ${totalAmount} ${outputCurrency}`}</h3>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
