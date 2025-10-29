import { Container, Heading, Text, Button, Card, Badge } from "@/components/ui";

const TIMELINE = [
  { year: "2021", title: "Started Freelancing", company: "Independent", desc: "Built websites for small businesses." },
  { year: "2022", title: "Frontend Developer", company: "Studio", desc: "Delivered premium UIs and design systems." },
  { year: "2024", title: "Senior Frontend Engineer", company: "Product Co.", desc: "Led UI architecture and performance initiatives." },
];

const SKILLS = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { group: "Animation & 3D", items: ["GSAP", "Framer Motion", "Three.js", "R3F"] },
  { group: "Tools", items: ["Git", "Figma", "VS Code", "Vercel"] },
  { group: "Design", items: ["UI/UX", "Design Systems", "Accessibility", "Responsive"] },
];

const VALUES = [
  { title: "User-Centered", desc: "Empathy-driven design and development." },
  { title: "Performance First", desc: "Fast, efficient experiences at scale." },
  { title: "Attention to Detail", desc: "Polished interfaces down to the pixel." },
];

export const metadata = {
  title: "About",
  description: "Personal background, journey, skills and core values.",
};

export default function AboutPage() {
  return (
    <main role="main">
      {/* Hero */}
      <section className="py-20">
        <Container variant="standard" size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Heading as="h1" size="h1" className="mb-4">About Me</Heading>
              <Text size="body-xl" color="secondary" className="max-w-2xl">
                Frontend developer focused on building luxury digital experiences with modern web technologies, sophisticated motion, and strong design principles.
              </Text>
              <div className="mt-8 flex gap-4">
                <Button variant="primary" size="lg" href="/projects" className="hover-glow pressable">View Projects</Button>
                <Button variant="secondary" size="lg" href="/contact" className="hover-glow pressable">Get In Touch</Button>
              </div>
            </div>
            <div>
              <div className="rounded-2xl glass-frosted p-1 overflow-hidden">
                <div className="aspect-square rounded-xl glass-frosted" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-24 border-t border-pure-white/10">
        <Container variant="standard" size="lg">
          <Heading as="h2" size="h2" className="mb-8">Journey</Heading>
          <div className="relative">
            <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-pure-white/10" />
            <div className="space-y-8">
              {TIMELINE.map((t) => (
                <div key={t.year} className="relative pl-8">
                  <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-pure-white" />
                  <p className="text-caption text-medium-gray">{t.year}</p>
                  <p className="text-h4 text-pure-white">{t.title}</p>
                  <p className="text-body-sm text-silver-gray">{t.company}</p>
                  <p className="text-body text-silver-gray mt-2">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section className="py-24 border-t border-pure-white/10">
        <Container variant="standard" size="lg">
          <Heading as="h2" size="h2" className="mb-8">Skills</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILLS.map((g) => (
              <Card key={g.group} variant="base" className="p-6">
                <p className="text-h4 text-pure-white mb-4">{g.group}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <Badge key={s} size="sm" variant="outline">{s}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 border-t border-pure-white/10">
        <Container variant="standard" size="lg">
          <Heading as="h2" size="h2" className="mb-8">Core Values</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <Card key={v.title} variant="frosted" className="p-6 text-center">
                <p className="text-h4 text-pure-white mb-2">{v.title}</p>
                <Text size="body" color="secondary">{v.desc}</Text>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-pure-white/10">
        <Container variant="standard" size="lg" className="text-center">
          <Heading as="h2" size="h3" className="mb-4">Let's Create Something Amazing</Heading>
          <Text size="body-lg" color="secondary" className="mb-6">Have an idea? I’d love to help bring it to life.</Text>
          <Button variant="primary" size="lg" href="/contact" className="hover-glow pressable">Get In Touch</Button>
        </Container>
      </section>
    </main>
  );
}
