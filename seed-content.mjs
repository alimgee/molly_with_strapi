#!/usr/bin/env node

/**
 * Molly Rose Foundation - Content Seeding Script
 * This script adds sample content to demonstrate the organized admin panel
 */

import axios from 'axios';

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN; // We'll need to create this

// Sample content for the foundation
const sampleContent = {
  // Cancer Information
  cancerInformation: [
    {
      data: {
        title: "Understanding Childhood Leukemia",
        content: "Leukemia is the most common type of cancer in children and teens, accounting for almost 1 out of 3 cancers. Most childhood leukemias are acute lymphocytic leukemia (ALL). Early detection and modern treatment have significantly improved outcomes for children with leukemia.",
        category: "Types",
        medicallyReviewed: true,
        ageGroup: "all",
        symptoms: ["Fatigue and weakness", "Fever", "Easy bruising or bleeding", "Bone or joint pain", "Swollen lymph nodes"],
        resources: ["https://www.cancer.org/cancer/leukemia-in-children.html", "https://www.childrencancer.ie/leukemia"],
        publishedAt: new Date().toISOString()
      }
    },
    {
      data: {
        title: "Childhood Brain Tumors: What Parents Need to Know",
        content: "Brain and central nervous system tumors are the second most common cancers in children. Understanding the signs and symptoms can help with early detection. Treatment often involves a team of specialists including neurosurgeons, oncologists, and radiation therapists.",
        category: "Types",
        medicallyReviewed: true,
        ageGroup: "all",
        symptoms: ["Persistent headaches", "Nausea and vomiting", "Vision or hearing changes", "Balance problems", "Personality changes"],
        resources: ["https://www.cancer.org/cancer/brain-spinal-cord-tumors-children.html"],
        publishedAt: new Date().toISOString()
      }
    }
  ],

  // Treatment Information
  treatmentInformation: [
    {
      data: {
        title: "Chemotherapy for Children: A Parent's Guide",
        content: "Chemotherapy uses powerful medicines to treat cancer by destroying cancer cells or preventing them from growing. While the treatment can be challenging, understanding what to expect can help families prepare and cope better during this difficult time.",
        category: "Chemotherapy",
        treatmentType: "Medical",
        ageGroup: "all",
        sideEffects: ["Nausea and vomiting", "Hair loss", "Fatigue", "Increased infection risk", "Mouth sores"],
        duration: "Varies by cancer type, typically 6 months to 3 years",
        supportTips: [
          "Keep a treatment diary to track side effects",
          "Maintain good nutrition with help from a dietitian", 
          "Stay active when possible with gentle exercise",
          "Connect with other families going through similar experiences"
        ],
        publishedAt: new Date().toISOString()
      }
    }
  ],

  // Support Organizations
  supportOrganizations: [
    {
      data: {
        name: "Irish Cancer Society",
        description: "The Irish Cancer Society provides support, information and advocacy for people affected by cancer in Ireland, including specialized services for children and families.",
        category: "National",
        services: ["Financial assistance", "Family support", "Education resources", "Accommodation support"],
        location: "Ireland (Nationwide)",
        contactInfo: {
          phone: "1800 200 700",
          email: "helpline@irishcancer.ie",
          website: "https://www.cancer.ie"
        },
        featured: true
      }
    },
    {
      data: {
        name: "Barretstown",
        description: "Barretstown provides therapeutic recreation programmes for children and families affected by serious illness, including cancer.",
        category: "Support Programs",
        services: ["Therapeutic camps", "Family programs", "Outreach services", "Hospital outreach"],
        location: "County Kildare, Ireland",
        contactInfo: {
          phone: "045 864 115",
          email: "info@barretstown.org",
          website: "https://www.barretstown.org"
        },
        featured: true
      }
    }
  ],

  // Events
  events: [
    {
      data: {
        title: "Molly Rose Foundation Annual Gala 2025",
        description: "Join us for an elegant evening of hope, inspiration, and fundraising for childhood cancer research. The gala will feature dinner, entertainment, and a silent auction with all proceeds supporting Irish families affected by childhood cancer.",
        eventType: "Fundraising",
        startDate: "2025-09-15T19:00:00.000Z",
        endDate: "2025-09-15T23:00:00.000Z",
        location: "Mansion House, Dublin",
        registrationRequired: true,
        maxAttendees: 300,
        ticketPrice: 150,
        featured: true
      }
    },
    {
      data: {
        title: "Gold Ribbon Awareness Walk Dublin",
        description: "Walk with us through Phoenix Park to raise awareness for childhood cancer. This family-friendly event includes activities for children, information stands, and opportunities to connect with other families.",
        eventType: "Awareness",
        startDate: "2025-10-05T10:00:00.000Z", 
        endDate: "2025-10-05T14:00:00.000Z",
        location: "Phoenix Park, Dublin",
        registrationRequired: true,
        maxAttendees: 1000,
        ticketPrice: 25,
        featured: true
      }
    }
  ],

  // Testimonials
  testimonials: [
    {
      data: {
        authorName: "Sarah Murphy",
        content: "When our daughter Emma was diagnosed with leukemia at age 6, we felt completely lost. The Molly Rose Foundation provided not just practical support, but hope. Their resources helped us understand the treatment process, and connecting with other families showed us we weren't alone. Three years later, Emma is in remission and thriving.",
        type: "Parent",
        relationship: "Mother of childhood cancer survivor",
        featured: true,
        publishedAt: new Date().toISOString()
      }
    },
    {
      data: {
        authorName: "Dr. Michael O'Brien",
        content: "As a pediatric oncologist at Children's Health Ireland, I've seen firsthand the incredible impact the Molly Rose Foundation has on families. Their educational resources are evidence-based and accessible, helping families make informed decisions during incredibly difficult times.",
        type: "Medical Professional",
        relationship: "Pediatric Oncologist, Children's Health Ireland",
        featured: true,
        publishedAt: new Date().toISOString()
      }
    }
  ],

  // Articles
  articles: [
    {
      data: {
        title: "New Immunotherapy Research Offers Hope for Childhood Cancer",
        content: "Recent breakthrough research in immunotherapy is showing promising results for children with certain types of cancer. The treatment works by helping the child's own immune system recognize and fight cancer cells more effectively. Clinical trials are ongoing at several Irish hospitals.",
        excerpt: "Groundbreaking immunotherapy research brings new hope to childhood cancer treatment in Ireland.",
        category: "Medical Research",
        author: "Medical Research Team",
        featured: true,
        tags: ["research", "immunotherapy", "treatment", "clinical trials"],
        publishedAt: new Date().toISOString()
      }
    }
  ]
};

