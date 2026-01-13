interface SearchResult {
    slug: string;
    title: string;
    relevance: string;
    score: number;
}

export const semanticSearch = async (query: string): Promise<SearchResult[]> => {
    // Try server-side endpoint first, but always fallback to client-side if it fails
    try {
        const response = await fetch('/api/semantic-search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            // For any error (429, 500, etc.), use fallback
            console.warn(`Semantic search server returned ${response.status}, using fallback`);
            return await fallbackClientSearch(query);
        }

        const results = await response.json();
        
        // Validate results
        if (!Array.isArray(results)) {
            console.warn("Semantic search: Invalid response format, using fallback");
            return await fallbackClientSearch(query);
        }
        
        // If server returns empty array, try fallback
        if (results.length === 0) {
            console.warn("Semantic search: Server returned no results, trying fallback");
            return await fallbackClientSearch(query);
        }
        
        return results as SearchResult[];
    } catch (e) {
        console.warn("Semantic search server failed, using fallback:", e);
        // Always use fallback on any error
        return await fallbackClientSearch(query);
    }
};

// Fallback client-side search if server is unavailable
async function fallbackClientSearch(query: string): Promise<SearchResult[]> {
    try {
        const { projects } = await import('../data/projects');
        const lowerQuery = query.toLowerCase();
        
        // Enhanced keyword matching as fallback
        const matches = projects
            .map(p => {
                const searchText = [
                    p.header.title,
                    p.challenge.situation,
                    ...(p.technical.after?.stack || []),
                    ...(p.domains || []),
                    ...(p.seoTags || [])
                ].join(' ').toLowerCase();
                
                // Calculate relevance score
                let score = 0;
                const queryWords = lowerQuery.split(/\s+/);
                
                queryWords.forEach(word => {
                    if (searchText.includes(word)) {
                        score += 20;
                    }
                    // Bonus for exact matches in title
                    if (p.header.title.toLowerCase().includes(word)) {
                        score += 10;
                    }
                    // Bonus for tech stack matches
                    if (p.technical.after?.stack?.some(tech => tech.toLowerCase().includes(word))) {
                        score += 15;
                    }
                });
                
                return { project: p, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(item => ({
                slug: item.project.slug,
                title: item.project.header.title,
                relevance: `Matches your search for "${query}" - ${item.project.challenge.situation.substring(0, 80)}...`,
                score: Math.min(95, item.score)
            }));
        
        return matches;
    } catch (e) {
        console.error("Fallback search failed", e);
        return [];
    }
}
