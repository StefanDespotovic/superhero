import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faDumbbell,
  faTachometer,
  faShield,
  faBolt,
  faFistRaised,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const PowerstatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Powerstat = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`;
export default function Powerstats({ hero }) {
  return (
    <PowerstatContainer>
      {Object.entries(hero.powerstats).map(([key, value]) => (
        <Powerstat key={key}>
          <Icon icon={faIcons(key)} />
          {value}
        </Powerstat>
      ))}
    </PowerstatContainer>
  );
}

function faIcons(key) {
  switch (key) {
    case "intelligence":
      return faBrain;
    case "strength":
      return faDumbbell;
    case "speed":
      return faTachometer;
    case "durability":
      return faShield;
    case "power":
      return faBolt;
    case "combat":
      return faFistRaised;
    default:
      return null;
  }
}
