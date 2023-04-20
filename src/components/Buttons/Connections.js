import React from "react";
import styled from "styled-components";

const HeroInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroInfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between !important;
  margin-bottom: 8px;
  min-width: 100%;
  width: 19vw;
  background-color: #bababa !important;
  padding-bottom: 1vh;
  padding-left: 1vh;
  padding-right: 1vh;
`;
const HeroInfoLabel = styled.div`
  font-weight: bold;
  margin-right: 8px;
  background-color: #bababa !important;
`;

const HeroInfoValue = styled.div`
  background-color: #bababa !important;
  font-weight: normal;
`;

export default function Connections({ hero }) {
  return (
    <HeroInfo>
      <HeroInfoRow>
        <HeroInfoLabel>Group affiliation:</HeroInfoLabel>
        <HeroInfoValue>
          {hero.connections["group-affiliation"].slice(0, 180)}
        </HeroInfoValue>
      </HeroInfoRow>
      <HeroInfoRow>
        <HeroInfoLabel>Relatives:</HeroInfoLabel>
        <HeroInfoValue>
          {hero.connections.relatives.slice(0, 170)}
        </HeroInfoValue>
      </HeroInfoRow>
    </HeroInfo>
  );
}
