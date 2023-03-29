import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

function MarvelHeroes(props) {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    console.log("Fetching Marvel heroes...");
    fetch(
      `https://superheroapi.com/api/${process.env.REACT_APP_SUPERHERO_API_KEY}/characters?publisher=Marvel`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Marvel heroes data:", data);
        setHeroes(data);
      });
  }, []);

  return (
    <div>
      <h1>Marvel Heroes</h1>
      <SearchBar
        onSearch={(query) => {
          console.log("Searching for Marvel hero:", query);
          fetch(
            `https://superheroapi.com/api/${process.env.REACT_APP_SUPERHERO_API_KEY}/characters?publisher=Marvel&name=${query}`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("Marvel hero search result:", data);
              setHeroes(data);
            });
        }}
      />
      {heroes.map((hero) => (
        <div key={hero.id}>
          <h2>{hero.name}</h2>
          <p>{hero.description}</p>
          <p>{hero.publisher}</p>
        </div>
      ))}
    </div>
  );
}

export default MarvelHeroes;
