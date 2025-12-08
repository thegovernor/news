import { getAllArticles } from "@/lib/sanity/queries";
import { ArticlesList } from "@/components/articles/articles-list";

export const metadata = {
  title: "المقالات - أخبار",
  description: "جميع المقالات والأخبار والتقارير الإخبارية",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <main className="min-h-screen bg-background">
      <ArticlesList articles={articles} />
    </main>
  );
}

