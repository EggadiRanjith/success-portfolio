export const metadata = {
  title: "Projects",
  description: "Selected work across web development, animation, and 3D.",
};
import { PROJECTS, PROJECT_CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import { Container, Heading, Text, Card, Badge, Link } from "@/components/ui";
import { cn } from "@/lib/utils";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawFilter = params?.filter;
  const activeFilter = Array.isArray(rawFilter) ? rawFilter[0] || "All" : rawFilter || "All";
  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <main role="main">
      {/* Hero */}
      <section className="py-20">
        <Container variant="standard" size="lg">
          <div className="text-center reveal-on-scroll">
            <Heading as="h1" size="h1" className="mb-4">
              Portfolio
            </Heading>
            <Text size="body-xl" color="secondary" className="max-w-3xl mx-auto">
              Explore my recent work across web development, design, animation, and 3D.
            </Text>
          </div>
        </Container>
      </section>

      {/* Filters */}
      <section className="py-8 border-t border-b border-primary">
        <Container variant="standard" size="lg">
          <div className="flex flex-wrap justify-center gap-3 reveal-on-scroll">
            {PROJECT_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={category === "All" ? "/projects" : `/projects?filter=${encodeURIComponent(category)}`}
                className={cn(
                  "px-6 py-3 rounded-full transition-all duration-300 text-body-sm font-medium hover-glow pressable",
                  activeFilter === category
                    ? "glass-base text-primary"
                    : "border border-primary text-secondary hover:border-primary"
                )}
                aria-pressed={activeFilter === category}
              >
                {category}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-24">
        <Container variant="standard" size="lg">
          {filtered.length === 0 ? (
            <div className="text-center py-16" role="alert" aria-live="polite">
              <Heading as="h3" size="h4" className="mb-2">No projects found</Heading>
              <Text size="body" color="secondary" className="mb-6">Try a different filter or view all projects.</Text>
              <Link href="/projects" variant="button">View All</Link>
            </div>
          ) : (
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
            {filtered.map((project, i) => (
              <Card
                key={project.id}
                variant="hover"
                className={cn(
                  "relative z-10 overflow-visible reveal-on-scroll hover-glow",
                  i !== 0 && i % 5 === 0 ? "lg:col-span-2" : undefined
                )}
              >
                <div className="parallax-wrap relative aspect-video bg-rich-slate overflow-hidden">
                  <div className="parallax-inner absolute inset-0 bg-gradient-to-br from-pure-white/5 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-h4 text-primary mb-2">{project.title}</h3>
                  <Text size="body-sm" color="tertiary" className="line-clamp-2">
                    {project.description}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
          )}

          <div className="text-center mt-12 reveal-on-scroll">
            <Text size="body-sm" color="tertiary">
              Showing {filtered.length} of {PROJECTS.length} projects
            </Text>
          </div>
        </Container>
      </section>
    </main>
  );
}
