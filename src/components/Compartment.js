import { Suspense } from 'react';
import '.././styles.css';
import styled from 'styled-components';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

import Box from './Box';
import BoxText from './BoxText';

export default function App(props) {
  return (
    <Wrapper className="App">
      <MDBCol md={4} className="DisSection">
        <BoxText
          title={props.title}
          dimen={props.dimen}
          currentCap={props.currentCap}
          maxCap={props.maxCap}
          currentVol={props.currentVol}
          maxVol={props.maxVol}
        />
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} />
          <Suspense fallback={null}>
            <Box
              currentCap={props.currentCap}
              maxCap={props.maxCap}
              currentVol={props.currentVol}
              maxVol={props.maxVol}
              height={props.height}
              width={props.width}
              className="compartment"
            />
          </Suspense>
        </Canvas>
      </MDBCol>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  MDBCol {
    float: left !important;
  }
  .DisSection {
    float: left !important;
    width: 26% !important;
  }
  Canvas {
    float: left !important;
    height: 200px !important;
  }
`;
