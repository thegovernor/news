import { getSalaWadkArticles, getCategoryByTitle } from "@/lib/sanity/queries";
import { SalaWadkList } from "@/components/sala-wadk/sala-wadk-list";

export const metadata = {
  title: "سلة ودك - أخبار",
  description: "مجموعة مختارة من أهم الأخبار والتقارير والتحديثات",
};

export default async function SalaWadkPage() {
  const [articles, category] = await Promise.all([
    getSalaWadkArticles(),
    getCategoryByTitle("سلة ودك"),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <SalaWadkList articles={articles} category={category} />
    </main>
  );
}
