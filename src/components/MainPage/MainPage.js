import { useState, useEffect, useRef } from "react";
import Powerstats from "../Buttons/Powerstats";
import Biography from "../Buttons/Biography";
import Appearance from "../Buttons/Appearance";
import Connections from "../Buttons/Connections";
import ButtonContainer from "../Buttons/ButtonContainer";

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
const HeroesContainer2 = styled.div`
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

export default function MainPage() {
  const marvelHeroesContainerRef = useRef(null);
  const dcHeroesContainerRef = useRef(null);
  const [marvelHeroes, setMarvelHeroes] = useState([]);
  const [dcHeroes, setDCHeroes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayData, setDisplayData] = useState("powerstats");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    async function fetchMarvelHeroes() {
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
        setMarvelHeroes(fetchedHeroes);
      } catch (error) {
        console.error("Error fetching heroes:", error);
        setErrorMessage("Failed to fetch heroes");
      }
    }

    async function fetchDCHeroes() {
      try {
        const heroNames = [
          "batman",
          "superman",
          "wonder woman",
          "flash",
          "green",
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
        setDCHeroes(fetchedHeroes);
      } catch (error) {
        console.error("Error fetching heroes:", error);
        setErrorMessage("Failed to fetch heroes");
      }
    }

    fetchMarvelHeroes();
    fetchDCHeroes();
  }, []);

  const handleMouseMove = (event) => {
    if (isDragging) {
      const container = marvelHeroesContainerRef.current;
      if (container) {
        container.scrollLeft -= event.movementX;
        container.scrollTop -= event.movementY;
      }
    }
  };
  const handleMouseMove2 = (event) => {
    if (isDragging) {
      const container = dcHeroesContainerRef.current;
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
        ref={marvelHeroesContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {marvelHeroes.map((hero) => (
          <HeroContainer key={hero.id}>
            <div>
              <img src={hero.image.url} alt={`${hero.name}`} />
              <HeroName>
                <h2>{hero.name.toUpperCase()}</h2>
                <ButtonContainer
                  setDisplayData={setDisplayData}
                ></ButtonContainer>
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
      <h1>DC Heroes</h1>
      {errorMessage !== "" && <p>{errorMessage}</p>}
      <HeroesContainer2
        ref={dcHeroesContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove2}
      >
        {dcHeroes.map((hero) => (
          <HeroContainer key={hero.id}>
            <div>
              <img src={hero.image.url} alt={`${hero.name}`} />
              <HeroName>
                <h2>{hero.name.toUpperCase()}</h2>
                <ButtonContainer
                  setDisplayData={setDisplayData}
                ></ButtonContainer>
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
      </HeroesContainer2>
    </Container>
  );
}
