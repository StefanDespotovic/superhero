import Powerstats from "./Buttons/Powerstats";
import Biography from "./Buttons/Biography";
import Appearance from "./Buttons/Appearance";
import Connections from "./Buttons/Connections";
import styled from "styled-components";

const HeroContainer = styled.div`
  div {
    background-color: gray;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-radius: 10px;
  }

  img {
    width: 23vw;
    margin-right: 1rem;
    object-fit: cover;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.02);
    }
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

export default function Hero({ hero, displayData, setDisplayData }) {
  return (
    <HeroContainer>
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
              <Powerstats hero={hero} />
            </div>
          )}
          {displayData === "biography" && <Biography hero={hero} />}
          {displayData === "appearance" && <Appearance hero={hero} />}
          {displayData === "connections" && <Connections hero={hero} />}
        </HeroName>
      </div>
    </HeroContainer>
  );
}
