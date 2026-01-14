import { getTermsOfUse } from "@/lib/sanity/queries";
import { TermsOfUseContent } from "@/components/terms-of-use/terms-of-use-content";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata() {
  const termsOfUse = await getTermsOfUse();
  
  if (!termsOfUse) {
    return {
      title: "شروط الاستخدام - أخبار",
    };
  }

  return {
    title: `${termsOfUse.title} - أخبار`,
    description: termsOfUse.title,
  };
}

export default async function TermsOfUsePage() {
  const termsOfUse = await getTermsOfUse();

  if (!termsOfUse) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <TermsOfUseContent termsOfUse={termsOfUse} />
    </main>
  );
}
