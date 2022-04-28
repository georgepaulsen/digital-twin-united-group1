import styled from 'styled-components';
import Background from './Background';
import UALogo from '../images/UALogo.jpg';

export default function TextIndex() {
  return (
    <Wrapper>
      <img src={UALogo} alt="757model" width="100%" height="200px" />
      <Title>Digital Twin</Title>
      <Description>For United Load Planner</Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  max-width: 380px;
  display: grid;
  gap: 20px;
  text-align: center;
  margin: 0 auto;
  padding: 140px 20px 100px;
`;

const Title = styled.h1`
  color: blue;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
`;

const Description = styled.p`
  max-width: 240px;
  color: blue;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 130%;
  margin: 0 auto;
`;
