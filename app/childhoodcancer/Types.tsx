
import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { CancerInfo } from '@/lib/strapi/cancer-info';
import ReactMarkdown from 'react-markdown';

interface TypesProps {
  types: CancerInfo[];
}

const Types: React.FC<TypesProps> = ({ types }) => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="text-center mt-2 mb-2"><h2>Types of Childhood Cancer</h2></div>
          <p>
            <span className="first-character">T</span>here are many different types of cancers that occur in childhood. Below is some detail
            on the cancer that affected Molly
          </p>
          {types.map((type) => (
            <Card key={type.id} className="mb-3">
              <CardBody>
                <div className="card-text">
                  <ReactMarkdown>{type.content}</ReactMarkdown>
                </div>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Types;
