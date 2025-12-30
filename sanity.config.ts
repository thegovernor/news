/**
 * This configuration is used for both:
 * - The Sanity Studio mounted on `/app/studio/[[...tool]]/page.tsx` route (Next.js)
 * - Standalone Studio deployment via `sanity deploy`
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {rtlSupport} from './sanity/plugins/rtl-support'

export default defineConfig({
  // For Next.js embedded Studio, basePath is '/studio'
  // For standalone deployment, you can override by setting SANITY_STUDIO_BASE_PATH env var
  basePath: process.env.SANITY_STUDIO_BASE_PATH || '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  // RTL support is handled by the rtlSupport plugin
  plugins: [
    rtlSupport(),
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
