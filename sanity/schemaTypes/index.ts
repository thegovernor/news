import { type SchemaTypeDefinition } from 'sanity'
import article from './article'
import category from './category'
import writer from './writer'
import tweet from './tweet'
import about from './about'
import contact from './contact'
import headerMenu from './header-menu'
import footerMenu from './footer-menu'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, category, writer, tweet, about, contact, headerMenu, footerMenu],
}
