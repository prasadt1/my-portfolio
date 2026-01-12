export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  challenge: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  technical: {
    before: {
      stack: string[];
      issues: string[];
    };
    after: {
      stack: string[];
      improvements: string[];
    };
  };
  domains: string[];
  seoTags: string[];
  projectType: string;
  cta: {
    primary?: {
      text: string;
      action: string;
      context?: string;
    };
    secondary?: {
      text: string;
      action: string;
    };
  };
}
