import { getArticleBySlug } from "@/lib/sanity/queries";
import { ArticleDetail } from "@/components/articles/article-detail";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const article = await getArticleBySlug(decodedSlug);
  
  if (!article) {
    return {
      title: "المقال غير موجود - أخبار",
    };
  }

  return {
    title: `${article.title} - مقالات - أخبار`,
    description: article.excerpt || article.title,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  const article = await getArticleBySlug(decodedSlug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <ArticleDetail article={article} />
    </main>
  );
}

