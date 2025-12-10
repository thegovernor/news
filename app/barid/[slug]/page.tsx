import { getBaridArticleBySlug } from "@/lib/sanity/queries";
import { BaridDetail } from "@/components/barid/barid-detail";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const article = await getBaridArticleBySlug(decodedSlug);
  
  if (!article) {
    return {
      title: "المقال غير موجود - أخبار",
    };
  }

  return {
    title: `${article.title} - بريد ودك - أخبار`,
    description: article.excerpt || article.title,
  };
}

export default async function BaridArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  const article = await getBaridArticleBySlug(decodedSlug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <BaridDetail article={article} />
    </main>
  );
}

