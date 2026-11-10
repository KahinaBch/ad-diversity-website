"use client";
import { useState, useRef, useEffect } from "react";
import { type Dataset, ACCESS_LABEL, accessLevel, diversityLevel } from "@/lib/catalogue";

interface Message {
  role: "user" | "assistant";
  text: string;
  matches?: Dataset[];
  gaps?: string[];
}

// ─── Keyword scoring rules ────────────────────────────────────────────────────
function scoreDiversity(text: string): number {
  const t = text.toLowerCase();
  const keywords = ["diverse", "diversity", "ethnic", "minority", "multiethnic", "multi-ethnic",
    "asian", "african", "black", "hispanic", "latino", "indigenous", "south asian"];
  return keywords.filter((k) => t.includes(k)).length * 3;
}

function scoreWomens(text: string): number {
  const t = text.toLowerCase();
  const keywords = ["women", "female", "sex difference", "gender", "maternal", "pregnancy", "menopause", "hrt"];
  return keywords.filter((k) => t.includes(k)).length * 3;
}

function scoreImaging(text: string): number {
  const t = text.toLowerCase();
  const keywords = ["mri", "imaging", "brain scan", "neuroimaging", "fmri", "structural", "diffusion", "dti", "white matter"];
  return keywords.filter((k) => t.includes(k)).length * 3;
}

function scoreGenetics(text: string): number {
  const t = text.toLowerCase();
  const keywords = ["genetics", "gwas", "genomic", "dna", "gene", "snp", "apoe", "polygenic", "genome"];
  return keywords.filter((k) => t.includes(k)).length * 3;
}

function scoreLongitudinal(text: string): number {
  const t = text.toLowerCase();
  const keywords = ["longitudinal", "follow-up", "follow up", "repeated", "prospective", "cohort", "trajectory"];
  return keywords.filter((k) => t.includes(k)).length * 2;
}

function scoreEarly(text: string): number {
  const t = text.toLowerCase();
  const keywords = ["early", "prevention", "preclinical", "pre-clinical", "prodromal", "presymptomatic", "prevention"];
  return keywords.filter((k) => t.includes(k)).length * 2;
}

function scoreOpenAccess(text: string): number {
  const t = text.toLowerCase();
  const keywords = ["open", "free", "freely", "accessible", "available", "public"];
  return keywords.filter((k) => t.includes(k)).length * 2;
}

function scoreOmics(text: string): number {
  const t = text.toLowerCase();
  const keywords = ["proteomics", "metabolomics", "transcriptomics", "epigenomics", "multiomics", "multi-omics", "omics"];
  return keywords.filter((k) => t.includes(k)).length * 3;
}

function scoreLifestyle(text: string): number {
  const t = text.toLowerCase();
  const keywords = ["lifestyle", "physical activity", "diet", "sleep", "exercise", "exposome", "exposomics", "environment"];
  return keywords.filter((k) => t.includes(k)).length * 2;
}

function scoreMidlife(text: string): number {
  const t = text.toLowerCase();
  const keywords = ["midlife", "middle-age", "middle age", "50s", "40s", "prevention", "modifiable"];
  return keywords.filter((k) => t.includes(k)).length * 2;
}

function scoreCSF(text: string): number {
  const t = text.toLowerCase();
  const keywords = ["csf", "cerebrospinal", "amyloid", "tau", "biomarker", "blood biomarker", "plasma"];
  return keywords.filter((k) => t.includes(k)).length * 2;
}

// ─── Dataset scorer ───────────────────────────────────────────────────────────
interface ScoreFactors {
  wantsDiversity: boolean;
  wantsWomens: boolean;
  wantsImaging: boolean;
  wantsGenetics: boolean;
  wantsLongitudinal: boolean;
  wantsEarly: boolean;
  wantsOpen: boolean;
  wantsOmics: boolean;
  wantsLifestyle: boolean;
  wantsMidlife: boolean;
  wantsCSF: boolean;
}

