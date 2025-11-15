'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button, Container, Heading, Text } from '@/components/ui';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Error logged silently
    
    // You can send to error tracking service here
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback?.(this.state.error!) || (
          <ErrorFallback
            error={this.state.error}
            onReset={this.handleReset}
          />
        )
      );
    }

    return this.props.children;
  }
}

function ErrorFallback({
  error,
  onReset,
}: {
  error?: Error;
  onReset: () => void;
}) {
  const router = useRouter();

  return (
    <main
      role="main"
      className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-yellow-500/5 dark:from-red-500/3 dark:via-orange-500/3 dark:to-yellow-500/3" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-orange-400 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Container size="lg" className="relative z-10 text-center max-w-2xl">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Icon */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-border-primary/50 backdrop-blur-sm">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="mb-4">
            <Heading as="h1" size="h1" className="text-fg-primary mb-2">
              Oops! Something went wrong
            </Heading>
          </motion.div>

          {/* Error message */}
          <motion.div variants={itemVariants} className="mb-8">
            <Text size="body-lg" color="secondary" className="mb-4">
              {error?.message ||
                'An unexpected error occurred. Please try again or contact support if the problem persists.'}
            </Text>
            {error && (
              <div className="mt-4 p-4 rounded-lg bg-fg-primary/5 border border-border-primary/50 backdrop-blur-sm">
                <div className="flex items-start gap-2">
                  <Bug className="w-4 h-4 text-fg-tertiary mt-0.5 flex-shrink-0" />
                  <Text size="body-sm" color="tertiary" className="font-mono text-left">
                    {error.name}: {error.message}
                  </Text>
                </div>
              </div>
            )}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              onClick={onReset}
              className="group"
            >
              <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Try Again
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push('/')}
              className="group"
            >
              <Home className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
              Go Home
            </Button>
            <Button
              variant="outline"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </motion.div>

          {/* Help text */}
          <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-border-primary/30">
            <Text size="body-sm" color="tertiary">
              If this problem continues, please{' '}
              <button
                onClick={() => router.push('/contact')}
                className="text-fg-primary hover:text-fg-secondary underline transition-colors"
              >
                contact support
              </button>
              {' '}or refresh the page.
            </Text>
          </motion.div>
        </motion.div>
      </Container>
    </main>
  );
}
