import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Powerstats from "./Buttons/Powerstats";
import Biography from "./Buttons/Biography";
import Appearance from "./Buttons/Appearance";
import Connections from "./Buttons/Connections";

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
      margin-right: 1rem;
      object-fit: cover;
      border-radius:10px;
      transition: transform 0.3s ease-in-out; 
      &:hover { transform: scale(1.02); }
    }


  }`;
const HeroContainer = styled.div`
  div {
    background-color: gray;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-radius: 10px;
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

export default function MarvelHeroes() {
  const [heroes, setHeroes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayData, setDisplayData] = useState("powerstats");

  useEffect(() => {
    async function fetchHeroes() {
      try {
        console.log("Fetching Marvel heroes...");
        const response = await fetch(
          "https://superheroapi.com/api.php/3368847760052098/search/ironman"
        );
        const data = await response.json();
        console.log("Marvel heroes data:", data.results);
        setHeroes(data.results);
      } catch (error) {
        console.error("Error fetching Marvel heroes:", error);
      }
    }

    fetchHeroes();
  }, []);

  useEffect(() => {
    async function searchHero() {
      try {
        console.log("Searching for Marvel hero:", searchQuery);
        if (searchQuery === "") {
          setHeroes([]);
          setErrorMessage("");
          return;
        }
        const response = await fetch(
          `https://superheroapi.com/api.php/3368847760052098/search/${searchQuery}?publisher=Marvel%20Comics`
        );
        const data = await response.json();
        console.log("Marvel hero search result:", data.results);
        const filteredResults = data.results.filter(
          (hero) => hero.biography.publisher === "Marvel Comics"
        );
        if (filteredResults.length > 0) {
          setHeroes(filteredResults);
          setErrorMessage("");
        } else {
          setHeroes([]);
          setErrorMessage("Error: No results found for Marvel hero.");
        }
      } catch (error) {
        console.error("Error searching for Marvel hero:", error);
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
      <h1>Marvel Heroes</h1>
      <SearchBar onSearch={handleSearch} />
      {errorMessage !== "" && <p>{errorMessage}</p>}
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
    </Container>
  );
}
