'use client';

import React, { useEffect, useState } from 'react';
import { fetchTreatmentInformation, TreatmentInfo } from '@/lib/strapi/cancer-info';

interface TreatmentInformationListProps {
  treatmentType?: string;
  maxItems?: number;
  showFeaturedOnly?: boolean;
}

export default function TreatmentInformationList({ 
  treatmentType, 
  maxItems = 10,
  showFeaturedOnly = false 
}: TreatmentInformationListProps) {
  const [treatments, setTreatments] = useState<TreatmentInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTreatments() {
      try {
        setLoading(true);
        setError(null);
        
        let data = await fetchTreatmentInformation(treatmentType);
        
        // Filter for featured only if requested
        if (showFeaturedOnly) {
          data = data.filter(treatment => treatment.featured);
        }
        
        // Limit results if maxItems is specified
        if (maxItems > 0) {
          data = data.slice(0, maxItems);
        }
        
        setTreatments(data);
      } catch (err) {
        console.error('Error loading treatment information:', err);
        setError('Failed to load treatment information. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadTreatments();
  }, [treatmentType, maxItems, showFeaturedOnly]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading treatment information...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-warning" role="alert">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
      </div>
    );
  }

  if (treatments.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        <i className="fas fa-info-circle me-2"></i>
        No treatment information available at this time.
      </div>
    );
  }

  const getTreatmentTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      'chemotherapy': 'fas fa-syringe',
      'radiation': 'fas fa-radiation',
      'surgery': 'fas fa-scalpel-path',
      'immunotherapy': 'fas fa-shield-virus',
      'bone-marrow-transplant': 'fas fa-bone',
      'clinical-trial': 'fas fa-flask',
      'supportive-care': 'fas fa-heart',
      'other': 'fas fa-stethoscope'
    };
    return icons[type] || 'fas fa-stethoscope';
  };

  const getTreatmentTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'chemotherapy': 'primary',
      'radiation': 'warning',
      'surgery': 'danger',
      'immunotherapy': 'success',
      'bone-marrow-transplant': 'info',
      'clinical-trial': 'purple',
      'supportive-care': 'pink',
      'other': 'secondary'
    };
    return colors[type] || 'secondary';
  };

  return (
    <div className="treatment-information-list">
      <div className="row">
        {treatments.map((treatment) => (
          <div key={treatment.id} className="col-lg-6 col-xl-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              {treatment.featured && (
                <div className="position-absolute top-0 end-0 m-2">
                  <span className="badge bg-warning text-dark">
                    <i className="fas fa-star me-1"></i>
                    Featured
                  </span>
                </div>
              )}
              
              <div className="card-header bg-light border-0">
                <div className="d-flex align-items-center">
                  <div className={`text-${getTreatmentTypeColor(treatment.treatmentType)} me-3`}>
                    <i className={`${getTreatmentTypeIcon(treatment.treatmentType)} fa-2x`}></i>
                  </div>
                  <div>
                    <h5 className="card-title mb-0">{treatment.title}</h5>
                    <small className="text-muted text-capitalize">
                      {treatment.treatmentType.replace('-', ' ')}
                      {treatment.ageGroup && (
                        <span className="ms-2">
                          <i className="fas fa-child me-1"></i>
                          {treatment.ageGroup.replace('-', ' ')}
                        </span>
                      )}
                    </small>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <p className="card-text">{treatment.description}</p>
                
                {treatment.duration && (
                  <p className="text-muted small">
                    <i className="fas fa-clock me-2"></i>
                    <strong>Duration:</strong> {treatment.duration}
                  </p>
                )}

                {treatment.cancerTypes && treatment.cancerTypes.length > 0 && (
                  <div className="mb-3">
                    <small className="text-muted d-block mb-1">
                      <i className="fas fa-tags me-1"></i>
                      Cancer Types:
                    </small>
                    <div className="d-flex flex-wrap gap-1">
                      {treatment.cancerTypes.map((type, index) => (
                        <span key={index} className="badge bg-light text-dark">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="card-footer bg-transparent border-0">
                {treatment.lastReviewed && (
                  <small className="text-muted">
                    <i className="fas fa-calendar-check me-1"></i>
                    Last reviewed: {new Date(treatment.lastReviewed).toLocaleDateString()}
                    {treatment.reviewedBy && (
                      <span className="ms-2">by {treatment.reviewedBy}</span>
                    )}
                  </small>
                )}
                
                {treatment.medicalDisclaimer && (
                  <div className="mt-2">
                    <small className="text-warning">
                      <i className="fas fa-exclamation-triangle me-1"></i>
                      Medical information disclaimer applies
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {treatments.length > 0 && (
        <div className="mt-4 p-3 bg-light rounded">
          <p className="text-muted small mb-0">
            <i className="fas fa-info-circle me-2"></i>
            <strong>Important:</strong> This information is for educational purposes only and should not replace professional medical advice. 
            Always consult with your healthcare team for personalized treatment recommendations.
          </p>
        </div>
      )}
    </div>
  );
}
