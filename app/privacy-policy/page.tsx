import { getPrivacyPolicy } from "@/lib/sanity/queries";
import { PrivacyPolicyContent } from "@/components/privacy-policy/privacy-policy-content";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata() {
  const privacyPolicy = await getPrivacyPolicy();
  
  if (!privacyPolicy) {
    return {
      title: "سياسة الخصوصية - أخبار",
    };
  }

  return {
    title: `${privacyPolicy.title} - أخبار`,
    description: privacyPolicy.title,
  };
}

export default async function PrivacyPolicyPage() {
  const privacyPolicy = await getPrivacyPolicy();

  if (!privacyPolicy) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <PrivacyPolicyContent privacyPolicy={privacyPolicy} />
    </main>
  );
}
