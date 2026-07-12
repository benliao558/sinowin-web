import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'SINOWIN CMS',

  projectId,
  dataset,

  basePath: '/studio',

  schema,

  plugins: [
    structureTool({ structure }),
    // Lets editors run raw GROQ queries from within Studio -- handy for
    // debugging, has no effect on the public site.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
