import { useState } from "react";
export default function SearchBar(props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(query);
  };

  const handleQueryChange = async (event) => {
    const query = event.target.value;
    setQuery(query);

    try {
      const response = await fetch(
        `https://superheroapi.com/api.php/3368847760052098/search/${query}?publisher=DC%20Comics`
      );
      const data = await response.json();
      const filteredResults = data.results.filter(
        (hero) => hero.biography.publisher === "DC Comics"
      );
      const suggestions = filteredResults.map((hero) => hero.name);
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error searching for DC hero:", error);
      setSuggestions([]);
    }
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    props.onSearch(suggestion);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-input">Search:</label>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={handleQueryChange}
        />
        <button type="submit">Submit</button>
      </form>
      {suggestions.length > 0 && (
        <div>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
