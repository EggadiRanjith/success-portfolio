import { Container, Heading, Text } from "@/components/ui";
import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact",
  description: "Get in touch for premium frontend projects and collaborations.",
};

export default function ContactPage() {

  return (
    <main role="main">
      {/* Hero */}
      <section className="py-20">
        <Container variant="standard" size="lg">
          <div className="text-center">
            <Heading as="h1" size="h1" className="mb-4">Get In Touch</Heading>
            <Text size="body-xl" color="secondary" className="max-w-2xl mx-auto">
              Have a project in mind? Let’s talk about how we can create something exceptional.
            </Text>
          </div>
        </Container>
      </section>

      {/* Form + Info */}
      <section className="py-24">
        <Container variant="standard" size="lg">
          <ContactClient />
        </Container>
      </section>
    </main>
  );
}
