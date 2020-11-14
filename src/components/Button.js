import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: inline-block;
  text-align: center;
  width: 100%;
  /* border: 1px dashed white; */
`;

const RoundButton = styled.button`
  /* background-color: rgba(254, 250, 170, 1); */
  background-color: rgb(255, 170, 100);
  color: white;
  height: 32px;
  width: 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  /* border-radius: 50%; */
  border: none;
  ${({ borderColor }) =>
    borderColor &&
    css`
      /* border: 3px solid ${borderColor}; */
      background-color: ${borderColor};
    `}
`;
const Label = styled.span`
  color: white;
`;

const Button = ({ label, borderColor, onClick }) => {
  return (
    <Container>
      <RoundButton onClick={onClick} borderColor={borderColor}></RoundButton>
      <br></br>
      {/* <Label>{label}</Label> */}
    </Container>
  );
};

export default Button;
