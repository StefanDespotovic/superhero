import React from "react";
import styled from "styled-components";

const ButtonContainer2 = styled.div`
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
export default function ButtonContainer(props) {
  return (
    <ButtonContainer2>
      <Button onClick={() => props.setDisplayData("powerstats")}>
        Powerstats
      </Button>
      <Button onClick={() => props.setDisplayData("biography")}>
        Biography
      </Button>
      <Button onClick={() => props.setDisplayData("appearance")}>
        Appearance
      </Button>
      <Button onClick={() => props.setDisplayData("connections")}>
        Connections
      </Button>
    </ButtonContainer2>
  );
}
