import logo from "./logo.svg";
import "./App.css";
import Getmethod from "./product";
import Createform from "./create_product";
import "./form.css";
import Welcome from "./welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/product" element={<Getmethod />} />
          <Route path="/create_product" element={<Createform />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

