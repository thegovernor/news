import { getContact } from "@/lib/sanity/queries";
import { ContactContent } from "@/components/contact/contact-content";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const contact = await getContact();
  
  if (!contact) {
    return {
      title: "اتصل بنا - أخبار",
    };
  }

  return {
    title: `${contact.title} - أخبار`,
    description: contact.description || contact.title,
  };
}

export default async function ContactPage() {
  const contact = await getContact();

  if (!contact) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <ContactContent contact={contact} />
    </main>
  );
}

