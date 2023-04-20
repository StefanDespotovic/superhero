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
  align-items: flex-start;
  justify-content: space-between !important;
  min-width: 100%;
  width: 18vw;
  background-color: #bababa !important;
  padding-bottom: 0.7vh;
  padding-left: 1vh;
  padding-right: 1vh;
`;
const Label = styled.div`
  font-weight: bold;
  margin-right: 8px;
  background-color: #bababa !important;
`;

const Value = styled.div`
  background-color: #bababa !important;
  font-weight: normal;
`;
const Icon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`;

const powerstatInfo = {
  intelligence: {
    label: "Intelligence",
    icon: faBrain,
  },
  strength: {
    label: "Strength",
    icon: faDumbbell,
  },
  speed: {
    label: "Speed",
    icon: faTachometer,
  },
  durability: {
    label: "Durability",
    icon: faShield,
  },
  power: {
    label: "Power",
    icon: faBolt,
  },
  combat: {
    label: "Combat",
    icon: faFistRaised,
  },
};

export default function Powerstats({ hero }) {
  return (
    <PowerstatContainer>
      {Object.entries(hero.powerstats).map(([key, value]) => (
        <Powerstat key={key}>
          <Label>
            {" "}
            <Icon icon={powerstatInfo[key].icon} />
            {powerstatInfo[key].label}:
          </Label>
          <Value>{value}</Value>
        </Powerstat>
      ))}
    </PowerstatContainer>
  );
}
