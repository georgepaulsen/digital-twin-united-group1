import React from 'react';
import styled from 'styled-components';
import ProgressBar from '@ramonak/react-progress-bar';

export default function BoxText(props) {
  var percentWeight = (props.currentCap / props.maxCap) * 100;
  var percentVol = (props.currentVol / props.maxVol) * 100;

  percentWeight = percentWeight.toFixed(2);
  percentVol = percentVol.toFixed(2);
  return (
    <Wrapper>
      <Title> {props.title}</Title>
      <Description>{props.dimen}</Description>
      <Description>
        {props.currentCap} / {props.maxCap} lb
        {percentWeight < 60 ? (
          <ProgressBar
            completed={percentWeight}
            customLabel={percentWeight + '%'}
            bgColor="green"
            width="100px"
          />
        ) : (
          <>
            {percentWeight < 80 ? (
              <ProgressBar
                completed={percentWeight}
                customLabel={percentWeight + '%'}
                bgColor="orange"
                width="100px"
              />
            ) : (
              <>
                <ProgressBar
                  completed={percentWeight}
                  customLabel={percentWeight + '%'}
                  bgColor="red"
                  width="100px"
                />
              </>
            )}
          </>
        )}
      </Description>
      <Description>
        {props.currentVol} / {props.maxVol} ft3
        {percentVol < 60 ? (
          <ProgressBar
            completed={percentVol}
            customLabel={percentVol + '%'}
            bgColor="green"
            width="100px"
          />
        ) : (
          <>
            {percentVol < 80 ? (
              <ProgressBar
                completed={percentVol}
                customLabel={percentVol + '%'}
                bgColor="orange"
                width="100px"
              />
            ) : (
              <>
                <ProgressBar
                  completed={percentVol}
                  customLabel={percentVol + '%'}
                  bgColor="red"
                  width="100px"
                />
              </>
            )}
          </>
        )}
      </Description>
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
  color: rgba(255, 255, 255, 1);
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
`;

const Description = styled.p`
  max-width: 240px;
  color: rgba(255, 255, 255, 0.7);
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  margin: 0 auto;
`;
