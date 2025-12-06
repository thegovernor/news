import { Hero } from "@/components/home/hero";
import { BreakingNewsRibbon } from "@/components/home/breaking-news-ribbon";
import { PoliticalAnalysis } from "@/components/home/political-analysis";
import { Articles } from "@/components/home/articles";
import { getFeaturedArticles, getBreakingNews, getArticles } from "@/lib/sanity/queries";

export default async function Home() {
  const articles = await getFeaturedArticles();
  const breakingNews = await getBreakingNews();
  const latestArticles = await getArticles();

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
      <PoliticalAnalysis />
      <Articles articles={latestArticles} />
    </main>
  );
}
