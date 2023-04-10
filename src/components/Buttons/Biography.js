import styled from "styled-components";

const BiographyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BiographyRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const BiographyLabel = styled.div`
  font-weight: bold;
  margin-right: 8px;
`;

const BiographyValue = styled.div`
  font-weight: normal;
`;

export default function Biography({ hero }) {
  return (
    <BiographyContainer>
      <BiographyRow>
        <BiographyLabel>Full Name:</BiographyLabel>
        <BiographyValue>{hero.biography["full-name"]}</BiographyValue>
      </BiographyRow>
      <BiographyRow>
        <BiographyLabel>Place of Birth:</BiographyLabel>
        <BiographyValue>{hero.biography["place-of-birth"]}</BiographyValue>
      </BiographyRow>
      <BiographyRow>
        <BiographyLabel>First Appearance:</BiographyLabel>
        <BiographyValue>{hero.biography["first-appearance"]}</BiographyValue>
      </BiographyRow>
      <BiographyRow>
        <BiographyLabel>Publisher:</BiographyLabel>
        <BiographyValue>{hero.biography.publisher}</BiographyValue>
      </BiographyRow>
    </BiographyContainer>
  );
}
