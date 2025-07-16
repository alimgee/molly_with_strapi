// Sample Data for Molly Rose Foundation CMS
// This file contains sample content that can be added to demonstrate the organized admin interface

const sampleData = {
  // Medical Information
  cancerInformation: [
    {
      title: "Understanding Childhood Leukemia",
      content: "Leukemia is the most common type of cancer in children and teens, accounting for almost 1 out of 3 cancers. Most childhood leukemias are acute lymphocytic leukemia (ALL).",
      category: "Types",
      medicallyReviewed: true,
      ageGroup: "all",
      symptoms: ["Fatigue", "Fever", "Easy bruising", "Bone pain"],
      resources: ["https://www.cancer.org/cancer/leukemia-in-children.html"],
      publishedAt: new Date().toISOString()
    },
    {
      title: "Childhood Brain Tumors: What Parents Need to Know",
      content: "Brain and central nervous system tumors are the second most common cancers in children. Understanding the signs and symptoms can help with early detection.",
      category: "Types",
      medicallyReviewed: true,
      ageGroup: "all",
      symptoms: ["Headaches", "Nausea", "Vision changes", "Balance problems"],
      resources: ["https://www.cancer.org/cancer/brain-spinal-cord-tumors-children.html"],
      publishedAt: new Date().toISOString()
    }
  ],

  // Treatment Information
  treatmentInformation: [
    {
      title: "Chemotherapy for Children: A Parent's Guide",
      content: "Chemotherapy uses medicines to treat cancer. Learn about what to expect, side effects, and how to help your child through treatment.",
      category: "Chemotherapy",
      treatmentType: "Medical",
      ageGroup: "all",
      sideEffects: ["Nausea", "Hair loss", "Fatigue", "Increased infection risk"],
      duration: "Varies by cancer type, typically 6 months to 3 years",
      supportTips: ["Keep a treatment diary", "Maintain good nutrition", "Stay active when possible"],
      publishedAt: new Date().toISOString()
    }
  ],

  // Support Organizations
  supportOrganizations: [
    {
      name: "Children's Cancer Foundation",
      description: "Providing support and resources for families facing childhood cancer.",
      category: "National",
      services: ["Financial assistance", "Family support", "Education resources"],
      location: "Nationwide",
      contactInfo: {
        phone: "1-800-CCF-HOPE",
        email: "support@ccf.org",
        website: "https://www.ccf.org"
      },
      featured: true
    },
    {
      name: "Ronald McDonald House",
      description: "Providing accommodation and support for families during their child's treatment.",
      category: "Accommodation",
      services: ["Temporary housing", "Meals", "Family support"],
      location: "Multiple locations worldwide",
      contactInfo: {
        phone: "1-800-RMH-CARE",
        website: "https://www.rmhc.org"
      },
      featured: true
    }
  ],

  // Events
  events: [
    {
      title: "Annual Molly Rose Foundation Gala",
      description: "Join us for an evening of hope, inspiration, and fundraising for childhood cancer research.",
      eventType: "Fundraising",
      startDate: "2025-09-15T19:00:00.000Z",
      endDate: "2025-09-15T23:00:00.000Z",
      location: "Grand Ballroom, Dublin",
      registrationRequired: true,
      maxAttendees: 300,
      ticketPrice: 150,
      featured: true
    },
    {
      title: "Awareness Walk for Childhood Cancer",
      description: "Walk together to raise awareness and funds for childhood cancer research.",
      eventType: "Awareness",
      startDate: "2025-10-05T10:00:00.000Z",
      endDate: "2025-10-05T14:00:00.000Z",
      location: "Phoenix Park, Dublin",
      registrationRequired: true,
      maxAttendees: 1000,
      ticketPrice: 25,
      featured: true
    }
  ],

  // Testimonials
  testimonials: [
    {
      authorName: "Sarah Murphy",
      content: "The Molly Rose Foundation provided incredible support during our daughter's treatment. Their resources and community made such a difference.",
      type: "Parent",
      relationship: "Mother of childhood cancer survivor",
      featured: true,
      publishedAt: new Date().toISOString()
    },
    {
      authorName: "Dr. Michael O'Brien",
      content: "The foundation's commitment to raising awareness and supporting families is truly remarkable. Their educational resources are invaluable.",
      type: "Medical Professional",
      relationship: "Pediatric Oncologist",
      featured: true,
      publishedAt: new Date().toISOString()
    }
  ],

  // Awareness Campaigns
  awarenessCampaigns: [
    {
      title: "Gold September - Childhood Cancer Awareness Month",
      description: "Throughout September, we're raising awareness about childhood cancer and supporting families affected by it.",
      goals: ["Increase public awareness", "Raise €50,000 for research", "Support 100 families"],
      status: "Active",
      startDate: "2025-09-01T00:00:00.000Z",
      endDate: "2025-09-30T23:59:59.000Z",
      targetAudience: "General Public",
      socialMediaHashtags: ["#GoldSeptember", "#ChildhoodCancerAwareness", "#MollyRose"]
    }
  ],

  // Fundraising Campaigns
  fundraisingCampaigns: [
    {
      title: "Research Fund 2025",
      description: "Raising funds to support groundbreaking research into childhood cancer treatments.",
      goalAmount: 100000,
      currentAmount: 35000,
      status: "Active",
      startDate: "2025-01-01T00:00:00.000Z",
      endDate: "2025-12-31T23:59:59.000Z",
      beneficiary: "Childhood Cancer Research Institute"
    }
  ],

  // Volunteer Opportunities
  volunteerOpportunities: [
    {
      title: "Event Support Volunteer",
      description: "Help us organize and run fundraising events throughout the year.",
      category: "Events",
      timeCommitment: "5-10 hours per month",
      location: "Dublin area",
      requirements: ["Enthusiastic attitude", "Good communication skills", "Reliability"],
      skills: ["Event planning", "Customer service", "Team work"],
      contactEmail: "volunteers@mollyrosefoundation.org"
    },
    {
      title: "Social Media Assistant",
      description: "Help us spread awareness through social media platforms.",
      category: "Marketing",
      timeCommitment: "2-5 hours per week",
      location: "Remote",
      requirements: ["Social media experience", "Creative writing skills"],
      skills: ["Social media management", "Content creation", "Photography"],
      contactEmail: "marketing@mollyrosefoundation.org"
    }
  ],

  // Articles
  articles: [
    {
      title: "New Research Breakthrough in Childhood Leukemia Treatment",
      content: "Scientists have discovered a new treatment approach that could significantly improve outcomes for children with acute lymphocytic leukemia.",
      excerpt: "Groundbreaking research offers new hope for childhood leukemia patients.",
      category: "Medical Research",
      author: "Medical Team",
      featured: true,
      tags: ["research", "leukemia", "treatment", "breakthrough"],
      publishedAt: new Date().toISOString()
    },
    {
      title: "How to Talk to Children About Cancer",
      content: "When a child is diagnosed with cancer, it can be difficult to know how to discuss the diagnosis and treatment with them and their siblings.",
      excerpt: "Guidance for families on having difficult but important conversations.",
      category: "Family Support",
      author: "Dr. Emma Collins",
      featured: false,
      tags: ["family", "communication", "support", "guidance"],
      publishedAt: new Date().toISOString()
    }
  ]
};

// Instructions for adding this data:
// 1. Log into the Strapi admin panel at http://localhost:1337/admin
// 2. Navigate to each content type
// 3. Add entries manually or use the REST API
// 4. Use this data as templates for real foundation content

console.log('Sample data ready for Molly Rose Foundation CMS');
console.log('Content types with sample data:', Object.keys(sampleData));

export default sampleData;
