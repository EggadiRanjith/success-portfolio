import { PROJECTS } from "@/lib/constants";
import { Container, Heading, Text, Link, Badge, Card } from "@/components/ui";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS as ALL } from "@/lib/constants";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = ALL.find((p) => p.slug === params.slug);
  if (!project) {
    return { title: "Project not found" };
  }
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main role="main">
      {/* Hero */}
      <section className="py-20">
        <Container variant="standard" size="lg">
          <div className="mb-6 reveal-on-scroll">
            <Heading as="h1" size="h1" className="mb-4">{project.title}</Heading>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Badge key={t} size="sm">{t}</Badge>
              ))}
            </div>
          </div>
          <Text size="body-xl" color="secondary" className="max-w-3xl reveal-on-scroll">
            {project.description}
          </Text>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-24 border-t border-primary">
        <Container variant="standard" size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div className="reveal-on-scroll">
                <Heading as="h2" size="h3" className="mb-3">The Challenge</Heading>
                <Text size="body" color="secondary">
                  Define the primary business and technical challenges addressed by this project. Outline constraints, goals, and user needs.
                </Text>
              </div>
              <div className="reveal-on-scroll">
                <Heading as="h2" size="h3" className="mb-3">The Solution</Heading>
                <Text size="body" color="secondary">
                  Summarize the approach, core features, and technology choices that delivered measurable outcomes.
                </Text>
              </div>
              <div className="reveal-on-scroll">
                <Heading as="h2" size="h3" className="mb-3">Key Features</Heading>
                <div className="grid sm:grid-cols-2 gap-4">
                  {["Responsive UI", "Performance Optimizations", "Accessible Components", "Clean Architecture", "Animations", "SEO Ready"].map((f) => (
                    <Card key={f} variant="base" className="p-4">
                      <Text size="body" color="secondary">{f}</Text>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            {/* Sidebar */}
            <aside className="lg:col-span-1 reveal-on-scroll">
              <div className="glass-frosted p-6 rounded-2xl sticky top-24 space-y-4">
                <div>
                  <p className="text-caption text-tertiary">Category</p>
                  <p className="text-body text-primary">{project.category}</p>
                </div>
                <div>
                  <p className="text-caption text-tertiary">Technologies</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((t) => (
                      <Badge key={t} size="sm" variant="outline">{t}</Badge>
                    ))}
                  </div>
                </div>
                <Link href="/projects" variant="button">Back to projects</Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-24 border-t border-primary">
        <Container variant="standard" size="lg">
          <Heading as="h2" size="h3" className="mb-6 reveal-on-scroll">Results & Impact</Heading>
          <div className="grid sm:grid-cols-3 gap-6">
            {["95+ Lighthouse", "45% Faster Load", "98% Satisfaction"].map((m) => (
              <Card key={m} variant="base" className="p-8 text-center reveal-on-scroll">
                <Text size="body" color="primary">{m}</Text>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Next link */}
      <section className="py-16 border-t border-primary">
        <Container variant="standard" size="lg" className="text-center reveal-on-scroll">
          <Link href="/projects" variant="underline">← Explore other projects</Link>
        </Container>
      </section>
    </main>
  );
}