function detectFactors(query: string): ScoreFactors {
  return {
    wantsDiversity:    scoreDiversity(query) > 0,
    wantsWomens:       scoreWomens(query) > 0,
    wantsImaging:      scoreImaging(query) > 0,
    wantsGenetics:     scoreGenetics(query) > 0,
    wantsLongitudinal: scoreLongitudinal(query) > 0,
    wantsEarly:        scoreEarly(query) > 0,
    wantsOpen:         scoreOpenAccess(query) > 0,
    wantsOmics:        scoreOmics(query) > 0,
    wantsLifestyle:    scoreLifestyle(query) > 0,
    wantsMidlife:      scoreMidlife(query) > 0,
    wantsCSF:          scoreCSF(query) > 0,
  };
}

const hasWomensHealth = (d: Dataset) =>
  !!d.womens_health && d.womens_health.trim().toLowerCase() !== "unknown";

function scoreDataset(d: Dataset, f: ScoreFactors): number {
  let score = 0;
  const types = d.data_types.map((t) => t.toLowerCase());
  const diversityLvl = diversityLevel(d);

  if (f.wantsDiversity) {
    if (diversityLvl === "high") score += 6;
    else if (diversityLvl === "medium") score += 3;
  }
  if (f.wantsWomens) {
    if (hasWomensHealth(d)) score += 4;
    if (d.id === "bisc") score += 4;
    if (d.id === "prevent-ad") score += 2;
  }
  if (f.wantsImaging) {
    if (types.includes("mri")) score += 4;
    if (types.includes("pet")) score += 3;
  }
  if (f.wantsGenetics) {
    if (types.includes("genetics")) score += 4;
    if (types.includes("epigenomics")) score += 2;
  }
  if (f.wantsLongitudinal) {
    if (d.design === "longitudinal") score += 4;
    else if (d.design === "both") score += 2;
  }
  if (f.wantsEarly) {
    if ((d.life_stage ?? []).includes("midlife")) score += 3;
    if ((d.life_stage ?? []).includes("early adulthood")) score += 2;
    if (d.id === "wrap" || d.id === "prevent-ad" || d.id === "alfa") score += 3;
  }
  if (f.wantsOpen) {
    const lvl = accessLevel(d);
    if (lvl === "open") score += 5;
    else if (lvl === "easy") score += 2;
  }
  if (f.wantsOmics) {
    if (types.includes("proteomics"))     score += 4;
    if (types.includes("metabolomics"))   score += 4;
    if (types.includes("transcriptomics")) score += 4;
    if (types.includes("epigenomics"))    score += 3;
  }
  if (f.wantsLifestyle) {
    if (types.includes("lifestyle")) score += 4;
    if (types.includes("exposomics")) score += 3;
  }
  if (f.wantsMidlife) {
    if ((d.life_stage ?? []).includes("midlife")) score += 4;
  }
  if (f.wantsCSF) {
    if (types.includes("csf")) score += 4;
    if (types.includes("blood")) score += 3;
  }

  return score;
}

// ─── Gap detection ────────────────────────────────────────────────────────────
function detectGaps(datasets: Dataset[], f: ScoreFactors): string[] {
  const gaps: string[] = [];

  if (f.wantsDiversity) {
    const highDiv = datasets.filter((d) => diversityLevel(d) === "high");
    const lowDiv = datasets.filter((d) => diversityLevel(d) === "low");
    if (lowDiv.length > datasets.length / 2)
      gaps.push(`Only ${highDiv.length} of ${datasets.length} cohorts are rated as highly ethnically diverse, while ${lowDiv.length} are rated low: non-European populations remain under-represented in AD research.`);
  }
  if (f.wantsWomens) {
    const withWomen = datasets.filter(hasWomensHealth);
    if (withWomen.length < datasets.length / 2)
      gaps.push("Less than half of cohorts report detailed women's health data (menopause, HRT) — a critical gap for understanding sex-specific AD risk.");
  }
  if (f.wantsEarly || f.wantsMidlife) {
    const midlife = datasets.filter((d) => (d.life_stage ?? []).includes("midlife"));
    if (midlife.length < 4)
      gaps.push("Few cohorts cover the midlife window, which is key for studying modifiable risk factors before symptom onset.");
  }
  if (f.wantsOmics) {
    const omics = datasets.filter((d) => {
      const t = d.data_types.map((x) => x.toLowerCase());
      return t.includes("proteomics") || t.includes("metabolomics") || t.includes("transcriptomics");
    });
    if (omics.length < 5)
      gaps.push("Multi-omics data (proteomics, metabolomics, transcriptomics) remains sparse across the catalogue — most cohorts focus on a single omic layer.");
  }
  if (f.wantsLifestyle) {
    const lifestyle = datasets.filter((d) => d.data_types.map((t) => t.toLowerCase()).includes("exposomics"));
    if (lifestyle.length < 3)
      gaps.push("Exposomics and environmental data are rare — fewer than 3 cohorts systematically collect environmental exposure information.");
  }
  if (f.wantsGenetics) {
    const gen = datasets.filter((d) => d.data_types.map((t) => t.toLowerCase()).includes("genetics"));
    if (gen.length > 0 && f.wantsDiversity) {
      const divGen = gen.filter((d) => diversityLevel(d) === "high");
      if (divGen.length < 3)
        gaps.push("GWAS data in diverse populations is scarce — most genetic studies are European-centric, limiting polygenic score generalizability.");
    }
  }

  return gaps;
}

