import { Hero } from "@/components/home/hero";
import { getFeaturedArticles } from "@/lib/sanity/queries";

export default async function Home() {
  const articles = await getFeaturedArticles();

  return (
    <main className="min-h-screen bg-background">
      <Hero articles={articles} />
    </main>
  );
}
