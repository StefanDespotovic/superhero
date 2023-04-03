import { useState } from "react";
import styled from "styled-components";

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  margin-right: 10px;
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
`;

const SuggestionsList = styled.ul`
  width: 30vw;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0;
  margin: 0;
  list-style: none;
  max-height: 20vh;
  overflow-y: auto;
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

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(query);
  };

  const handleQueryChange = async (event) => {
    const query = event.target.value;
    setQuery(query);

    try {
      const response = await fetch(
        `https://superheroapi.com/api.php/3368847760052098/search/${query}?publisher=Marvel%20Comics`
      );
      const data = await response.json();
      const filteredResults = data.results.filter(
        (hero) => hero.biography.publisher === "Marvel Comics"
      );
      const suggestions = filteredResults.map((hero) => ({
        name: hero.name,
        imageUrl: hero.image.url,
      }));
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error searching for Marvel hero:", error);
      setSuggestions([]);
    }
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <SuggestionsWrapper>
        <SuggestionsList>
          {suggestions.map((suggestion) => (
            <SuggestionItem
              key={suggestion.name}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <img src={suggestion.imageUrl} alt={suggestion.name} />
              <span>{suggestion.name}</span>
            </SuggestionItem>
          ))}
        </SuggestionsList>
      </SuggestionsWrapper>
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    props.onSearch(suggestion.name);
  };

  return (
    <SearchBarWrapper>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="search-input">Search:</Label>
        <Input
          id="search-input"
          type="text"
          value={query}
          onChange={handleQueryChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion) => (
            <SuggestionItem
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <img
                src={suggestion.imageUrl}
                alt={suggestion.name}
                style={{ width: "5vw" }}
              />
              {suggestion.name}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </SearchBarWrapper>
  );
}
