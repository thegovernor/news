# Sanity Webhook Setup for On-Demand Revalidation

This guide explains how to set up a Sanity webhook to trigger automatic revalidation when content is updated, so your production site updates immediately without waiting for the 60-second revalidation period.

## Prerequisites

1. Your Next.js app deployed on Vercel (or another platform)
2. A Sanity project with content
3. Access to your Vercel project settings

## Step 1: Generate a Revalidation Secret

1. Generate a secure random string to use as your webhook secret. You can use:
   ```bash
   openssl rand -base64 32
   ```
   Or use any secure random string generator.

2. **Add the secret to Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add a new variable:
     - **Name:** `SANITY_REVALIDATE_SECRET`
     - **Value:** Your generated secret
     - **Environment:** Production (and Preview if needed)
   - Click **Save**

## Step 2: Get Your Webhook URL

Your webhook URL will be:
```
https://your-domain.com/api/revalidate?secret=YOUR_SECRET
```

Replace:
- `your-domain.com` with your actual Vercel deployment domain
- `YOUR_SECRET` with the secret you generated in Step 1

**Example:**
```
https://my-news-site.vercel.app/api/revalidate?secret=abc123xyz789
```

## Step 3: Configure the Webhook in Sanity

1. **Go to Sanity Management Console:**
   - Visit https://manage.sanity.io
   - Select your project

2. **Navigate to Webhooks:**
   - Go to **API** → **Webhooks** (or **Settings** → **Webhooks**)

3. **Create a New Webhook:**
   - Click **Create webhook** or **Add webhook**
   - Fill in the details:
     - **Name:** `Next.js Revalidation` (or any name you prefer)
     - **URL:** Your webhook URL from Step 2
     - **Dataset:** Select your dataset (usually "production")
     - **Trigger on:** Select:
       - ✅ **Create**
       - ✅ **Update**
       - ✅ **Delete**
     - **Filter:** Leave empty (or add a filter if you only want to revalidate specific document types)
     - **HTTP method:** `POST`
     - **API version:** Use the latest version
     - **Secret:** Leave empty (we're using query parameter instead)
     - **Include drafts:** Unchecked (unless you want to revalidate on draft changes)

4. **Save the Webhook:**
   - Click **Save** or **Create webhook**

## Step 4: Test the Webhook

1. **Update content in Sanity Studio:**
   - Make a small change to an article or any content
   - Publish the changes

2. **Check Vercel logs:**
   - Go to your Vercel project dashboard
   - Navigate to **Deployments** → Select your latest deployment → **Functions** → `api/revalidate`
   - Check the logs to see if the webhook was called successfully

3. **Verify the update:**
   - Visit your production site
   - The content should update immediately (or within a few seconds)

## Troubleshooting

### Webhook Not Triggering

1. **Check the webhook URL:**
   - Make sure the URL is correct and accessible
   - Test it manually: `curl -X POST "https://your-domain.com/api/revalidate?secret=YOUR_SECRET"`

2. **Check Vercel logs:**
   - Look for any errors in the function logs
   - Check if the secret matches

3. **Verify environment variables:**
   - Make sure `SANITY_REVALIDATE_SECRET` is set in Vercel
   - Ensure it's set for the correct environment (Production)

### Content Still Not Updating

1. **Check revalidation settings:**
   - Make sure `export const revalidate = 60` is set on your pages
   - The webhook triggers immediate revalidation, but pages also have a 60-second fallback

2. **Clear browser cache:**
   - Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
   - The content might be cached in your browser

3. **Check CDN cache:**
   - Vercel's CDN might cache pages
   - The webhook should bypass this, but if issues persist, check Vercel's cache settings

### Security Notes

- **Never commit the secret to git:** The secret should only be in Vercel's environment variables
- **Use HTTPS:** Always use HTTPS for webhook URLs
- **Rotate secrets:** If you suspect the secret is compromised, generate a new one and update both Vercel and Sanity

## How It Works

1. When you update content in Sanity Studio and publish it, Sanity sends a POST request to your webhook URL
2. The webhook handler (`/app/api/revalidate/route.ts`) receives the request
3. It verifies the secret to ensure the request is legitimate
4. It calls `revalidatePath()` for the relevant pages based on the document type
5. Next.js regenerates those pages with the new content
6. The updated content is immediately available on your production site

## Alternative: Using Tag-Based Revalidation

If you prefer tag-based revalidation instead of path-based, you can modify the webhook handler to use `revalidateTag()` instead. This requires updating your queries to use tags, which provides more granular control over what gets revalidated.

