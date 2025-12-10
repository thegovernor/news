import { getSalaWadkArticleBySlug } from "@/lib/sanity/queries";
import { SalaWadkDetail } from "@/components/sala-wadk/sala-wadk-detail";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const article = await getSalaWadkArticleBySlug(decodedSlug);
  
  if (!article) {
    return {
      title: "المقال غير موجود - أخبار",
    };
  }

  return {
    title: `${article.title} - سلة ودك - أخبار`,
    description: article.excerpt || article.title,
  };
}

export default async function SalaWadkArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  const article = await getSalaWadkArticleBySlug(decodedSlug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <SalaWadkDetail article={article} />
    </main>
  );
}
