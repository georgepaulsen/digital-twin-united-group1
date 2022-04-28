import './styles.css';
import styled from 'styled-components';
import React, { useState } from 'react';

import Background from './components/Background';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

import Compartment from './components/Compartment';
import Cargo from './components/Cargo';
import Notes from './components/Notes';
import model757 from './images/United757.jpg';
import Entire757 from './images/757Entire.jpg'; // Tell webpack this JS file uses this image

import Top757 from './images/Top757.png';
import Com757R3 from './images/757CombinedR3.png';
import Com757 from './images/757Combined.png';
import Side757 from './images/Side757.png';

import cargoData from './components/cargo.json';
import compartmentData from './components/compartments.json';
import { Button, Row, Col, ProgressBar } from 'react-bootstrap';
import { CircleProgress } from 'react-gradient-progress';
import BoxText from './components/BoxText';

export default function App() {
  const [isSelect, setIsSelect] = useState(true);
  const [R3, setR3] = useState(false);
  const [algo, setAlgo] = useState('balance');
  const [planeSide, setplaneSide] = useState(true);
  const [selectCom, setSelectCom] = useState(4);

  const [cWeights, setCWeights] = useState([0, 0, 0, 0, 0, 0, 0]);
  const cWeightArray = [0, 0, 0, 0, 0, 0, 0];
  const [hazInside, setHazInside] = useState([
    false,
    false,
    false,
    false,
    false,
    false
  ]);
  var liveInside = [false, false, false, false, false, false];

  const [cVols, setCVols] = useState([0, 0, 0, 0, 0, 0, 0]);
  const cVolArray = [0, 0, 0, 0, 0, 0, 0];
  //index 0 is the total weight, while the rest is compartment i

  const [selectCar, setSelectCar] = useState(0);
  const [printMsg, setPrintMsg] = useState('');
  var printArray = [];

  cargoData.sort((a, b) => a.type - b.type || b.weight - a.weight);
  const [cargoes, setCargoes] = useState(
    JSON.parse(localStorage.getItem('cargoDatas') || '[]').sort(
      (a, b) => a.type - b.type || b.weight - a.weight
    )
  );
  const [compartments, setCompartments] = useState(compartmentData);

  var compartmentElements = [];
  var removedCargos = [];
  var record = '';

  //console.log('cargo data are');
  //console.log(JSON.parse(localStorage.getItem('cargoDatas') || '[]'));

  for (var i = 0; i < 6; i++) {
    compartmentElements.push(
      <Compartment
        key={compartments[i].title}
        title={compartments[i].title}
        dimen={compartments[i].dimen}
        currentCap={cWeights[i + 1].toFixed(2)}
        maxCap={compartments[i].maxCap}
        currentVol={cVols[i + 1].toFixed(2)}
        maxVol={compartments[i].maxVol}
        height={compartments[i].height}
        width={compartments[i].width}
      />
    );
    if (i === 2) {
      compartmentElements.push(
        <WrapperFuns>
          <Col className="mx-0">
            <Row className="mx-0">
              <Button
                variant="primary"
                onClick={() => {
                  autoLoad();
                }}
              >
                Suggest
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setAlgo('balance');
                }}
              >
                Weight Balance
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setAlgo('CoGBack');
                }}
              >
                Center of Gravity
              </Button>
            </Row>
            <Row className="mx-0">
              <Button variant="primary">Remove</Button>
              <Button
                variant="primary"
                onClick={() => {
                  traceBack();
                }}
              >
                Retract
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  print();
                }}
              >
                Print
              </Button>
            </Row>
          </Col>
        </WrapperFuns>
      );
    }
  }
  function removeCargo(id) {
    var temp = cargoes.filter((item) => Number(item.id) === id);
    removedCargos.push(temp[0]);
    setCargoes(cargoes.filter((item) => Number(item.id) !== id));
    setSelectCar(selectCar + 1);
  }
  function traceBack() {
    cargoes.push(removedCargos[removedCargos.length]);
    removedCargos = removedCargos.filter(
      (item) => Number(item.id) !== removedCargos[removedCargos.length].id
    );
  }

  function findCompartmentBalance() {
    var maxWeightLeft = 0;
    var index = -1;
    var vol =
      Number(cargoes[0].height) *
      Number(cargoes[0].width) *
      Number(cargoes[0].length);
    vol = (vol / 1720) * 10;
    console.log(hazInside);

    for (var i = 1; i <= 6; i++) {
      if (cargoes[0].type === 2 && hazInside[i - 1] === true) {
        console.log('HAZ!');
        continue; //If the compartment already has hazInside
      }
      if (Number(compartments[i - 1].maxVol) - cVols[i] >= vol) {
        var reminWeight = Number(compartments[i - 1].maxCap) - cWeights[i];

        if (
          reminWeight >= Number(cargoes[0].weight) &&
          reminWeight > maxWeightLeft
        ) {
          maxWeightLeft = reminWeight;
          index = i;
        }
      }
    }
    setSelectCom(index);
    return index;
  }

  function findCompartmentCoGBack() {
    var index = -1;
    var vol =
      Number(cargoes[0].height) *
      Number(cargoes[0].width) *
      Number(cargoes[0].length);
    vol = (vol / 1720) * 10;
    //console.log('seaching');

    for (var i = 6; i >= 1; i--) {
      //console.log('looking at index ' + i);
      if (cargoes[0].type === 2 && hazInside[i - 1] === true) {
        continue; //If the compartment already has hazInside
      }
      if (Number(compartments[i - 1].maxVol) - cVols[i] >= vol) {
        var reminWeight = Number(compartments[i - 1].maxCap) - cWeights[i];

        if (reminWeight >= Number(cargoes[0].weight)) {
          //console.log('about to return ' + i + ' with weight ' + reminWeight);
          setSelectCom(i);
          return i;
        }
      }
    }
    setSelectCom(index);
    return index;
  }

  function autoLoad() {
    if (cargoes.length < 1) {
      alert('no more cargoes left!');
      return;
    }
    var comIndex = 0;
    if (algo === 'balance') {
      comIndex = findCompartmentBalance();
    } else if (algo === 'CoGBack') {
      comIndex = findCompartmentCoGBack();
    }

    if (comIndex === -1) {
      alert('No avliable compartment for cargo id ' + cargoes[0].id);
      return;
    }
    //console.log('Load Compartment ' + comIndex);
    setR3(true);
    modifyComAdd(comIndex, 0);
  }

  function print() {
    alert(printMsg);
  }

  function modifyComAdd(comIndex, cargoIndex) {
    for (var i = 0; i <= 6; i++) {
      cVolArray[i] = cVols[i];
      cWeightArray[i] = cWeights[i];
    }

    if (cargoes[cargoIndex].type === 1) {
      var tempHaz = hazInside;
      tempHaz[comIndex - 1] = true;
      setHazInside(tempHaz);
    } else if (cargoes[cargoIndex].type === 2) {
      liveInside[comIndex] = true;
    }
    cVolArray[comIndex] =
      Number(cargoes[cargoIndex].height) *
      Number(cargoes[cargoIndex].width) *
      Number(cargoes[cargoIndex].length);
    cVolArray[comIndex] = (cVolArray[comIndex] / 1728) * 10 + cVols[comIndex];

    cWeightArray[comIndex] = Number(cargoes[cargoIndex].weight);
    cWeightArray[comIndex] = cWeightArray[comIndex] + cWeights[comIndex];

    //console.log(cWeightArray[comIndex]);
    setCWeights(cWeightArray);
    //console.log(cWeightArray);
    //console.log(cWeights);
    setCVols(cVolArray);
    var typeName = '';

    if (cargoes[cargoIndex].type === 1) {
      typeName = '(HAZMAT)';
    } else if (cargoes[cargoIndex].type === 2) {
      typeName = '(Livestock)';
    } else {
      typeName = '';
    }

    record =
      printMsg +
      'Cargo with id ' +
      cargoes[cargoIndex].id +
      typeName +
      ' is loaded into Compartment ' +
      comIndex +
      '\n';
    //console.log(record);
    setPrintMsg(record);

    removeCargo(cargoes[cargoIndex].id);
  }

  return (
    <Wrapper className="App">
      <Background />
      {isSelect ? (
        <>
          <TextWrapper
            onClick={() => {
              setIsSelect(false);
            }}
          >
            <Title>Digital Twin</Title>
            <Description>Choose A Model</Description>
            <Description>
              <img src={model757} alt="757model" width="300px" height="130" />
              Boeing 757-200
            </Description>
          </TextWrapper>
        </>
      ) : (
        <>
          <MDBRow>
            <TextWrapper
              onClick={() => {
                setIsSelect(false);
              }}
            >
              <Title>Digital Twin</Title>
              <MDBRow className="List">
                <Notes />
              </MDBRow>
              {planeSide ? (
                <Description
                  onClick={() => {
                    setplaneSide(!planeSide);
                  }}
                >
                  <img
                    src={Side757}
                    alt="757model"
                    width="500px"
                    height="400px"
                  />
                </Description>
              ) : (
                <Description
                  onClick={() => {
                    setplaneSide(!planeSide);
                  }}
                >
                  <img
                    src={Com757}
                    alt="757model"
                    width="500px"
                    height="400px"
                  />
                </Description>
              )}
            </TextWrapper>
            {compartmentElements}
          </MDBRow>

          <BreakWrapper></BreakWrapper>
          <MDBRow className="Cargos">
            {cargoes.length < 5 ? (
              <>
                {cargoes.map((item) => (
                  <Cargo
                    id={item.id}
                    width={item.width / 20}
                    height={item.height / 20}
                    length={item.length / 20}
                    type={item.type}
                    weight={item.weight}
                    key={item.id}
                  />
                ))}
              </>
            ) : (
              <>
                {cargoes.slice(0, 6).map((item) => (
                  <Cargo
                    id={item.id}
                    width={item.width / 50}
                    height={item.height / 50}
                    length={item.length / 50}
                    type={item.type}
                    weight={item.weight}
                    key={item.id}
                  />
                ))}
              </>
            )}
          </MDBRow>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  background: #082444;
  width: 100%;
  border-block-end-color: #ffffff;

  MDBCol {
    float: left !important;
  }
  .DisSection {
    float: left !important;
    width: 30% !important;
  }
  Canvas {
    float: left !important;
    height: 200px !important;
  }

  .Cargos {
    float: none !important;
  }
`;

const TextWrapper = styled.div`
  position: relative;
  max-width: 1500px;
  display: grid;
  gap: 20px;
  text-align: center;
  margin: 0 auto;
  padding: 140px 20px 100px;
`;

const Title = styled.h1`
  color: rgba(255, 255, 255, 1);
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
`;

const DescriptionCenter = styled.p`
  max-width: 240px;
  color: rgba(255, 255, 255, 0.7);
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 130%;
  margin: 0 auto;
`;

const Description = styled.p`
  max-width: 240px;
  color: rgba(255, 255, 255, 0.7);
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 130%;
  margin: 0 auto;
`;

const WrapperFuns = styled.div`
  position: relative;
  display: grid;
  text-align: Center;
  margin: 0;
  float: left !important;
  width: 5%;

  Button {
    align: left !important;
    width: 60px;
    color: purple;
    background-color: lightblue;
    border: none;
    margin: 10px;
  }
`;

const BreakWrapper = styled.div`
  position: relative;
  display: grid;
  text-align: Center;
  float: none !important;
  width: 100%;
`;
