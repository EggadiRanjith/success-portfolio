# 📊 Analytics Setup Guide

## Quick Start

The Analytics component has been integrated into your portfolio and supports multiple analytics providers.

## Supported Providers

### 1. Vercel Analytics (Automatic)
When deployed to Vercel, analytics are automatically enabled. No configuration needed!

**Installation (if needed):**
```bash
npm install @vercel/analytics
```

### 2. Plausible Analytics (Privacy-First, Recommended)
Lightweight, privacy-focused analytics without cookies.

**Setup:**
1. Sign up at https://plausible.io
2. Add your domain to Plausible
3. Set environment variable:
   ```bash
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
   ```

**Benefits:**
- ✅ No cookies, GDPR compliant
- ✅ Lightweight (< 1KB)
- ✅ Privacy-focused
- ✅ Simple dashboard

### 3. Google Analytics 4 (Optional)
For advanced tracking and integration with Google services.

**Setup:**
1. Create GA4 property at https://analytics.google.com
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Set environment variable:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## Environment Variables

Create a `.env.local` file in the frontend directory:

```bash
# Plausible Analytics (recommended)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com

# Google Analytics 4 (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Note:** `.env.local` is in `.gitignore` and won't be committed to version control.

## Custom Event Tracking

Track custom events anywhere in your application:

```typescript
import { trackEvent } from '@/components/Analytics';

// Button clicks
trackEvent('button_click', { 
  button_name: 'contact_form_submit',
  location: 'hero_section' 
});

// Project views
trackEvent('project_view', { 
  project_id: 'my-awesome-project',
  source: 'featured_section' 
});

// Downloads
trackEvent('download', { 
  file: 'resume.pdf' 
});

// Form submissions
trackEvent('form_submit', { 
  form_name: 'contact',
  success: true 
});
```

## Page View Tracking

Page views are tracked automatically on route changes. For manual tracking:

```typescript
import { trackPageView } from '@/components/Analytics';

// Track specific page
trackPageView('/projects/my-project');

// Track current page
trackPageView();
```

## Testing Analytics

### Development Mode
Analytics events are logged to console in development:
```javascript
console.debug('Analytics event:', eventName, properties);
```

### Production Mode
1. Deploy your site
2. Visit your analytics dashboard
3. Check real-time visitors
4. Verify events are being tracked

## Best Practices

1. **Track Meaningful Events**
   - User interactions (clicks, downloads)
   - Engagement (time on page, scroll depth)
   - Conversions (contact form, project views)

2. **Don't Over-Track**
   - Focus on actionable metrics
   - Respect user privacy
   - Avoid tracking personal information

3. **Test Before Deploying**
   - Verify events in console
   - Check network requests
   - Validate data in dashboard

## Privacy Considerations

- ✅ No personal information collected
- ✅ No cookies used (Plausible)
- ✅ GDPR compliant
- ✅ Respects user privacy
- ✅ Transparent data collection

## Troubleshooting

### Events Not Showing Up
1. Check environment variables are set
2. Verify domain matches exactly
3. Check browser console for errors
4. Ensure analytics script loaded
5. Wait 2-3 minutes for data to appear

### Script Blocked
If using ad blocker:
1. Whitelist your analytics domain
2. Or use proxy (Plausible supports this)

### Multiple Providers
You can use multiple providers simultaneously:
- Vercel Analytics for performance
- Plausible for privacy-focused tracking
- GA4 for advanced analysis

## Dashboard Access

### Plausible
- Dashboard: https://plausible.io/yourdomain.com
- Real-time visitors
- Top pages
- Traffic sources
- Devices & browsers

### Vercel Analytics
- Dashboard: https://vercel.com/dashboard/analytics
- Performance metrics
- Audience insights
- Core Web Vitals

### Google Analytics
- Dashboard: https://analytics.google.com
- Advanced reports
- Custom dimensions
- Goal tracking

## Need Help?

- Plausible Docs: https://plausible.io/docs
- Vercel Analytics: https://vercel.com/docs/analytics
- GA4 Docs: https://support.google.com/analytics

---

**Remember:** Analytics are tools for improvement, not surveillance. Use responsibly! 📊

