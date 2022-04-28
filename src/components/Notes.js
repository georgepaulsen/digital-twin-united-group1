import styled from 'styled-components';
import Background from './Background';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Button, Row, Col } from 'react-bootstrap';

export default function FunctionSection() {
  return (
    <Wrapper>
      <Col className="mx-0">
        <p>1.Red cargo are HAZMAT.</p>
        <p>2.Blue cargo are livestocks.</p>
        <p>3.HAZMAT cargo should not be mixed with livestock cargo.</p>
        <p>4.The cargo weight difference should be less than 200lb</p>
        <p>
          5.There should be a buffer for the volume in case of inperfect
          loading.
        </p>
      </Col>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 20px;
  text-align: Center;
  margin: 0;
  margin-left: 4%;
  float: left !important;
  color: orange;
`;
