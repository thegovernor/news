import { Hero } from "@/components/home/hero";
import { BreakingNewsRibbon } from "@/components/home/breaking-news-ribbon";
import { getFeaturedArticles, getBreakingNews } from "@/lib/sanity/queries";

export default async function Home() {
  const articles = await getFeaturedArticles();
  const breakingNews = await getBreakingNews();

  return (
    <main className="min-h-screen bg-background">
      {breakingNews.length > 0 && (
        <BreakingNewsRibbon
          items={breakingNews}
          variant="urgent"
          rotationInterval={5000}
        />
      )}
      <Hero articles={articles} />
    </main>
  );
}
