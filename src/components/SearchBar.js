import { useState } from "react";

function SearchBar(props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(query);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
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
    </div>
  );
}

export default SearchBar;
