import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import MainPage from "./components/MainPage/MainPage";
import MarvelHeroes from "./components/Marvel/MarvelHeroes";
import DCHeroes from "./components/DC/DCHeroes";
import styled from "styled-components";

const Nav = styled.nav`
  display: absolute;
  justify-content: space-between;
  align-items: center;
  background-color: #2b2b2b;
  color: white;
  padding: 1rem;
  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0.5rem 0;
  }

  @media (min-width: 768px) {
    ul {
      flex-direction: row;
    }

    li {
      margin: 0 0.5rem;
    }
  }
`;

const NavButton = styled.button`
  display: inline-block;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #333;
  color: white;
  padding: 1rem;
  z-index: 1;

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0.5rem 0;
  }

  @media (min-width: 768px) {
    position: static;
    background-color: transparent;
    color: white;
    padding: 0;

    ul {
      flex-direction: row;
    }

    li {
      margin: 0 0.5rem;
    }
  }
};`;

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <Router>
      <Nav>
        <NavButton onClick={handleToggleMenu}>
          <i className="fas fa-bars"></i>
        </NavButton>
        <NavMenu style={{ display: showMenu ? "none" : "block" }}>
          <ul>
            <li>
              <Link to="/Marvel" style={{ color: `white` }}>
                Marvel
              </Link>
            </li>
            <li>
              <Link to="/Dc" style={{ color: `white` }}>
                DC
              </Link>
            </li>
          </ul>
        </NavMenu>
      </Nav>
      <MainPage />
      <Routes>
        <Route path="/marvel" element={<MarvelHeroes type="marvel" />} />
        <Route path="/dc" element={<DCHeroes type="dc" />} />
      </Routes>
    </Router>
  );
}
