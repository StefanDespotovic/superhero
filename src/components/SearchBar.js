import React, { useState } from "react";

function SearchBar(props) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    props.onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
