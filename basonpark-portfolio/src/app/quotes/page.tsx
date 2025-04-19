import { Card, CardContent } from "@/components/ui/card";

export default function QuotesPage() {
  return (
    <section className="py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Inspirational Quotes
      </h1>
      <div className="space-y-6">
        {/* Placeholder Quote Cards */}
        {[1, 2, 3].map((item) => (
          <Card key={item}>
            <CardContent className="pt-6">
              <blockquote className="text-lg italic border-l-4 pl-4">
                {/* Escape quotes and apostrophe */}
                &quot;This is placeholder quote number {item}. It&apos;s meant
                to inspire.&quot;
                <footer className="mt-2 text-sm text-muted-foreground">
                  - Anonymous {item}
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
