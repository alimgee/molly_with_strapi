# 🚀 Molly Rose Foundation CMS - Quick Setup Guide

## 📋 Overview
This guide will help you complete the setup of your organized Strapi admin panel with sample content and user roles.

## 🌱 Step 1: Add Sample Content

### Option A: Manual Entry (Recommended for Learning)
1. **Open Admin Panel**: http://localhost:1337/admin
2. **Navigate through each content type** and add sample entries:

#### 📋 Cancer Information
- Go to **Content Manager > Cancer Information > Create new entry**
- Use data from `sample-foundation-data.js` or `seed-content.mjs`
- Example entry:
  - **Title**: "Understanding Childhood Leukemia"
  - **Category**: "Types"
  - **Medically Reviewed**: ✅ True
  - **Age Group**: "all"
  - **Symptoms**: Add multiple entries (Fatigue, Fever, Easy bruising, etc.)

#### 💊 Treatment Information
- **Title**: "Chemotherapy for Children: A Parent's Guide"
- **Category**: "Chemotherapy"
- **Treatment Type**: "Medical"
- **Side Effects**: List common side effects
- **Duration**: "Varies by cancer type, typically 6 months to 3 years"

#### 🤝 Support Organizations
- **Name**: "Irish Cancer Society"
- **Category**: "National"
- **Location**: "Ireland (Nationwide)"
- **Services**: Financial assistance, Family support, etc.
- **Featured**: ✅ True

#### 📅 Events
- **Title**: "Molly Rose Foundation Annual Gala 2025"
- **Event Type**: "Fundraising"
- **Start Date**: September 15, 2025, 7:00 PM
- **Location**: "Mansion House, Dublin"
- **Featured**: ✅ True

#### 💬 Testimonials
- **Author Name**: "Sarah Murphy"
- **Type**: "Parent"
- **Content**: Add heartfelt story from sample data
- **Featured**: ✅ True

### Option B: API Seeding (Advanced)
1. **Create API Token**:
   - Go to **Settings > API Tokens > Create new API Token**
   - Name: "Content Seeding"
   - Token type: "Full access"
   - Save the token

2. **Run Seeding Script**:
   ```bash
   cd /home/asimov/programming/molly_strapi
   STRAPI_API_TOKEN=your_token_here node seed-content.mjs
   ```

## 👥 Step 2: Set Up User Roles

### 2.1 Create Custom Roles
1. **Navigate to Role Settings**: http://localhost:1337/admin/settings/users-permissions/roles

2. **Create These 5 Roles**:

#### 🎯 Content Editor
- **Permissions**:
  - ✅ Articles: Create, Read, Update, Delete
  - ✅ Events: Create, Read, Update, Delete
  - ✅ Campaigns: Create, Read, Update, Delete
  - ✅ Volunteers: Create, Read, Update, Delete
  - ⚠️ Medical Content: Create, Read, Update (NO Delete/Publish)
  - ✅ Media: Upload, Update

#### 🩺 Medical Reviewer
- **Permissions**:
  - ✅ Cancer Information: Full Access (including Publish)
  - ✅ Treatment Information: Full Access (including Publish)
  - 👁️ Other Content: Read Only
  - 👁️ Media: Read Only

#### 🤝 Volunteer Coordinator
- **Permissions**:
  - ✅ Volunteer Opportunities: Full Access
  - ✅ Events: Full Access
  - ✅ Testimonials: Full Access
  - 👁️ Other Content: Read Only
  - ✅ Media: Upload, Update

#### 📢 Marketing Manager
- **Permissions**:
  - ✅ Awareness Campaigns: Full Access
  - ✅ Fundraising Campaigns: Full Access
  - ✅ Articles: Full Access
  - ✅ Events: Full Access
  - 👁️ Medical Content: Read Only
  - ✅ Media: Full Access

#### 👑 Foundation Admin
- **Permissions**:
  - ✅ Everything: Full Access
  - ✅ Admin Settings: Full Access

### 2.2 Create Users
1. **Go to Settings > Administration Panel > Users**
2. **Create users for each role**:
   - admin@mollyrosefoundation.org (Foundation Admin)
   - medical@mollyrosefoundation.org (Medical Reviewer)
   - content@mollyrosefoundation.org (Content Editor)
   - volunteers@mollyrosefoundation.org (Volunteer Coordinator)
   - marketing@mollyrosefoundation.org (Marketing Manager)

## 🎨 Step 3: Organize Content Display

### 3.1 Customize List Views
The admin panel is already configured with optimized list views:

- **Cancer Information**: Shows Title, Category, Published Date
- **Events**: Shows Title, Event Type, Start Date, Location
- **Testimonials**: Shows Author Name, Type, Featured Status
- **Campaigns**: Shows Title, Status, Start/End Dates

### 3.2 Set Up Content Workflow
1. **Medical Content Approval**:
   - Content Editors create drafts
   - Medical Reviewers approve and publish
   - Mark content as "Medically Reviewed"

2. **Event Planning**:
   - Volunteer Coordinators create events
   - Marketing Managers handle promotion
   - Foundation Admins approve budgets

## 🔄 Step 4: Test the System

### 4.1 Test Each Role
1. **Log in as each user type**
2. **Verify permissions work correctly**:
   - Content Editors can't publish medical info
   - Medical Reviewers can only edit medical content
   - Volunteer Coordinators focus on events/volunteers

### 4.2 Test Content Flow
1. **Create a piece of medical content as Content Editor**
2. **Review and approve as Medical Reviewer**
3. **Create an event as Volunteer Coordinator**
4. **Create a campaign as Marketing Manager**

## 📊 Step 5: Monitor and Maintain

### 5.1 Regular Reviews
- **Medical Content**: Review every 6 months
- **Events**: Update as scheduled
- **Organizations**: Verify contact information quarterly
- **Testimonials**: Refresh regularly with new stories

### 5.2 Content Guidelines
- **Medical Information**: Always require medical review
- **Events**: Include clear dates, locations, and contact info
- **Testimonials**: Get proper consent before publishing
- **Campaigns**: Set clear goals and success metrics

## 🎉 Success Indicators

You'll know the system is working well when:
- ✅ Content is organized by logical categories
- ✅ Each user role can access appropriate content
- ✅ Medical content goes through proper review process
- ✅ Events and campaigns are easy to manage
- ✅ Families can easily find relevant information

## 🆘 Troubleshooting

### Common Issues:
1. **Permission Denied**: Check user role assignments
2. **Content Not Visible**: Verify publication status
3. **API Errors**: Ensure tokens have correct permissions
4. **Role Confusion**: Review role descriptions and adjust

### Need Help?
- **Admin Panel**: http://localhost:1337/admin
- **Documentation**: Check `ADMIN_PANEL_ORGANIZATION.md`
- **Sample Data**: Review `sample-foundation-data.js`
- **Role Config**: Check `user-roles-config.mjs`

## 🌟 Next Steps

Once basic setup is complete:
1. **Connect Frontend**: Integrate with Next.js website
2. **Add SEO Fields**: Meta descriptions, keywords
3. **Set Up Backup**: Regular database backups
4. **Add Analytics**: Track content performance
5. **Email Integration**: Notifications for content approval

---

**🎯 Goal Achieved**: You now have a professionally organized CMS that supports the Molly Rose Foundation's mission of providing accurate information and support for families affected by childhood cancer!
