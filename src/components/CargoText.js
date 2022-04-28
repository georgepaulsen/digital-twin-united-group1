import React from 'react';
import styled from 'styled-components';

export default function CargoText(props) {
  return (
    <Wrapper style={{ color: props.color }}>
      <Title> {props.id}</Title>
      <Description>{props.dimen}</Description>
      <Description>Weight: {props.weight} lb</Description>
      <Description>Volume: {props.volume.toFixed(2)} ft3</Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  text-align: center;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
`;

const Description = styled.p`
  max-width: 240px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 1);
`;
