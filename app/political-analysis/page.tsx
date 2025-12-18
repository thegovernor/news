import { getPoliticalAnalysisArticles, getCategoryByTitle } from "@/lib/sanity/queries";
import { PoliticalAnalysisArticlesList } from "@/components/political-analysis/articles-list";

export const metadata = {
  title: "تحليلات سياسية - أخبار",
  description: "جميع مقالات التحليلات السياسية",
};

export default async function PoliticalAnalysisPage() {
  const [articles, category] = await Promise.all([
    getPoliticalAnalysisArticles(),
    getCategoryByTitle("تحليلات سياسية"),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <PoliticalAnalysisArticlesList articles={articles} category={category} />
    </main>
  );
}

