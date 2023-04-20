import { useState, useEffect } from "react";
import Hero from "../Hero";
import SearchBar from "./SearchBar";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 1rem;
  }

  div {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;

export default function DCHeroes() {
  const [heroes, setHeroes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayData, setDisplayData] = useState("powerstats");

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
        <Hero
          key={hero.id}
          hero={hero}
          displayData={displayData}
          setDisplayData={setDisplayData}
        />
      ))}
    </Container>
  );
}
