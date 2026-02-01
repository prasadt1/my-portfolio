/**
 * similarityMatcher.js
 * Phase 5 Enhanced: Experience-driven AI diagnostic using Gemini.
 * Uses Prasad's real experience patterns, decision frameworks, and failure modes.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Gemini (reuse from server context)
const apiKey = process.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" }) : null;

/**
 * Resolve localized value.
 */
function localized(v, locale) {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return locale === 'de' ? (v.de || v.en || '') : (v.en || v.de || '');
}

/**
 * Resolve localized array.
 */
function localizedArray(v, locale) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  const arr = locale === 'de' ? (v.de || v.en) : (v.en || v.de);
  return Array.isArray(arr) ? arr : [];
}

/**
 * Build experience context from similarity data.
 */
function buildExperienceContext(data, locale) {
  const projects = data
    .filter((p) => p.similaritySignals && p.retrospectiveLite)
    .map((p) => {
      const signals = p.similaritySignals;
      const retro = p.retrospectiveLite;
      const framework = signals?.prasadFrameworks?.[0];
      
      return {
        slug: p.slug,
        title: localized(p.title, locale),
        industries: signals.industries || [],
        problemPatterns: signals.problemPatterns || [],
        constraints: signals.constraints || [],
        levers: signals.levers || [],
        teamSizes: signals.teamSizes || [],
        budgetRanges: signals.budgetRanges || [],
        timelines: signals.timelines || [],
        riskProfiles: signals.riskProfiles || [],
        antiPatternsSeen: signals.antiPatternsSeen || [],
        prasadFramework: framework ? {
          name: framework.name,
          description: localized(framework.description, locale),
          whenToUse: localized(framework.whenToUse, locale),
        } : null,
        whatWentWrong: localizedArray(retro.whatWentWrong, locale),
        whatWorked: localizedArray(retro.whatWorked, locale),
        whatIdDoToday: localizedArray(retro.whatIdDoToday, locale),
        prasadInsight: localized(retro.prasadInsight, locale),
        estimatedEffort: retro.estimatedEffort || '',
        riskMitigation: localizedArray(retro.riskMitigation, locale),
      };
    });

  return JSON.stringify(projects, null, 2);
}

/**
 * Build AI prompt for experience-driven matching.
 */
