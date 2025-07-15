'use client';

import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Badge, Button } from 'reactstrap';
import { SupportOrg } from '@/lib/strapi/cancer-info';

interface SupportOrganizationsListProps {
  organizations: SupportOrg[];
  category?: string;
}

const categoryColors = {
  charity: 'primary',
  hospital: 'success',
  support_group: 'info',
  research: 'warning',
  blood_donation: 'danger',
  financial_aid: 'secondary'
};

const categoryLabels = {
  charity: 'Charity',
  hospital: 'Hospital',
  support_group: 'Support Group',
  research: 'Research',
  blood_donation: 'Blood Donation',
  financial_aid: 'Financial Aid'
};

export const SupportOrganizationsList: React.FC<SupportOrganizationsListProps> = ({ 
  organizations, 
  category 
}) => {
  // Filter by category if specified
  const filteredOrgs = category 
    ? organizations.filter(org => org.category === category)
    : organizations;

  // Filter only active organizations
  const activeOrgs = filteredOrgs.filter(org => org.isActive);

  // Sort by featured first, then by name
  const sortedOrgs = activeOrgs.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h2 className="text-center mb-4">
            {category ? `${categoryLabels[category as keyof typeof categoryLabels]} Organizations` : 'Support Organizations'}
          </h2>
        </Col>
      </Row>
      
      <Row>
        {sortedOrgs.map((org) => (
          <Col key={org.id} lg="6" xl="4" className="mb-4">
            <Card className={`h-100 ${org.featured ? 'border-primary' : ''}`}>
              {org.featured && (
                <div className="position-absolute top-0 end-0 m-2">
                  <Badge color="primary">Featured</Badge>
                </div>
              )}
              
              <CardBody className="d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  {org.logoUrl && (
                    <img 
                      src={org.logoUrl} 
                      alt={`${org.name} logo`}
                      className="me-3"
                      style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                    />
                  )}
                  <div>
                    <CardTitle tag="h5" className="mb-1">{org.name}</CardTitle>
                    <Badge color={categoryColors[org.category as keyof typeof categoryColors]} pill>
                      {categoryLabels[org.category as keyof typeof categoryLabels]}
                    </Badge>
                  </div>
                </div>
                
                <CardText 
                  className="flex-grow-1"
                  dangerouslySetInnerHTML={{ 
                    __html: org.description.substring(0, 150) + '...' 
                  }}
                />
                
                <div className="mt-auto">
                  {org.phone && (
                    <p className="mb-1">
                      <strong>Phone:</strong> 
                      <a href={`tel:${org.phone}`} className="ms-1 text-decoration-none">
                        {org.phone}
                      </a>
                    </p>
                  )}
                  
                  {org.email && (
                    <p className="mb-1">
                      <strong>Email:</strong>
                      <a href={`mailto:${org.email}`} className="ms-1 text-decoration-none">
                        {org.email}
                      </a>
                    </p>
                  )}
                  
                  {org.website && (
                    <div className="mt-3">
                      <Button 
                        color="primary" 
                        size="sm" 
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website
                      </Button>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      
      {sortedOrgs.length === 0 && (
        <Row>
          <Col className="text-center">
            <p className="text-muted">No organizations available for this category.</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};