// Function to create content via API
async function createContent(contentType, data) {
  try {
    const response = await axios.post(
      `${STRAPI_URL}/api/${contentType}`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(`✅ Created ${contentType}: ${data.data.title || data.data.name}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Failed to create ${contentType}:`, error.response?.data || error.message);
    return null;
  }
}

// Function to seed all content
async function seedContent() {
  console.log('🌱 Starting content seeding for Molly Rose Foundation...\n');

  // Check if API token is provided
  if (!API_TOKEN) {
    console.log('⚠️  API Token not provided. You can:');
    console.log('1. Create an API token in Strapi admin panel (Settings > API Tokens)');
    console.log('2. Set STRAPI_API_TOKEN environment variable');
    console.log('3. Add content manually through the admin panel using the sample data\n');
    return;
  }

  try {
    // Test API connection
    await axios.get(`${STRAPI_URL}/api/articles`);
    console.log('🔗 Connected to Strapi API\n');

    // Seed Cancer Information
    console.log('📋 Adding Cancer Information...');
    for (const item of sampleContent.cancerInformation) {
      await createContent('cancer-informations', item);
    }

    // Seed Treatment Information  
    console.log('\n💊 Adding Treatment Information...');
    for (const item of sampleContent.treatmentInformation) {
      await createContent('treatment-informations', item);
    }

    // Seed Support Organizations
    console.log('\n🤝 Adding Support Organizations...');
    for (const item of sampleContent.supportOrganizations) {
      await createContent('support-organizations', item);
    }

    // Seed Events
    console.log('\n📅 Adding Events...');
    for (const item of sampleContent.events) {
      await createContent('events', item);
    }

    // Seed Testimonials
    console.log('\n💬 Adding Testimonials...');
    for (const item of sampleContent.testimonials) {
      await createContent('testimonials', item);
    }

    // Seed Articles
    console.log('\n📰 Adding Articles...');
    for (const item of sampleContent.articles) {
      await createContent('articles', item);
    }

    console.log('\n🎉 Content seeding completed successfully!');
    console.log('📱 Visit http://localhost:1337/admin to see your organized content');

  } catch (error) {
    console.error('❌ Error seeding content:', error.message);
    console.log('💡 Make sure Strapi is running on http://localhost:1337');
  }
}

// Export for use as module or run directly
export { sampleContent, createContent };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedContent();
}

console.log('\n📖 Sample Data Available');
console.log('To add this content to your CMS:');
console.log('1. Create an API token in Strapi Admin > Settings > API Tokens');
console.log('2. Run: STRAPI_API_TOKEN=your_token node seed-content.mjs');
console.log('3. Or add manually through the admin panel at http://localhost:1337/admin');
