import React from 'react';
import styled from 'styled-components';

export default function HeroBackground() {
  return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 3000px;
  background: linear-gradient(180deg, #082444 6.33%, #082444 39.13%);
  text-align: center;
  overflow: hidden;
`;
