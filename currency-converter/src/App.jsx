import { useState } from "react";
import "./App.css";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Footer from "./pages/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
