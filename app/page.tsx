import { Hero } from "@/components/home/hero";
import { BreakingNewsRibbon } from "@/components/home/breaking-news-ribbon";
import { PoliticalAnalysis } from "@/components/home/political-analysis";
import { Barid } from "@/components/home/barid";
import { Articles } from "@/components/home/articles";
import { Tweets } from "@/components/home/tweets";
import { getFeaturedArticles, getBreakingNews, getArticles, getTweets } from "@/lib/sanity/queries";

export default async function Home() {
  const articles = await getFeaturedArticles();
  const breakingNews = await getBreakingNews();
  const latestArticles = await getArticles();
  const tweets = await getTweets();

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
      <Tweets tweets={tweets} />
      <Barid />
    </main>
  );
}
