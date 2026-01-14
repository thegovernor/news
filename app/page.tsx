import { Hero } from "@/components/home/hero";
import { BreakingNewsRibbon } from "@/components/home/breaking-news-ribbon";
import { PoliticalAnalysis } from "@/components/home/political-analysis";
import { Barid } from "@/components/home/barid";
import { SalaWadk } from "@/components/home/sala-wadk";
import { Articles } from "@/components/home/articles";
import { Tweets } from "@/components/home/tweets";
import { getFeaturedArticles, getBreakingNews, getArticles, getTweets, getPoliticalAnalysisArticlesLimited, getBaridArticlesLimited, getSalaWadkArticlesLimited } from "@/lib/sanity/queries";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const articles = await getFeaturedArticles();
  const breakingNews = await getBreakingNews();
  const latestArticles = await getArticles();
  const tweets = await getTweets();
  const politicalAnalysisArticles = await getPoliticalAnalysisArticlesLimited();
  const baridArticles = await getBaridArticlesLimited();
  const salaWadkArticles = await getSalaWadkArticlesLimited();

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
      <div id="sala-wadk">
        <SalaWadk articles={salaWadkArticles} />
      </div>
      <div id="articles">
        <Articles articles={latestArticles} />
      </div>
      <div id="barid">
        <Barid articles={baridArticles} />
      </div>
      {politicalAnalysisArticles.length > 0 && (
        <div id="political-analysis">
          <PoliticalAnalysis articles={politicalAnalysisArticles} />
        </div>
      )}
      <div id="tweets">
        <Tweets tweets={tweets} />
      </div>
    </main>
  );
}