function buildPrompt(userQuery, experienceContext, locale) {
  const isGerman = locale === 'de';
  
  const systemPrompt = isGerman
    ? `Du bist Prasad Tilloo, ein Senior IT-Leader mit 15+ Jahren Erfahrung in Enterprise-Architektur, Cloud-Migration und digitaler Transformation. Du analysierst die Situation des Nutzers basierend auf deinen echten Projekterfahrungen.

KRITISCH: Du musst wie Prasad denken - nicht generisch, sondern SPEZIFISCH:
1. Potenzielle Fehlermodi identifizieren (basierend auf echten Fehlern die du gesehen hast)
   - Beispiel: "Bei BRITA habe ich gesehen, dass Multi-Markt-Komplexität 3 Wochen hinzugefügt hat"
   - NICHT: "Multi-Markt-Projekte sind komplex" (zu generisch)
2. Spezifische Empfehlungen geben (basierend auf was funktioniert hat)
   - Beispiel: "Starte mit Datenaudit in Woche 1 - das habe ich bei Boehringer gelernt"
   - NICHT: "Führe ein Datenaudit durch" (zu generisch)
3. Realistische Schätzungen (basierend auf tatsächlichen Projektdaten)
   - Beispiel: "8-12 Monate (nicht die 6 Monate die du hoffst) - ähnlich wie bei BRITA"
   - NICHT: "6-12 Monate" (zu vage)
4. Entscheidungsframeworks anwenden (Prasads spezifische Ansätze)
   - Beispiel: "Mein 4-Phasen-Ansatz für Headless-Migration ohne Geschäftsunterbrechung"
   - NICHT: "Phasenweise Migration" (zu generisch)

Antworte IMMER im JSON-Format mit dieser Struktur:
{
  "matches": [
    {
      "slug": "brita-ecommerce",
      "confidence": "High|Medium|Low",
      "reasons": ["Warum dies passt - spezifisch, nicht generisch"],
      "redFlags": ["Spezifische Risiken die ich gesehen habe"],
      "prasadInsight": "Meine zentrale Erkenntnis aus ähnlichen Projekten",
      "recommendedApproach": "Mein spezifischer Ansatz basierend auf Erfahrung",
      "realisticTimeline": "Realistische Schätzung basierend auf ähnlichen Projekten",
      "budgetRange": "Budget-Schätzung basierend auf Komplexität",
      "keyDecisions": ["Entscheidungen die zählten"],
      "failureModes": ["Wie ähnliche Projekte fehlgeschlagen sind"],
      "successFactors": ["Was bei ähnlichen Projekten funktioniert hat"]
    }
  ],
  "diagnosticQuestions": ["Fragen die Prasad stellen würde, um die Situation besser zu verstehen"],
  "needsMoreInfo": true|false
}

Wenn die Situation unklar ist, setze needsMoreInfo=true und stelle spezifische diagnostische Fragen.`
    : `You are Prasad Tilloo, a Senior IT Leader with 15+ years of experience in enterprise architecture, cloud migration, and digital transformation. You analyze the user's situation based on your real project experience.

CRITICAL: You must think like Prasad - be SPECIFIC, not generic:
1. Identify potential failure modes (based on real failures you've witnessed)
   - Example: "At BRITA, I saw multi-market complexity add 3 weeks - this is a red flag"
   - NOT: "Multi-market projects are complex" (too generic)
2. Provide specific recommendations (based on what actually worked)
   - Example: "Start with data audit in week 1 - I learned this the hard way at Boehringer"
   - NOT: "Conduct a data audit" (too generic)
3. Give realistic estimates (based on actual project data)
   - Example: "8-12 months (not the 6 months you're hoping for) - similar to BRITA"
   - NOT: "6-12 months" (too vague)
4. Apply decision frameworks (Prasad's specific approaches)
   - Example: "My 4-phase approach to headless migration without business disruption"
   - NOT: "Phased migration" (too generic)

ALWAYS respond in JSON format with this structure:
{
  "matches": [
    {
      "slug": "brita-ecommerce",
      "confidence": "High|Medium|Low",
      "reasons": ["Why this matches - specific, not generic"],
      "redFlags": ["Specific risks I've seen in similar situations"],
      "prasadInsight": "My key insight from similar projects",
      "recommendedApproach": "My specific approach based on experience",
      "realisticTimeline": "Realistic estimate based on similar projects",
      "budgetRange": "Budget estimate based on complexity",
      "keyDecisions": ["Decisions that mattered"],
      "failureModes": ["How similar projects failed"],
      "successFactors": ["What worked in similar projects"]
    }
  ],
  "diagnosticQuestions": ["Questions Prasad would ask to better understand the situation"],
  "needsMoreInfo": true|false
}

If the situation is unclear, set needsMoreInfo=true and ask specific diagnostic questions.`;

  const userPrompt = isGerman
    ? `Nutzer-Anfrage: "${userQuery}"

Verfügbare Projekterfahrungen:
${experienceContext}

Analysiere diese Situation wie Prasad würde - SPEZIFISCH, nicht generisch:

1. RELEVANZ: Welche Projekte sind am relevantesten? Erkläre WARUM mit spezifischen Details:
   - "Dies ähnelt BRITA weil..." (nicht "eCommerce-Projekt")
   - Erwähne spezifische Patterns, Constraints, oder Fehler die du gesehen hast

2. FEHLERMODI: Welche Fehlermodi hast du in ähnlichen Situationen gesehen?
   - Spezifische Beispiele: "Bei Boehringer habe ich gesehen, dass..."
   - Nicht generisch: "Datenmigration ist komplex"

3. EMPFEHLUNGEN: Was würdest du heute anders machen?
   - Spezifisch: "Starte mit Datenaudit in Woche 1 - das habe ich bei X gelernt"
   - Nicht generisch: "Führe ein Audit durch"

4. SCHÄTZUNGEN: Realistische Timeline/Budget basierend auf tatsächlichen Projekten:
   - "8-12 Monate (nicht 6) - ähnlich wie bei BRITA mit ähnlicher Komplexität"
   - Nicht: "6-12 Monate"

5. ROTE FLAGGEN: Spezifische Risiken die du siehst:
   - "Multi-Markt-Komplexität hat bei BRITA 3 Wochen hinzugefügt"
   - Nicht: "Komplexität ist ein Risiko"

Antworte NUR im JSON-Format wie oben spezifiziert.`
    : `User query: "${userQuery}"

Available project experience:
${experienceContext}

Analyze this situation as Prasad would - be SPECIFIC, not generic:

1. RELEVANCE: Which projects are most relevant? Explain WHY with specific details:
   - "This resembles BRITA because..." (not "eCommerce project")
   - Mention specific patterns, constraints, or failures you've seen

2. FAILURE MODES: What failure modes have you seen in similar situations?
   - Specific examples: "At Boehringer, I saw that..."
   - Not generic: "Data migration is complex"

3. RECOMMENDATIONS: What would you do differently today?
   - Specific: "Start with data audit in week 1 - I learned this at X"
   - Not generic: "Conduct an audit"

4. ESTIMATES: Realistic timeline/budget based on actual projects:
   - "8-12 months (not 6) - similar to BRITA with similar complexity"
   - Not: "6-12 months"

5. RED FLAGS: Specific risks you're seeing:
   - "Multi-market complexity added 3 weeks at BRITA"
   - Not: "Complexity is a risk"

Respond ONLY in JSON format as specified above.`;

  return { systemPrompt, userPrompt };
}