// ─── Response generator ───────────────────────────────────────────────────────
function generateResponse(
  query: string, topMatches: Dataset[], gaps: string[], f: ScoreFactors,
): string {
  const q = query.toLowerCase();
  const isGapQuery = ["gap", "lack", "missing", "underrepresented", "no cohort", "no dataset"].some((k) => q.includes(k));
  const isRecommendQuery = ["find", "which", "recommend", "suggest", "what cohort", "what dataset", "best", "suitable"].some((k) => q.includes(k));

  let response = "";

  if (topMatches.length === 0) {
    return "I couldn't identify a clear match based on your question. Try mentioning specific data types (e.g. MRI, genetics), populations (e.g. diverse, women), study design (longitudinal), or stage of life (midlife, late life).";
  }

  const activeFactors: string[] = [];
  if (f.wantsDiversity)    activeFactors.push("ethnic diversity");
  if (f.wantsWomens)       activeFactors.push("women's health / sex differences");
  if (f.wantsImaging)      activeFactors.push("neuroimaging (MRI/PET)");
  if (f.wantsGenetics)     activeFactors.push("genetics/GWAS");
  if (f.wantsLongitudinal) activeFactors.push("longitudinal follow-up");
  if (f.wantsEarly || f.wantsMidlife) activeFactors.push("early-life / midlife prevention");
  if (f.wantsOpen)         activeFactors.push("open access");
  if (f.wantsOmics)        activeFactors.push("multi-omics");
  if (f.wantsLifestyle)    activeFactors.push("lifestyle / exposomics");
  if (f.wantsCSF)          activeFactors.push("biomarkers (CSF/blood)");

  if (activeFactors.length > 0) {
    response += `Based on your interest in **${activeFactors.join(", ")}**, here are the most relevant cohorts:\n\n`;
  } else if (isRecommendQuery) {
    response += "Here are the cohorts that best match your query:\n\n";
  }

  topMatches.slice(0, 5).forEach((d, i) => {
    const divLvl = diversityLevel(d);
    const accessLabel = ACCESS_LABEL[accessLevel(d)].toLowerCase();
    const n = d.n_subjects >= 1000 ? `${(d.n_subjects / 1000).toFixed(0)}k` : String(d.n_subjects);
    response += `**${i + 1}. ${d.name}** (${d.origin.join(", ")} · n≈${n} · ${accessLabel})\n`;
    response += `   ${d.full_name}. Design: ${d.design ?? "unknown"}. Diversity: ${divLvl}. Data: ${d.data_types.slice(0, 5).join(", ")}.\n\n`;
  });

  if (isGapQuery || gaps.length > 0) {
    if (gaps.length > 0) {
      response += "**Key research gaps identified:**\n";
      gaps.forEach((g) => { response += `• ${g}\n`; });
      response += "\n";
    } else {
      response += "No major gaps were detected for this specific combination in the current catalogue.\n\n";
    }
  }

  if (!isRecommendQuery && !isGapQuery && topMatches.length > 0) {
    response += `_Tip: ${topMatches.length} cohorts scored as relevant. Refine your query to narrow the list — e.g. add "open access", "longitudinal", or a specific data type._`;
  }

  return response.trim();
}

