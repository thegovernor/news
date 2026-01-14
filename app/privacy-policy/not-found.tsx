import Link from "next/link";
import { Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-full">
            <Shield className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">سياسة الخصوصية غير متوفرة</h1>
        <p className="text-muted-foreground text-lg mb-8">
          لم يتم العثور على سياسة الخصوصية حالياً
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
