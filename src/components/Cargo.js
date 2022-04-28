import React from 'react';
import { Suspense } from 'react';
import styled from 'styled-components';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import CargoText from './CargoText';

export default function Cargo(props) {
  var bWidth = Number(props.width);
  var bHeight = Number(props.height);
  var bLength = Number(props.length);
  var vol = Number(
    (((bWidth * bHeight * bLength * 125000) / 1728) * 10).toFixed(3)
  );
  var color = '';
  if (props.type === 3) {
    color = '#3EBA88';
  } else if (props.type === 1) {
    color = '#F44336';
  } else if (props.type === 2) {
    color = '#00A3FF';
  }
  return (
    <Wrapper>
      <MDBCol md={2} className="cargoItem">
        <CargoText
          id={props.id}
          color={color}
          weight={props.weight}
          volume={vol}
        />
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} />
          <Suspense fallback={null}>
            <mesh rotation={[bWidth, bHeight, bLength]}>
              <boxBufferGeometry
                attach="geometry"
                args={[bWidth, bHeight, bLength]}
              />
              <meshNormalMaterial attach="material" />
              <meshBasicMaterial
                attach="material"
                color={color}
                side={'Backside'}
              />
              {/* <meshStandardMaterial map={colorMap} /> */}
            </mesh>
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
  .cargoItem {
    float: left !important;
    width: 15% !important;
  }
  Canvas {
    float: left !important;
    height: 200px !important;
  }
`;