/**
 * Parse AI response and validate structure.
 */
function parseAIResponse(responseText, locale) {
  try {
    if (!responseText || responseText.trim().length === 0) {
      throw new Error('Empty response from AI');
    }

    // Extract JSON from markdown code blocks if present
    let jsonText = responseText.trim();
    
    // Try to extract JSON from code blocks
    const jsonMatch = jsonText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    } else {
      // Try to find JSON object in the text
      const jsonObjectMatch = jsonText.match(/\{[\s\S]*\}/);
      if (jsonObjectMatch) {
        jsonText = jsonObjectMatch[0];
      }
    }
    
    const parsed = JSON.parse(jsonText);
    
    // Validate structure
    if (!parsed.matches || !Array.isArray(parsed.matches)) {
      console.warn('[similarityMatcher] Invalid response structure:', {
        hasMatches: !!parsed.matches,
        matchesType: typeof parsed.matches,
        keys: Object.keys(parsed),
      });
      // Try to fix: if matches is not an array, make it one
      if (parsed.matches && typeof parsed.matches === 'object' && !Array.isArray(parsed.matches)) {
        parsed.matches = [parsed.matches];
      } else if (!parsed.matches) {
        parsed.matches = [];
      }
    }
    
    return parsed;
  } catch (err) {
    console.error('[similarityMatcher] Failed to parse AI response:', err.message);
    console.error('[similarityMatcher] Response text (first 1000 chars):', responseText.substring(0, 1000));
    throw new Error(`Failed to parse AI response: ${err.message}. The AI may have returned an invalid format.`);
  }
}

const STOPWORDS = new Set(['a', 'an', 'the', 'is', 'are', 'we', 'i', 'our', 'my', 'to', 'for', 'of', 'and', 'or', 'in', 'on', 'at', 'with', 'that', 'this', 'it', 'be', 'have', 'has', 'do', 'does', 'can', 'need', 'want', 'like', 'trying', 'suggest']);
const WEIGHTS = { industry: 2, problemPatterns: 3, constraints: 3, levers: 2, teamSize: 2, budget: 1.5, timeline: 1.5, riskProfile: 2 };

