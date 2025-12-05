import { type SchemaTypeDefinition } from 'sanity'
import article from './article'
import category from './category'
import writer from './writer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, category, writer],
}
