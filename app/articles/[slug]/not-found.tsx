import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">المقال غير موجود</h2>
        <p className="text-muted-foreground mb-8">
          عذراً، المقال الذي تبحث عنه غير موجود أو تم حذفه.
        </p>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          العودة إلى قائمة المقالات
        </Link>
      </div>
    </main>
  );
}

