import type { ArchitectureRequest, GeneratedArchitecture } from '../types';

export const generateArchitecture = async (
  request: ArchitectureRequest
): Promise<GeneratedArchitecture> => {
  // Call server-side endpoint instead of using API key directly
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  
  try {
    const response = await fetch(`${apiUrl}/api/architecture/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        industry: request.industry,
        challenge: request.challenge,
        context: request.context
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      const errorMessage = error.error || `Server error: ${response.status}`;
      
      // Clean up technical error messages for user display
      if (errorMessage.includes('quota') || errorMessage.includes('Quota') || response.status === 429) {
        throw new Error('API_QUOTA_EXCEEDED');
      }
      if (errorMessage.includes('API key') || errorMessage.includes('API Key')) {
        throw new Error('API_CONFIG_ERROR');
      }
      if (response.status >= 500) {
        throw new Error('SERVER_ERROR');
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json() as GeneratedArchitecture;
    
    // Validate and set defaults
    if (!data.diagram || !data.diagram.nodes || data.diagram.nodes.length === 0) {
      throw new Error('Invalid architecture: missing diagram nodes');
    }

    data.recommendations = data.recommendations || [];
    data.risks = data.risks || [];
    data.stack = data.stack || [];
    data.compliance = data.compliance || [];
    data.diagram.edges = data.diagram.edges || [];

    return data;
  } catch (error) {
    console.error('Architecture generation error:', error);
    
    if (error instanceof Error) {
      // Map error codes to user-friendly messages
      if (error.message === 'API_QUOTA_EXCEEDED') {
        throw new Error('API_QUOTA_EXCEEDED');
      }
      if (error.message === 'API_CONFIG_ERROR') {
        throw new Error('API_CONFIG_ERROR');
      }
      if (error.message === 'SERVER_ERROR') {
        throw new Error('SERVER_ERROR');
      }
      if (error.message.includes('Rate limit') || error.message.includes('quota') || error.message.includes('Quota')) {
        throw new Error('API_QUOTA_EXCEEDED');
      }
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('NETWORK_ERROR');
      }
      throw error;
    }
    
    throw new Error('UNKNOWN_ERROR');
  }
};
