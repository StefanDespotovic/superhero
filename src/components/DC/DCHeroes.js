import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

export default function DCHeroes() {
  const [heroes, setHeroes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchHeroes() {
      try {
        console.log("Fetching DC heroes...");
        const response = await fetch(
          "https://superheroapi.com/api.php/3368847760052098/search/batman"
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
          searchHero();
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
    <div>
      <h1>DC Heroes</h1>
      <SearchBar onSearch={handleSearch} />
      {errorMessage !== "" && <p>{errorMessage}</p>}
      {heroes.map((hero) => (
        <div key={hero.id}>
          <h2>{hero.name}</h2>
          <img src={hero.image.url} alt={`${hero.name}`} />
          <p>{hero.biography.publisher}</p>
        </div>
      ))}
    </div>
  );
}
