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
                    .filter('_type == "article" && category == "مقالات"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('تحليلات سياسية')
                .child(
                  S.documentList()
                    .title('تحليلات سياسية')
                    .filter('_type == "article" && category == "تحليلات سياسية"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('سلة ودك')
                .child(
                  S.documentList()
                    .title('سلة ودك')
                    .filter('_type == "article" && category == "سلة ودك"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('سياسة')
                .child(
                  S.documentList()
                    .title('سياسة')
                    .filter('_type == "article" && category == "سياسة"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('رياضة')
                .child(
                  S.documentList()
                    .title('رياضة')
                    .filter('_type == "article" && category == "رياضة"')
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
