'use client';

import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Badge } from 'reactstrap';
import { CancerInfo } from '@/lib/strapi/cancer-info';

interface CancerInformationListProps {
  cancerInfo: CancerInfo[];
  category?: string;
}

const categoryColors = {
  signs: 'warning',
  symptoms: 'danger', 
  types: 'info',
  causes: 'secondary',
  treatment: 'success',
  support: 'primary'
};

const categoryLabels = {
  signs: 'Early Signs',
  symptoms: 'Symptoms',
  types: 'Cancer Types',
  causes: 'Causes',
  treatment: 'Treatment',
  support: 'Support'
};

export const CancerInformationList: React.FC<CancerInformationListProps> = ({ 
  cancerInfo, 
  category 
}) => {
  // Filter by category if specified
  const filteredInfo = category 
    ? cancerInfo.filter(info => info.category === category)
    : cancerInfo;

  // Group by category for display
  const groupedInfo = filteredInfo.reduce((acc, info) => {
    if (!acc[info.category]) {
      acc[info.category] = [];
    }
    acc[info.category].push(info);
    return acc;
  }, {} as Record<string, CancerInfo[]>);

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h2 className="text-center mb-4">
            {category ? categoryLabels[category as keyof typeof categoryLabels] : 'Childhood Cancer Information'}
          </h2>
        </Col>
      </Row>
      
      {Object.entries(groupedInfo).map(([cat, infos]) => (
        <div key={cat} className="mb-5">
          <Row>
            <Col>
              <h3 className="mb-3">
                <Badge color={categoryColors[cat as keyof typeof categoryColors]} className="me-2">
                  {categoryLabels[cat as keyof typeof categoryLabels]}
                </Badge>
              </h3>
            </Col>
          </Row>
          
          <Row>
            {infos
              .sort((a, b) => a.order - b.order)
              .map((info) => (
                <Col key={info.id} lg="6" className="mb-4">
                  <Card className="h-100">
                    <CardBody>
                      <CardTitle tag="h4">{info.title}</CardTitle>
                      <CardText 
                        dangerouslySetInnerHTML={{ 
                          __html: info.content.substring(0, 200) + '...' 
                        }}
                      />
                      <div className="d-flex justify-content-between align-items-center">
                        <Badge 
                          color={categoryColors[info.category as keyof typeof categoryColors]}
                          pill
                        >
                          {categoryLabels[info.category as keyof typeof categoryLabels]}
                        </Badge>
                        <small className="text-muted">#{info.order}</small>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      ))}
      
      {filteredInfo.length === 0 && (
        <Row>
          <Col className="text-center">
            <p className="text-muted">No information available for this category.</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};