// Expand user terms to match portfolio signals (migrating->migration, aws->cloud, etc.)
const SYNONYMS = {
  migrating: ['migration', 'migrate'], migrate: ['migration'], migration: ['migration'],
  monolithic: ['legacy', 'monolith'], monolith: ['legacy'],
  microservices: ['scalability', 'architecture', 'headless'], microservice: ['scalability'],
  java: ['legacy'], golang: ['microservices'],
  aws: ['cloud', 'scalability'], cloud: ['cloud'], gcp: ['cloud'],
  architecture: ['architecture'], architect: ['architecture'],
  ecommerce: ['ecommerce'], 'e-commerce': ['ecommerce'], commerce: ['ecommerce'], retail: ['retail'],
  scala: ['scalability'], scale: ['scalability'], scaling: ['scalability'],
  performance: ['performance'], slow: ['performance'], optimize: ['performance'],
  insurance: ['insurance'], insur: ['insurance'], claims: ['insurance'],
  ai: ['ai'], 'machine-learning': ['ai'], ml: ['ai'],
  climate: ['climate-tech', 'sustainability'], sustainability: ['climate-tech'],
  ads: ['adtech'], adtech: ['adtech'], advertising: ['adtech'],
  suggest: [], recommend: [], approach: ['architecture'],
};

