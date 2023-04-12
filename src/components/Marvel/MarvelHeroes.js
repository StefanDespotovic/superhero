import { useState, useEffect } from "react";
import Hero from "../Hero";
import SearchBar from "./SearchBar";

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
`;

// Define the hero groups
const heroGroups = [
  {
    name: "Avengers",
    logo: "/path/to/avengers-logo.png",
    description: "The Earth's Mightiest Heroes",
    query: "Avengers",
  },
  {
    name: "X-Men",
    logo: "/path/to/xmen-logo.png",
    description: "Mutants fighting for a world that hates and fears them",
    query: "X-Men",
  },
  // Add more hero groups as needed
];

export default function MarvelHeroes() {
  const [heroes, setHeroes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayData, setDisplayData] = useState("powerstats");

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

  const handleGroupClick = (query) => {
    setSearchQuery(query);
  };

  console.log("heroes:", heroes);

  return (
    <Container>
      <h1>Marvel Heroes</h1>
      <SearchBar onSearch={handleSearch} />
      {errorMessage !== "" && <p>{errorMessage}</p>}
      {/* Display the hero groups */}
      <div>
        {heroGroups.map((group) => (
          <div key={group.name} onClick={() => handleGroupClick(group.query)}>
            <img src={group.logo} alt={`${group.name} logo`} />
            <p>{group.name}</p>
          </div>
        ))}
      </div>
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
