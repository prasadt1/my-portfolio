import React from 'react';
import { Container } from './Container';
import { Section } from './Section';

interface PageShellProps {
  children: React.ReactNode;
  background?: 'default' | 'muted' | 'dark';
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
  className?: string;
}

export function PageShell({ 
  children, 
  background = 'default',
  containerMaxWidth = '7xl',
  className = ''
}: PageShellProps) {
  return (
    <Section background={background} spacing="none" className={className}>
      <Container maxWidth={containerMaxWidth} className="py-12 md:py-16">
        {children}
      </Container>
    </Section>
  );
}