function norm(s) {
  return String(s).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

function expandKeywords(tokens) {
  const out = new Set();
  for (const t of tokens) {
    out.add(norm(t));
    const expanded = SYNONYMS[t.toLowerCase()] || SYNONYMS[norm(t)];
    if (expanded) expanded.forEach((e) => out.add(norm(e)));
  }
  return out;
}

function extractKeywords(query) {
  if (!query || typeof query !== 'string') return [];
  const normalized = query.toLowerCase().replace(/[^\w\s-]/g, ' ');
  const tokens = normalized.split(/\s+/).filter(Boolean);
  const filtered = tokens.filter((t) => t.length > 1 && !STOPWORDS.has(t));
  return expandKeywords(filtered);
}

function scoreProject(keywords, project) {
  const signals = project.similaritySignals;
  if (!signals) return 0;
  let total = 0, max = 0;
  const check = (arr, w) => {
    if (!Array.isArray(arr)) return;
    max += (arr.length || 0) * w;
    for (const x of arr) {
      const n = norm(x);
      const parts = (n.split('-') || []).filter((p) => p.length > 1);
      let matched = false;
      if (keywords.has(n)) { total += w; matched = true; }
      else for (const t of parts) {
        if (keywords.has(t)) { total += w * 0.7; matched = true; break; }
      }
      if (!matched) {
        for (const kw of keywords) {
          if (n.includes(kw) || kw.includes(n)) { total += w * 0.5; break; }
        }
      }
    }
  };
  check(signals.industries, WEIGHTS.industry);
  check(signals.problemPatterns, WEIGHTS.problemPatterns);
  check(signals.constraints, WEIGHTS.constraints);
  check(signals.levers, WEIGHTS.levers);
  check(signals.teamSizes, WEIGHTS.teamSize);
  check(signals.budgetRanges, WEIGHTS.budget);
  check(signals.timelines, WEIGHTS.timeline);
  check(signals.riskProfiles, WEIGHTS.riskProfile);
  return max > 0 ? Math.min(100, Math.round((total / max) * 100 * 1.2)) : 0;
}

/**
 * Keyword-based matching - always works, no AI dependency.
 * Used as primary path for reliability.
 */
function fallbackKeywordMatch(query, data, locale) {
  const keywords = extractKeywords(query);
  if (keywords.size === 0) {
    return data.filter((p) => p.similaritySignals).slice(0, 3).map((p) => ({
      slug: p.slug,
      confidence: 'Medium',
      reasons: [locale === 'de' ? 'Basierend auf verfügbaren Projekten' : 'Based on available projects'],
    }));
  }
  const scored = data
    .filter((p) => p.similaritySignals)
    .map((p) => ({ project: p, score: scoreProject(keywords, p) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  if (scored.length === 0) {
    return data.filter((p) => p.similaritySignals).slice(0, 3).map((p) => ({
      slug: p.slug,
      confidence: 'Low',
      reasons: [locale === 'de' ? 'Allgemeine Übereinstimmung' : 'General match'],
    }));
  }
  return scored.map(({ project, score }) => ({
    slug: project.slug,
    confidence: score >= 70 ? 'High' : score >= 50 ? 'Medium' : 'Low',
    reasons: [locale === 'de' ? `Übereinstimmung basierend auf Ihrer Beschreibung (${score}%)` : `Match based on your description (${score}%)`],
  }));
}

/**
 * Enrich matches with project data.
 */
function enrichMatches(aiMatches, projectData, locale) {
  return aiMatches.map((match) => {
    const project = projectData.find((p) => p.slug === match.slug);
    if (!project) return null;

    const retro = project.retrospectiveLite || {};
    const framework = project.similaritySignals?.prasadFrameworks?.[0];

    return {
      slug: match.slug,
      title: localized(project.title, locale),
      score: match.confidence === 'High' ? 85 : match.confidence === 'Medium' ? 65 : 45,
      reasons: match.reasons || [],
      confidence: match.confidence || 'Low',
      prasadInsight: match.prasadInsight || localized(retro.prasadInsight, locale) || '',
      applicableFramework: match.recommendedApproach || (framework ? framework.name : undefined),
      estimatedEffort: match.realisticTimeline || retro.estimatedEffort || '—',
      riskMitigation: match.redFlags ? [...(match.redFlags || []), ...localizedArray(retro.riskMitigation, locale)] : localizedArray(retro.riskMitigation, locale),
      recommendedNextSteps: [
        locale === 'de' ? 'Fallstudie ansehen' : 'View case study',
        locale === 'de' ? 'Artefakt-Paket anfragen' : 'Request artifacts pack',
      ],
      keyDecisions: match.keyDecisions || [
        ...localizedArray(retro.whatWorked, locale).slice(0, 2),
        ...localizedArray(retro.whatIdDoToday, locale).slice(0, 1),
      ].slice(0, 3),
      whatWentWrong: match.failureModes || localizedArray(retro.whatWentWrong, locale),
      whatWorked: match.successFactors || localizedArray(retro.whatWorked, locale),
      whatIdDoToday: localizedArray(retro.whatIdDoToday, locale),
      redFlags: match.redFlags || [],
      budgetRange: match.budgetRange || '',
      diagnosticQuestions: match.diagnosticQuestions || [],
    };
  }).filter(Boolean);
}

/**
 * Compute similarity results using AI.
 */
export async function computeProjectSimilarity(query, locale = 'en') {
  const dataPath = path.join(__dirname, 'similarity-data.json');
  let data = [];
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    data = JSON.parse(raw);
  } catch (err) {
    console.error('[similarityMatcher] Failed to load similarity-data.json:', err.message);
    return { results: [], source: 'error' };
  }

  if (data.length === 0) {
    return { results: [], source: 'keyword' };
  }

  // Keyword-based matching is the PRIMARY path - always works, no AI dependency.
  // This ensures the tool never fails with "AI service error".
  const keywordMatches = fallbackKeywordMatch(query, data, locale);
  const enrichedMatches = enrichMatches(keywordMatches, data, locale);
  enrichedMatches.forEach((m) => {
    m.score = m.confidence === 'High' ? 75 : m.confidence === 'Medium' ? 55 : 40;
  });

  return {
    results: enrichedMatches.slice(0, 3),
    source: 'keyword',
  };
}

export default computeProjectSimilarity;
