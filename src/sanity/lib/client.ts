import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// Public, read-only client used by the site's pages. The "production"
// dataset has public read access (no token needed) -- confirmed by testing
// unauthenticated GROQ queries against it directly. Writes (migration,
// future Studio edits) go through Sanity's own auth, not this client.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
