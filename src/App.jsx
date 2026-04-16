import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./Routes/AppRoutes";
import { useState } from "react";
import "./index.css"

function App() {
   const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
    <div className={theme === "dark" ? "dark-mode" : "light-mode"}>
      <Navbar toggleTheme={toggleTheme} />
      <AppRoutes />
    </div>
      
    </BrowserRouter>
  );
}

export default App;