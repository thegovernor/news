import { Hero } from "@/components/home/hero";
import { BreakingNewsRibbon } from "@/components/home/breaking-news-ribbon";
import { PoliticalAnalysis } from "@/components/home/political-analysis";
import { Barid } from "@/components/home/barid";
import { Articles } from "@/components/home/articles";
import { Tweets } from "@/components/home/tweets";
import { getFeaturedArticles, getBreakingNews, getArticles, getTweets, getPoliticalAnalysisArticlesLimited, getBaridArticlesLimited } from "@/lib/sanity/queries";

export default async function Home() {
  const articles = await getFeaturedArticles();
  const breakingNews = await getBreakingNews();
  const latestArticles = await getArticles();
  const tweets = await getTweets();
  const politicalAnalysisArticles = await getPoliticalAnalysisArticlesLimited();
  const baridArticles = await getBaridArticlesLimited();

  return (
    <main className="min-h-screen bg-background">
      {breakingNews.length > 0 && (
        <div id="breaking-news">
          <BreakingNewsRibbon
            items={breakingNews}
            variant="urgent"
            rotationInterval={5000}
          />
        </div>
      )}
      <div id="hero">
        <Hero articles={articles} />
      </div>
      <div id="political-analysis">
        <PoliticalAnalysis articles={politicalAnalysisArticles} />
      </div>
      <div id="articles">
        <Articles articles={latestArticles} />
      </div>
      <div id="tweets">
        <Tweets tweets={tweets} />
      </div>
      <div id="barid">
        <Barid articles={baridArticles} />
      </div>
    </main>
  );
}
