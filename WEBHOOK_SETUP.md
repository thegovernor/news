# Sanity Webhook Setup for On-Demand Revalidation

This guide explains how to set up a Sanity webhook to trigger automatic revalidation when content is updated, so your production site updates **immediately** when you publish changes in Sanity Studio. This bypasses the 60-second revalidation period and ensures instant content updates.

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
https://www.wadkuwait.com/api/revalidate?secret=nsmUCmNiWc1vkP40Mr3GhZKv4
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

### Content Not Updating in Production (But Works in Localhost)

This is the most common issue. Here's how to fix it:

1. **Verify Webhook is Configured in Production:**
   - Go to https://manage.sanity.io
   - Navigate to **API** → **Webhooks**
   - Make sure the webhook URL points to your **production domain**, not localhost
   - Example: `https://your-production-domain.com/api/revalidate?secret=YOUR_SECRET`
   - NOT: `http://localhost:3000/api/revalidate?secret=YOUR_SECRET`

2. **Check Environment Variables in Production:**
   - Go to your Vercel (or hosting platform) dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Verify `SANITY_REVALIDATE_SECRET` is set for **Production** environment
   - The secret must match exactly what's in your webhook URL

3. **Test the Webhook Manually:**
   ```bash
   curl -X POST "https://your-production-domain.com/api/revalidate?secret=YOUR_SECRET" \
     -H "Content-Type: application/json" \
     -d '{"_type":"article","_id":"test"}'
   ```
   - You should get a JSON response with `revalidated: true`
   - If you get an error, check Vercel function logs

4. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → **Deployments**
   - Click on the latest deployment → **Functions** tab
   - Look for `api/revalidate` function logs
   - Check for any errors or failed requests

5. **Verify Webhook is Being Called:**
   - Update an article in Sanity Studio
   - Immediately check Vercel function logs
   - You should see a POST request to `/api/revalidate`
   - If you don't see any requests, the webhook isn't configured correctly in Sanity

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

1. **Verify webhook is working:**
   - Check Vercel function logs to see if webhook is being called
   - Look for successful revalidation messages
   - Test manually: `curl -X POST "https://your-domain.com/api/revalidate?secret=YOUR_SECRET" -H "Content-Type: application/json" -d '{"_type":"article","_id":"test"}'`

2. **Check revalidation settings:**
   - Pages have `export const revalidate = 60` which is fine - the webhook bypasses this
   - The webhook triggers immediate revalidation on-demand

3. **Clear browser cache:**
   - Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
   - The content might be cached in your browser

4. **Check CDN cache:**
   - Vercel's CDN might cache pages
   - The webhook should bypass this, but if issues persist, check Vercel's cache settings

5. **Verify webhook payload:**
   - The webhook now automatically fetches article category information
   - Make sure your Sanity project has proper API access configured

### Security Notes

- **Never commit the secret to git:** The secret should only be in Vercel's environment variables
- **Use HTTPS:** Always use HTTPS for webhook URLs
- **Rotate secrets:** If you suspect the secret is compromised, generate a new one and update both Vercel and Sanity

## How It Works

1. When you update content in Sanity Studio and publish it, Sanity sends a POST request to your webhook URL
2. The webhook handler (`/app/api/revalidate/route.ts`) receives the request
3. It verifies the secret to ensure the request is legitimate
4. For articles, it fetches the article's category from Sanity to determine the correct path
5. It calls `revalidatePath()` for the relevant pages based on the document type and category
6. Next.js regenerates those pages with the new content **immediately**
7. The updated content is available on your production site within seconds

**Note:** The webhook now intelligently determines which paths to revalidate based on the article's category, ensuring all relevant pages are updated instantly.

## Alternative: Using Tag-Based Revalidation

If you prefer tag-based revalidation instead of path-based, you can modify the webhook handler to use `revalidateTag()` instead. This requires updating your queries to use tags, which provides more granular control over what gets revalidated.




