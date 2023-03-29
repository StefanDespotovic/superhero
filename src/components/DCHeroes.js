import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

function DCHeroes(props) {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SUPERHERO_API_KEY}/characters?publisher=DC%20Comics`
    )
      .then((response) => response.json())
      .then((data) => setHeroes(data));
  }, []);

  return (
    <div>
      <h1>DC Heroes</h1>
      <SearchBar
        onSearch={(query) => {
          fetch(
            `${process.env.REACT_APP_SUPERHERO_API_KEY}/characters?publisher=Marvel&name=${query}`
          )
            .then((response) => response.json())
            .then((data) => setHeroes(data));
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

export default DCHeroes;
