import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import {
  faBrain,
  faDumbbell,
  faTachometer,
  faShield,
  faBolt,
  faFistRaised,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      width: 15vw;
      margin-right: 1rem;
      object-fit: cover;
    }


  }`;
const HeroContainer = styled.div`
  div {
    background-color: gray;

    display: flex;
    align-items: flex-start;
    justify-content: center;
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
const Powerstat = styled.p`
  color: white;
`;

export default function DCHeroes() {
  const [heroes, setHeroes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchHeroes() {
      try {
        console.log("Fetching DC heroes...");
        const response = await fetch(
          "https://superheroapi.com/api.php/3368847760052098/search/harley"
        );
        const data = await response.json();
        console.log("DC heroes data:", data.results);
        setHeroes(data.results);
      } catch (error) {
        console.error("Error fetching DC heroes:", error);
      }
    }

    fetchHeroes();
  }, []);

  useEffect(() => {
    async function searchHero() {
      try {
        console.log("Searching for DC hero:", searchQuery);
        if (searchQuery === "") {
          setHeroes([]);
          setErrorMessage("");
          return;
        }
        const response = await fetch(
          `https://superheroapi.com/api.php/3368847760052098/search/${searchQuery}?publisher=DC%20Comics`
        );
        const data = await response.json();
        console.log("DC hero search result:", data.results);
        const filteredResults = data.results.filter(
          (hero) => hero.biography.publisher === "DC Comics"
        );
        if (filteredResults.length > 0) {
          setHeroes(filteredResults);
          setErrorMessage("");
        } else {
          setHeroes([]);
          setErrorMessage("Error: No results found for DC hero.");
        }
      } catch (error) {
        console.error("Error searching for DC hero:", error);
        setHeroes([]);
        setErrorMessage("Error: Something went wrong.");
      }
    }

    searchHero();
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  console.log("heroes:", heroes);

  return (
    <Container>
      <h1>DC Heroes</h1>
      <SearchBar onSearch={handleSearch} />
      {errorMessage !== "" && <p>{errorMessage}</p>}
      {heroes.map((hero) => (
        <HeroContainer key={hero.id}>
          <div>
            <img src={hero.image.url} alt={`${hero.name}`} />
            <HeroName>
              <h2>{hero.name}</h2>
              <Powerstat>
                <FontAwesomeIcon icon={faBrain} />
                {hero.powerstats.intelligence}
              </Powerstat>
              <Powerstat>
                <FontAwesomeIcon icon={faDumbbell} />
                {hero.powerstats.strength}
              </Powerstat>
              <Powerstat>
                <FontAwesomeIcon icon={faTachometer} />
                {hero.powerstats.speed}
              </Powerstat>
              <Powerstat>
                <FontAwesomeIcon icon={faShield} />
                {hero.powerstats.durability}
              </Powerstat>
              <Powerstat>
                <FontAwesomeIcon icon={faBolt} />
                {hero.powerstats.power}
              </Powerstat>
              <Powerstat>
                <FontAwesomeIcon icon={faFistRaised} />
                {hero.powerstats.combat}
              </Powerstat>
              <p>{hero.biography.publisher}</p>
            </HeroName>
          </div>
        </HeroContainer>
      ))}
    </Container>
  );
}
