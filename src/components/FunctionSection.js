import styled from 'styled-components';
import Background from './Background';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Button, Row, Col } from 'react-bootstrap';

export default function FunctionSection() {
  return (
    <Wrapper>
      <Col className="mx-0">
        <Row className="mx-0">
          <Button variant="primary">Add</Button>
          <Button variant="primary">Delete</Button>
          <Button variant="primary">Save</Button>
        </Row>
        <Row className="mx-0">
          <Button variant="primary">Remove</Button>
          <Button variant="primary">Retract</Button>
          <Button variant="primary">Print</Button>
        </Row>
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
  margin-left: 5%;
  float: left !important;
  width: 60%;

  Button {
    float: left !important;
    width: 60px;
    color: purple;
    background-color: lightblue;
    border: none;
    margin: 10px;
  }
`;
