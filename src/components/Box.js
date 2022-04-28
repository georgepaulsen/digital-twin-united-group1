import React from 'react';
import { useLoader } from '@react-three/fiber';

export default function Box(props) {
  var bHeight = Number(props.height);
  var bWidth = Number(props.width);
  var percentWeight = (props.currentCap / props.maxCap) * 100;
  var percentVol = (props.currentVol / props.maxVol) * 100;
  var colorSign = 'green';
  console.log('comp is ' + percentWeight + '  ' + percentVol);

  if (percentWeight > 80 || percentVol > 80) {
    //alert('change R');
    colorSign = 'red';
  } else if (percentWeight > 60 || percentVol > 60) {
    //alert('change O');
    colorSign = 'orange';
  }

  return (
    <mesh rotation={[90, 0, 20]}>
      <cylinderBufferGeometry
        attach="geometry"
        args={[bWidth, bWidth, bHeight, 32, 1, false, 0, 3.2]}
      />
      <meshNormalMaterial attach="material" />
      <meshBasicMaterial
        attach="material"
        color={colorSign}
        side={'Backside'}
      />
      {/* <meshStandardMaterial map={colorMap} /> */}
    </mesh>
  );
}

/*const
<CylinderGeometry attach="geometry" args={[5, 5, 20, 32]}>
geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );

<cylinderBufferGeometry attach="geometry" args={[2, 2, 2]} />
         <meshBasicMaterial attach="material" color="hotpink" />

*/
