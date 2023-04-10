import styled from "styled-components";

const AppearanceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppearanceRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Label = styled.div`
  font-weight: bold;
  margin-right: 8px;
`;

const Value = styled.div`
  font-weight: normal;
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
