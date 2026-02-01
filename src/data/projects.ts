import { CaseStudy } from "../types/CaseStudy";
import { runProjectValidation } from "../utils/validateCaseStudies";

export const projects: CaseStudy[] = [
    {
        id: 'photography-coach-ai',
        slug: 'photography-coach-ai',
        theme: {
            color: 'purple',
            gradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/10',
            iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
            backgroundImage: '/assets/bg/bg-ai.png'
        },
        domains: ['AI & GenAI', 'Product Engineering', 'Cost Optimization'],
        projectType: 'product',
        visualType: 'ai',
        seoTags: ['Gemini 3 Pro', 'React', 'Context Caching', 'AI Vision', 'Google DeepMind'],
        header: {
            eyebrow: 'GOOGLE DEEPMIND COMPETITION PROJECT',
            title: 'Photography Coach AI: Productionizing Gemini 3 Pro',
            client: {
                type: 'Competition Entry',
                size: 'Global',
                industry: 'Artificial Intelligence'
            }
        },
        challenge: {
            situation: 'Most AI tools are black boxes. Photographers needed transparent, actionable coaching. The technical challenge was productionizing Gemini 3 Pro while keeping token costs viable.',
            pain_points: [
                { icon: '💸', title: 'High Inference Costs', description: 'Vision API calls cost ~$2.00 per 1k images', impact: 'Unviable unit economics' },
                { icon: '📦', title: 'Black Box Problem', description: 'Users distrust AI scores', impact: 'Low engagement' }
            ],
            urgency: 'Built for Google DeepMind Competition',
            why_prasad: 'AI Engineering + UX'
        },
        approach: {
            methodology: 'Transparent AI Architecture',
            phases: [
                { number: 1, title: 'Context Caching', duration: 'Sprint 2', activities: ['Cached 32KB system prompt'], deliverable: 'Cost-Optimized Backend', outcome: '75% Cost Reduction' }
            ],
            unique_differentiator: 'Glass-Box Reasoning UI'
        },
        outcomes: {
            hero_metric: { value: '75%', label: 'Cost Reduction', icon: '💰' },
            secondary_metrics: [
                { value: '2.5s', label: 'Analysis Speed', icon: '⚡' },
                { value: '100%', label: 'Observability', icon: '👁️' }
            ],
            compliance: [],
            timeline: { planned: '3 Weeks', actual: '2.5 Weeks', variance: 'Ahead' },
            business_impact: {
                efficiency: 'Context Caching strategy reduces input token costs by ~75%',
                innovation: 'First-of-kind "Glass Box" interface'
            }
        },
        technical: {
            before: { stack: ['Standard LLM'], infrastructure: 'Stateless', issues: [] },
            after: { stack: ['Gemini 3 Pro', 'React', 'Tailwind', 'Recharts'], infrastructure: 'Context-Aware', improvements: ['Structured JSON', 'Spatial Overlays'] },
            migration_strategy: 'Greenfield'
        },
        approachToday: {
            titleKey: 'projects.approachToday.title',
            bullets: [
                'Confirm target user segment and success metrics (retention, conversion, cost-per-analysis).',
                'Review model choice and prompt strategy for repeatability and predictable quality.',
                'Treat token cost and caching as first-class architecture constraints from day 1.',
                'Add evaluation harness (golden set images + scoring) to prevent regression.',
                'Define privacy, storage and observability requirements for production use.'
            ],
            bulletsDe: [
                'Zielgruppe und Erfolgskriterien sauber definieren (Retention, Conversion, Kosten pro Analyse).',
                'Modellwahl und Prompt-Strategie auf Reproduzierbarkeit und konsistente Qualität prüfen.',
                'Token-Kosten und Caching von Anfang an als Architektur-Constraints behandeln.',
                'Evaluation-Harness aufsetzen (Golden Set + Scoring), um Regressionen zu vermeiden.',
                'Datenschutz, Speicherung und Observability-Anforderungen für den Produktivbetrieb festlegen.'
            ]
        },
        cta: {
            primary: { text: 'Try Live Demo', action: 'https://aistudio.google.com/app/apikey', context: 'See it in action.' },
            secondary: { text: 'View Code', action: 'https://github.com/prasadt1/photography-coach-ai' }
        },
        // Phase 2: Executive Snapshot
        executiveSnapshot: {
            whyItMattered: {
                en: [
                    'AI tools need production-grade cost control to be viable for real users.',
                    'Transparency builds trust—users need to see why AI made specific recommendations.',
                    'Competition entry required demonstrating end-to-end engineering excellence, not just demos.'
                ],
                de: [
                    'AI-Tools benötigen Production-Grade-Kostenkontrolle, um für echte Nutzer tragbar zu sein.',
                    'Transparenz schafft Vertrauen—Nutzer müssen sehen, warum AI spezifische Empfehlungen gab.',
                    'Wettbewerbseintrag erforderte End-to-End-Engineering-Exzellenz, nicht nur Demos.'
                ]
            },
            keyTensions: {
                en: [
                    'Token cost control vs. model quality and reasoning depth.',
                    'Real-time analysis vs. batch processing for cost efficiency.',
                    'User trust through transparency vs. keeping prompts proprietary.'
                ],
                de: [
                    'Token-Kostenkontrolle vs. Modellqualität und Reasoning-Tiefe.',
                    'Echtzeit-Analyse vs. Batch-Processing für Kosteneffizienz.',
                    'Nutzervertrauen durch Transparenz vs. Prompts proprietär halten.'
                ]
            },
            metricCallout: {
                value: { en: '75%', de: '75%' },
                label: { en: 'cost reduction', de: 'Kostenreduzierung' }
            }
        },
        // Phase 2: Persona Challenges
        personaChallenges: {
            executive: {
                challenges: {
                    en: [
                        'Prove AI can be production-ready, not just a demo.',
                        'Control costs while maintaining quality.',
                        'Build user trust through transparency.'
                    ],
                    de: [
                        'Beweisen, dass AI production-ready sein kann, nicht nur Demo.',
                        'Kosten kontrollieren bei gleichbleibender Qualität.',
                        'Nutzervertrauen durch Transparenz aufbauen.'
                    ]
                },
                riskIfIgnored: {
                    en: [
                        'Unviable unit economics.',
                        'Low user engagement due to distrust.'
                    ],
                    de: [
                        'Nicht tragfähige Unit-Economics.',
                        'Geringes Nutzerengagement durch Misstrauen.'
                    ]
                },
                decisionPoints: {
                    en: [
                        'Context caching strategy.',
                        'Transparency vs. proprietary prompts.'
                    ],
                    de: [
                        'Context-Caching-Strategie.',
                        'Transparenz vs. proprietäre Prompts.'
                    ]
                }
            },
            technical: {
                challenges: {
                    en: [
                        'Implement context caching for 32KB system prompt.',
                        'Structure JSON responses for predictable parsing.',
                        'Optimize vision API calls for cost efficiency.'
                    ],
                    de: [
                        'Context-Caching für 32KB System-Prompt implementieren.',
                        'JSON-Antworten strukturieren für vorhersagbares Parsing.',
                        'Vision-API-Calls für Kosteneffizienz optimieren.'
                    ]
                },
                riskIfIgnored: {
                    en: [
                        'High token costs make product unviable.',
                        'Unstructured responses break UI.'
                    ],
                    de: [
                        'Hohe Token-Kosten machen Produkt untragbar.',
                        'Unstrukturierte Antworten brechen UI.'
                    ]
                },
                decisionPoints: {
                    en: [
                        'Caching strategy (memory vs. session).',
                        'Response schema design.'
                    ],
                    de: [
                        'Caching-Strategie (Memory vs. Session).',
                        'Response-Schema-Design.'
                    ]
                }
            },
            delivery: {
                challenges: {
                    en: [
                        'Deliver competition entry on time.',
                        'Ensure production-quality code.',
                        'Document architecture decisions.'
                    ],
                    de: [
                        'Wettbewerbseintrag rechtzeitig liefern.',
                        'Production-Quality-Code sicherstellen.',
                        'Architektur-Entscheidungen dokumentieren.'
                    ]
                },
                riskIfIgnored: {
                    en: [
                        'Miss competition deadline.',
                        'Submit incomplete solution.'
                    ],
                    de: [
                        'Wettbewerbs-Deadline verpassen.',
                        'Unvollständige Lösung einreichen.'
                    ]
                },
                decisionPoints: {
                    en: [
                        'Sprint planning and prioritization.',
                        'Quality vs. speed trade-offs.'
                    ],
                    de: [
                        'Sprint-Planung und Priorisierung.',
                        'Qualität vs. Geschwindigkeit Trade-offs.'
                    ]
                }
            }
        },
        // Phase 3.1: Trust Layer
        trustLayer: {
            myRole: { en: 'Solo Developer / AI Engineer', de: 'Solo-Entwickler / AI-Ingenieur' },
            scopeOwned: {
                en: [
                    'Full-stack implementation (React frontend, Gemini API integration)',
                    'Context caching strategy and cost optimization',
                    'UI/UX design for transparency (glass-box reasoning)',
                    'Architecture decisions and documentation',
                    'Competition submission and presentation'
                ],
                de: [
                    'Full-Stack-Implementierung (React Frontend, Gemini API Integration)',
                    'Context-Caching-Strategie und Kostenoptimierung',
                    'UI/UX-Design für Transparenz (Glass-Box Reasoning)',
                    'Architektur-Entscheidungen und Dokumentation',
                    'Wettbewerbseinreichung und Präsentation'
                ]
            },
            deliveredWithTeam: {
                en: [
                    'N/A - Solo project for competition',
                ],
                de: [
                    'N/A - Solo-Projekt für Wettbewerb',
                ]
            },
            confidentialityNote: {
                en: 'This is a competition entry project. All code is open source. No client confidential information.',
                de: 'Dies ist ein Wettbewerbsprojekt. Der gesamte Code ist Open Source. Keine vertraulichen Client-Informationen.'
            }
        },
        // Phase 3.1: Artifact Previews (6+ for hero)
        artifactPreviews: [
            {
                title: { en: 'Context Caching Architecture', de: 'Context-Caching-Architektur' },
                description: { en: 'System design for caching 32KB system prompt to reduce token costs', de: 'System-Design für Caching von 32KB System-Prompt zur Token-Kostenreduzierung' },
                type: 'Diagram',
                gated: true
            },
            {
                title: { en: 'Cost Optimization Analysis', de: 'Kostenoptimierungs-Analyse' },
                description: { en: 'Token cost breakdown and optimization strategies', de: 'Token-Kostenaufschlüsselung und Optimierungsstrategien' },
                type: 'TCO',
                gated: true
            },
            {
                title: { en: 'Glass-Box UI Design', de: 'Glass-Box-UI-Design' },
                description: { en: 'User interface patterns for transparent AI reasoning display', de: 'User-Interface-Patterns für transparente AI-Reasoning-Anzeige' },
                type: 'Diagram',
                gated: true
            },
            {
                title: { en: 'Gemini API Integration Guide', de: 'Gemini-API-Integrations-Leitfaden' },
                description: { en: 'Production-ready integration patterns for Gemini 3 Pro', de: 'Production-Ready-Integrationsmuster für Gemini 3 Pro' },
                type: 'ADR',
                gated: true
            },
            {
                title: { en: 'Performance Benchmarks', de: 'Performance-Benchmarks' },
                description: { en: 'Response time and cost metrics before/after optimization', de: 'Antwortzeit- und Kostenmetriken vor/nach Optimierung' },
                type: 'TCO',
                gated: true
            },
            {
                title: { en: 'Competition Submission Package', de: 'Wettbewerbs-Einreichungspaket' },
                description: { en: 'Complete submission documentation and presentation materials', de: 'Vollständige Einreichungsdokumentation und Präsentationsmaterialien' },
                type: 'ADR',
                gated: true
            }
        ],
        // Phase 3.3: Visibility tier
        visibilityTier: 'hero',
        // Phase 3.4C: Credibility signals
        credibilitySignals: {
            duration: { en: '2.5 weeks', de: '2,5 Wochen' },
            teamSize: { en: 'Solo project', de: 'Solo-Projekt' },
            region: { en: 'Global (competition)', de: 'Global (Wettbewerb)' },
            engagementType: { en: 'Competition entry / Product', de: 'Wettbewerbseintrag / Produkt' },
            decisionAuthority: { en: 'Full-stack developer, all decisions', de: 'Full-Stack-Entwickler, alle Entscheidungen' }
        },
        // Phase 4.5: Engagement Layer
        outcomeBadges: [
            { label: { en: '75% cost reduction', de: '75% Kostenreduzierung' }, type: 'cost' },
            { label: { en: '2.5s analysis speed', de: '2,5s Analysegeschwindigkeit' }, type: 'speed' },
            { label: { en: '100% observability', de: '100% Observability' }, type: 'performance' }
        ],
        beforeAfterDiagram: {
            before: {
                title: { en: 'Before', de: 'Vorher' },
                bullets: {
                    en: [
                        'Standard LLM calls with full context each time',
                        'High token costs (~$2.00 per 1k images)',
                        'Black box AI responses',
                        'No cost visibility or optimization'
                    ],
                    de: [
                        'Standard-LLM-Calls mit vollem Kontext jedes Mal',
                        'Hohe Token-Kosten (~$2,00 pro 1k Bilder)',
                        'Black-Box-AI-Antworten',
                        'Keine Kosten-Transparenz oder Optimierung'
                    ]
                }
            },
            after: {
                title: { en: 'After', de: 'Nachher' },
                bullets: {
                    en: [
                        'Context caching for 32KB system prompt',
                        '75% reduction in input token costs',
                        'Glass-box reasoning UI with explanations',
                        'Structured JSON responses for reliability'
                    ],
                    de: [
                        'Context-Caching für 32KB System-Prompt',
                        '75% Reduzierung der Input-Token-Kosten',
                        'Glass-Box-Reasoning-UI mit Erklärungen',
                        'Strukturierte JSON-Antworten für Zuverlässigkeit'
                    ]
                }
            },
            deltaBadges: [
                { label: { en: '75% cost reduction', de: '75% Kostenreduzierung' }, type: 'cost' },
                { label: { en: '2.5s response time', de: '2,5s Antwortzeit' }, type: 'speed' }
            ]
        },
        pdfBrief: {
            enabled: true,
            disclaimer: {
                en: 'This executive brief contains anonymized patterns and generic architecture decisions. All specific client details and proprietary information have been removed. Diagrams are recreated from memory and represent industry-standard patterns, not internal architectures.',
                de: 'Dieses Executive Brief enthält anonymisierte Patterns und generische Architektur-Entscheidungen. Alle spezifischen Client-Details und proprietären Informationen wurden entfernt. Diagramme wurden aus dem Gedächtnis neu erstellt und repräsentieren branchenübliche Patterns, nicht interne Architekturen.'
            }
        },
        similaritySignals: {
            industries: ['ai', 'product', 'consumer-apps'],
            problemPatterns: ['high-inference-costs', 'black-box-ai', 'token-cost-control'],
            constraints: ['budget-conscious', 'real-time-analysis', 'transparency-requirement'],
            levers: ['cost-reduction', 'user-trust', 'observability'],
            deliverablePatterns: ['context-caching', 'glass-box-ui', 'cost-optimized-backend'],
            antiPatternsSeen: ['unbounded-token-usage', 'opaque-scoring'],
            decisionFrameworks: ['transparent-ai-architecture'],
            teamSizes: ['2-5'],
            budgetRanges: ['100K-500K'],
            timelines: ['3-6mo'],
            riskProfiles: ['startup'],
            prasadFrameworks: [{
                name: 'Transparent AI Architecture',
                description: { en: 'Context caching and glass-box UX for production AI', de: 'Context Caching und Glass-Box-UX für Production-AI' },
                whenToUse: { en: 'When building AI features with cost and trust constraints', de: 'Bei AI-Features mit Kosten- und Vertrauens-Constraints' }
            }]
        },
        retrospectiveLite: {
            whatWorked: { en: ['Context caching cut costs 75%', 'Glass-box UI built trust'], de: ['Context Caching senkte Kosten um 75%', 'Glass-Box-UI schuf Vertrauen'] },
            whatIdDoToday: { en: ['Add evaluation harness earlier', 'Define golden set from day 1'], de: ['Evaluation-Harness früher aufsetzen', 'Golden Set von Tag 1 definieren'] },
            prasadInsight: { en: 'Transparency and cost control are first-class architecture concerns for production AI.', de: 'Transparenz und Kostenkontrolle sind Architektur-Constraints erster Klasse für Production-AI.' },
            estimatedEffort: '2–4 months, 2–4 people',
            riskMitigation: { en: ['Cap token usage per request', 'Monitor cost per user'], de: ['Token-Nutzung pro Request begrenzen', 'Kosten pro User überwachen'] }
        }
    },
    // --- TIER 1: FLAGSHIP ---
    {
        id: 'pact-pcf-network',
        slug: 'pact-pcf-data-exchange-network',
        theme: {
            color: 'emerald',
            gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10',
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
            backgroundImage: '/assets/bg/bg-eco.png'
        },
        domains: ['Climate Tech', 'Standards Development'],
        projectType: 'standard',
        visualType: 'governance',
        seoTags: ['Carbon Accounting', 'Scope 3 Emissions', 'ESG Technology', 'Product Carbon Footprint', 'Climate Action', 'Sustainability Standards'],
        header: {
            eyebrow: 'GLOBAL STANDARD ADOPTION',
            title: 'Architecting the Global Product Carbon Footprint (PCF) Data Exchange Network',
            client: {
                type: 'Global Non-Profit / Standards Body',
                size: 'Fortune 100 Consortium',
                industry: 'Climate Tech / Sustainability'
            }
        },
        challenge: {
            situation: 'Global supply chains lacked a standardized way to exchange Product Carbon Footprint (PCF) data, making Scope 3 emissions tracking impossible. Major corporations (Microsoft, SAP, Siemens) needed a unified language and protocol.',
            pain_points: [
                {
                    icon: '🌍',
                    title: 'Data Silos',
                    description: 'No interoperability between carbon accounting platforms',
                    impact: 'Blocked Scope 3 transparency'
                },
                {
                    icon: '📉',
                    title: 'Integration Costs',
                    description: 'Custom integrations for every supplier',
                    impact: 'High cost of compliance'
                }
            ],
            urgency: 'Net-zero commitments requiring immediate supply chain transparency',
            why_prasad: 'Unique blend of Enterprise Architecture, Standards Development, and Climate Tech expertise'
        },
        approach: {
            methodology: 'Open Standards Development & Ecosystem Engineering',
            phases: [
                {
                    number: 1,
                    title: 'Technical Specification',
                    duration: '6 months',
                    activities: ['API Design (OpenAPI)', 'Data Model Definition', 'Security Protocol Design'],
                    deliverable: 'PACT Tech Spec v2.0',
                    outcome: 'Global consensus achieved'
                },
                {
                    number: 2,
                    title: 'Conformance Testing',
                    duration: '4 months',
                    activities: ['Testbed Development', 'Automated Testing Suite', 'Certification Process'],
                    deliverable: 'Open Source Testkit',
                    outcome: 'Streamlined vendor onboarding'
                }
            ],
            unique_differentiator: 'Created a decentralized, sovereignty-preserving network architecture rather than a central database'
        },
        outcomes: {
            hero_metric: { value: '60%', label: 'Integration Time Reduction', icon: '⚡' },
            secondary_metrics: [
                { value: '25%', label: 'Adoption Increase', icon: '📈' },
                { value: '90+', label: 'Fortune 100 Adopters', icon: '🏢' }
            ],
            compliance: [],
            timeline: { planned: '18 months', actual: '18 months', variance: 'On Track' }
        },
        technical: {
            before: { stack: [], infrastructure: 'Fragmented manual emails/spreadsheets', issues: ['No API standard', 'Inconsistent data'] },
            after: { stack: ['Next.js', 'React', 'Java Spring Boot', 'TypeScript', 'Docker', 'Kubernetes', 'Azure', 'Kafka'], infrastructure: 'Decentralized Data Space', improvements: ['Standardized API', 'Automated Verification'] },
            migration_strategy: 'Greenfield standards development'
        },
        approachToday: {
            titleKey: 'projects.approachToday.title',
            bullets: [
                'Align stakeholders on scope boundaries: what the standard solves vs. what remains implementation-specific.',
                'Define canonical domain model and versioning strategy (backward compatibility governance).',
                'Ensure interoperability: schema, API contract strategy, and conformance test approach.',
                'Assess adoption risks: onboarding friction, tooling, and reference implementation.',
                'Establish governance operating model: change control, working groups, and release cadence.'
            ],
            bulletsDe: [
                'Scope-Grenzen abstimmen: Was der Standard löst und was bewusst Implementierungsdetails bleibt.',
                'Kanonisches Domänenmodell und Versionierungsstrategie definieren (Backward-Compatibility Governance).',
                'Interoperabilität sicherstellen: Schema, API-Contract-Strategie und Conformance-Tests.',
                'Adoptionsrisiken bewerten: Onboarding-Reibung, Tooling und Referenzimplementierung.',
                'Governance-Modell etablieren: Change-Control, Arbeitsgruppen und Release-Zyklus.'
            ]
        },
        cta: {
            primary: { text: 'View Ecosystem', action: 'https://carbon-transparency.org/network', context: 'See the live network.' },
            secondary: { text: 'GitHub Repo', action: 'https://github.com/wbcsd/pact-conformance-testing' }
        },
        // Phase 3.3: Visibility tier (SINE climate tech project)
        visibilityTier: 'hero',
        // Phase 3.4C: Credibility signals
        credibilitySignals: {
            duration: { en: '18 months', de: '18 Monate' },
            teamSize: { en: '25+ stakeholders', de: '25+ Stakeholder' },
            region: { en: 'Global (Fortune 100)', de: 'Global (Fortune 100)' },
            engagementType: { en: 'Standards development consortium', de: 'Standards-Entwicklungskonsortium' },
            decisionAuthority: { en: 'Technical specification lead, consensus builder', de: 'Technischer Spezifikations-Lead, Konsens-Builder' }
        },
        // Phase 4.5: Engagement Layer
        outcomeBadges: [
            { label: { en: '60% faster integration', de: '60% schnellere Integration' }, type: 'speed' },
            { label: { en: '90+ Fortune 100 adopters', de: '90+ Fortune-100-Adopter' }, type: 'compliance' },
            { label: { en: '25% adoption increase', de: '25% Adoptionssteigerung' }, type: 'performance' }
        ],
        beforeAfterDiagram: {
            before: {
                title: { en: 'Before', de: 'Vorher' },
                bullets: {
                    en: [
                        'Fragmented manual email/spreadsheet exchanges',
                        'No API standard for carbon data',
                        'Inconsistent data formats across vendors',
                        'High integration friction for new participants'
                    ],
                    de: [
                        'Fragmentierte manuelle E-Mail/Tabellen-Austausche',
                        'Kein API-Standard für Carbon-Daten',
                        'Inkonsistente Datenformate über Vendor hinweg',
                        'Hohe Integrations-Reibung für neue Teilnehmer'
                    ]
                }
            },
            after: {
                title: { en: 'After', de: 'Nachher' },
                bullets: {
                    en: [
                        'Standardized PACT API for carbon data exchange',
                        'Automated conformance testing and verification',
                        'Decentralized network preserving data sovereignty',
                        'Streamlined vendor onboarding process'
                    ],
                    de: [
                        'Standardisierte PACT-API für Carbon-Daten-Austausch',
                        'Automatisierte Conformance-Tests und Verifizierung',
                        'Dezentrales Netzwerk mit Daten-Souveränität',
                        'Vereinfachter Vendor-Onboarding-Prozess'
                    ]
                }
            },
            deltaBadges: [
                { label: { en: '60% faster integration', de: '60% schnellere Integration' }, type: 'speed' },
                { label: { en: '90+ adopters', de: '90+ Adopter' }, type: 'compliance' }
            ]
        },
        pdfBrief: {
            enabled: true,
            disclaimer: {
                en: 'This executive brief contains anonymized patterns and generic architecture decisions. All specific client details and proprietary information have been removed. Diagrams are recreated from memory and represent industry-standard patterns, not internal architectures.',
                de: 'Dieses Executive Brief enthält anonymisierte Patterns und generische Architektur-Entscheidungen. Alle spezifischen Client-Details und proprietären Informationen wurden entfernt. Diagramme wurden aus dem Gedächtnis neu erstellt und repräsentieren branchenübliche Patterns, nicht interne Architekturen.'
            }
        },
        similaritySignals: {
            industries: ['climate-tech', 'standards', 'sustainability'],
            problemPatterns: ['data-silos', 'integration-costs', 'scope-3-tracking', 'interoperability'],
            constraints: ['multi-stakeholder', 'sovereignty-preserving', 'global-adoption'],
            levers: ['cost-reduction', 'compliance', 'adoption'],
            deliverablePatterns: ['open-api-spec', 'conformance-testkit', 'decentralized-network'],
            antiPatternsSeen: ['central-database-single-point', 'vendor-specific-schemas'],
            decisionFrameworks: ['decentralized-data-space'],
            teamSizes: ['10-20', '50+'],
            budgetRanges: ['500K-1M'],
            timelines: ['12mo+'],
            riskProfiles: ['enterprise', 'regulated'],
            prasadFrameworks: [{
                name: 'Decentralized Data Space',
                description: { en: 'Sovereignty-preserving network architecture for cross-org data exchange', de: 'Souveränitätserhaltende Netzwerk-Architektur für cross-org Datenaustausch' },
                whenToUse: { en: 'When building standards for multi-party carbon or ESG data exchange', de: 'Bei Standards für Multi-Party Carbon- oder ESG-Datenaustausch' }
            }]
        },
        retrospectiveLite: {
            whatWorked: { en: ['OpenAPI-first spec', 'Conformance testbed accelerated adoption'], de: ['OpenAPI-first Spec', 'Conformance-Testbed beschleunigte Adoption'] },
            whatIdDoToday: { en: ['Align scope boundaries earlier', 'Define versioning strategy up front'], de: ['Scope-Grenzen früher abstimmen', 'Versionierungsstrategie von Anfang an definieren'] },
            prasadInsight: { en: 'Decentralized, sovereignty-preserving design beat central-database approaches for cross-org adoption.', de: 'Dezentraler, souveränitätserhaltender Ansatz schlug Zentral-Datenbank-Ansätze bei cross-org Adoption.' },
            estimatedEffort: '12–18 months, 10–25 stakeholders',
            riskMitigation: { en: ['Governance operating model from day 1', 'Backward-compat versioning'], de: ['Governance-Betriebsmodell von Tag 1', 'Rückwärtskompatible Versionierung'] }
        }
    },
    {
        id: 'brita-ecommerce',
        slug: 'brita-ecommerce',
        theme: {
            color: 'orange',
            gradient: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10',
            iconBg: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
        },
        domains: ['eCommerce', 'Digital Transformation'],
        projectType: 'migration',
        visualType: 'modernization',
        seoTags: ['Headless Commerce', 'Sustainable Ecommerce', 'Cloud Optimization', 'Green IT'],
        header: {
            eyebrow: 'MULTI-MARKET ROLLOUT',
            title: 'Modernizing Global eCommerce: From Monolith to Headless Architecture',
            client: {
                type: 'Global Consumer Goods',
                size: '€600M+ Revenue',
                industry: 'Manufacturing / Retail'
            }
        },
        challenge: {
            contextChips: [
                { label: { en: 'Industry', de: 'Branche' }, value: { en: 'Consumer Goods / eCommerce', de: 'Consumer Goods / eCommerce' } },
                { label: { en: 'Scope', de: 'Scope' }, value: { en: '6 EMEA markets', de: '6 EMEA-Märkte' } },
                { label: { en: 'Platform', de: 'Plattform' }, value: { en: 'Shopify Plus', de: 'Shopify Plus' } },
                { label: { en: 'Constraint', de: 'Constraint' }, value: { en: 'SEO + integrations', de: 'SEO + Integrationen' } },
                { label: { en: 'Delivery', de: 'Delivery' }, value: { en: 'Zero downtime target', de: 'Zero-Downtime Ziel' } }
            ],
            standard: {
                situation: {
                    en: 'BRITA needed to migrate from Shopware to Shopify Plus across 6 EMEA markets without breaking SEO, analytics, or fulfillment integrations. The platform had to support localization, structured product content, and future experimentation—while minimizing downtime and operational load.',
                    de: 'BRITA musste Shopware durch Shopify Plus in 6 EMEA-Märkten ersetzen—ohne SEO-Verluste, ohne Integrationsbrüche und ohne operative Instabilität. Gleichzeitig sollte die Plattform Lokalisierung, strukturierte Produktdaten und zukünftige Optimierungen ermöglichen.'
                },
                keyTensions: {
                    en: [
                        'Zero-downtime cutover vs fragmented legacy integrations',
                        'SEO preservation vs URL/metadata changes during migration',
                        'Speed-to-market vs long-term maintainability',
                        'Shared components vs market-specific localization needs',
                        'Vendor templates vs BRITA-specific business rules'
                    ],
                    de: [
                        'Zero-Downtime Cutover vs komplexe Legacy-Integrationen',
                        'SEO-Schutz vs Änderungen an URLs/Metadaten',
                        'Time-to-Market vs Wartbarkeit im Target Operating Model',
                        'Wiederverwendbarkeit vs lokale Marktanforderungen',
                        'Standard-Templates vs BRITA-spezifische Business Rules'
                    ]
                },
                urgency: {
                    en: 'Seasonal campaigns and country launches were blocked by the legacy platform limitations.',
                    de: 'Saisonale Kampagnen und Länder-Rollouts wurden durch Plattformgrenzen ausgebremst.'
                }
            },
            executive: {
                situation: {
                    en: "BRITA's eCommerce growth was constrained by a platform that slowed releases and increased operational risk. The modernization goal wasn't only a replatform—it was to enable faster market launches, reduce vendor dependency, and protect revenue-critical traffic during transition.",
                    de: 'Das Ziel war nicht nur ein Replatforming, sondern eine belastbare Grundlage für Wachstum: schnellere Marktstarts, weniger Abhängigkeit von Dienstleistern und eine kontrollierte Transition ohne Umsatzrisiko.'
                },
                keyTensions: {
                    en: [
                        'Revenue continuity vs platform replacement risk',
                        'Market launch speed vs governance and brand consistency',
                        'Reducing vendor dependency without delaying delivery',
                        'Migration cost containment vs future-proof architecture'
                    ],
                    de: [
                        'Umsatzkontinuität vs Migrationsrisiko',
                        'Marktgeschwindigkeit vs Governance/Brand-Konsistenz',
                        'Vendor-Abhängigkeit reduzieren ohne Delivery zu blockieren',
                        'Kostenkontrolle vs Architektur-Zukunftsfähigkeit'
                    ]
                },
                urgency: {
                    en: 'Delay impacted growth initiatives and increased campaign execution risk.',
                    de: 'Jede Verzögerung erhöhte Kampagnenrisiken und bremste Wachstumsinitiativen.'
                }
            },
            technical: {
                situation: {
                    en: "The key technical challenge was executing a multi-market replatform while keeping integrations stable (payments, ERP, fulfillment, analytics), preserving SEO signals, and avoiding a fragile 'big bang' cutover. The solution needed clean domain boundaries and reusable components across markets.",
                    de: 'Technisch lag der Schwerpunkt auf einer mehrstufigen Migration über mehrere Märkte hinweg: Integrationen (Payment, ERP, Fulfillment, Analytics) stabil halten, SEO-Signale erhalten und Cutover-Risiken minimieren. Gleichzeitig musste die Architektur klar modular sein, damit weitere Märkte effizient angebunden werden können.'
                },
                keyTensions: {
                    en: [
                        'Strangler migration vs big bang cutover',
                        'Composable architecture vs Shopify customization limits',
                        'Data model cleanup vs time-to-migrate pressure',
                        'Integration reliability vs change volume',
                        'Observability readiness for multi-market rollout'
                    ],
                    de: [
                        'Strangler-Ansatz vs Big-Bang-Cutover',
                        'Composable Design vs Shopify-Limitierungen',
                        'Datenmodell-Bereinigung vs Delivery-Druck',
                        'Integrationsstabilität vs hohe Änderungsrate',
                        'Observability/Monitoring für Rollout-Sicherheit'
                    ]
                },
                urgency: {
                    en: 'Migration sequencing had to align with campaign calendar and business freeze windows.',
                    de: 'Sequenzierung musste mit Kampagnenkalender und Business-Freeze-Zeiten kompatibel sein.'
                }
            },
            why_prasad: { en: 'Proven track record in headless commerce and cloud migration', de: 'Nachgewiesene Erfolge in Headless Commerce und Cloud-Migration' }
        },
        // Phase 2: Executive Snapshot
        executiveSnapshot: {
            whyItMattered: {
                en: [
                    'BRITA needed a scalable eCommerce platform to support 6 EMEA markets with consistent customer experience.',
                    'Legacy Shopware implementation created high operational overhead and slow release cycles.',
                    'Business required migration without revenue disruption and with minimal internal change load.'
                ],
                de: [
                    'BRITA benötigte eine skalierbare E-Commerce-Plattform für 6 EMEA-Märkte mit konsistenter Customer Experience.',
                    'Die bestehende Shopware-Implementierung verursachte hohen Betriebsaufwand und langsame Release-Zyklen.',
                    'Die Migration musste ohne Umsatzrisiko und mit minimaler Belastung interner Teams erfolgen.'
                ]
            },
            keyTensions: {
                en: [
                    'Speed-to-market vs. platform governance across multiple markets.',
                    'Migration continuity vs. deep refactoring of legacy integrations.',
                    'Shopify ecosystem benefits vs. avoiding vendor lock-in and hidden costs.'
                ],
                de: [
                    'Geschwindigkeit vs. Governance über mehrere Märkte hinweg.',
                    'Kontinuität in der Migration vs. tiefes Refactoring von Legacy-Integrationen.',
                    'Vorteile des Shopify-Ökosystems vs. Vermeidung von Lock-in und versteckten Kosten.'
                ]
            },
            metricCallout: {
                value: { en: '6 markets', de: '6 Märkte' },
                label: { en: 'migrated to Shopify Plus', de: 'migriert auf Shopify Plus' }
            }
        },
        // Phase 2: Persona Challenges
        personaChallenges: {
            executive: {
                challenges: {
                    en: [
                        'Ensure uninterrupted revenue during migration (no "big bang" cutover risk).',
                        'Align stakeholders across markets on a single reference architecture and operating model.',
                        'Maintain consistent product and pricing governance across regions.',
                        'Control long-term platform costs and avoid "agency dependency".',
                        'Build confidence that Shopify was the right strategic choice for the next 3–5 years.'
                    ],
                    de: [
                        'Umsatzkontinuität sicherstellen (kein Big-Bang-Cutover-Risiko).',
                        'Stakeholder über mehrere Märkte auf Referenzarchitektur und Operating Model ausrichten.',
                        'Konsistente Governance für Produkt- und Preislogik in allen Regionen sicherstellen.',
                        'Langfristige Plattformkosten steuern und „Agency-Dependency" vermeiden.',
                        'Sicherheit schaffen, dass Shopify strategisch für die nächsten 3–5 Jahre die richtige Wahl ist.'
                    ]
                },
                riskIfIgnored: {
                    en: [
                        'Revenue disruption during cutover and seasonal traffic peaks.',
                        'Market divergence leading to fragmented platforms and higher TCO.',
                        'Replatforming twice due to bad early platform decisions.'
                    ],
                    de: [
                        'Umsatzverluste durch Cutover-Probleme in Peak-Phasen.',
                        'Divergierende Markt-Lösungen → fragmentierte Plattform und höhere TCO.',
                        'Zweite Replatforming-Runde wegen falscher Anfangsentscheidungen.'
                    ]
                },
                decisionPoints: {
                    en: [
                        'Sequence migration by market vs. migrate all markets together.',
                        'Standardize shared services vs. allow regional deviations.',
                        'Define ownership of integrations (internal vs partner).'
                    ],
                    de: [
                        'Migration nach Märkten sequenzieren vs. parallel migrieren.',
                        'Shared Services standardisieren vs. regionale Abweichungen erlauben.',
                        'Ownership der Integrationen definieren (intern vs. Partner).'
                    ]
                }
            },
            technical: {
                challenges: {
                    en: [
                        'Decouple legacy ERP/OMS integrations without breaking order flows.',
                        'Preserve SEO rankings during URL + content migration.',
                        'Design a scalable headless integration layer for downstream systems.',
                        'Ensure observability across checkout, fulfillment, and payment flows.',
                        'Build deployment safety: feature flags, rollback strategy, integration testing.'
                    ],
                    de: [
                        'Legacy ERP/OMS-Integrationen entkoppeln, ohne Order-Flows zu brechen.',
                        'SEO-Rankings bei URL- und Content-Migration erhalten.',
                        'Skalierbare headless Integration Layer für Downstream-Systeme designen.',
                        'Observability für Checkout-, Fulfillment- und Payment-Flows sicherstellen.',
                        'Deployment-Sicherheit: Feature Flags, Rollback-Strategie, Integrationstests.'
                    ]
                },
                riskIfIgnored: {
                    en: [
                        'Broken checkout / order processing with delayed detection.',
                        'SEO loss leading to measurable revenue decline.',
                        'Hidden integration complexity delaying delivery by months.'
                    ],
                    de: [
                        'Defekte Checkout-/Order-Prozesse mit verspäteter Erkennung.',
                        'SEO-Verlust → messbarer Umsatzrückgang.',
                        'Versteckte Integrationskomplexität → Monate Verzögerung.'
                    ]
                },
                decisionPoints: {
                    en: [
                        'Headless vs. Shopify-native patterns for critical flows.',
                        'Integration ownership boundaries (Shopify vs middleware).',
                        'Data model mapping and product catalog governance.'
                    ],
                    de: [
                        'Headless vs. Shopify-native Patterns für kritische Flows.',
                        'Integrationsgrenzen definieren (Shopify vs Middleware).',
                        'Datenmodell-Mapping und Produktkatalog-Governance.'
                    ]
                }
            },
            delivery: {
                challenges: {
                    en: [
                        'Deliver in phased releases without destabilizing markets.',
                        'Align agencies, internal teams, and vendors with clear accountability.',
                        'Establish migration governance: scope control, risk register, escalation paths.',
                        'Create a realistic cutover plan with rollback and support readiness.',
                        'Avoid rework by validating integration constraints early.'
                    ],
                    de: [
                        'Phasenweise Releases liefern, ohne Märkte zu destabilisieren.',
                        'Agencies, interne Teams und Vendoren mit klarer Accountability ausrichten.',
                        'Migration Governance etablieren: Scope Control, Risk Register, Escalation Paths.',
                        'Realistischer Cutover-Plan inkl. Rollback und Support-Readiness.',
                        'Rework vermeiden durch frühe Validierung von Integrations-Constraints.'
                    ]
                },
                riskIfIgnored: {
                    en: [
                        'Delays due to unclear ownership and escalation paths.',
                        'Uncontrolled scope expansion across markets.',
                        'Failed cutover requiring costly recovery work.'
                    ],
                    de: [
                        'Verzögerungen durch unklare Ownership- und Eskalationswege.',
                        'Unkontrollierte Scope-Ausweitung über Märkte hinweg.',
                        'Fehlgeschlagener Cutover mit hohen Recovery-Kosten.'
                    ]
                },
                decisionPoints: {
                    en: [
                        'Governance model: central PMO vs. market-led delivery.',
                        'Release cadence and QA gating.',
                        'Cutover rehearsal strategy.'
                    ],
                    de: [
                        'Governance-Modell: zentrale PMO vs. marktgetriebene Umsetzung.',
                        'Release-Cadence und QA-Gating.',
                        'Cutover-Rehearsal-Strategie.'
                    ]
                }
            }
        },
        approach: {
            methodology: 'Headless Transformation Strategy',
            phases: [
                { number: 1, title: 'Discovery & POC', duration: '2 months', activities: ['Platform Selection (Shopify Plus)', 'Headless Architecture Design'], deliverable: 'Proof of Concept', outcome: 'Validated architecture' },
                { number: 2, title: 'Migration & Rollout', duration: '8 months', activities: ['Data Migration', 'Frontend Build (Vue.js)', 'Multi-tenant Setup'], deliverable: 'Live in 6 Markets', outcome: 'Zero downtime launch' }
            ],
            unique_differentiator: 'Implemented a multi-tenant governance model allowing centralized core with local market flexibility'
        },
        outcomes: {
            hero_metric: { value: '15+', label: 'Markets Supported', icon: '🌍' },
            secondary_metrics: [
                { value: '30%', label: 'Faster Deployments', icon: '🚀' },
                { value: 'Zero', label: 'Downtime Migration', icon: '✅' }
            ],
            compliance: [{ standard: 'GDPR', result: 'Compliant', details: 'Full EU compliance' }],
            timeline: { planned: '12 months', actual: '10 months', variance: '2 months early' }
        },
        technical: {
            before: { stack: ['Shopware', 'Monolithic'], infrastructure: 'On-premise', issues: ['Scalability limits', 'High maintenance'] },
            after: { stack: ['Shopify Plus', 'Vue.js', 'Nuxt.js', 'Azure', 'Varnish', 'Redis'], infrastructure: 'Cloud-native Headless', improvements: ['Global scalability', 'Decoupled frontend'] },
            migration_strategy: 'Strangler Fig Pattern'
        },
        cta: {
            primary: { text: 'Book Consultation', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Discuss your migration.' },
            secondary: { text: 'View Architecture', action: '#' }
        },
        approachToday: {
            titleKey: 'projects.approachToday.title',
            bullets: [
                'Validate platform fit against NFRs (performance, localization, integrations) before committing.',
                'Define clear domain boundaries and data model for multi-market governance.',
                'Plan migration waves aligned to campaign calendar and business freeze windows.',
                'Establish SEO migration strategy with redirect mapping and monitoring from day 1.',
                'Design composable architecture that balances reusability with market-specific flexibility.'
            ],
            bulletsDe: [
                'Plattform-Fit gegen NFRs (Performance, Lokalisierung, Integrationen) validieren, bevor Entscheidung fällt.',
                'Klare Domain-Grenzen und Datenmodell für Multi-Market-Governance definieren.',
                'Migrationswellen auf Kampagnenkalender und Business-Freeze-Zeiträume abstimmen.',
                'SEO-Migrationsstrategie mit Redirect-Mapping und Monitoring von Tag 1 etablieren.',
                'Composable-Architektur designen, die Wiederverwendbarkeit und Markt-Flexibilität balanciert.'
            ]
        },
        // Phase 2.6: Listing metadata for executive-first cards
        tags: [
            'E-Commerce',
            'Cloud Modernization',
            'Platform Engineering',
            'Shopify Plus',
            'Migration',
            'EMEA Rollout'
        ],
        listingSummary: {
            en: 'Migrated 6-market eCommerce landscape from Shopware to Shopify Plus with zero downtime and stable integration patterns across EMEA.',
            de: 'Migration der 6-Markt-eCommerce-Landschaft von Shopware zu Shopify Plus mit Zero-Downtime und stabilen Integrationsmustern in EMEA.'
        },
        listingMetrics: [
            { label: { en: 'Scope', de: 'Scope' }, value: { en: '6 markets', de: '6 Märkte' }, type: 'scope' },
            { label: { en: 'Cutover', de: 'Cutover' }, value: { en: 'Zero downtime', de: 'Zero Downtime' }, type: 'constraint' },
            { label: { en: 'Platform', de: 'Plattform' }, value: { en: 'Shopware → Shopify Plus', de: 'Shopware → Shopify Plus' }, type: 'scope' }
        ],
        // Phase 3.1: Trust Layer
        trustLayer: {
            myRole: { en: 'Lead Architect / Program Manager', de: 'Lead-Architekt / Program Manager' },
            scopeOwned: {
                en: [
                    'Architecture design and governance model definition',
                    'Platform selection (Shopify Plus) and vendor negotiation',
                    'Migration strategy and sequencing across 6 markets',
                    'SEO preservation and redirect mapping strategy',
                    'Stakeholder alignment and cross-functional coordination'
                ],
                de: [
                    'Architektur-Design und Governance-Modell-Definition',
                    'Plattform-Auswahl (Shopify Plus) und Vendor-Verhandlung',
                    'Migrationsstrategie und Sequenzierung über 6 Märkte',
                    'SEO-Erhaltung und Redirect-Mapping-Strategie',
                    'Stakeholder-Alignment und Cross-Funktionale Koordination'
                ]
            },
            deliveredWithTeam: {
                en: [
                    'Frontend implementation (Vue.js/Nuxt.js) by development team',
                    'Data migration execution and validation',
                    'Infrastructure setup (Azure, CDN, caching) by DevOps team',
                    'Market-specific localization and content management',
                    'Testing and QA across all markets'
                ],
                de: [
                    'Frontend-Implementierung (Vue.js/Nuxt.js) durch Development-Team',
                    'Datenmigration-Ausführung und Validierung',
                    'Infrastruktur-Setup (Azure, CDN, Caching) durch DevOps-Team',
                    'Marktspezifische Lokalisierung und Content-Management',
                    'Testing und QA über alle Märkte'
                ]
            },
            confidentialityNote: {
                en: 'This case study is anonymized and generalized. It contains no confidential data, internal system details, code, or proprietary documents. All diagrams are recreated from memory and represent patterns, not internal architectures.',
                de: 'Diese Fallstudie ist anonymisiert und verallgemeinert. Sie enthält keine vertraulichen Daten, internen Systemdetails, Code oder proprietäre Dokumente. Alle Diagramme sind aus dem Gedächtnis rekonstruiert und repräsentieren Patterns, nicht interne Architekturen.'
            }
        },
        // Phase 3.1: Artifact Previews
        artifactPreviews: [
            {
                title: { en: 'Architecture Decision Records (ADRs)', de: 'Architecture Decision Records (ADRs)' },
                description: { en: 'Documented decisions on platform selection, migration strategy, and governance model', de: 'Dokumentierte Entscheidungen zu Plattform-Auswahl, Migrationsstrategie und Governance-Modell' },
                type: 'ADR',
                gated: true
            },
            {
                title: { en: 'Migration Sequencing Diagram', de: 'Migrations-Sequenzierungs-Diagramm' },
                description: { en: 'Multi-market rollout sequence with dependencies and risk mitigation steps', de: 'Multi-Market-Rollout-Sequenz mit Abhängigkeiten und Risiko-Mitigations-Schritten' },
                type: 'Diagram',
                gated: true
            },
            {
                title: { en: 'SEO Migration Checklist', de: 'SEO-Migrations-Checklist' },
                description: { en: 'Comprehensive checklist for preserving SEO during platform migration', de: 'Umfassende Checkliste zur SEO-Erhaltung während Plattform-Migration' },
                type: 'Checklist',
                gated: true
            },
            {
                title: { en: 'Multi-Tenant Architecture Blueprint', de: 'Multi-Tenant-Architektur-Blueprint' },
                description: { en: 'Reference architecture for centralized core with market-specific flexibility', de: 'Referenzarchitektur für zentralisierten Core mit marktspezifischer Flexibilität' },
                type: 'Diagram',
                gated: true
            },
            {
                title: { en: 'Integration Layer Design', de: 'Integrationsschicht-Design' },
                description: { en: 'Headless integration patterns for ERP, OMS, and fulfillment systems', de: 'Headless-Integrationsmuster für ERP, OMS und Fulfillment-Systeme' },
                type: 'Diagram',
                gated: true
            },
            {
                title: { en: 'Cutover Runbook', de: 'Cutover-Runbook' },
                description: { en: 'Step-by-step cutover procedure with rollback and monitoring checkpoints', de: 'Schritt-für-Schritt Cutover-Prozedur mit Rollback- und Monitoring-Checkpoints' },
                type: 'Checklist',
                gated: true
            }
        ],
        // Phase 3.3: Visibility tier
        visibilityTier: 'hero',
        // Phase 3.4C: Credibility signals
        credibilitySignals: {
            duration: { en: '10 months', de: '10 Monate' },
            teamSize: { en: '18 engineers', de: '18 Ingenieure' },
            region: { en: 'EMEA (6 markets)', de: 'EMEA (6 Märkte)' },
            engagementType: { en: 'Internal transformation program', de: 'Interne Transformationsprogramm' },
            decisionAuthority: { en: 'Lead Architect, final design approval', de: 'Lead-Architekt, finale Design-Freigabe' }
        },
        // Phase 4.5: Engagement Layer
        outcomeBadges: [
            { label: { en: 'Zero downtime migration', de: 'Zero-Downtime-Migration' }, type: 'reliability' },
            { label: { en: '30% faster deployments', de: '30% schnellere Deployments' }, type: 'speed' },
            { label: { en: '15+ markets supported', de: '15+ Märkte unterstützt' }, type: 'performance' }
        ],
        beforeAfterDiagram: {
            before: {
                title: { en: 'Before', de: 'Vorher' },
                bullets: {
                    en: [
                        'Monolithic Shopware platform',
                        'On-premise infrastructure with scalability limits',
                        'High maintenance overhead',
                        'Slow release cycles blocking market launches'
                    ],
                    de: [
                        'Monolithische Shopware-Plattform',
                        'On-Premise-Infrastruktur mit Skalierbarkeitsgrenzen',
                        'Hoher Wartungsaufwand',
                        'Langsame Release-Zyklen blockieren Markt-Launches'
                    ]
                }
            },
            after: {
                title: { en: 'After', de: 'Nachher' },
                bullets: {
                    en: [
                        'Headless Shopify Plus architecture',
                        'Cloud-native infrastructure with global scalability',
                        'Decoupled frontend enabling faster iterations',
                        'Multi-tenant governance model for market flexibility'
                    ],
                    de: [
                        'Headless Shopify Plus Architektur',
                        'Cloud-native Infrastruktur mit globaler Skalierbarkeit',
                        'Entkoppeltes Frontend für schnellere Iterationen',
                        'Multi-Tenant-Governance-Modell für Markt-Flexibilität'
                    ]
                }
            },
            deltaBadges: [
                { label: { en: 'Zero downtime', de: 'Zero Downtime' }, type: 'reliability' },
                { label: { en: '30% faster', de: '30% schneller' }, type: 'speed' }
            ]
        },
        pdfBrief: {
            enabled: true,
            disclaimer: {
                en: 'This executive brief contains anonymized patterns and generic architecture decisions. All specific client details and proprietary information have been removed. Diagrams are recreated from memory and represent industry-standard patterns, not internal architectures.',
                de: 'Dieses Executive Brief enthält anonymisierte Patterns und generische Architektur-Entscheidungen. Alle spezifischen Client-Details und proprietären Informationen wurden entfernt. Diagramme wurden aus dem Gedächtnis neu erstellt und repräsentieren branchenübliche Patterns, nicht interne Architekturen.'
            }
        },
        similaritySignals: {
            industries: ['ecommerce', 'retail', 'consumer-goods'],
            problemPatterns: ['legacy-platform-migration', 'multi-market-complexity', 'vendor-lock-in', 'headless-architecture-need'],
            constraints: ['zero-downtime-requirement', 'multi-language-support', 'existing-customer-data', 'tight-timeline'],
            levers: ['cost-reduction', 'scalability', 'market-expansion'],
            deliverablePatterns: ['adr-pack', 'target-architecture', 'blueprint-sprint', 'integration-layer'],
            antiPatternsSeen: ['big-bang-cutover', 'seo-ignored-during-migration'],
            decisionFrameworks: ['headless-migration-phasing', 'multi-tenant-governance'],
            teamSizes: ['5-10', '10-20'],
            budgetRanges: ['500K-1M'],
            timelines: ['6-12mo'],
            riskProfiles: ['enterprise'],
            prasadFrameworks: [{
                name: 'Headless Commerce Migration',
                description: { en: 'My 4-phase approach to platform migration without business disruption', de: 'Mein 4-Phasen-Ansatz für Plattform-Migration ohne Geschäftsunterbrechung' },
                whenToUse: { en: 'When migrating from monolithic to headless commerce with multiple markets', de: 'Bei der Migration von monolithischem zu Headless Commerce mit mehreren Märkten' }
            }]
        },
        retrospectiveLite: {
            whatWentWrong: { en: ['Underestimated data migration complexity', 'Third-party integration delays'], de: ['Komplexität der Datenmigration unterschätzt', 'Verzögerungen bei Drittanbieter-Integrationen'] },
            whatWorked: { en: ['Phased rollout by market', 'Early stakeholder alignment', 'Headless architecture decision'], de: ['Stufenweise Einführung nach Märkten', 'Frühe Stakeholder-Abstimmung', 'Headless-Architektur-Entscheidung'] },
            whatIdDoToday: { en: ['Start with data audit in week 1', 'Build integration sandbox earlier', 'Add more automated testing'], de: ['Datenaudit in Woche 1 beginnen', 'Integrations-Sandbox früher aufbauen', 'Mehr automatisierte Tests hinzufügen'] },
            prasadInsight: { en: "The key insight: headless architecture isn't just technical—it's about organizational readiness for multi-market complexity.", de: 'Die wichtigste Erkenntnis: Headless-Architektur ist nicht nur technisch—es geht um organisatorische Bereitschaft für Multi-Markt-Komplexität.' },
            estimatedEffort: '6-8 months, 5-7 people',
            riskMitigation: { en: ['Always audit data quality first', 'Build integration sandbox in parallel', 'Plan for 20% buffer on third-party integrations'], de: ['Datenqualität immer zuerst prüfen', 'Integrations-Sandbox parallel aufbauen', '20% Puffer für Drittanbieter-Integrationen einplanen'] }
        }
    },
    {
        id: 'delivery-hero-ads',
        slug: 'delivery-hero-ads',
        theme: {
            color: 'rose',
            gradient: 'from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/10',
            iconBg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
        },
        domains: ['AdTech', 'eCommerce', 'High-Scale'],
        projectType: 'product',
        visualType: 'performance',
        seoTags: ['AdTech', 'High Scale', 'Go', 'Kubernetes', 'Revenue Growth'],
        header: {
            eyebrow: '$20M REVENUE UPLIFT',
            title: 'Scaling Display Ads Platform to 5M+ Daily Transactions',
            client: {
                type: 'Global Food Delivery',
                size: 'DAX Listed',
                industry: 'E-commerce'
            }
        },
        challenge: {
            contextChips: [
                { label: { en: 'Industry', de: 'Branche' }, value: { en: 'Food Delivery / AdTech', de: 'Food Delivery / AdTech' } },
                { label: { en: 'Scale', de: 'Volumen' }, value: { en: '5M+ daily transactions', de: '5M+ tägliche Transaktionen' } },
                { label: { en: 'SLA', de: 'SLA' }, value: { en: '99.99% availability', de: '99,99% Verfügbarkeit' } },
                { label: { en: 'Latency', de: 'Latenz' }, value: { en: '<20ms target', de: '<20ms Ziel' } },
                { label: { en: 'Impact', de: 'Impact' }, value: { en: '$20M revenue uplift', de: '$20M Umsatzsteigerung' } }
            ],
            standard: {
                situation: {
                    en: 'The existing ad server was crashing during peak lunch hours, with latency exceeding 200ms and causing lost impressions and revenue. The platform needed to scale to 5M+ daily transactions while maintaining sub-20ms response times and 99.99% availability.',
                    de: 'Der bestehende Ad-Server stürzte zu Spitzenzeiten ab, mit Latenzen über 200ms und daraus resultierenden verlorenen Impressionen und Umsatzeinbußen. Die Plattform musste auf 5M+ tägliche Transaktionen skaliert werden bei gleichzeitiger Einhaltung von <20ms Antwortzeiten und 99,99% Verfügbarkeit.'
                },
                keyTensions: {
                    en: [
                        'Peak traffic spikes vs infrastructure cost control',
                        'Sub-20ms latency vs data consistency requirements',
                        'Legacy PHP codebase vs modern performance needs',
                        'Rapid delivery vs production stability',
                        'Per-second billing accuracy vs system throughput'
                    ],
                    de: [
                        'Peak-Traffic-Spitzen vs Infrastruktur-Kostenkontrolle',
                        'Sub-20ms Latenz vs Datenkonsistenz-Anforderungen',
                        'Legacy PHP-Codebase vs moderne Performance-Anforderungen',
                        'Schnelle Delivery vs Produktionsstabilität',
                        'Sekundengenaue Abrechnung vs Systemdurchsatz'
                    ]
                },
                urgency: {
                    en: 'Black Friday approaching with projected 3x traffic increase.',
                    de: 'Black Friday rückte näher mit prognostiziertem 3-fachen Traffic-Anstieg.'
                }
            },
            executive: {
                situation: {
                    en: 'Revenue from display ads was being lost due to platform instability during peak hours. The business case was clear: every millisecond of latency and every crash directly impacted impression yield and advertiser confidence. A 20% revenue increase was projected if performance targets were met.',
                    de: 'Umsätze aus Display-Ads gingen durch Plattforminstabilität zu Spitzenzeiten verloren. Der Business Case war eindeutig: Jede Millisekunde Latenz und jeder Absturz wirkte sich direkt auf Impression-Yield und Advertiser-Vertrauen aus. Bei Erreichen der Performance-Ziele wurde eine 20%ige Umsatzsteigerung prognostiziert.'
                },
                keyTensions: {
                    en: [
                        'Revenue at risk vs migration/replatform investment',
                        'Advertiser SLA commitments vs technical debt',
                        'Speed of fix vs long-term architecture quality',
                        'Team capacity vs Black Friday deadline'
                    ],
                    de: [
                        'Gefährdeter Umsatz vs Migrations-/Replatform-Investition',
                        'Advertiser-SLA-Zusagen vs technische Schulden',
                        'Schnelligkeit der Lösung vs langfristige Architekturqualität',
                        'Teamkapazität vs Black-Friday-Deadline'
                    ]
                },
                urgency: {
                    en: 'Seasonal revenue at stake with Black Friday as hard deadline.',
                    de: 'Saisonaler Umsatz auf dem Spiel mit Black Friday als harter Deadline.'
                }
            },
            technical: {
                situation: {
                    en: 'The core technical challenge was re-architecting a high-throughput ad serving system from PHP/MySQL to Go/Redis while implementing exact-once processing for billing accuracy. The system needed to handle 5M+ daily transactions with <20ms P99 latency and support real-time bidding workflows.',
                    de: 'Die zentrale technische Herausforderung war die Re-Architektur eines Hochdurchsatz-Ad-Serving-Systems von PHP/MySQL zu Go/Redis bei gleichzeitiger Implementierung von Exactly-Once-Processing für Abrechnungsgenauigkeit. Das System musste 5M+ tägliche Transaktionen mit <20ms P99-Latenz bewältigen und Real-Time-Bidding-Workflows unterstützen.'
                },
                keyTensions: {
                    en: [
                        'Event-driven architecture vs legacy synchronous patterns',
                        'Exact-once processing vs throughput optimization',
                        'Go migration vs team PHP expertise',
                        'Redis caching strategy vs data durability',
                        'Kubernetes auto-scaling vs cost predictability'
                    ],
                    de: [
                        'Event-Driven-Architektur vs Legacy-synchrone Patterns',
                        'Exactly-Once-Processing vs Throughput-Optimierung',
                        'Go-Migration vs Team-PHP-Expertise',
                        'Redis-Caching-Strategie vs Datenpersistenz',
                        'Kubernetes Auto-Scaling vs Kostenplanbarkeit'
                    ]
                },
                urgency: {
                    en: 'Architecture decisions had to support 3x traffic growth within 6 weeks.',
                    de: 'Architekturentscheidungen mussten 3-faches Traffic-Wachstum innerhalb von 6 Wochen ermöglichen.'
                }
            },
            why_prasad: { en: 'High-scale distributed systems expertise', de: 'Expertise in hochskalierten verteilten Systemen' }
        },
        // Phase 2: Executive Snapshot
        executiveSnapshot: {
            whyItMattered: {
                en: [
                    'Advertising became a strategic revenue stream requiring enterprise-grade reliability and scale.',
                    'The platform needed to handle millions of daily transactions with strict latency requirements.',
                    'Leadership required a measurable uplift in monetization while protecting customer experience.'
                ],
                de: [
                    'Werbung wurde zu einem strategischen Revenue Stream mit Bedarf an Enterprise-Scale Reliability.',
                    'Die Plattform musste Millionen täglicher Transaktionen mit strikten Latenzanforderungen verarbeiten.',
                    'Das Management erwartete messbare Monetarisierungssteigerung bei gleichzeitig stabiler Customer Experience.'
                ]
            },
            keyTensions: {
                en: [
                    'Revenue growth vs. protecting marketplace experience (latency, relevance).',
                    'High-scale experimentation vs. platform stability and governance.',
                    'Fast delivery vs. operational excellence (SRE discipline, SLAs).'
                ],
                de: [
                    'Umsatzwachstum vs. Schutz der Marketplace Experience (Latenz, Relevanz).',
                    'High-Scale Experimentation vs. Plattformstabilität und Governance.',
                    'Schnelle Delivery vs. Operational Excellence (SRE-Disziplin, SLAs).'
                ]
            },
            metricCallout: {
                value: { en: '99.99%', de: '99,99%' },
                label: { en: 'SLA at scale', de: 'SLA bei hoher Last' }
            }
        },
        // Phase 2: Persona Challenges
        personaChallenges: {
            executive: {
                challenges: {
                    en: [
                        'Scale ads revenue without degrading marketplace performance.',
                        'Build confidence in platform reliability under peak traffic and campaigns.',
                        'Introduce governance for experimentation and rollout safety.',
                        'Align product monetization goals with engineering delivery constraints.',
                        'Ensure the platform remains extensible for future ad formats.'
                    ],
                    de: [
                        'Ads-Revenue skalieren ohne Marketplace-Performance zu verschlechtern.',
                        'Vertrauen in Zuverlässigkeit unter Peak Traffic und Kampagnen aufbauen.',
                        'Governance für Experimentation und Rollout-Sicherheit etablieren.',
                        'Monetarisierungsziele mit Delivery-Constraints der Engineering-Teams ausrichten.',
                        'Plattform erweiterbar halten für zukünftige Ad-Formate.'
                    ]
                },
                riskIfIgnored: {
                    en: [
                        'Revenue growth stalled due to platform instability.',
                        'Customer trust erosion if ads degrade UX.',
                        'Operational costs rise through unmanaged complexity.'
                    ],
                    de: [
                        'Umsatzwachstum stagniert aufgrund instabiler Plattform.',
                        'Vertrauensverlust wenn Ads die UX verschlechtern.',
                        'Betriebskosten steigen durch unkontrollierte Komplexität.'
                    ]
                },
                decisionPoints: {
                    en: [
                        'Define SLAs and guardrails for monetization experiments.',
                        'Prioritize reliability investments vs feature acceleration.',
                        'Establish operating model (SRE / platform ownership).'
                    ],
                    de: [
                        'SLAs und Guardrails für Monetarisierungs-Experimente definieren.',
                        'Reliability-Investments vs Feature Acceleration priorisieren.',
                        'Operating Model etablieren (SRE / Platform Ownership).'
                    ]
                }
            },
            technical: {
                challenges: {
                    en: [
                        'Design for high throughput and low latency under burst load.',
                        'Build event-driven architecture for tracking, attribution, and reporting.',
                        'Ensure data consistency across bidding, delivery, and reporting pipelines.',
                        'Implement observability at scale (metrics, tracing, anomaly detection).',
                        'Harden platform with automated failure handling and resilience patterns.'
                    ],
                    de: [
                        'Für hohen Durchsatz und geringe Latenz bei Burst Load designen.',
                        'Event-driven Architektur für Tracking, Attribution und Reporting aufbauen.',
                        'Datenkonsistenz über Bidding-, Delivery- und Reporting-Pipelines sicherstellen.',
                        'Observability in Scale (Metrics, Tracing, Anomaly Detection) implementieren.',
                        'Plattform-Härtung durch automatisiertes Failure Handling und Resilience Patterns.'
                    ]
                },
                riskIfIgnored: {
                    en: [
                        'Latency spikes causing lost auctions and revenue leakage.',
                        'Data integrity gaps damaging advertiser trust.',
                        'On-call overload and unstable releases.'
                    ],
                    de: [
                        'Latenzspitzen verursachen verlorene Auctions und Revenue Leakage.',
                        'Data-Integrity-Lücken zerstören Advertiser Trust.',
                        'On-call Überlastung und instabile Releases.'
                    ]
                },
                decisionPoints: {
                    en: [
                        'Event streaming + storage patterns (Kafka / Kinesis, OLAP).',
                        'Reliability patterns: backpressure, retries, idempotency.',
                        'Observability strategy and SLO enforcement.'
                    ],
                    de: [
                        'Event Streaming + Storage Patterns (Kafka/Kinesis, OLAP).',
                        'Reliability Patterns: Backpressure, Retries, Idempotency.',
                        'Observability-Strategie und SLO-Enforcement.'
                    ]
                }
            },
            delivery: {
                challenges: {
                    en: [
                        'Deliver new monetization features without destabilizing production.',
                        'Create reliable release patterns (canary rollout, gradual traffic shifting).',
                        'Align multiple squads on shared platform standards and interfaces.',
                        'Prevent "local optimization" decisions that increase systemic risk.',
                        'Maintain incident response maturity with clear escalation paths.'
                    ],
                    de: [
                        'Neue Monetarisierungs-Features liefern ohne Produktion zu destabilisieren.',
                        'Reliable Release Patterns etablieren (Canary Rollout, Traffic Shifting).',
                        'Mehrere Squads auf gemeinsame Plattformstandards und Interfaces ausrichten.',
                        '"Local Optimization" vermeiden, die systemisches Risiko erhöht.',
                        'Incident Response Maturity mit klaren Eskalationswegen sicherstellen.'
                    ]
                },
                riskIfIgnored: {
                    en: [
                        'Failed rollouts impacting revenue and customer experience.',
                        'Diverging architectures across squads increasing maintenance cost.',
                        'Slow delivery due to lack of stable platform foundations.'
                    ],
                    de: [
                        'Fehlgeschlagene Rollouts mit Auswirkungen auf Umsatz und UX.',
                        'Divergierende Architekturen erhöhen Wartungskosten.',
                        'Langsamere Delivery wegen instabiler Plattform-Fundamente.'
                    ]
                },
                decisionPoints: {
                    en: [
                        'Release governance and quality gates.',
                        'Shared platform standards and ownership model.',
                        'Incident workflow and postmortem discipline.'
                    ],
                    de: [
                        'Release Governance und Quality Gates.',
                        'Plattformstandards + Ownership Modell.',
                        'Incident Workflow und Postmortem-Disziplin.'
                    ]
                }
            }
        },
        approach: {
            methodology: 'Event-Driven Architecture',
            phases: [
                { number: 1, title: 'Re-architecture', duration: '6 weeks', activities: ['Moved to Go + Redis', 'Implemented exact-once processing'], deliverable: 'New Ad Engine', outcome: '< 20ms latency' }
            ],
            unique_differentiator: 'Custom RTB (Real-Time Bidding) engine'
        },
        outcomes: {
            hero_metric: { value: '20%', label: 'Revenue Increase', icon: '📈' },
            secondary_metrics: [
                { value: '5M+', label: 'Daily Transactions', icon: '🔢' },
                { value: '99.99%', label: 'SLA Achieved', icon: '🛡️' }
            ],
            compliance: [{ standard: 'GDPR', result: 'Compliant', details: 'Privacy-first ad serving' }],
            timeline: { planned: '3 months', actual: '3 months', variance: 'On time' }
        },
        technical: {
            before: { stack: ['PHP', 'MySQL'], infrastructure: '', issues: [] },
            after: { stack: ['Go', 'Redis', 'Kafka', 'Kubernetes', 'Terraform'], infrastructure: 'Global K8s Cluster', improvements: ['<20ms latency', 'Auto-scaling'] },
            migration_strategy: 'Strangler Fig pattern'
        },
        approachToday: {
            titleKey: 'projects.approachToday.title',
            bullets: [
                'Baseline current SLOs (latency, availability) and define target SLOs tied to revenue impact.',
                'Identify performance bottlenecks across the request path (load balancing → service → cache → persistence).',
                'Design capacity model (peak hour scaling + failover) and implement observability by default.',
                'Evaluate tradeoffs of caching, data consistency, and correctness in RTB/ad-serving workflows.',
                'Define rollout strategy (canary, shadow traffic, feature flags) to de-risk re-architecture.'
            ],
            bulletsDe: [
                'Bestehende SLOs (Latenz, Verfügbarkeit) erheben und Ziel-SLOs mit Business-Impact ableiten.',
                'Performance-Bottlenecks entlang des Request-Pfads analysieren (LB → Service → Cache → Persistenz).',
                'Kapazitätsmodell definieren (Peak-Scaling + Failover) und Observability „by default" umsetzen.',
                'Trade-offs zwischen Caching, Konsistenz und Korrektheit in Ad-/RTB-Workflows bewerten.',
                'Rollout-Strategie festlegen (Canary, Shadow Traffic, Feature Flags) zur Risiko-Minimierung.'
            ]
        },
        cta: {
            primary: { text: 'Scale Your System', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Fix performance bottlenecks.' },
            secondary: { text: 'View Architecture', action: '#' }
        },
        // Phase 2.6: Listing metadata for executive-first cards
        tags: [
            'Platform Engineering',
            'Cloud Modernization',
            'High Scale',
            'Ads Platform',
            'SLA / Reliability'
        ],
        listingSummary: {
            en: 'Re-architected ad serving platform from PHP/MySQL to Go/Redis, scaling to 5M+ daily transactions with sub-20ms latency and 99.99% availability.',
            de: 'Re-Architektur der Ad-Serving-Plattform von PHP/MySQL zu Go/Redis, Skalierung auf 5M+ tägliche Transaktionen mit <20ms Latenz und 99,99% Verfügbarkeit.'
        },
        listingMetrics: [
            { label: { en: 'Scale', de: 'Skalierung' }, value: { en: '5M+ daily transactions', de: '5M+ tägliche Transaktionen' }, type: 'scope' },
            { label: { en: 'Reliability', de: 'Zuverlässigkeit' }, value: { en: '99.99% SLA', de: '99,99% SLA' }, type: 'constraint' },
            { label: { en: 'Impact', de: 'Impact' }, value: { en: 'Revenue +20%', de: 'Umsatz +20%' }, type: 'outcome' }
        ],
        // Phase 3.1: Trust Layer
        trustLayer: {
            myRole: { en: 'Lead Architect / Technical Lead', de: 'Lead-Architekt / Technical Lead' },
            scopeOwned: {
                en: [
                    'System architecture design and performance optimization strategy',
                    'Technology stack selection (Go, Redis, Kubernetes)',
                    'Exact-once processing pattern design and implementation',
                    'Capacity planning and auto-scaling strategy',
                    'Rollout strategy with canary deployment and feature flags'
                ],
                de: [
                    'System-Architektur-Design und Performance-Optimierungsstrategie',
                    'Technology-Stack-Auswahl (Go, Redis, Kubernetes)',
                    'Exactly-Once-Processing-Pattern-Design und Implementierung',
                    'Kapazitätsplanung und Auto-Scaling-Strategie',
                    'Rollout-Strategie mit Canary-Deployment und Feature Flags'
                ]
            },
            deliveredWithTeam: {
                en: [
                    'Go microservices implementation by backend development team',
                    'Redis cache layer and data pipeline setup by infrastructure team',
                    'Kubernetes cluster configuration and monitoring by DevOps team',
                    'Load testing and performance validation by QA team',
                    'Production deployment and incident response procedures'
                ],
                de: [
                    'Go-Microservices-Implementierung durch Backend-Development-Team',
                    'Redis-Cache-Layer und Datenpipeline-Setup durch Infrastructure-Team',
                    'Kubernetes-Cluster-Konfiguration und Monitoring durch DevOps-Team',
                    'Load-Testing und Performance-Validierung durch QA-Team',
                    'Produktions-Deployment und Incident-Response-Prozesse'
                ]
            },
            confidentialityNote: {
                en: 'This case study is anonymized and generalized. It contains no confidential data, internal system details, code, or proprietary documents. All diagrams are recreated from memory and represent patterns, not internal architectures.',
                de: 'Diese Fallstudie ist anonymisiert und verallgemeinert. Sie enthält keine vertraulichen Daten, internen Systemdetails, Code oder proprietäre Dokumente. Alle Diagramme sind aus dem Gedächtnis rekonstruiert und repräsentieren Patterns, nicht interne Architekturen.'
            }
        },
        // Phase 3.1: Artifact Previews
        artifactPreviews: [
            {
                title: { en: 'Performance Optimization Architecture', de: 'Performance-Optimierungs-Architektur' },
                description: { en: 'System architecture diagram showing event-driven design and caching strategy', de: 'System-Architektur-Diagramm mit Event-Driven-Design und Caching-Strategie' },
                type: 'Diagram',
                gated: true
            },
            {
                title: { en: 'Capacity Planning Model', de: 'Kapazitätsplanungs-Modell' },
                description: { en: 'Traffic modeling and auto-scaling configuration for peak load handling', de: 'Traffic-Modellierung und Auto-Scaling-Konfiguration für Peak-Load-Handling' },
                type: 'TCO',
                gated: true
            },
            {
                title: { en: 'Exact-Once Processing Pattern', de: 'Exactly-Once-Processing-Pattern' },
                description: { en: 'Pattern documentation for ensuring billing accuracy in distributed ad serving', de: 'Pattern-Dokumentation für Abrechnungsgenauigkeit im verteilten Ad-Serving' },
                type: 'ADR',
                gated: true
            },
            {
                title: { en: 'Auto-Scaling Configuration', de: 'Auto-Scaling-Konfiguration' },
                description: { en: 'Kubernetes HPA and VPA settings for dynamic scaling based on traffic patterns', de: 'Kubernetes HPA und VPA Einstellungen für dynamisches Scaling basierend auf Traffic-Mustern' },
                type: 'Diagram',
                gated: true
            },
            {
                title: { en: 'Canary Deployment Runbook', de: 'Canary-Deployment-Runbook' },
                description: { en: 'Step-by-step canary deployment procedure with rollback and monitoring', de: 'Schritt-für-Schritt Canary-Deployment-Prozedur mit Rollback und Monitoring' },
                type: 'Checklist',
                gated: true
            },
            {
                title: { en: 'Load Testing Results', de: 'Load-Testing-Ergebnisse' },
                description: { en: 'Performance test results and capacity validation for peak traffic scenarios', de: 'Performance-Test-Ergebnisse und Kapazitätsvalidierung für Peak-Traffic-Szenarien' },
                type: 'TCO',
                gated: true
            }
        ],
        // Phase 3.3: Visibility tier
        visibilityTier: 'hero',
        // Phase 3.4C: Credibility signals
        credibilitySignals: {
            duration: { en: '8 months', de: '8 Monate' },
            teamSize: { en: '10 engineers', de: '10 Ingenieure' },
            region: { en: 'DACH', de: 'DACH' },
            engagementType: { en: 'High-scale platform optimization', de: 'High-Scale-Plattform-Optimierung' },
            decisionAuthority: { en: 'Lead Architect, technical decisions', de: 'Lead-Architekt, technische Entscheidungen' }
        },
        // Phase 4.5: Engagement Layer
        outcomeBadges: [
            { label: { en: '20% revenue increase', de: '20% Umsatzsteigerung' }, type: 'performance' },
            { label: { en: '5M+ daily transactions', de: '5M+ tägliche Transaktionen' }, type: 'speed' },
            { label: { en: '99.9% uptime SLA', de: '99,9% Uptime SLA' }, type: 'reliability' }
        ],
        beforeAfterDiagram: {
            before: {
                title: { en: 'Before', de: 'Vorher' },
                bullets: {
                    en: [
                        'Ad server latency during peak hours',
                        'Revenue loss from failed ad requests',
                        'Scalability bottlenecks at 2M transactions/day',
                        'Inconsistent performance across regions'
                    ],
                    de: [
                        'Ad-Server-Latenz während Peak-Stunden',
                        'Umsatzverluste durch fehlgeschlagene Ad-Requests',
                        'Skalierbarkeits-Engpässe bei 2M Transaktionen/Tag',
                        'Inkonsistente Performance über Regionen hinweg'
                    ]
                }
            },
            after: {
                title: { en: 'After', de: 'Nachher' },
                bullets: {
                    en: [
                        'Exactly-once processing with Redis deduplication',
                        'Horizontal scaling to 5M+ transactions/day',
                        '99.9% uptime SLA maintained',
                        '20% revenue increase from improved ad delivery'
                    ],
                    de: [
                        'Exactly-Once-Processing mit Redis-Deduplizierung',
                        'Horizontale Skalierung auf 5M+ Transaktionen/Tag',
                        '99,9% Uptime SLA eingehalten',
                        '20% Umsatzsteigerung durch verbesserte Ad-Auslieferung'
                    ]
                }
            },
            deltaBadges: [
                { label: { en: '20% revenue increase', de: '20% Umsatzsteigerung' }, type: 'performance' },
                { label: { en: '5M+ transactions/day', de: '5M+ Transaktionen/Tag' }, type: 'speed' }
            ]
        },
        pdfBrief: {
            enabled: true,
            disclaimer: {
                en: 'This executive brief contains anonymized patterns and generic architecture decisions. All specific client details and proprietary information have been removed. Diagrams are recreated from memory and represent industry-standard patterns, not internal architectures.',
                de: 'Dieses Executive Brief enthält anonymisierte Patterns und generische Architektur-Entscheidungen. Alle spezifischen Client-Details und proprietären Informationen wurden entfernt. Diagramme wurden aus dem Gedächtnis neu erstellt und repräsentieren branchenübliche Patterns, nicht interne Architekturen.'
            }
        },
        similaritySignals: {
            industries: ['adtech', 'ecommerce', 'high-scale'],
            problemPatterns: ['latency-spikes', 'revenue-loss-from-failures', 'scalability-bottlenecks'],
            constraints: ['99.99-availability', 'sub-20ms-latency', '5m-daily-transactions'],
            levers: ['revenue-growth', 'reliability', 'speed'],
            deliverablePatterns: ['exactly-once-processing', 'redis-deduplication', 'horizontal-scaling'],
            antiPatternsSeen: ['single-node-ad-server', 'no-deduplication'],
            decisionFrameworks: ['high-scale-ad-platform'],
            teamSizes: ['10-20'],
            budgetRanges: ['500K-1M'],
            timelines: ['6-12mo'],
            riskProfiles: ['enterprise'],
            prasadFrameworks: [{
                name: 'High-Scale Ad Platform',
                description: { en: 'Exactly-once processing and horizontal scaling for ad serving', de: 'Exactly-Once-Processing und horizontale Skalierung für Ad-Serving' },
                whenToUse: { en: 'When scaling ad or transaction platforms to millions of daily events', de: 'Bei Skalierung von Ad- oder Transaktionsplattformen auf Millionen täglicher Events' }
            }]
        },
        retrospectiveLite: {
            whatWorked: { en: ['Redis deduplication', 'Phased rollout by region'], de: ['Redis-Deduplizierung', 'Stufenweiser Rollout nach Region'] },
            whatIdDoToday: { en: ['Add load tests earlier', 'Define SLOs from day 1'], de: ['Load-Tests früher einplanen', 'SLOs von Tag 1 definieren'] },
            prasadInsight: { en: 'Exactly-once semantics and horizontal scaling were the key to revenue-safe ad delivery at 5M+ daily transactions.', de: 'Exactly-Once-Semantik und horizontale Skalierung waren der Schlüssel zu umsatzsicherem Ad-Delivery bei 5M+ täglichen Transaktionen.' },
            estimatedEffort: '6–9 months, 8–12 people',
            riskMitigation: { en: ['Deduplication before scale', 'Regional rollout with rollback'], de: ['Deduplizierung vor Skalierung', 'Regionaler Rollout mit Rollback'] }
        }
    },
    // =============================================================================
    // INSURANCE PERFORMANCE IMPROVEMENT - NEW CASE STUDY (Phase 2)
    // =============================================================================
    {
        id: 'insurance-performance',
        slug: 'insurance-performance',
        theme: {
            color: 'blue',
            gradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
        },
        domains: ['FinServ', 'Insurance', 'Performance Engineering'],
        projectType: 'consulting',
        visualType: 'performance',
        seoTags: ['Performance Engineering', 'Insurance', 'Claims Processing', 'Latency Optimization', 'SLA'],
        header: {
            eyebrow: { en: '80% FASTER PROCESSING', de: '80% SCHNELLERE VERARBEITUNG' },
            title: { en: 'Insurance Performance Improvement: Claims & Policy Workflow Optimization', de: 'Performance-Optimierung: Schaden- und Policen-Workflow-Optimierung' },
            client: {
                type: { en: 'Insurance / FinServ', de: 'Versicherung / FinServ' },
                size: 'Enterprise',
                industry: { en: 'Insurance', de: 'Versicherung' }
            }
        },
        challenge: {
            contextChips: [
                { label: { en: 'Industry', de: 'Branche' }, value: { en: 'Insurance / FinServ', de: 'Versicherung / FinServ' } },
                { label: { en: 'Impact', de: 'Impact' }, value: { en: '80% faster throughput', de: '80% schnellerer Durchsatz' } },
                { label: { en: 'Focus', de: 'Fokus' }, value: { en: 'Claims & Policy workflows', de: 'Schaden- & Policen-Workflows' } },
                { label: { en: 'Compliance', de: 'Compliance' }, value: { en: 'Audit-safe', de: 'Audit-sicher' } },
                { label: { en: 'Approach', de: 'Ansatz' }, value: { en: 'Non-disruptive optimization', de: 'Non-disruptive Optimierung' } }
            ],
            standard: {
                situation: {
                    en: 'Claims and policy workflows suffered from recurring latency spikes, impacting customer experience and SLAs. Batch-heavy processing limited throughput and created operational firefighting during peak periods. Leadership needed measurable performance gains without high-risk platform rewrites.',
                    de: 'Schaden- und Policenprozesse litten unter wiederkehrenden Latenzspitzen, mit Auswirkungen auf Customer Experience und SLAs. Batch-lastige Verarbeitung begrenzte den Durchsatz und führte zu operativem "Firefighting" in Peak-Phasen. Das Management benötigte messbare Performance-Gewinne ohne risikoreiche Komplett-Neuentwicklung.'
                },
                keyTensions: {
                    en: [
                        'Short-term stability vs. long-term modernization roadmap',
                        'Performance fixes vs. preventing regression via engineering discipline',
                        'Faster throughput vs. maintaining auditability and compliance controls',
                        'Incremental optimization vs. architecture refactoring pressure',
                        'Team capacity vs. performance improvement scope'
                    ],
                    de: [
                        'Kurzfristige Stabilität vs. langfristige Modernisierungs-Roadmap',
                        'Performance-Fixes vs. Vermeidung von Regression durch Engineering-Disziplin',
                        'Höherer Durchsatz vs. Auditierbarkeit und Compliance-Kontrollen',
                        'Inkrementelle Optimierung vs. Architektur-Refactoring-Druck',
                        'Teamkapazität vs. Umfang der Performance-Verbesserungen'
                    ]
                },
                urgency: {
                    en: 'SLA breaches were increasing, and customer satisfaction scores were declining quarter over quarter.',
                    de: 'SLA-Verletzungen nahmen zu und Kundenzufriedenheitswerte sanken Quartal für Quartal.'
                }
            },
            executive: {
                situation: {
                    en: 'SLA breaches were increasing costs and risking customer churn. The board demanded measurable improvements without a multi-year rewrite program. Leadership needed to show quick wins while building a sustainable performance engineering culture.',
                    de: 'SLA-Verletzungen erhöhten Kosten und riskierten Kundenabwanderung. Der Vorstand forderte messbare Verbesserungen ohne mehrjähriges Rewrite-Programm. Die Führung musste Quick Wins zeigen und gleichzeitig eine nachhaltige Performance-Engineering-Kultur aufbauen.'
                },
                keyTensions: {
                    en: [
                        'Short-term stability vs. long-term modernization roadmap',
                        'Performance fixes vs. preventing regression via engineering discipline',
                        'Faster throughput vs. maintaining auditability and compliance controls'
                    ],
                    de: [
                        'Kurzfristige Stabilität vs. langfristige Modernisierungs-Roadmap',
                        'Performance-Fixes vs. Vermeidung von Regression durch Engineering-Disziplin',
                        'Höherer Durchsatz vs. Auditierbarkeit und Compliance-Kontrollen'
                    ]
                },
                urgency: {
                    en: 'Board mandate to reduce SLA breaches by 50% within two quarters.',
                    de: 'Vorstandsmandat: SLA-Verletzungen innerhalb von zwei Quartalen um 50% reduzieren.'
                }
            },
            technical: {
                situation: {
                    en: 'The core technical challenge was identifying and resolving bottlenecks in a complex legacy system without introducing new defects. Database locks, inefficient queries, and synchronous processing patterns needed systematic analysis and targeted fixes.',
                    de: 'Die zentrale technische Herausforderung war das Identifizieren und Beheben von Bottlenecks in einem komplexen Legacy-System ohne neue Fehler einzuführen. Database Locks, ineffiziente Queries und synchrone Processing-Patterns erforderten systematische Analyse und gezielte Fixes.'
                },
                keyTensions: {
                    en: [
                        'DB tuning vs application-level refactoring vs queue-based async flows',
                        'Introduce distributed tracing without impacting production',
                        'Define SLOs/SLIs and performance budgets with existing monitoring gaps'
                    ],
                    de: [
                        'DB-Tuning vs Application Refactoring vs Queue-basierte Async-Flows',
                        'Distributed Tracing einführen ohne Produktion zu beeinträchtigen',
                        'SLOs/SLIs und Performance-Budgets trotz Monitoring-Lücken definieren'
                    ]
                },
                urgency: {
                    en: 'Peak processing periods were causing cascading failures, requiring immediate stabilization.',
                    de: 'Peak-Verarbeitungsphasen verursachten kaskadierende Ausfälle und erforderten sofortige Stabilisierung.'
                }
            },
            why_prasad: { en: 'Performance engineering expertise with insurance domain knowledge', de: 'Performance-Engineering-Expertise mit Versicherungs-Domänenwissen' }
        },
        // Phase 2: Executive Snapshot
        executiveSnapshot: {
            whyItMattered: {
                en: [
                    'Claims and policy workflows suffered from recurring latency spikes, impacting customer experience and SLAs.',
                    'Batch-heavy processing limited throughput and created operational firefighting during peak periods.',
                    'Leadership needed measurable performance gains without high-risk platform rewrites.'
                ],
                de: [
                    'Schaden- und Policenprozesse litten unter wiederkehrenden Latenzspitzen, mit Auswirkungen auf Customer Experience und SLAs.',
                    'Batch-lastige Verarbeitung begrenzte den Durchsatz und führte zu operativem "Firefighting" in Peak-Phasen.',
                    'Das Management benötigte messbare Performance-Gewinne ohne risikoreiche Komplett-Neuentwicklung.'
                ]
            },
            keyTensions: {
                en: [
                    'Short-term stability vs. long-term modernization roadmap.',
                    'Performance fixes vs. preventing regression via engineering discipline.',
                    'Faster throughput vs. maintaining auditability and compliance controls.'
                ],
                de: [
                    'Kurzfristige Stabilität vs. langfristige Modernisierungs-Roadmap.',
                    'Performance-Fixes vs. Vermeidung von Regression durch Engineering-Disziplin.',
                    'Höherer Durchsatz vs. Auditierbarkeit und Compliance-Kontrollen.'
                ]
            },
            metricCallout: {
                value: { en: '80%', de: '80%' },
                label: { en: 'faster processing throughput', de: 'schnellerer Processing-Durchsatz' }
            }
        },
        // Phase 2: Persona Challenges
        personaChallenges: {
            executive: {
                challenges: {
                    en: [
                        'Reduce SLA breaches without increasing run costs disproportionately.',
                        'Improve customer-facing responsiveness for key workflows.',
                        'Maintain regulatory/audit confidence while changing runtime behavior.',
                        'Avoid a multi-year "platform rewrite" programme with unclear ROI.',
                        'Create visible performance KPIs leadership could track weekly.'
                    ],
                    de: [
                        'SLA-Verletzungen reduzieren ohne unverhältnismäßige Run-Kosten-Erhöhung.',
                        'Customer-Facing Responsiveness für Kernprozesse verbessern.',
                        'Regulatorische/Audit-Sicherheit trotz Änderungen im Runtime-Verhalten erhalten.',
                        'Multi-Jahres-„Rewrite"-Programme mit unklarem ROI vermeiden.',
                        'Messbare Performance-KPIs schaffen, die Führung wöchentlich verfolgen kann.'
                    ]
                },
                riskIfIgnored: {
                    en: [
                        'Rising customer dissatisfaction and churn due to slow claims cycles.',
                        'Escalating operational costs from incident-driven operations.',
                        'Compliance exposure from unstable remediation changes.'
                    ],
                    de: [
                        'Sinkende Kundenzufriedenheit und Abwanderung durch langsame Schadenprozesse.',
                        'Steigende Betriebskosten durch incident-getriebenen Betrieb.',
                        'Compliance-Risiko durch instabile "Quick Fixes".'
                    ]
                },
                decisionPoints: {
                    en: [
                        'Optimize existing stack vs. selective re-architecture of hotspots.',
                        'Define performance KPIs tied to business outcomes.',
                        'Invest in observability vs. continue reactive incident handling.'
                    ],
                    de: [
                        'Bestehenden Stack optimieren vs. selektives Re-Architecture von Hotspots.',
                        'Performance-KPIs definieren, die Business Outcomes abbilden.',
                        'In Observability investieren vs. weiter reaktiv arbeiten.'
                    ]
                }
            },
            technical: {
                challenges: {
                    en: [
                        'Identify true bottlenecks (DB locks, thread pools, IO waits) instead of guessing.',
                        'Improve latency without breaking legacy integration contracts.',
                        'Introduce caching and async patterns safely.',
                        'Build proper load/performance testing that mirrors production behavior.',
                        'Implement observability: tracing, structured logs, error budgets.'
                    ],
                    de: [
                        'Echte Bottlenecks identifizieren (DB Locks, Thread Pools, IO Waits) statt Vermutungen.',
                        'Latenz reduzieren ohne Legacy-Integrationsverträge zu brechen.',
                        'Caching- und Async-Patterns sicher einführen.',
                        'Load-/Performance-Tests aufbauen, die Produktion realistisch abbilden.',
                        'Observability implementieren: Tracing, strukturierte Logs, Error Budgets.'
                    ]
                },
                riskIfIgnored: {
                    en: [
                        '"Optimizations" that don\'t move KPIs and create new defects.',
                        'Performance regressions after releases.',
                        'Continued inability to debug incidents quickly.'
                    ],
                    de: [
                        '"Optimierungen", die KPIs nicht verbessern und neue Fehler erzeugen.',
                        'Performance-Regressionen nach Releases.',
                        'Weiterhin langsame Incident-Diagnose.'
                    ]
                },
                decisionPoints: {
                    en: [
                        'DB tuning vs application-level refactoring vs queue-based async flows.',
                        'Introduce distributed tracing strategy.',
                        'Define SLOs/SLIs and performance budgets.'
                    ],
                    de: [
                        'DB Tuning vs Application Refactoring vs Queue-basierte Async-Flows.',
                        'Distributed-Tracing-Strategie einführen.',
                        'SLOs/SLIs und Performance Budgets definieren.'
                    ]
                }
            },
            delivery: {
                challenges: {
                    en: [
                        'Stabilize production while implementing improvements in parallel.',
                        'Coordinate cross-team delivery without disrupting release calendars.',
                        'Ensure performance gains are sustained (not one-off fixes).',
                        'Build a repeatable rollout approach (canary, feature flags, rollback).',
                        'Document and institutionalize performance engineering practices.'
                    ],
                    de: [
                        'Produktion stabilisieren und parallel Verbesserungen umsetzen.',
                        'Cross-Team Delivery koordinieren ohne Release-Kalender zu stören.',
                        'Performance-Gewinne nachhaltig machen (keine einmaligen Fixes).',
                        'Rollout-Ansatz etablieren (Canary, Feature Flags, Rollback).',
                        'Performance-Engineering-Praktiken dokumentieren und institutionalisieren.'
                    ]
                },
                riskIfIgnored: {
                    en: [
                        'Improvements lost after the next releases.',
                        'Ongoing firefighting and inability to scale change delivery.',
                        'Release freezes due to fear of instability.'
                    ],
                    de: [
                        'Verbesserungen gehen nach den nächsten Releases verloren.',
                        'Fortlaufendes Firefighting und fehlende Skalierung der Delivery.',
                        'Release-Freezes aus Angst vor Instabilität.'
                    ]
                },
                decisionPoints: {
                    en: [
                        'Incremental rollout strategy and safe testing gates.',
                        'Ownership model for performance KPIs and SLOs.',
                        'Process changes to prevent future regressions.'
                    ],
                    de: [
                        'Inkrementelle Rollout-Strategie und sichere Test-Gates.',
                        'Ownership-Modell für KPIs und SLOs.',
                        'Prozessänderungen zur Vermeidung zukünftiger Regression.'
                    ]
                }
            }
        },
        approach: {
            methodology: { en: 'Performance Engineering & Observability-First', de: 'Performance Engineering & Observability-First' },
            phases: [
                {
                    number: 1,
                    title: { en: 'Baseline & Analysis', de: 'Baseline & Analyse' },
                    duration: '3 weeks',
                    activities: { en: ['Performance profiling', 'Bottleneck identification', 'SLO definition'], de: ['Performance-Profiling', 'Bottleneck-Identifikation', 'SLO-Definition'] },
                    deliverable: { en: 'Performance Assessment Report', de: 'Performance-Assessment-Bericht' },
                    outcome: { en: 'Clear optimization roadmap', de: 'Klare Optimierungs-Roadmap' }
                },
                {
                    number: 2,
                    title: { en: 'Quick Wins Implementation', de: 'Quick Wins Umsetzung' },
                    duration: '4 weeks',
                    activities: { en: ['DB query optimization', 'Caching layer', 'Async processing'], de: ['DB-Query-Optimierung', 'Caching-Layer', 'Async-Processing'] },
                    deliverable: { en: 'Optimized critical paths', de: 'Optimierte kritische Pfade' },
                    outcome: { en: '50% latency reduction', de: '50% Latenz-Reduktion' }
                },
                {
                    number: 3,
                    title: { en: 'Observability & Governance', de: 'Observability & Governance' },
                    duration: '3 weeks',
                    activities: { en: ['Distributed tracing', 'Performance dashboards', 'Alerting setup'], de: ['Distributed Tracing', 'Performance-Dashboards', 'Alerting-Setup'] },
                    deliverable: { en: 'Performance monitoring platform', de: 'Performance-Monitoring-Plattform' },
                    outcome: { en: 'Proactive issue detection', de: 'Proaktive Problemerkennung' }
                }
            ],
            unique_differentiator: { en: 'Non-disruptive optimization with continuous production stability', de: 'Non-disruptive Optimierung bei kontinuierlicher Produktionsstabilität' }
        },
        outcomes: {
            hero_metric: { value: '80%', label: { en: 'Faster Processing', de: 'Schnellere Verarbeitung' }, icon: '⚡' },
            secondary_metrics: [
                { value: '50%', label: { en: 'SLA Breach Reduction', de: 'SLA-Verletzungs-Reduktion' }, icon: '📉' },
                { value: '30%', label: { en: 'Operational Cost Savings', de: 'Betriebskosten-Einsparung' }, icon: '💰' }
            ],
            compliance: [{ standard: 'SOC 2', result: 'Maintained', details: { en: 'Audit-safe changes', de: 'Audit-sichere Änderungen' } }],
            timeline: { planned: '10 weeks', actual: '10 weeks', variance: { en: 'On time', de: 'Pünktlich' } }
        },
        technical: {
            before: {
                stack: ['Java', 'Oracle DB', 'Legacy MQ'],
                infrastructure: { en: 'On-premise, batch-heavy', de: 'On-Premise, batch-lastig' },
                issues: { en: ['Latency spikes', 'DB locks', 'Poor observability'], de: ['Latenz-Spitzen', 'DB-Locks', 'Mangelnde Observability'] }
            },
            after: {
                stack: ['Java', 'Oracle DB', 'Redis Cache', 'Kafka', 'Distributed Tracing'],
                infrastructure: { en: 'Hybrid with async processing', de: 'Hybrid mit Async-Processing' },
                improvements: { en: ['Sub-second responses', 'Real-time monitoring', 'Auto-scaling'], de: ['Sub-Sekunden-Antworten', 'Echtzeit-Monitoring', 'Auto-Scaling'] }
            },
            migration_strategy: { en: 'Incremental optimization with feature flags', de: 'Inkrementelle Optimierung mit Feature Flags' }
        },
        approachToday: {
            titleKey: 'projects.approachToday.title',
            bullets: [
                'Establish baseline metrics and SLOs before making any changes.',
                'Use profiling and distributed tracing to identify real bottlenecks (not assumptions).',
                'Prioritize quick wins that deliver measurable impact within weeks.',
                'Implement observability as a first-class concern, not an afterthought.',
                'Create a regression prevention culture with performance testing in CI/CD.'
            ],
            bulletsDe: [
                'Baseline-Metriken und SLOs etablieren, bevor Änderungen gemacht werden.',
                'Profiling und Distributed Tracing nutzen, um echte Bottlenecks zu finden (keine Annahmen).',
                'Quick Wins priorisieren, die innerhalb von Wochen messbaren Impact liefern.',
                'Observability als First-Class-Concern implementieren, nicht als Nachgedanke.',
                'Regressions-Präventions-Kultur mit Performance-Testing in CI/CD schaffen.'
            ]
        },
        cta: {
            primary: { text: { en: 'Optimize Your Systems', de: 'Systeme optimieren' }, action: 'https://calendly.com/prasad-sgsits/30min', context: { en: 'Improve performance without rewrites.', de: 'Performance verbessern ohne Rewrites.' } },
            secondary: { text: { en: 'View Approach', de: 'Ansatz ansehen' }, action: '#' }
        },
        // Phase 2.6: Listing metadata for executive-first cards
        tags: [
            'Cloud Modernization',
            'Performance Engineering',
            'Enterprise Integration',
            'Observability'
        ],
        listingSummary: {
            en: 'Optimized claims and policy workflows to achieve 80% faster processing throughput through targeted bottleneck resolution and async processing patterns, without high-risk rewrites.',
            de: 'Optimierung der Schaden- und Policen-Workflows zur Erreichung von 80% schnellerem Durchsatz durch gezielte Bottleneck-Behebung und Async-Processing-Patterns, ohne risikoreiche Rewrites.'
        },
        listingMetrics: [
            { label: { en: 'Throughput', de: 'Durchsatz' }, value: { en: '80% faster processing', de: '80% schnellere Verarbeitung' }, type: 'outcome' },
            { label: { en: 'Scope', de: 'Scope' }, value: { en: 'Claims workflow automation', de: 'Automatisierung Claims-Workflow' }, type: 'scope' },
            { label: { en: 'Ops', de: 'Betrieb' }, value: { en: 'Reduced operational load', de: 'Reduzierte operative Last' }, type: 'outcome' }
        ],
        // Phase 3.1: Trust Layer
        trustLayer: {
            myRole: { en: 'Performance Engineering Lead / Consultant', de: 'Performance Engineering Lead / Consultant' },
            scopeOwned: {
                en: [
                    'Performance assessment and bottleneck identification methodology',
                    'SLO definition and performance budget allocation',
                    'Optimization strategy design (non-disruptive approach)',
                    'Database query optimization and caching strategy',
                    'Observability framework design and implementation plan'
                ],
                de: [
                    'Performance-Assessment und Bottleneck-Identifikations-Methodik',
                    'SLO-Definition und Performance-Budget-Zuteilung',
                    'Optimierungsstrategie-Design (Non-Disruptive-Ansatz)',
                    'Datenbank-Query-Optimierung und Caching-Strategie',
                    'Observability-Framework-Design und Implementierungsplan'
                ]
            },
            deliveredWithTeam: {
                en: [
                    'Database optimization execution and query tuning by DBA team',
                    'Application code refactoring and async processing implementation by development team',
                    'Monitoring infrastructure setup (distributed tracing, dashboards) by DevOps team',
                    'Load testing and performance validation by QA team',
                    'Production rollout and stability monitoring'
                ],
                de: [
                    'Datenbank-Optimierung und Query-Tuning durch DBA-Team',
                    'Application-Code-Refactoring und Async-Processing-Implementierung durch Development-Team',
                    'Monitoring-Infrastruktur-Setup (Distributed Tracing, Dashboards) durch DevOps-Team',
                    'Load-Testing und Performance-Validierung durch QA-Team',
                    'Produktions-Rollout und Stabilitäts-Monitoring'
                ]
            },
            confidentialityNote: {
                en: 'This case study is anonymized and generalized. It contains no confidential data, internal system details, code, or proprietary documents. All diagrams are recreated from memory and represent patterns, not internal architectures.',
                de: 'Diese Fallstudie ist anonymisiert und verallgemeinert. Sie enthält keine vertraulichen Daten, internen Systemdetails, Code oder proprietäre Dokumente. Alle Diagramme sind aus dem Gedächtnis rekonstruiert und repräsentieren Patterns, nicht interne Architekturen.'
            }
        },
        // Phase 3.1: Artifact Previews
        artifactPreviews: [
            {
                title: { en: 'Performance Assessment Report', de: 'Performance-Assessment-Bericht' },
                description: { en: 'Detailed analysis of bottlenecks, root causes, and optimization opportunities', de: 'Detaillierte Analyse von Bottlenecks, Root Causes und Optimierungsmöglichkeiten' },
                type: 'Diagram',
                gated: true
            },
            {
                title: { en: 'SLO Definition & Performance Budget', de: 'SLO-Definition & Performance-Budget' },
                description: { en: 'Service level objectives and performance budget allocation across workflows', de: 'Service-Level-Objectives und Performance-Budget-Zuteilung über Workflows' },
                type: 'Roadmap',
                gated: true
            },
            {
                title: { en: 'Observability Framework Design', de: 'Observability-Framework-Design' },
                description: { en: 'Distributed tracing setup and performance monitoring dashboard configuration', de: 'Distributed-Tracing-Setup und Performance-Monitoring-Dashboard-Konfiguration' },
                type: 'Diagram',
                gated: true
            },
            {
                title: { en: 'Query Optimization Guide', de: 'Query-Optimierungs-Leitfaden' },
                description: { en: 'Database query patterns and indexing strategy for high-throughput workflows', de: 'Datenbank-Query-Patterns und Indexierungsstrategie für High-Throughput-Workflows' },
                type: 'Checklist',
                gated: true
            },
            {
                title: { en: 'Async Processing Patterns', de: 'Async-Processing-Patterns' },
                description: { en: 'Event-driven architecture patterns for non-blocking claims processing', de: 'Event-Driven-Architektur-Patterns für non-blocking Schadenverarbeitung' },
                type: 'ADR',
                gated: true
            },
            {
                title: { en: 'Performance Testing Strategy', de: 'Performance-Testing-Strategie' },
                description: { en: 'Load testing approach and regression prevention methodology', de: 'Load-Testing-Ansatz und Regressions-Präventions-Methodik' },
                type: 'Checklist',
                gated: true
            }
        ],
        // Phase 3.3: Visibility tier
        visibilityTier: 'hero',
        // Phase 3.4C: Credibility signals
        credibilitySignals: {
            duration: { en: '4 months', de: '4 Monate' },
            teamSize: { en: '8 engineers', de: '8 Ingenieure' },
            region: { en: 'DACH', de: 'DACH' },
            engagementType: { en: 'Performance improvement consulting', de: 'Performance-Verbesserungsberatung' },
            decisionAuthority: { en: 'Performance Engineering Lead, optimization decisions', de: 'Performance Engineering Lead, Optimierungsentscheidungen' }
        },
        // Phase 4.5: Engagement Layer
        outcomeBadges: [
            { label: { en: '3x faster queries', de: '3x schnellere Queries' }, type: 'performance' },
            { label: { en: '30% cost reduction', de: '30% Kostenreduzierung' }, type: 'cost' },
            { label: { en: '99.95% uptime', de: '99,95% Uptime' }, type: 'reliability' }
        ],
        beforeAfterDiagram: {
            before: {
                title: { en: 'Before', de: 'Vorher' },
                bullets: {
                    en: [
                        'Slow database queries (5-10s response times)',
                        'High infrastructure costs',
                        'Frequent performance degradation',
                        'Limited observability into bottlenecks'
                    ],
                    de: [
                        'Langsame Datenbank-Queries (5-10s Antwortzeiten)',
                        'Hohe Infrastrukturkosten',
                        'Häufige Performance-Degradation',
                        'Begrenzte Observability in Bottlenecks'
                    ]
                }
            },
            after: {
                title: { en: 'After', de: 'Nachher' },
                bullets: {
                    en: [
                        '3x faster queries with optimized indexes',
                        '30% cost reduction through caching strategy',
                        '99.95% uptime with improved reliability',
                        'Full observability with performance dashboards'
                    ],
                    de: [
                        '3x schnellere Queries mit optimierten Indizes',
                        '30% Kostenreduzierung durch Caching-Strategie',
                        '99,95% Uptime mit verbesserter Zuverlässigkeit',
                        'Vollständige Observability mit Performance-Dashboards'
                    ]
                }
            },
            deltaBadges: [
                { label: { en: '3x faster', de: '3x schneller' }, type: 'performance' },
                { label: { en: '30% cost reduction', de: '30% Kostenreduzierung' }, type: 'cost' }
            ]
        },
        pdfBrief: {
            enabled: true,
            disclaimer: {
                en: 'This executive brief contains anonymized patterns and generic architecture decisions. All specific client details and proprietary information have been removed. Diagrams are recreated from memory and represent industry-standard patterns, not internal architectures.',
                de: 'Dieses Executive Brief enthält anonymisierte Patterns und generische Architektur-Entscheidungen. Alle spezifischen Client-Details und proprietären Informationen wurden entfernt. Diagramme wurden aus dem Gedächtnis neu erstellt und repräsentieren branchenübliche Patterns, nicht interne Architekturen.'
            }
        },
        similaritySignals: {
            industries: ['insurance', 'finserv', 'performance'],
            problemPatterns: ['slow-queries', 'high-infra-costs', 'performance-degradation', 'limited-observability'],
            constraints: ['audit-safe', 'non-disruptive', 'sla-targets'],
            levers: ['cost-reduction', 'speed', 'reliability'],
            deliverablePatterns: ['query-optimization', 'caching-strategy', 'observability-framework'],
            antiPatternsSeen: ['big-rewrite', 'no-baseline-metrics'],
            decisionFrameworks: ['performance-optimization-without-rewrite'],
            teamSizes: ['5-10', '10-20'],
            budgetRanges: ['100K-500K', '500K-1M'],
            timelines: ['3-6mo', '6-12mo'],
            riskProfiles: ['enterprise', 'regulated'],
            prasadFrameworks: [{
                name: 'Performance Optimization Without Rewrite',
                description: { en: 'Query optimization, caching, and observability for legacy workflows', de: 'Query-Optimierung, Caching und Observability für Legacy-Workflows' },
                whenToUse: { en: 'When improving claims or policy processing without full replatform', de: 'Bei Verbesserung von Schaden- oder Policen-Verarbeitung ohne vollständiges Replatforming' }
            }]
        },
        retrospectiveLite: {
            whatWorked: { en: ['Index optimization', 'Caching layer', 'Performance dashboards'], de: ['Index-Optimierung', 'Caching-Schicht', 'Performance-Dashboards'] },
            whatIdDoToday: { en: ['Establish baseline metrics week 1', 'Load test before change'], de: ['Baseline-Metriken in Woche 1 etablieren', 'Load-Test vor Änderung'] },
            prasadInsight: { en: 'Targeted optimization beats full rewrites for legacy claims workflows when constraints are clear.', de: 'Gezielte Optimierung schlägt Full-Rewrites bei Legacy-Schaden-Workflows, wenn Constraints klar sind.' },
            estimatedEffort: '4–6 months, 6–8 people',
            riskMitigation: { en: ['Audit-safe changes only', 'Rollback plan for each phase'], de: ['Nur audit-sichere Änderungen', 'Rollback-Plan pro Phase'] }
        }
    },
    {
        id: 'ai-photography-coach',
        slug: 'ai-photography-coach',
        theme: {
            color: 'indigo',
            gradient: 'from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/10',
            iconBg: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
            backgroundImage: '/assets/bg/bg-ai.png'
        },
        domains: ['AI/ML', 'Innovation'],
        projectType: 'product',
        seoTags: ['Green AI', 'Responsible AI', 'AIOptimization', 'Sustainable AI', 'Agentic AI'],
        header: {
            eyebrow: 'PRODUCTION AI ENGINEERING',
            title: 'Building an Agentic AI Photography Coach with Full Observability',
            client: {
                type: 'Personal Project / Product',
                size: 'N/A',
                industry: 'Consumer Tech'
            }
        },
        challenge: {
            situation: 'Most AI demos lack production readiness (observability, cost control, evaluation). Wanted to prove end-to-end engineering excellence.',
            pain_points: [],
            urgency: 'Personal innovation goal',
            why_prasad: 'Passion for AI engineering rigor'
        },
        approach: {
            methodology: 'Agentic Workflow Design',
            phases: [
                { number: 1, title: 'MVP Build', duration: '4 weeks', activities: ['Vision API integration', 'Streamlit UI'], deliverable: 'Working Prototype', outcome: 'Proof of capability' },
                { number: 2, title: 'Production Engineering', duration: '4 weeks', activities: ['MCP Integration', 'LLM-as-Judge', 'Cost Tracking'], deliverable: 'Production-Ready App', outcome: 'Full observability' }
            ],
            unique_differentiator: 'Built-in "Green AI" metrics tracking carbon impact of inference'
        },
        outcomes: {
            hero_metric: { value: '100%', label: 'Observability', icon: '👁️' },
            secondary_metrics: [
                { value: '<$5', label: 'Monthly Cost', icon: '💰' },
                { value: 'P95', label: 'Latency Tracked', icon: '⏱️' }
            ],
            compliance: [],
            timeline: { planned: '2 months', actual: '2 months', variance: 'On time' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['Gemini Vision', 'Streamlit', 'MCP', 'LangChain'], infrastructure: 'Cloud Run', improvements: ['Agentic Workflows', 'Structured Outputs'] },
            migration_strategy: 'Iterative Product Development'
        },
        cta: {
            primary: { text: 'Try Demo', action: '#', context: 'See the AI in action.' },
            secondary: { text: 'GitHub Repo', action: '#' }
        }
    },

    // --- TIER 2: CONSULTING FRAMEWORKS ---
    {
        id: 'devops-maturity',
        slug: 'devops-maturity-framework',
        theme: {
            color: 'blue',
            gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/10',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
            backgroundImage: '/assets/bg/bg-devops.png'
        },
        domains: ['DevOps', 'Consulting'],
        projectType: 'framework',
        seoTags: ['DevOps Maturity', 'CICD', 'Infrastructure as Code', 'SRE'],
        header: {
            eyebrow: 'REUSABLE FRAMEWORK',
            title: 'Enterprise DevOps Maturity Assessment & Transformation Model',
            client: {
                type: 'Multiple Fortune 500 Clients',
                size: 'Global Enterprises',
                industry: 'Cross-Industry'
            }
        },
        challenge: {
            situation: 'Many organizations claimed to do DevOps but lacked standardization, leading to "fragile agile" and unstable releases.',
            pain_points: [],
            urgency: 'Need for speed and stability',
            why_prasad: 'Deep background in both dev and ops'
        },
        approach: {
            methodology: '5-Level Maturity Model',
            phases: [],
            unique_differentiator: 'Assess culture, process, and technology holistically'
        },
        outcomes: {
            hero_metric: { value: '10+', label: 'Clients Assessed', icon: '📋' },
            secondary_metrics: [{ value: '30%', label: 'Release Velocity', icon: '🚀' }],
            compliance: [],
            timeline: { planned: 'ongoing', actual: 'ongoing', variance: 'N/A' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['Jenkins', 'GitLab', 'Terraform', 'Kubernetes'], infrastructure: 'Modern DevOps Toolchain', improvements: [] },
            migration_strategy: 'Assessment -> Roadmap -> Transformation'
        },
        approachToday: {
            titleKey: 'projects.approachToday.title',
            bullets: [
                'Start with inventory: applications, dependencies, criticality, ownership, and runtime characteristics.',
                'Establish scoring model: business value vs tech risk vs migration complexity.',
                'Define wave planning with hard constraints (shared services, integration dependencies).',
                'Choose target landing zone and platform guardrails (networking, IAM, logging).',
                'Produce a decision matrix with recommended 6R disposition per app.'
            ],
            bulletsDe: [
                'Mit Inventory starten: Apps, Abhängigkeiten, Kritikalität, Ownership und Runtime-Eigenschaften.',
                'Scoring-Modell etablieren: Business Value vs Tech Risk vs Migrationskomplexität.',
                'Wave Planning mit harten Constraints definieren (Shared Services, Integrationsabhängigkeiten).',
                'Ziel-Landing-Zone + Plattform-Guardrails festlegen (Networking, IAM, Logging).',
                'Decision-Matrix mit 6R-Empfehlungen pro Applikation erstellen.'
            ]
        },
        cta: {
            primary: { text: 'Assess Your Org', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Get a maturity score.' },
            secondary: { text: 'View Framework', action: '#' }
        }
    },
    {
        id: 'app-rationalization',
        slug: 'app-rationalization-cloud-readiness',
        theme: {
            color: 'slate',
            gradient: 'from-slate-50 to-gray-50 dark:from-slate-800 dark:to-slate-900',
            iconBg: 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
        },
        domains: ['Cloud Modernization', 'Consulting'],
        projectType: 'framework',
        seoTags: ['Cloud Migration', '6R Strategy', 'App Portfolio Management'],
        header: {
            eyebrow: 'STRATEGIC DECISION MAKING',
            title: 'Application Rationalization & Cloud Readiness Framework',
            client: {
                type: 'Multiple Clients',
                size: 'Enterprise',
                industry: 'Cross-Industry'
            }
        },
        challenge: {
            situation: 'Enterprises with 1000+ apps struggled to decide what to move to cloud, leading to stalled migrations or "lift-and-shift" cost disasters.',
            pain_points: [],
            urgency: 'Data center exit mandates',
            why_prasad: 'Systematic approach to portfolio analysis'
        },
        approach: {
            methodology: '6R Analysis (Rehost, Replatform, etc.)',
            phases: [],
            unique_differentiator: 'Automated discovery combined with business value scoring'
        },
        outcomes: {
            hero_metric: { value: '40%', label: 'Accellerated Timeline', icon: '⏩' },
            secondary_metrics: [{ value: '60%', label: 'Retired/Replaced', icon: '🗑️' }],
            compliance: [],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['AWS', 'Azure', 'Migration Tools'], infrastructure: 'Hybrid Cloud', improvements: [] },
            migration_strategy: 'Discovery -> Rationalization -> Wave Planning'
        },
        cta: {
            primary: { text: 'Plan Migration', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Avoid cloud cost traps.' },
            secondary: { text: 'See Template', action: '#' }
        }
    },
    {
        id: 'mainframe-migration',
        slug: 'mainframe-to-java-migration',
        theme: {
            color: 'amber',
            gradient: 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10',
            iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
        },
        domains: ['Legacy Modernization', 'Consulting', 'FinServ'],
        projectType: 'framework',
        seoTags: ['Mainframe', 'COBOL', 'Java', 'Modernization'],
        header: {
            eyebrow: 'LEGACY TRANSFORMATION',
            title: 'Mainframe-to-Java Migration Framework',
            client: {
                type: 'Insurance / Banking',
                size: 'Large Enterprise',
                industry: 'Financial Services'
            }
        },
        challenge: {
            situation: 'Critical core banking/insurance systems locked in COBOL/mainframes with retiring talent pool and exploding MIPS costs.',
            pain_points: [],
            urgency: 'Cost reduction and talent risk',
            why_prasad: 'Proven pattern for risk-managed migration'
        },
        approach: {
            methodology: 'Automated Refactoring & Replatforming',
            phases: [],
            unique_differentiator: 'Comprehensive testing strategy ensuring bit-level data parity'
        },
        outcomes: {
            hero_metric: { value: '55%', label: 'Cost Reduction', icon: '💰' },
            secondary_metrics: [{ value: 'Zero', label: 'Business Disruption', icon: '✅' }],
            compliance: [],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: ['COBOL', 'CICS', 'DB2'], infrastructure: 'Mainframe', issues: [] },
            after: { stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Kafka'], infrastructure: 'Cloud Native', improvements: [] },
            migration_strategy: 'Automated Code Conversion + Manual Optimization'
        },
        approachToday: {
            titleKey: 'projects.approachToday.title',
            bullets: [
                'Identify functional domains and carve-outs suitable for incremental modernization.',
                'Define data migration strategy and parity requirements (validation and reconciliation).',
                'Assess tradeoffs: rehost/replatform vs automated refactoring vs rewrite.',
                'Plan cutover carefully with rollback strategy and parallel run design.',
                'Establish testing strategy (functional + performance + data consistency) before any migration waves.'
            ],
            bulletsDe: [
                'Domänen und Carve-outs identifizieren, die sich für inkrementelle Modernisierung eignen.',
                'Data-Migration-Strategie und Parity-Anforderungen definieren (Validation, Reconciliation).',
                'Trade-offs bewerten: Rehost/Replatform vs automatisches Refactoring vs Rewrite.',
                'Cutover sauber planen inkl. Rollback-Strategie und Parallel-Run-Design.',
                'Teststrategie (Funktional, Performance, Datenkonsistenz) vor jeder Migrationswelle etablieren.'
            ]
        },
        cta: {
            primary: { text: 'Modernize Legacy', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Reduce MIPS costs.' },
            secondary: { text: 'View Approach', action: '#' }
        }
    },
    {
        id: 'healthcare-compliance',
        slug: 'hipaa-fhir-compliance',
        theme: {
            color: 'teal',
            gradient: 'from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/10',
            iconBg: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
        },
        domains: ['Healthcare', 'Compliance', 'Consulting'],
        visualType: 'modernization',
        projectType: 'framework',
        seoTags: ['HIPAA', 'FHIR', 'Compliance', 'HealthIT'],
        header: {
            eyebrow: 'REGULATORY GOVERNANCE',
            title: 'HIPAA/FHIR/HL7 Compliance Governance Framework',
            client: {
                type: 'Multiple Healthcare Clients',
                size: 'Enterprise',
                industry: 'Healthcare'
            }
        },
        challenge: {
            situation: 'Healthcare orgs struggling to meet new interoperability rules (Cures Act) and secure patient data in the cloud.',
            pain_points: [],
            urgency: 'Regulatory deadlines',
            why_prasad: 'Deep expertise in health data standards'
        },
        approach: {
            methodology: 'Compliance-by-Design',
            phases: [],
            unique_differentiator: 'Integrated security, privacy, and interoperability into one governance model'
        },
        outcomes: {
            hero_metric: { value: '15+', label: 'Engagements', icon: '🏥' },
            secondary_metrics: [{ value: '100%', label: 'Audit Systems', icon: '🛡️' }],
            compliance: [{ standard: 'HIPAA', result: 'Compliant', details: 'Full protection' }],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['FHIR', 'HL7', 'OAuth2', 'Encryption'], infrastructure: 'Compliant Cloud', improvements: [] },
            migration_strategy: 'Assessment -> Remediation -> Governance'
        },
        cta: {
            primary: { text: 'Secure Your Data', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Get HIPAA compliant.' },
            secondary: { text: 'View Framework', action: '#' }
        }
    },

    // --- TIER 3: OTHER NOTABLE PROJECTS ---
    {
        id: 'boehringer-aiml',
        slug: 'boehringer-aiml-platform',
        theme: {
            color: 'cyan',
            gradient: 'from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/10',
            iconBg: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
        },
        domains: ['Pharma', 'AI/ML', 'Data Platforms'],
        projectType: 'data-platform',
        seoTags: ['Data Lake', 'BioBERT', 'Pharma R&D'],
        header: {
            eyebrow: '50% FASTER INSIGHTS',
            title: 'Medical Research AI/ML Platform & Data Lake',
            client: {
                type: 'Boehringer Ingelheim',
                size: '€20B+ Revenue',
                industry: 'Pharma'
            }
        },
        challenge: {
            situation: 'R&D data siloed in PDFs and disparate systems. Researchers spent too much time searching.',
            pain_points: [],
            urgency: 'Need to accelerate drug discovery',
            why_prasad: 'Data Architecture + Compliance'
        },
        approach: {
            methodology: 'Data Mesh',
            phases: [],
            unique_differentiator: 'Semantic search using BioBERT specific to medical queries'
        },
        outcomes: {
            hero_metric: { value: '50%', label: 'Faster Insights', icon: '⚡' },
            secondary_metrics: [{ value: '€500K', label: 'Savings', icon: '💰' }],
            compliance: [{ standard: 'GDPR', result: 'Compliant', details: 'PII Masking' }],
            timeline: { planned: '6 months', actual: '6 months', variance: 'On time' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['AWS', 'Databricks', 'BioBERT', 'React'], infrastructure: 'Data Mesh', improvements: [] },
            migration_strategy: 'Greenfield Build'
        },
        approachToday: {
            titleKey: 'projects.approachToday.title',
            bullets: [
                'Identify highest-value research workflows and the bottlenecks (search, summarization, retrieval).',
                'Define data access + compliance boundaries (GDPR, masking strategy, retention rules).',
                'Choose architecture pattern for ML enablement (data mesh vs centralized lakehouse) based on org maturity.',
                'Establish semantic layer strategy (taxonomy, embeddings, metadata, search relevance evaluation).',
                'Provide phased roadmap: MVP data products → enablement platform → scaling governance.'
            ],
            bulletsDe: [
                'High-Value-Research-Workflows und Engpässe identifizieren (Search, Summarization, Retrieval).',
                'Data Access + Compliance-Grenzen definieren (GDPR, Masking-Strategie, Retention).',
                'Architekturpattern für ML Enablement wählen (Data Mesh vs zentrales Lakehouse) je nach Reifegrad.',
                'Semantik-Layer-Strategie etablieren (Taxonomie, Embeddings, Metadaten, Relevanz-Evaluation).',
                'Roadmap phasenweise: MVP Data Products → Enablement Platform → Scaling Governance.'
            ]
        },
        cta: {
            primary: { text: 'Build Data Platform', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Unlock R&D data.' },
            secondary: { text: 'View Details', action: '#' }
        }
    },
    {
        id: 'telecom-fpp',
        slug: 'telecom-future-pricing-platform',
        theme: {
            color: 'violet',
            gradient: 'from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/10',
            iconBg: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
        },
        domains: ['Telecom', 'Consulting'],
        projectType: 'migration',
        seoTags: ['Microservices', 'Event Driven', 'Telecom'],
        header: {
            eyebrow: 'EVENT-DRIVEN ARCHITECTURE',
            title: 'Future Pricing Platform (FPP) Transformation',
            client: {
                type: 'Fortune 100 Telecom',
                size: 'Enterprise',
                industry: 'Telecom'
            }
        },
        challenge: {
            situation: 'Manual pricing updates took days/weeks. Needed real-time dynamic pricing.',
            pain_points: [],
            urgency: 'Competitive pressure',
            why_prasad: 'Event-driven architecture expertise'
        },
        approach: {
            methodology: 'Domain-Driven Design',
            phases: [],
            unique_differentiator: 'Seamless transition roadmap from manual to fully automated'
        },
        outcomes: {
            hero_metric: { value: 'Real-time', label: 'Pricing Updates', icon: '⏱️' },
            secondary_metrics: [],
            compliance: [],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: ['Manual', 'Legacy'], infrastructure: '', issues: [] },
            after: { stack: ['Microservices', 'Kafka', 'Java'], infrastructure: 'Cloud Native', improvements: [] },
            migration_strategy: 'Phased Migration'
        },
        approachToday: {
            titleKey: 'projects.approachToday.title',
            bullets: [
                'Model pricing domain events and define event contracts early to prevent downstream coupling.',
                'Evaluate target architecture options: microservices vs modular monolith vs hybrid.',
                'Assess data consistency, ordering, and idempotency requirements for near-real-time pricing changes.',
                'Create rollout strategy that allows coexistence of old + new pricing logic without business disruption.',
                'Define governance for schema evolution, testing automation, and operational monitoring.'
            ],
            bulletsDe: [
                'Pricing Domain Events modellieren und Event Contracts früh definieren, um Kopplung zu vermeiden.',
                'Zielarchitektur-Optionen bewerten: Microservices vs Modular Monolith vs Hybrid.',
                'Anforderungen an Konsistenz, Ordering und Idempotency für Near-Real-Time-Changes prüfen.',
                'Rollout-Strategie für parallelen Betrieb Alt/Neu ohne Business-Disruption definieren.',
                'Governance für Schema Evolution, Testautomation und Betrieb/Monitoring festlegen.'
            ]
        },
        cta: {
            primary: { text: 'Discuss Modernization', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Automate core processes.' },
            secondary: { text: 'View Solution', action: '#' }
        }
    },
    {
        id: 'innova-claims',
        slug: 'innova-claims-processing',
        theme: {
            color: 'sky',
            gradient: 'from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/10',
            iconBg: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400'
        },
        domains: ['FinServ', 'Insurance'],
        projectType: 'data-platform',
        seoTags: ['Claims Automation', 'Data Efficiency'],
        header: {
            eyebrow: '80% EFFICIENCY GAIN',
            title: 'Claims Processing Data Platform',
            client: {
                type: 'Innova Solutions',
                size: 'Enterprise Services',
                industry: 'Insurance'
            }
        },
        challenge: {
            situation: 'Manual claims processing was slow and error-prone.',
            pain_points: [],
            urgency: 'Operational costs',
            why_prasad: 'Data Engineering leadership'
        },
        approach: {
            methodology: 'Automated Data Pipeline',
            phases: [],
            unique_differentiator: 'Integrated business rules engine'
        },
        outcomes: {
            hero_metric: { value: '80%', label: 'Efficiency Gain', icon: '📈' },
            secondary_metrics: [],
            compliance: [],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: ['Manual'], infrastructure: '', issues: [] },
            after: { stack: ['Data Pipelines', 'Reporting Tools'], infrastructure: '', improvements: [] },
            migration_strategy: 'Automation'
        },
        approachToday: {
            titleKey: 'projects.approachToday.title',
            bullets: [
                'Map current claims journey and identify highest-friction manual steps to automate first.',
                'Define the canonical data pipeline (ingestion → validation → enrichment → rules → reporting).',
                'Assess correctness risks (exceptions, edge cases, compliance) before automating end-to-end.',
                'Build measurement system: cycle time, error rate, rework rate, operational effort.',
                'Deliver roadmap: quick wins automation + long-term platform architecture.'
            ],
            bulletsDe: [
                'Claims Journey analysieren und manuelle Friktionspunkte identifizieren (für schnelle Automatisierung).',
                'Kanonische Data Pipeline definieren (Ingestion → Validation → Enrichment → Rules → Reporting).',
                'Korrektheitsrisiken (Exceptions, Edge Cases, Compliance) vor End-to-End-Automation bewerten.',
                'Messsystem definieren: Durchlaufzeit, Fehlerquote, Rework, operativer Aufwand.',
                'Roadmap liefern: Quick Wins Automation + langfristige Plattformarchitektur.'
            ]
        },
        cta: {
            primary: { text: 'Automate Operations', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Reduce manual work.' },
            secondary: { text: 'View Details', action: '#' }
        }
    },
    {
        id: 'bofa-account-opening',
        slug: 'bofa-account-opening',
        theme: {
            color: 'red',
            gradient: 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/10',
            iconBg: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
        },
        domains: ['FinServ'],
        projectType: 'product',
        seoTags: ['FinTech', 'User Experience'],
        header: {
            eyebrow: 'PROCESS OPTIMIZATION',
            title: 'Streamlined Account Opening for Financial Advisors',
            client: {
                type: 'Bank of America / Merrill Lynch',
                size: 'Global Bank',
                industry: 'Financial Services'
            }
        },
        challenge: {
            situation: 'Complex onboarding process frustrated advisors and clients.',
            pain_points: [],
            urgency: 'Client satisfaction',
            why_prasad: 'Process optimization + UX focus'
        },
        approach: {
            methodology: 'Workflow Automation',
            phases: [],
            unique_differentiator: 'Focus on advisor experience'
        },
        outcomes: {
            hero_metric: { value: 'High', label: 'Advisor Satisfaction', icon: '😊' },
            secondary_metrics: [],
            compliance: [{ standard: 'FINRA', result: 'Compliant', details: '' }],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['Workflow Engine'], infrastructure: '', improvements: [] },
            migration_strategy: 'Optimization'
        },
        approachToday: {
            titleKey: 'projects.approachToday.title',
            bullets: [
                'Break onboarding flow into stages and define success metrics (cycle time, drop-off, compliance).',
                'Identify integration touchpoints: KYC/AML, document management, CRM, account provisioning.',
                'Ensure compliance and auditability is designed-in, not added later.',
                'Propose automation opportunities with clear risk controls and exception handling.',
                'Provide execution roadmap aligned to advisor UX improvements.'
            ],
            bulletsDe: [
                'Onboarding Flow in Phasen zerlegen und Erfolgskriterien definieren (Cycle Time, Drop-off, Compliance).',
                'Integrationspunkte identifizieren: KYC/AML, Dokumentenmanagement, CRM, Account Provisioning.',
                'Compliance und Auditierbarkeit „by design" sicherstellen, nicht nachträglich.',
                'Automation Opportunities mit klaren Risk Controls und Exception Handling definieren.',
                'Ausführungs-Roadmap liefern, abgestimmt auf Advisor-UX-Verbesserungen.'
            ]
        },
        cta: {
            primary: { text: 'Improve UX', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Better onboarding.' },
            secondary: { text: 'View Details', action: '#' }
        }
    },
    {
        id: 'ileap-logistics',
        slug: 'ileap-logistics-emissions',
        theme: {
            color: 'emerald',
            gradient: 'from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/10',
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
        },
        domains: ['Climate Tech', 'Standards Development'],
        projectType: 'standard',
        seoTags: ['Logistics Emissions', 'Scope 3', 'Supply Chain'],
        header: {
            eyebrow: 'SUPPLY CHAIN DECARBONIZATION',
            title: 'iLEAP: Logistics Emissions Integration Project',
            client: {
                type: 'SINE Foundation / SFC',
                size: 'Non-Profit',
                industry: 'Climate Tech'
            }
        },
        challenge: {
            situation: 'Up to 60% of product Scope 3 emissions come from logistics, but data was disconnected.',
            pain_points: [],
            urgency: 'Need for holistic view',
            why_prasad: 'Standards expertise'
        },
        approach: {
            methodology: 'Data Model Extension',
            phases: [],
            unique_differentiator: 'Integrating logistics data standard (GLEC) with product standard (PACT)'
        },
        outcomes: {
            hero_metric: { value: '60%', label: 'Scope 3 Coverage', icon: '🚛' },
            secondary_metrics: [],
            compliance: [],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['Data Modeling', 'API Design'], infrastructure: '', improvements: [] },
            migration_strategy: 'Standardization'
        },
        cta: {
            primary: { text: 'Learn More', action: 'https://smart-freight-centre-media.s3.amazonaws.com/documents/iLEAP_-_project_charter.pdf', context: 'View Project Charter' },
            secondary: { text: 'View Details', action: '#' }
        }
    },
    {
        id: 'pwc-healthcare-mod',
        slug: 'pwc-healthcare-modernization',
        theme: {
            color: 'teal',
            gradient: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/10',
            iconBg: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
        },
        domains: ['Healthcare', 'Consulting'],
        projectType: 'migration',
        seoTags: ['Healthcare Modernization', 'Mobile App'],
        header: {
            eyebrow: '$500K SAVED',
            title: 'Healthcare System Modernization & Mobile App',
            client: {
                type: 'PwC Client',
                size: 'Enterprise',
                industry: 'Healthcare'
            }
        },
        challenge: {
            contextChips: [
                { label: { en: 'Industry', de: 'Branche' }, value: { en: 'Healthcare', de: 'Healthcare' } },
                { label: { en: 'Savings', de: 'Einsparung' }, value: { en: '$500K annually', de: '$500K jährlich' } },
                { label: { en: 'Traffic', de: 'Traffic' }, value: { en: '70% increase', de: '70% Steigerung' } },
                { label: { en: 'Compliance', de: 'Compliance' }, value: { en: 'HIPAA', de: 'HIPAA' } },
                { label: { en: 'Platform', de: 'Plattform' }, value: { en: 'Cloud + Mobile', de: 'Cloud + Mobile' } }
            ],
            standard: {
                situation: {
                    en: 'A 15-year-old healthcare and e-commerce platform was facing compliance audit failures, performance degradation, and escalating maintenance costs. The system needed modernization to cloud infrastructure while adding mobile capabilities to meet user demand.',
                    de: 'Eine 15 Jahre alte Healthcare- und E-Commerce-Plattform stand vor Compliance-Audit-Fehlschlägen, Performance-Degradation und steigenden Wartungskosten. Das System benötigte eine Modernisierung auf Cloud-Infrastruktur bei gleichzeitiger Ergänzung mobiler Funktionen zur Erfüllung der Nutzeranforderungen.'
                },
                keyTensions: {
                    en: [
                        'Compliance audit deadlines vs migration complexity',
                        'Legacy vendor EOL vs business continuity',
                        'Mobile enablement vs security requirements',
                        'Cost reduction targets vs modernization investment',
                        'User experience improvements vs regulatory constraints'
                    ],
                    de: [
                        'Compliance-Audit-Fristen vs Migrationskomplexität',
                        'Legacy-Vendor-EOL vs Business-Kontinuität',
                        'Mobile Enablement vs Sicherheitsanforderungen',
                        'Kostenreduktionsziele vs Modernisierungsinvestition',
                        'User-Experience-Verbesserungen vs regulatorische Constraints'
                    ]
                },
                urgency: {
                    en: 'Board mandate to achieve compliance within 6 months.',
                    de: 'Vorstandsmandat: Compliance innerhalb von 6 Monaten erreichen.'
                }
            },
            executive: {
                situation: {
                    en: 'Monthly audit findings were costing €50K+ and threatening operational continuity. The board mandate was clear: achieve HIPAA compliance and reduce operational costs within 6 months, or face escalating penalties and potential service disruption.',
                    de: 'Monatliche Audit-Feststellungen kosteten €50K+ und gefährdeten die operative Kontinuität. Das Vorstandsmandat war eindeutig: HIPAA-Compliance erreichen und operative Kosten innerhalb von 6 Monaten senken, oder mit eskalierenden Strafen und potenziellen Service-Unterbrechungen rechnen.'
                },
                keyTensions: {
                    en: [
                        'Audit cost burden vs transformation budget',
                        'Compliance deadline vs realistic migration timeline',
                        'Risk of continued operation vs migration risk',
                        'Short-term fixes vs long-term platform strategy'
                    ],
                    de: [
                        'Audit-Kostenbelastung vs Transformationsbudget',
                        'Compliance-Deadline vs realistische Migrations-Timeline',
                        'Risiko des Weiterbetriebs vs Migrationsrisiko',
                        'Kurzfristige Fixes vs langfristige Plattformstrategie'
                    ]
                },
                urgency: {
                    en: 'Board deadline with €600K annual audit burden at stake.',
                    de: 'Vorstandsfrist mit €600K jährlicher Audit-Belastung auf dem Spiel.'
                }
            },
            technical: {
                situation: {
                    en: 'The technical challenge involved migrating a legacy Java 8/Oracle system to AWS while maintaining HIPAA compliance, implementing zero-downtime deployment, and building a new pharmacy mobile app that would become the primary user channel.',
                    de: 'Die technische Herausforderung bestand in der Migration eines Legacy Java 8/Oracle-Systems zu AWS unter Beibehaltung der HIPAA-Compliance, Implementierung von Zero-Downtime-Deployment und Aufbau einer neuen Apotheken-Mobile-App, die zum primären Nutzerkanal werden sollte.'
                },
                keyTensions: {
                    en: [
                        'Blue-green deployment vs data consistency',
                        'HIPAA controls vs cloud-native patterns',
                        'Mobile app performance vs API legacy constraints',
                        'Automated compliance monitoring vs manual audit processes',
                        'Multi-region availability vs cost optimization'
                    ],
                    de: [
                        'Blue-Green-Deployment vs Datenkonsistenz',
                        'HIPAA-Controls vs Cloud-Native-Patterns',
                        'Mobile-App-Performance vs API-Legacy-Constraints',
                        'Automatisiertes Compliance-Monitoring vs manuelle Audit-Prozesse',
                        'Multi-Region-Verfügbarkeit vs Kostenoptimierung'
                    ]
                },
                urgency: {
                    en: 'Legacy vendor support ending within 12 months.',
                    de: 'Legacy-Vendor-Support endet innerhalb von 12 Monaten.'
                }
            },
            why_prasad: { en: 'Full stack leadership', de: 'Full-Stack Leadership' }
        },
        approach: {
            methodology: 'Incremental Modernization',
            phases: [],
            unique_differentiator: 'Pharmacy module mobile app that drove 70% traffic increase'
        },
        outcomes: {
            hero_metric: { value: '70%', label: 'Traffic Boost', icon: '📈' },
            secondary_metrics: [{ value: '$500K', label: 'Annual Savings', icon: '💰' }],
            compliance: [{ standard: 'HIPAA', result: 'Compliant', details: '' }],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: ['Legacy'], infrastructure: '', issues: [] },
            after: { stack: ['Angular', 'Spring Boot', 'iOS', 'Android'], infrastructure: 'Cloud', improvements: [] },
            migration_strategy: 'Modernization'
        },
        approachToday: {
            titleKey: 'projects.approachToday.title',
            bullets: [
                'Clarify modernization strategy: strangler pattern vs. full rewrite, based on risk tolerance and compliance.',
                'Map data flows and PHI boundaries for HIPAA/security controls and auditability.',
                'Prioritize user journeys for mobile enablement to maximize adoption and reduce ops load.',
                'Design API and integration layer to avoid duplicating business logic across channels.',
                'Establish governance for release management, testing, and regulatory documentation.'
            ],
            bulletsDe: [
                'Modernisierungsstrategie klären: Strangler Pattern vs. Full Rewrite je nach Risiko und Compliance.',
                'Datenflüsse und PHI-Grenzen für Security-/Audit-Anforderungen sauber modellieren.',
                'User Journeys für Mobile priorisieren, um Adoption zu erhöhen und Ops-Aufwand zu senken.',
                'API- und Integrationsschicht so designen, dass Business-Logik nicht kanalweise dupliziert wird.',
                'Governance für Release-Management, Testing und regulatorische Doku etablieren.'
            ]
        },
        cta: {
            primary: { text: 'Modernize Apps', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Go mobile.' },
            secondary: { text: 'View Details', action: '#' }
        }
    },
    {
        id: 'voc-360',
        slug: 'voice-of-customer-360',
        theme: {
            color: 'blue',
            gradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
        },
        domains: ['Consulting', 'FinServ'],
        projectType: 'data-platform',
        seoTags: ['Customer 360', 'Insurance', 'Analytics'],
        header: {
            eyebrow: 'CUSTOMER EXPERIENCE',
            title: 'Voice of Customer (VoC) 360 Model',
            client: {
                type: 'Insurance Client',
                size: 'Enterprise',
                industry: 'Insurance'
            }
        },
        challenge: {
            situation: 'Call center agents lacked unified view of customer, leading to long calls and frustration.',
            pain_points: [],
            urgency: 'CX Impact',
            why_prasad: 'Data integration expertise'
        },
        approach: {
            methodology: '360 View Architecture',
            phases: [],
            unique_differentiator: 'Real-time aggregation of policy, claims, and interaction data'
        },
        outcomes: {
            hero_metric: { value: 'Reduced', label: 'Call Handling Time', icon: '⏱️' },
            secondary_metrics: [],
            compliance: [],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['Integration Patterns'], infrastructure: '', improvements: [] },
            migration_strategy: 'Integration'
        },
        cta: {
            primary: { text: 'Improve CX', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Build 360 view.' },
            secondary: { text: 'View Model', action: '#' }
        }
    }
];

// Phase 1.6: Run validation on import (dev-mode only warning, does not crash build)
runProjectValidation(projects);
