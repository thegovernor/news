import { type SchemaTypeDefinition } from 'sanity'
import article from './article'
import writer from './writer'
import tweet from './tweet'
import about from './about'
import contact from './contact'
import headerMenu from './header-menu'
import footerMenu from './footer-menu'
import rssFeed from './rss-feed'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, writer, tweet, about, contact, headerMenu, footerMenu, rssFeed],
}
