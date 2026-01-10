export interface ArchitectureRequest {
  industry: 'healthcare' | 'financial' | 'ecommerce' | 'aiml';
  challenge: string;
  context: {
    teamSize?: string;
    budget?: string;
    timeline?: string;
    compliance?: string;
    type?: string;
  };
}

export interface GeneratedArchitecture {
  summary: string;
  recommendations: string[];
  timeline: string;
  budget: string;
  risks: Array<{
    level: 'high' | 'medium' | 'low';
    text: string;
  }>;
  stack: Array<{
    category: string;
    tech: string;
    reason: string;
  }>;
  compliance: string[];
  diagram: {
    nodes: Array<{
      id: string;
      label: string;
      type: 'frontend' | 'service' | 'database' | 'security' | 'external';
      description: string;
      technologies: string[];
      risks: string[];
    }>;
    edges: Array<{
      source: string;
      target: string;
    }>;
  };
}

export interface ArchitectureResult extends GeneratedArchitecture {
  id: string;
  timestamp: Date;
  inputs: {
    industry: 'healthcare' | 'financial' | 'ecommerce' | 'aiml';
    challenge: string;
    context: ArchitectureRequest['context'];
  };
}
