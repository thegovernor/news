import { getBaridArticles, getCategoryByTitle } from "@/lib/sanity/queries";
import { BaridList } from "@/components/barid/barid-list";

export const metadata = {
  title: "بريد ودك - أخبار",
  description: "مجموعة مختارة من أهم الأخبار والتقارير والتحديثات",
};

export default async function BaridPage() {
  const [articles, category] = await Promise.all([
    getBaridArticles(),
    getCategoryByTitle("بريد ودك"),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <BaridList articles={articles} category={category} />
    </main>
  );
}

