import { Container, Heading, Text, Link } from "@/components/ui";

export default function NotFound() {
  return (
    <main role="main" className="py-24">
      <Container variant="standard" size="lg" className="text-center">
        <Heading as="h1" size="h2" className="mb-4">Page not found</Heading>
        <Text size="body" color="secondary" className="mb-8">
          The page you’re looking for doesn’t exist or was moved.
        </Text>
        <Link href="/" variant="button">Go Home</Link>
      </Container>
    </main>
  );
}


