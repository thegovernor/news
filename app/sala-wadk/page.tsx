import { getSalaWadkArticles } from "@/lib/sanity/queries";
import { SalaWadkList } from "@/components/sala-wadk/sala-wadk-list";

export const metadata = {
  title: "سلة ودك - أخبار",
  description: "مجموعة مختارة من أهم الأخبار والتقارير والتحديثات",
};

export default async function SalaWadkPage() {
  const articles = await getSalaWadkArticles();

  return (
    <main className="min-h-screen bg-background">
      <SalaWadkList articles={articles} />
    </main>
  );
}
