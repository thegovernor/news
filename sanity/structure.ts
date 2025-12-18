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
      // Other document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['article'].includes(listItem.getId() || '')
      ),
    ])