// ─── Markdown-lite renderer ───────────────────────────────────────────────────
function RenderText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        // Bold: **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="text-sm leading-relaxed">
            {parts.map((p, j) =>
              p.startsWith("**") && p.endsWith("**")
                ? <strong key={j} className="text-violet-300 font-semibold">{p.slice(2, -2)}</strong>
                : p.startsWith("_") && p.endsWith("_")
                ? <em key={j} className="text-gray-500">{p.slice(1, -1)}</em>
                : <span key={j}>{p}</span>
            )}
          </p>
        );
      })}
    </div>
  );
}

// ─── Suggestion pills ─────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "Which cohorts cover diverse or non-European populations?",
  "Find longitudinal cohorts with open access MRI data",
  "What are the gaps in women's health data across cohorts?",
  "Which datasets have multi-omics data for early AD?",
  "Cohorts covering midlife with lifestyle and genetics data",
  "Which cohorts lack ethnic diversity?",
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DatasetAssistant({ datasets }: { datasets: Dataset[] }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm your AD dataset research assistant. Ask me to find cohorts matching your needs, identify research gaps, or compare available datasets. For example: _\"Which cohorts have diverse populations and longitudinal MRI data?\"_",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleQuery(query: string) {
    if (!query.trim() || loading) return;
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");

    setTimeout(() => {
      const f = detectFactors(query);
      const scored = datasets
        .map((d) => ({ d, score: scoreDataset(d, f) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ d }) => d);

      const gaps = detectGaps(datasets, f);
      const text = generateResponse(query, scored, gaps, f);

      setMessages((prev) => [...prev, { role: "assistant", text, matches: scored.slice(0, 5), gaps }]);
      setLoading(false);
    }, 400);
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(167,139,250,0.2)" }}>
      {/* Header */}
      <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: "rgba(167,139,250,0.1)" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
          🔬
        </div>
        <div>
          <p className="font-semibold text-violet-200 text-sm">Research Assistant</p>
          <p className="text-xs text-gray-500">Rule-based · {datasets.length} cohorts indexed</p>
        </div>
      </div>

      {/* Messages */}
      <div className="h-72 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-800/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs
              ${m.role === "assistant" ? "bg-violet-800" : "bg-purple-600"}`}>
              {m.role === "assistant" ? "AI" : "U"}
            </div>
            <div className={`max-w-[85%] rounded-xl px-4 py-3 text-sm
              ${m.role === "assistant"
                ? "text-gray-300"
                : "text-white ml-auto"}`}
              style={{
                background: m.role === "assistant"
                  ? "rgba(107,33,168,0.08)"
                  : "rgba(107,33,168,0.35)",
                border: "1px solid " + (m.role === "assistant" ? "rgba(167,139,250,0.1)" : "rgba(167,139,250,0.3)"),
              }}>
              <RenderText text={m.text} />
              {m.matches && m.matches.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {m.matches.slice(0, 5).map((d) => (
                    <a key={d.id} href={d.url} target="_blank" rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded text-xs border transition-colors hover:border-violet-400"
                      style={{ background: "rgba(124,58,237,0.12)", color: "#a78bfa", borderColor: "rgba(124,58,237,0.25)" }}>
                      {d.name} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-violet-800 flex items-center justify-center text-xs">AI</div>
            <div className="rounded-xl px-4 py-3 text-sm text-gray-400 animate-pulse"
              style={{ background: "rgba(107,33,168,0.08)", border: "1px solid rgba(167,139,250,0.1)" }}>
              Analysing cohorts…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="px-5 pb-3">
          <p className="text-xs text-gray-600 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.slice(0, 4).map((s) => (
              <button key={s} onClick={() => handleQuery(s)}
                className="px-2.5 py-1 rounded-full text-xs border transition-colors hover:border-violet-500 hover:text-violet-300"
                style={{ borderColor: "rgba(167,139,250,0.2)", color: "var(--text-dim)", background: "transparent" }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t flex gap-2" style={{ borderColor: "rgba(167,139,250,0.1)" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleQuery(input); }}
          placeholder="Ask about cohorts, gaps, or research needs…"
          className="flex-1 px-3 py-2 rounded-lg text-sm text-gray-200 placeholder-gray-600 border outline-none"
          style={{ background: "var(--bg-card)", borderColor: "rgba(167,139,250,0.2)" }}
        />
        <button
          onClick={() => handleQuery(input)}
          disabled={!input.trim() || loading}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "white" }}>
          Ask
        </button>
      </div>
    </div>
  );
}
