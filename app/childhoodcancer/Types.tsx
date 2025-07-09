
import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

const Types = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="text-center mt-2 mb-2"><h2>Types of Childhood Cancer</h2></div>
          <p><span className="first-character">T</span>here are many different types of cancers that occur in childhood. Below is some detail 
            on the cancer that affected Molly
          </p>
          <h3>Neuroblastoma</h3>
          <p>
            Neuroblastoma is a cancer of the sympathetic nervous system.
            It starts in early forms of nerve cells found in a developing
            embryo or fetus. Neuroblastoma is a solid, malignant tumor which
            manifests as a lump or mass in the abdomen or around the spinal cord.
            Nueroblastoma cells can also spread to other body tissues including
          bone and bone marrow.</p>
          <p>
            The symptoms of Neuroblastoma are variable and dependent on the
            location of the tumor. Most neuroblastomas are found in the abdomen.
            A tumor in the abdomen may cause the child to feel "full", experience
            stomach pain, loss of appetite, constipation and difficulty urinating.
            The child may have "black eyes", much like bruises. Chest tumors may
            cause pain, difficulty breathing, or a persistent cough. Tumors that
            grow in spinal areas may cause the child to have pain, numbness of the
            lower extremities, constipation and difficulty urinating.
          </p>
          <h4>Signs and Symptoms</h4>
          <ul>
            <li>lump or mass in the abdomen, chest, neck, or pelvis</li>
            <li>loss of appetite, nausea, weight loss, stomach pain, constipation, difficulty urinating</li>
            <li>changes in the eyes: black eyes, a droopy eyelid, a pupil that doesn't constrict, vision problems</li>
            <li>pain in the chest, difficulty breathing, persistent cough</li>
            <li>pain or numbness in the lower extremities, limping, inability to stand, stumbling</li>
            <li>bone pain, fever, irritability, listlessness backaches (backaches in children are not usual)
          </li>
          </ul>
          <p>Ultrasound and urine tests are used initially to diagnose Neuroblastoma.
            Bone marrow aspirations and blood test are used to confirm diagnosis</p>
        </Col>
      </Row >
    </Container >
  );
};

export default Types;
