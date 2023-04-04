import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";

const Container = styled.div`
  display: absolute;
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
      width: 20vw;
      margin-right: 1rem;
      object-fit: cover;
    }

    h2 {
      margin: 0;
    }

    p {
      margin: 0;
    }
  }`;
const HeroContainer = styled.div`
  div {
    background-color: gray;
    width: 45vw;
  }
`;
const HeroName = styled.div`
  div {
  }
`;

export default function MarvelHeroes() {
  const [heroes, setHeroes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
          searchHero();
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
        <HeroContainer>
          <div key={hero.id}>
            <img src={hero.image.url} alt={`${hero.name}`} />
            <HeroName>
              <h2>{hero.name}</h2>
              <p>{hero.biography.publisher}</p>
            </HeroName>
          </div>
        </HeroContainer>
      ))}
    </Container>
  );
}
