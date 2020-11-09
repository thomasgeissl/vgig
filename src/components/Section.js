import React from "react";
import styled, { css } from "styled-components";
import CloseIcon from "@material-ui/icons/Close";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  ${(props) =>
    props.color &&
    css`
      border-bottom: 3px solid ${props.color};
      border-left: 1px solid white;
      border-right: 1px solid white;
    `}
`;
const Title = styled.div`
  width: 100%;
  text-transform: uppercase;
  color: white;
  text-align: center;
  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
`;
const Content = styled.div`
  flex-grow: 1;
`;

export default ({ title, color, children, onClose }) => {
  return (
    <Container color={color}>
      <Title color={color}>{title}</Title>
      <Content>{children}</Content>
      {onClose && (
        <CloseIcon
          color={"white"}
          onClick={onClose}
          style={{ position: "absolute", left: "5px" }}
        ></CloseIcon>
      )}
    </Container>
  );
};
