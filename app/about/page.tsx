import { getAbout } from "@/lib/sanity/queries";
import { AboutContent } from "@/components/about/about-content";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const about = await getAbout();
  
  if (!about) {
    return {
      title: "من نحن - أخبار",
    };
  }

  return {
    title: `${about.title} - أخبار`,
    description: about.title,
  };
}

export default async function AboutPage() {
  const about = await getAbout();

  if (!about) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <AboutContent about={about} />
    </main>
  );
}

