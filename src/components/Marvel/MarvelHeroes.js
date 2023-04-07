import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import {
  faBrain,
  faDumbbell,
  faTachometer,
  faShield,
  faBolt,
  faFistRaised,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    img {
      width: 23vw;
      margin-right: 1rem;
      object-fit: cover;
      border-radius:10px;
      transition: transform 0.3s ease-in-out; 
      &:hover { transform: scale(1.02); }
    }


  }`;
const HeroContainer = styled.div`
  div {
    background-color: gray;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-radius: 10px;
  }
`;

const HeroName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 25vw;
  h2 {
    margin: 0;
  }
`;
const Powerstat = styled.p`
  color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-left: 1vw;
`;

const Button = styled.button`
  margin: 1%;
  padding: 10px;
  background-color: #ddd;
  color: #333;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;
const HeroInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const HeroInfoRow = styled.div`
  display: flex;
  padding-left: 5px;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  width: 24vw;
  background-color: lightblue !important;
`;
const HeroInfoLabel = styled.p`
  font-weight: bold;
  margin-right: 10px;
`;
const HeroInfoValue = styled.p`
  flex: 2;
  text-align: right;
  margin-right: 2px;
`;

export default function MarvelHeroes() {
  const [heroes, setHeroes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayData, setDisplayData] = useState("powerstats");

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

  console.log("heroes:", heroes);

  return (
    <Container>
      <h1>Marvel Heroes</h1>
      <SearchBar onSearch={handleSearch} />
      {errorMessage !== "" && <p>{errorMessage}</p>}
      {heroes.map((hero) => (
        <HeroContainer key={hero.id}>
          <div>
            <img src={hero.image.url} alt={`${hero.name}`} />
            <HeroName>
              <h2>{hero.name}</h2>
              <ButtonContainer>
                <Button onClick={() => setDisplayData("powerstats")}>
                  Powerstats
                </Button>
                <Button onClick={() => setDisplayData("biography")}>
                  Biography
                </Button>
                <Button onClick={() => setDisplayData("appearance")}>
                  Appearance
                </Button>
                <Button onClick={() => setDisplayData("connections")}>
                  Connections
                </Button>
              </ButtonContainer>
              {displayData === "powerstats" && (
                <div>
                  <Powerstat>
                    <FontAwesomeIcon icon={faBrain} />
                    {hero.powerstats.intelligence}
                  </Powerstat>
                  <Powerstat>
                    <FontAwesomeIcon icon={faDumbbell} />
                    {hero.powerstats.strength}
                  </Powerstat>
                  <Powerstat>
                    <FontAwesomeIcon icon={faTachometer} />
                    {hero.powerstats.speed}
                  </Powerstat>
                  <Powerstat>
                    <FontAwesomeIcon icon={faShield} />
                    {hero.powerstats.durability}
                  </Powerstat>
                  <Powerstat>
                    <FontAwesomeIcon icon={faBolt} />
                    {hero.powerstats.power}
                  </Powerstat>
                  <Powerstat>
                    <FontAwesomeIcon icon={faFistRaised} />
                    {hero.powerstats.combat}
                  </Powerstat>
                </div>
              )}
              {displayData === "biography" && (
                <HeroInfo>
                  <HeroInfoRow>
                    <HeroInfoLabel>Full Name:</HeroInfoLabel>
                    <HeroInfoValue>{hero.biography["full-name"]}</HeroInfoValue>
                  </HeroInfoRow>
                  <HeroInfoRow>
                    <HeroInfoLabel>Place of Birth:</HeroInfoLabel>
                    <HeroInfoValue>
                      {hero.biography["place-of-birth"]}
                    </HeroInfoValue>
                  </HeroInfoRow>
                  <HeroInfoRow>
                    <HeroInfoLabel>First Appearance:</HeroInfoLabel>
                    <HeroInfoValue>
                      {hero.biography["first-appearance"]}
                    </HeroInfoValue>
                  </HeroInfoRow>
                  <HeroInfoRow>
                    <HeroInfoLabel>Publisher:</HeroInfoLabel>
                    <HeroInfoValue>{hero.biography.publisher}</HeroInfoValue>
                  </HeroInfoRow>
                </HeroInfo>
              )}
              {displayData === "appearance" && (
                <HeroInfo>
                  <HeroInfoRow>
                    <HeroInfoLabel>Height:</HeroInfoLabel>
                    <HeroInfoValue>{hero.appearance.height[0]}</HeroInfoValue>
                  </HeroInfoRow>
                  <HeroInfoRow>
                    <HeroInfoLabel>Weight:</HeroInfoLabel>
                    <HeroInfoValue>{hero.appearance.weight[0]}</HeroInfoValue>
                  </HeroInfoRow>
                  <HeroInfoRow>
                    <HeroInfoLabel>Eye color:</HeroInfoLabel>
                    <HeroInfoValue>
                      {hero.appearance["hair-color"]}
                    </HeroInfoValue>
                  </HeroInfoRow>
                  <HeroInfoRow>
                    <HeroInfoLabel>Hair color:</HeroInfoLabel>
                    <HeroInfoValue>{hero.biography.publisher}</HeroInfoValue>
                  </HeroInfoRow>
                </HeroInfo>
              )}
              {displayData === "connections" && (
                <HeroInfo>
                  <HeroInfoRow>
                    <HeroInfoLabel>Group affiliation:</HeroInfoLabel>
                    <HeroInfoValue>
                      {hero.connections["group-affiliation"]}
                    </HeroInfoValue>
                  </HeroInfoRow>
                  <HeroInfoRow>
                    <HeroInfoLabel>Relatives:</HeroInfoLabel>
                    <HeroInfoValue>{hero.connections.relatives}</HeroInfoValue>
                  </HeroInfoRow>
                </HeroInfo>
              )}
            </HeroName>
          </div>
        </HeroContainer>
      ))}
    </Container>
  );
}
