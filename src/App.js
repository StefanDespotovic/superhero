import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MarvelHeroes from "./components/MarvelHeroes";
import DCHeroes from "./components/DCHeroes";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/marvel">Marvel</Link>
            </li>
            <li>
              <Link to="/dc">DC</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/marvel" element={<MarvelHeroes type="marvel" />} />
          <Route path="/dc" element={<DCHeroes type="dc" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
