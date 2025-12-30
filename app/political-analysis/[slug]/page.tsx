import { getPoliticalAnalysisArticleBySlug } from "@/lib/sanity/queries";
import { PoliticalAnalysisArticleDetail } from "@/components/political-analysis/article-detail";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const article = await getPoliticalAnalysisArticleBySlug(decodedSlug);
  
  if (!article) {
    return {
      title: "المقال غير موجود - أخبار",
    };
  }

  return {
    title: `${article.title} - تحليلات سياسية - أخبار`,
    description: article.excerpt || article.title,
  };
}

export default async function PoliticalAnalysisArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  console.log("Original slug:", slug);
  console.log("Decoded slug:", decodedSlug);
  
  const article = await getPoliticalAnalysisArticleBySlug(decodedSlug);

  if (!article) {
    console.log("Article not found for slug:", decodedSlug);
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <PoliticalAnalysisArticleDetail article={article} />
    </main>
  );
}

