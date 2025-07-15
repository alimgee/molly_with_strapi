'use client';

import React, { useEffect, useState } from 'react';
import { fetchFundraisingCampaigns, FundraisingCampaign } from '@/lib/strapi/cancer-info';

interface FundraisingCampaignListProps {
  campaignType?: string;
  maxItems?: number;
  showFeaturedOnly?: boolean;
}

export default function FundraisingCampaignList({ 
  campaignType, 
  maxItems = 6,
  showFeaturedOnly = false 
}: FundraisingCampaignListProps) {
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCampaigns() {
      try {
        setLoading(true);
        setError(null);
        
        let data = await fetchFundraisingCampaigns(campaignType);
        
        // Filter for featured only if requested
        if (showFeaturedOnly) {
          data = data.filter(campaign => campaign.featured);
        }
        
        // Limit results if maxItems is specified
        if (maxItems > 0) {
          data = data.slice(0, maxItems);
        }
        
        setCampaigns(data);
      } catch (err) {
        console.error('Error loading fundraising campaigns:', err);
        setError('Failed to load fundraising campaigns. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, [campaignType, maxItems, showFeaturedOnly]);

  const calculateProgress = (current: number, goal: number) => {
    if (!goal || goal === 0) return 0;
    return Math.min((current / goal) * 100, 100);
  };

  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getCampaignTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      'general-donation': 'fas fa-hand-holding-heart',
      'medical-equipment': 'fas fa-heartbeat',
      'research-funding': 'fas fa-microscope',
      'family-support': 'fas fa-home',
      'awareness-campaign': 'fas fa-bullhorn',
      'event-fundraiser': 'fas fa-calendar-alt',
      'memorial-fund': 'fas fa-heart',
      'other': 'fas fa-donate'
    };
    return icons[type] || 'fas fa-donate';
  };

  const isExpired = (endDate?: string) => {
    if (!endDate) return false;
    return new Date(endDate) < new Date();
  };

  const isExpiringSoon = (endDate?: string) => {
    if (!endDate) return false;
    const end = new Date(endDate);
    const now = new Date();
    const daysUntilEnd = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilEnd <= 7 && daysUntilEnd > 0;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading fundraising campaigns...</span>
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

  if (campaigns.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        <i className="fas fa-info-circle me-2"></i>
        No fundraising campaigns available at this time.
      </div>
    );
  }

  return (
    <div className="fundraising-campaigns-list">
      <div className="row">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="col-lg-6 col-xl-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              {campaign.imageUrl && (
                <img 
                  src={campaign.imageUrl} 
                  className="card-img-top" 
                  alt={campaign.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              
              <div className="position-absolute top-0 end-0 m-2">
                {campaign.featured && (
                  <span className="badge bg-warning text-dark me-1">
                    <i className="fas fa-star me-1"></i>
                    Featured
                  </span>
                )}
                {isExpired(campaign.endDate) && (
                  <span className="badge bg-secondary">
                    <i className="fas fa-clock me-1"></i>
                    Ended
                  </span>
                )}
                {isExpiringSoon(campaign.endDate) && !isExpired(campaign.endDate) && (
                  <span className="badge bg-danger">
                    <i className="fas fa-clock me-1"></i>
                    Ending Soon
                  </span>
                )}
              </div>

              <div className="card-header bg-light border-0">
                <div className="d-flex align-items-center">
                  <div className="text-primary me-3">
                    <i className={`${getCampaignTypeIcon(campaign.campaignType)} fa-lg`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-0">{campaign.name}</h5>
                    <small className="text-muted text-capitalize">
                      {campaign.campaignType.replace('-', ' ')}
                    </small>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <p className="card-text">
                  {campaign.shortDescription || campaign.description}
                </p>
                
                {campaign.beneficiary && (
                  <p className="text-muted small">
                    <i className="fas fa-user-friends me-2"></i>
                    <strong>Beneficiary:</strong> {campaign.beneficiary}
                  </p>
                )}

                {campaign.goalAmount && (
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <small className="text-muted">Progress</small>
                      <small className="text-muted">
                        {formatCurrency(campaign.currentAmount || 0, campaign.currency)} / {formatCurrency(campaign.goalAmount, campaign.currency)}
                      </small>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: `${calculateProgress(campaign.currentAmount || 0, campaign.goalAmount)}%` }}
                        aria-valuenow={calculateProgress(campaign.currentAmount || 0, campaign.goalAmount)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <small className="text-muted">
                      {calculateProgress(campaign.currentAmount || 0, campaign.goalAmount).toFixed(1)}% raised
                    </small>
                  </div>
                )}

                {campaign.endDate && !campaign.isOngoing && (
                  <p className="text-muted small">
                    <i className="fas fa-calendar me-2"></i>
                    <strong>Ends:</strong> {new Date(campaign.endDate).toLocaleDateString()}
                  </p>
                )}

                {campaign.isOngoing && (
                  <p className="text-success small">
                    <i className="fas fa-infinity me-2"></i>
                    <strong>Ongoing Campaign</strong>
                  </p>
                )}
              </div>

              <div className="card-footer bg-transparent border-0">
                <div className="d-flex gap-2">
                  {campaign.donationUrl && (
                    <a 
                      href={campaign.donationUrl} 
                      className="btn btn-primary btn-sm flex-grow-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-donate me-1"></i>
                      Donate Now
                    </a>
                  )}
                  
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target={`#campaign-modal-${campaign.id}`}
                  >
                    <i className="fas fa-info-circle me-1"></i>
                    Details
                  </button>
                </div>
                
                {campaign.taxDeductible && (
                  <small className="text-success d-block mt-2">
                    <i className="fas fa-check-circle me-1"></i>
                    Tax deductible
                  </small>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
