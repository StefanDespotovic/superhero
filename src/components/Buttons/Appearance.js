import styled from "styled-components";

const AppearanceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppearanceRow = styled.div`
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
const Label = styled.div`
  font-weight: bold;
  margin-right: 8px;
  background-color: #bababa !important;
`;

const Value = styled.div`
  background-color: #bababa !important;
  font-weight: normal;
  word-wrap: break-word;
`;

export default function Appearance({ hero }) {
  return (
    <AppearanceContainer>
      <AppearanceRow>
        <Label>Height:</Label>
        <Value>{hero.appearance.height[0]}</Value>
      </AppearanceRow>
      <AppearanceRow>
        <Label>Weight:</Label>
        <Value>{hero.appearance.weight[0]}</Value>
      </AppearanceRow>
      <AppearanceRow>
        <Label>Eye color:</Label>
        <Value>{hero.appearance["hair-color"]}</Value>
      </AppearanceRow>
      <AppearanceRow>
        <Label>Hair color:</Label>
        <Value>{hero.appearance["hair-color"]}</Value>
      </AppearanceRow>
    </AppearanceContainer>
  );
}
