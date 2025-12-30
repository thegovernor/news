# Sanity Studio Deployment Guide

This guide explains how to deploy your Sanity Studio as a standalone application.

## Prerequisites

1. **Sanity Account**: You need a Sanity account with access to your project
2. **Environment Variables**: You MUST set the following environment variables before deploying:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
   - `NEXT_PUBLIC_SANITY_DATASET` - Your dataset name (usually "production")

## Setting Up Environment Variables

### Option 1: Using .env.local file (Recommended)

1. Edit your `.env.local` file and add your actual Sanity project values.

   **For standalone Sanity Studio deployments, use the `SANITY_STUDIO_` prefix:**
   ```bash
   SANITY_STUDIO_PROJECT_ID=your-actual-project-id
   SANITY_STUDIO_DATASET=production
   ```

   **Alternatively, you can use `NEXT_PUBLIC_SANITY_` prefix (works for both Next.js and standalone):**
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

   **Note:** The code supports both prefixes, but `SANITY_STUDIO_*` is preferred for standalone deployments.

2. The Sanity CLI will automatically read these variables from `.env.local` when you run `sanity deploy`

### Option 2: Export environment variables directly

Before running `sanity deploy`, export the variables in your terminal:

```bash
# Using SANITY_STUDIO_ prefix (preferred for standalone deployments)
export SANITY_STUDIO_PROJECT_ID=your-project-id
export SANITY_STUDIO_DATASET=production
sanity deploy
```

Or using `NEXT_PUBLIC_SANITY_` prefix:

```bash
export NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
export NEXT_PUBLIC_SANITY_DATASET=production
sanity deploy
```

### Finding Your Sanity Project ID and Dataset

1. Go to https://manage.sanity.io
2. Select your project
3. The Project ID is shown in the project settings
4. The Dataset name is typically "production" (or "development" if you're using a dev dataset)

## Deployment Steps

### 1. Login to Sanity CLI

Run the following command and follow the prompts to authenticate:

```bash
sanity login
```

You can choose to log in with:
- Google
- GitHub  
- Email/Password

### 2. Deploy the Studio

**IMPORTANT**: Make sure your environment variables are set (see above) before running this command.

Once logged in, deploy your Studio:

```bash
sanity deploy
```

During deployment, you'll be prompted to:
- Choose a unique hostname for your Studio (e.g., `your-project-name.sanity.studio`)
- Confirm the deployment

### 3. Access Your Studio

After successful deployment, your Studio will be available at:
```
https://your-hostname.sanity.studio
```

## Configuration Notes

- The Studio is configured to work at `/studio` when embedded in Next.js
- For standalone deployment, the Studio will be at the root of the deployed URL
- If you want to change the base path for standalone deployment, set the `SANITY_STUDIO_BASE_PATH` environment variable before deploying

## Optional: Unattended Deployment

If you want to deploy without prompts (useful for CI/CD):

```bash
sanity deploy --yes
```

Note: You'll need to set up authentication tokens for unattended deployments in CI/CD environments.

## Additional Commands

- **Check deployment status**: Visit your project at https://manage.sanity.io
- **Undeploy Studio**: `sanity undeploy`
- **Build only (without deploy)**: `sanity build`

## Troubleshooting

### Missing Environment Variable Error

If you see an error like `Missing environment variable: NEXT_PUBLIC_SANITY_DATASET`:

1. **Check your `.env.local` file exists** and contains the required variables:
   ```bash
   cat .env.local
   ```

2. **For standalone deployments, use `SANITY_STUDIO_` prefix** (the code supports both `SANITY_STUDIO_*` and `NEXT_PUBLIC_SANITY_*`):
   ```bash
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   ```

3. **Make sure you're in the project root** when running `sanity deploy`

4. **Try exporting variables directly** before deploying:
   ```bash
   export SANITY_STUDIO_PROJECT_ID=your-project-id
   export SANITY_STUDIO_DATASET=production
   sanity deploy
   ```

5. **Create a `.env.production` file** - Sanity Studio also loads from this file during deployment:
   ```bash
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   ```

### Permission Errors

If you encounter permission errors:
1. Make sure you're logged in: `sanity login`
2. Verify you have the correct project permissions in Sanity Management Console
3. Check that your environment variables are correctly set

### Other Issues

- **Build fails**: Make sure all dependencies are installed: `npm install`
- **Studio not loading**: Check the browser console for specific error messages
- **Wrong project/dataset**: Verify your environment variables match your Sanity project settings


