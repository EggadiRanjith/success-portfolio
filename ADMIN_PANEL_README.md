# Admin Panel Documentation

## Overview

The admin panel allows you to manage all portfolio content dynamically without hardcoding. It's password-protected and only accessible via direct URL.

## Access

**URL**: `/admin`

**Default Password**: `admin123` (Change this in `.env.local`)

The admin panel is **NOT linked** from the main site navigation - it's only accessible by typing the URL directly.

## Features

### 1. Password Protection
- Access via `/admin` URL
- Password stored in environment variable: `NEXT_PUBLIC_ADMIN_PASSWORD`
- Session expires after 24 hours
- No links from main site (hidden from navigation)

### 2. Admin Dashboard (`/admin/dashboard`)

After logging in, you'll see a dashboard with 6 sections:

#### **Personal Info**
- Full Name
- Professional Title
- Description/Bio
- Email, Phone, Location
- Portfolio URL
- Social Links (GitHub, LinkedIn, LeetCode, Twitter)

#### **Education**
- Add/Edit/Delete education entries
- Degree, Institution, Location
- Start and End dates

#### **Certifications**
- Add/Edit/Delete certifications
- Name, Issuer, Date
- Credential ID, Verification Link

#### **Skills**
- Organize skills by category
- Add/Remove skill categories
- Add/Remove individual skills

#### **Projects**
- Add/Edit/Delete projects
- Title, Description, Long Description
- Image URL, Tags, Category, Year
- GitHub URL, Live URL
- Featured flag
- Technologies, Features, Challenges, Solutions, Results

#### **Statistics**
- Production APIs count
- Years Experience
- Cloud Deployments
- LeetCode Solved

## Data Storage

All data is stored in **localStorage** with key: `portfolio_admin_data`

- Data persists across browser sessions
- Changes are saved immediately when you click "Save Changes"
- Reset button restores default data

## Setup

1. **Set Admin Password** (Optional but Recommended):
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
   ```

2. **Access Admin Panel**:
   - Navigate to: `http://localhost:3000/admin`
   - Enter password
   - Start editing!

## Usage

1. Go to `/admin`
2. Enter password
3. Navigate to `/admin/dashboard`
4. Select a section from the sidebar
5. Edit the fields
6. Click "Save Changes" button (top right)
7. Changes are immediately saved to localStorage
8. Refresh the main site to see changes

## Security Notes

⚠️ **Important**: 
- Change the default password in production
- Use environment variables for the password
- The admin panel is client-side only (localStorage)
- For production, consider adding server-side authentication
- Admin routes are not indexed by search engines

## Data Structure

All data follows this structure (see `lib/adminData.ts`):

```typescript
{
  personalInfo: { name, title, description, email, phone, location, url, links },
  education: [{ degree, institution, location, startDate, endDate }],
  certifications: [{ name, issuer, date, credentialId, verificationLink }],
  skills: [{ category, items: [] }],
  projects: [{ id, title, description, image, tags, category, year, ... }],
  stats: { productionAPIs, yearsExperience, cloudDeployments, leetcodeSolved }
}
```

## Next Steps

To make the main site read from this dynamic data:

1. Update components to use `getPortfolioData()` from `lib/adminData.ts`
2. Replace hardcoded constants with dynamic data
3. Components will automatically reflect admin changes

## Example: Updating Hero Section

Instead of:
```typescript
import { HERO_CONTENT } from "@/constants/heroSection";
```

Use:
```typescript
import { getPortfolioData } from "@/lib/adminData";
const data = getPortfolioData();
const heroContent = data.personalInfo;
```

---

**Note**: Currently, the admin panel saves data but the main site still uses hardcoded constants. To fully enable dynamic content, update the components to read from `getPortfolioData()`.

