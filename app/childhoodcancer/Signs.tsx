
import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { CancerInfo } from '@/lib/strapi/cancer-info';
import ReactMarkdown from 'react-markdown';

interface SignsProps {
  signs: CancerInfo[];
}

const Signs: React.FC<SignsProps> = ({ signs }) => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="text-center mt-2 mb-2"><h2>Signs of Childhood Cancer</h2></div>
          <p>
            <span className="first-character">C</span>hildhood cancer is relatively rare. However, as a parent,
            it may be helpful to be aware of the symptoms of childhood cancer:
          </p>
          {signs.map((sign) => (
            <Card key={sign.id} className="mb-3">
              <CardBody>
                <div className="card-text signs">
                  <ReactMarkdown>{sign.content}</ReactMarkdown>
                </div>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Signs;
