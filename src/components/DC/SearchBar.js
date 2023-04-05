import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const SuggestionsList = styled.ul`
  width: 19vw;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0;
  margin: 0;
  list-style: none;
  max-height: 20vh;
  overflow-y: auto;
  position: absolute;
  top: 100%;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
`;

const SuggestionsWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Button = styled.button`
  background-color: gray;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
  }
`;

const SuggestionItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f4f4f4;
  }
`;
export default function SearchBar(props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [suggestionsRef]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(query);
  };

  const handleQueryChange = async (event) => {
    const query = event.target.value;
    setQuery(query);

    try {
      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(
        `https://superheroapi.com/api.php/3368847760052098/search/${encodedQuery}?publisher=DC%20Comics`
      );

      const data = await response.json();
      const filteredResults = data.results.filter(
        (hero) => hero.biography.publisher === "DC Comics"
      );
      const suggestions = filteredResults.map((hero) => ({
        name: hero.name,
        imageUrl: hero.image.url,
      }));
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error searching for DC hero:", error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    props.onSearch(suggestion.name);
  };

  return (
    <SearchBarWrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          id="search-input"
          type="text"
          value={query}
          onChange={handleQueryChange}
          name="search"
          autoComplete="off"
          placeholder="Search for DC Hero"
        />
        <Button type="submit">Submit</Button>
      </Form>
      <SuggestionsWrapper ref={suggestionsRef}>
        {suggestions.length > 0 && (
          <SuggestionsList>
            {suggestions.map((suggestion) => (
              <SuggestionItem
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={suggestion.imageUrl}
                    alt={suggestion.name}
                    style={{ width: "7vw", height: "15vh", marginRight: "1vw" }}
                  />
                  <p style={{ fontSize: "1vw" }}>{suggestion.name}</p>
                </div>
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )}
      </SuggestionsWrapper>
    </SearchBarWrapper>
  );
}
