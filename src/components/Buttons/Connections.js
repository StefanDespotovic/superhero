import React from "react";
import styled from "styled-components";

const HeroInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroInfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const HeroInfoLabel = styled.div`
  font-weight: bold;
  margin-right: 8px;
`;

const HeroInfoValue = styled.div``;

export default function Connections({ hero }) {
  return (
    <HeroInfo>
      <HeroInfoRow>
        <HeroInfoLabel>Group affiliation:</HeroInfoLabel>
        <HeroInfoValue>{hero.connections["group-affiliation"]}</HeroInfoValue>
      </HeroInfoRow>
      <HeroInfoRow>
        <HeroInfoLabel>Relatives:</HeroInfoLabel>
        <HeroInfoValue>{hero.connections.relatives}</HeroInfoValue>
      </HeroInfoRow>
    </HeroInfo>
  );
}
