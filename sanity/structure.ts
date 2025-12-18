import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Articles grouped by category
      S.listItem()
        .title('مقالات')
        .child(
          S.list()
            .title('مقالات حسب الفئة')
            .items([
              S.listItem()
                .title('جميع المقالات')
                .child(
                  S.documentList()
                    .title('جميع المقالات')
                    .filter('_type == "article"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.divider(),
              S.listItem()
                .title('مقالات')
                .child(
                  S.documentList()
                    .title('مقالات')
                    .filter('_type == "article" && category->title == "مقالات"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('تحليلات سياسية')
                .child(
                  S.documentList()
                    .title('تحليلات سياسية')
                    .filter('_type == "article" && category->title == "تحليلات سياسية"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('بريد ودك')
                .child(
                  S.documentList()
                    .title('بريد ودك')
                    .filter('_type == "article" && category->title == "بريد ودك"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('سلة ودك')
                .child(
                  S.documentList()
                    .title('سلة ودك')
                    .filter('_type == "article" && category->title == "سلة ودك"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
            ])
        ),
      S.divider(),
      // Categories - Read-only (no creation allowed)
      S.listItem()
        .title('الفئات')
        .child(
          S.documentList()
            .title('الفئات')
            .filter('_type == "category"')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
            .canHandleIntent((intentName, params) => {
              // Block create and delete intents
              if (intentName === 'create' && params?.type === 'category') {
                return false
              }
              if (intentName === 'delete' && params?.type === 'category') {
                return false
              }
              // Allow edit and view
              return true
            })
            .initialValueTemplates([]) // Remove create button by providing no templates
        ),
      S.divider(),
      // Other document types (excluding article and category)
      ...S.documentTypeListItems().filter(
        (listItem) => !['article', 'category'].includes(listItem.getId() || '')
      ),
    ])
