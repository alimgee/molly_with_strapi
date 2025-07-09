
import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';

const Signs = () => {
  return (
    <Container>
      <Row>
        <Col>
        <div className="text-center mt-2 mb-2"><h2>Signs of Childhood Cancer</h2></div>
          <p>
          <span className="first-character">C</span>hildhood cancer is relatively rare. However, as a parent,
            it may be helpful to be aware of the symptoms of childhood cancer:</p>
          <Card>
            <CardBody>
              <div className = "card-text">
              <div className= "signs"> 
              <p><strong>C</strong>ontinued, unexplained weight loss</p>
              <p><strong>H</strong>eadaches, often with early morning vomiting</p>
              <p><strong>I</strong>ncreased swelling or persistent pain in bones, joints, back, or legs</p>
              <p><strong>L</strong>ump or mass, especially in the abdomen, neck, chest, pelvis, or armpits</p>
              <p><strong>D</strong>evelopment of excessive bruising, bleeding, or rash</p>
              <p><strong>C</strong>onstant infections</p>
              <p><strong>A</strong> whitish color behind the pupil</p>
              <p><strong>N</strong>ausea which persists or vomiting without nausea</p>
              <p><strong>C</strong>onstant tiredness or noticeable paleness</p>
              <p><strong>E</strong>ye or vision changes which occur suddenly and persist</p>
              <p><strong>R</strong>ecurrent or persistent fevers of unknown origin</p>
              </div>
              </div>

            </CardBody>
          </Card>
        </Col>
      </Row >
    </Container >
  );
};

export default Signs;
