// Childhood Cancer specific content API calls and types
import { strapiRequest } from './config';

// Types for Cancer Information
export interface StrapiCancerInfo {
  id: number;
  documentId: string;
  title: string;
  content: string;
  category: 'signs' | 'symptoms' | 'types' | 'causes' | 'treatment' | 'support';
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CancerInfo {
  id: string;
  title: string;
  content: string;
  category: 'signs' | 'symptoms' | 'types' | 'causes' | 'treatment' | 'support';
  order: number;
  isVisible: boolean;
}

// Types for Support Organizations
export interface StrapiSupportOrg {
  id: number;
  documentId: string;
  name: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  logoUrl?: string;
  category: 'charity' | 'hospital' | 'support' | 'research';
  featured?: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SupportOrg {
  id: string;
  name: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  logoUrl?: string;
  category: 'charity' | 'hospital' | 'support' | 'research';
  isActive: boolean;
  featured?: boolean;
}

// Types for Treatment Information
export interface StrapiTreatmentInfo {
  id: number;
  documentId: string;
  title: string;
  description: string;
  treatmentType: 'chemotherapy' | 'radiation' | 'surgery' | 'immunotherapy' | 'bone-marrow-transplant' | 'clinical-trial' | 'supportive-care' | 'other';
  cancerTypes?: string[];
  ageGroup?: 'infant' | 'toddler' | 'child' | 'adolescent' | 'all-ages';
  sideEffects?: string;
  duration?: string;
  preparation?: string;
  recovery?: string;
  resources?: any;
  medicalDisclaimer?: string;
  lastReviewed?: string;
  reviewedBy?: string;
  isVisible: boolean;
  order: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TreatmentInfo {
  id: string;
  title: string;
  description: string;
  treatmentType: 'chemotherapy' | 'radiation' | 'surgery' | 'immunotherapy' | 'bone-marrow-transplant' | 'clinical-trial' | 'supportive-care' | 'other';
  cancerTypes?: string[];
  ageGroup?: 'infant' | 'toddler' | 'child' | 'adolescent' | 'all-ages';
  sideEffects?: string;
  duration?: string;
  preparation?: string;
  recovery?: string;
  resources?: any;
  medicalDisclaimer?: string;
  lastReviewed?: string;
  reviewedBy?: string;
  isVisible: boolean;
  order: number;
  featured?: boolean;
}

// Types for Fundraising Campaigns
export interface StrapiFundraisingCampaign {
  id: number;
  documentId: string;
  name: string;
  description: string;
  shortDescription?: string;
  campaignType: 'general-donation' | 'medical-equipment' | 'research-funding' | 'family-support' | 'awareness-campaign' | 'event-fundraiser' | 'memorial-fund' | 'other';
  goalAmount?: number;
  currentAmount?: number;
  currency?: string;
  startDate: string;
  endDate?: string;
  isOngoing?: boolean;
  donationUrl?: string;
  imageUrl?: string;
  gallery?: any;
  beneficiary?: string;
  impactStatement?: string;
  updates?: any;
  socialMediaLinks?: any;
  contactPerson?: string;
  contactEmail?: string;
  taxDeductible?: boolean;
  featured?: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FundraisingCampaign {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  campaignType: 'general-donation' | 'medical-equipment' | 'research-funding' | 'family-support' | 'awareness-campaign' | 'event-fundraiser' | 'memorial-fund' | 'other';
  goalAmount?: number;
  currentAmount?: number;
  currency?: string;
  startDate: string;
  endDate?: string;
  isOngoing?: boolean;
  donationUrl?: string;
  imageUrl?: string;
  gallery?: any;
  beneficiary?: string;
  impactStatement?: string;
  updates?: any;
  socialMediaLinks?: any;
  contactPerson?: string;
  contactEmail?: string;
  taxDeductible?: boolean;
  featured?: boolean;
  isActive: boolean;
  order: number;
}

// Transform functions
export function transformStrapiCancerInfo(strapiData: StrapiCancerInfo): CancerInfo {
  return {
    id: strapiData.id.toString(),
    title: strapiData.title,
    content: strapiData.content,
    category: strapiData.category,
    order: strapiData.order,
    isVisible: strapiData.isVisible,
  };
}

export function transformStrapiSupportOrg(strapiData: StrapiSupportOrg): SupportOrg {
  return {
    id: strapiData.id.toString(),
    name: strapiData.name,
    description: strapiData.description,
    website: strapiData.website,
    phone: strapiData.phone,
    email: strapiData.email,
    logoUrl: strapiData.logoUrl,
    category: strapiData.category,
    featured: strapiData.featured,
    isActive: strapiData.isActive,
  };
}

export function transformStrapiTreatmentInfo(strapiData: StrapiTreatmentInfo): TreatmentInfo {
  return {
    id: strapiData.id.toString(),
    title: strapiData.title,
    description: strapiData.description,
    treatmentType: strapiData.treatmentType,
    cancerTypes: strapiData.cancerTypes,
    ageGroup: strapiData.ageGroup,
    sideEffects: strapiData.sideEffects,
    duration: strapiData.duration,
    preparation: strapiData.preparation,
    recovery: strapiData.recovery,
    resources: strapiData.resources,
    medicalDisclaimer: strapiData.medicalDisclaimer,
    lastReviewed: strapiData.lastReviewed,
    reviewedBy: strapiData.reviewedBy,
    isVisible: strapiData.isVisible,
    order: strapiData.order,
    featured: strapiData.featured,
  };
}

export function transformStrapiFundraisingCampaign(strapiData: StrapiFundraisingCampaign): FundraisingCampaign {
  return {
    id: strapiData.id.toString(),
    name: strapiData.name,
    description: strapiData.description,
    shortDescription: strapiData.shortDescription,
    campaignType: strapiData.campaignType,
    goalAmount: strapiData.goalAmount,
    currentAmount: strapiData.currentAmount,
    currency: strapiData.currency,
    startDate: strapiData.startDate,
    endDate: strapiData.endDate,
    isOngoing: strapiData.isOngoing,
    donationUrl: strapiData.donationUrl,
    imageUrl: strapiData.imageUrl,
    gallery: strapiData.gallery,
    beneficiary: strapiData.beneficiary,
    impactStatement: strapiData.impactStatement,
    updates: strapiData.updates,
    socialMediaLinks: strapiData.socialMediaLinks,
    contactPerson: strapiData.contactPerson,
    contactEmail: strapiData.contactEmail,
    taxDeductible: strapiData.taxDeductible,
    featured: strapiData.featured,
    isActive: strapiData.isActive,
    order: strapiData.order,
  };
}

// API functions
export async function fetchCancerInformation(category?: string): Promise<CancerInfo[]> {
  try {
    let endpoint = '/api/cancer-information?filters[isVisible][$eq]=true&sort=order:asc';
    if (category) {
      endpoint = `/api/cancer-information?filters[isVisible][$eq]=true&filters[category][$eq]=${category}&sort=order:asc`;
    }
    
    const data = await strapiRequest<{ data: StrapiCancerInfo[] }>(endpoint);
    
    if (data?.data) {
      return data.data.map(transformStrapiCancerInfo);
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch cancer information:', error);
    return [];
  }
}

export async function fetchSupportOrganizations(category?: string): Promise<SupportOrg[]> {
  try {
    let endpoint = '/api/support-organizations?filters[isActive][$eq]=true&sort=name:asc';
    if (category) {
      endpoint = `/api/support-organizations?filters[isActive][$eq]=true&filters[category][$eq]=${category}&sort=name:asc`;
    }
    
    const data = await strapiRequest<{ data: StrapiSupportOrg[] }>(endpoint);
    
    if (data?.data) {
      return data.data.map(transformStrapiSupportOrg);
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch support organizations:', error);
    return [];
  }
}

export async function fetchTreatmentInformation(treatmentType?: string): Promise<TreatmentInfo[]> {
  try {
    let endpoint = '/api/treatment-information?filters[isVisible][$eq]=true&sort=order:asc';
    if (treatmentType) {
      endpoint = `/api/treatment-information?filters[isVisible][$eq]=true&filters[treatmentType][$eq]=${treatmentType}&sort=order:asc`;
    }
    
    const data = await strapiRequest<{ data: StrapiTreatmentInfo[] }>(endpoint);
    
    if (data?.data) {
      return data.data.map(transformStrapiTreatmentInfo);
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch treatment information:', error);
    return [];
  }
}

export async function fetchFundraisingCampaigns(campaignType?: string): Promise<FundraisingCampaign[]> {
  try {
    let endpoint = '/api/fundraising-campaigns?filters[isActive][$eq]=true&sort=startDate:desc';
    if (campaignType) {
      endpoint = `/api/fundraising-campaigns?filters[isActive][$eq]=true&filters[campaignType][$eq]=${campaignType}&sort=startDate:desc`;
    }
    
    const data = await strapiRequest<{ data: StrapiFundraisingCampaign[] }>(endpoint);
    
    if (data?.data) {
      return data.data.map(transformStrapiFundraisingCampaign);
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch fundraising campaigns:', error);
    return [];
  }
}

// Specific functions for different categories
export async function fetchCancerSigns(): Promise<CancerInfo[]> {
  return fetchCancerInformation('signs');
}

export async function fetchCancerSymptoms(): Promise<CancerInfo[]> {
  return fetchCancerInformation('symptoms');
}

export async function fetchCancerTypes(): Promise<CancerInfo[]> {
  return fetchCancerInformation('types');
}

export async function fetchCharities(): Promise<SupportOrg[]> {
  return fetchSupportOrganizations('charity');
}

export async function fetchHospitals(): Promise<SupportOrg[]> {
  return fetchSupportOrganizations('hospital');
}

export async function fetchFeaturedSupportOrganizations(): Promise<SupportOrg[]> {
  try {
    const endpoint = '/api/support-organizations?filters[isActive][$eq]=true&filters[featured][$eq]=true&sort=name:asc';
    
    const data = await strapiRequest<{ data: StrapiSupportOrg[] }>(endpoint);
    
    if (data?.data) {
      return data.data.map(transformStrapiSupportOrg);
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch featured support organizations:', error);
    return [];
  }
}

// Specific functions for treatment types
export async function fetchChemotherapyInfo(): Promise<TreatmentInfo[]> {
  return fetchTreatmentInformation('chemotherapy');
}

export async function fetchRadiationInfo(): Promise<TreatmentInfo[]> {
  return fetchTreatmentInformation('radiation');
}

export async function fetchSurgeryInfo(): Promise<TreatmentInfo[]> {
  return fetchTreatmentInformation('surgery');
}

// Specific functions for campaign types
export async function fetchActiveCampaigns(): Promise<FundraisingCampaign[]> {
  try {
    const endpoint = '/api/fundraising-campaigns?filters[isActive][$eq]=true&filters[endDate][$gt]=' + new Date().toISOString() + '&sort=startDate:desc';
    
    const data = await strapiRequest<{ data: StrapiFundraisingCampaign[] }>(endpoint);
    
    if (data?.data) {
      return data.data.map(transformStrapiFundraisingCampaign);
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch active campaigns:', error);
    return [];
  }
}

export async function fetchFeaturedCampaigns(): Promise<FundraisingCampaign[]> {
  try {
    const endpoint = '/api/fundraising-campaigns?filters[isActive][$eq]=true&filters[featured][$eq]=true&sort=startDate:desc';
    
    const data = await strapiRequest<{ data: StrapiFundraisingCampaign[] }>(endpoint);
    
    if (data?.data) {
      return data.data.map(transformStrapiFundraisingCampaign);
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch featured campaigns:', error);
    return [];
  }
}
