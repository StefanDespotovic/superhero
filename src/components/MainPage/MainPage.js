import { useState, useEffect, useRef } from "react";
import Powerstats from "../Buttons/Powerstats";
import Biography from "../Buttons/Biography";
import Appearance from "../Buttons/Appearance";
import Connections from "../Buttons/Connections";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h1 {
    margin-top: 1rem;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
  }

  img {
    width: 23vw;
    margin-right: -0.5vw !important;
    object-fit: cover;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.02);
    }
    user-select: none;
    user-drag: none;
    -webkit-user-drag: none;
  }
`;

const HeroContainer = styled.div`
  div {
    margin-left: 1vw;
    background-color: gray;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-radius: 10px;
  }
`;
const HeroesContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: hidden;
  user-select: none;

  & > div:first-child {
    margin-left: 154vw;
  }
`;

const HeroName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 25vw;
  h2 {
    margin: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-left: 1vw;
`;

const Button = styled.button`
  margin: 1%;
  padding: 10px;
  background-color: #ddd;
  color: #333;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

export default function MainPage() {
  const heroesContainerRef = useRef(null);
  const [heroes, setHeroes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayData, setDisplayData] = useState("powerstats");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const heroNames = [
          "iron man",
          "scarlet witch",
          "spider-man",
          "black widow",
          "hulk",
        ];
        const fetchedHeroes = [];
        for (const name of heroNames) {
          const response = await fetch(
            `https://superheroapi.com/api.php/3368847760052098/search/${name}`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            fetchedHeroes.push(data.results[0]);
          }
        }
        setHeroes(fetchedHeroes);
      } catch (error) {
        console.error("Error fetching heroes:", error);
        setErrorMessage("Failed to fetch heroes");
      }
    }

    fetchHeroes();
  }, []);
  const handleMouseMove = (event) => {
    if (isDragging) {
      const container = heroesContainerRef.current;
      if (container) {
        container.scrollLeft -= event.movementX;
        container.scrollTop -= event.movementY;
      }
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <Container>
      <h1>Marvel Heroes</h1>
      {errorMessage !== "" && <p>{errorMessage}</p>}
      <HeroesContainer
        ref={heroesContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {heroes.map((hero) => (
          <HeroContainer key={hero.id}>
            <div>
              <img src={hero.image.url} alt={`${hero.name}`} />
              <HeroName>
                <h2>{hero.name}</h2>
                <ButtonContainer>
                  <Button onClick={() => setDisplayData("powerstats")}>
                    Powerstats
                  </Button>
                  <Button onClick={() => setDisplayData("biography")}>
                    Biography
                  </Button>
                  <Button onClick={() => setDisplayData("appearance")}>
                    Appearance
                  </Button>
                  <Button onClick={() => setDisplayData("connections")}>
                    Connections
                  </Button>
                </ButtonContainer>
                {displayData === "powerstats" && (
                  <div>
                    <Powerstats hero={hero} />
                  </div>
                )}
                {displayData === "biography" && <Biography hero={hero} />}
                {displayData === "appearance" && <Appearance hero={hero} />}
                {displayData === "connections" && <Connections hero={hero} />}
              </HeroName>
            </div>
          </HeroContainer>
        ))}
      </HeroesContainer>
    </Container>
  );
}
