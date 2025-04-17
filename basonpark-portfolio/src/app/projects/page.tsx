import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ProjectsPage() {
  return (
    <section className="py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Project Cards */}
        {[1, 2, 3].map((item) => (
          <Card key={item}>
            <CardHeader>
              <CardTitle>Placeholder Project {item}</CardTitle>
              <CardDescription>This is a placeholder description for project {item}.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>More project details will go here.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
