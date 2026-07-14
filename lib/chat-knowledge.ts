import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  routes,
} from "@/lib/routes";

export type KnowledgeEntry = {
  k: string[];
  a: string;
  c: string[];
};

const R = {
  home: routes.home,
  successStories: routes.successStories,
  capabilities: routes.capabilities,
  industries: routes.industries,
  moxsuite: routes.moxsuite,
  careers: routes.careers,
  contact: routes.contact,
  videoPortfolio: routes.videoPortfolio,
  aiAutomation: routes.aiAutomation,
  branding: routes.branding,
  calendly: CALENDLY_URL,
};

export function link(href: string, label: string): string {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const target = external ? ' target="_blank" rel="noopener"' : "";
  return `<a href="${href}"${target}>${label}</a>`;
}

const HUMAN =
  "Fastest paths to a human: " +
  link(`mailto:${CONTACT_EMAIL}`, CONTACT_EMAIL) +
  " (reply within <b>one business day</b>), " +
  link(CALENDLY_URL, "book 30 minutes") +
  ", or call <b>+91 99584 78569</b> / <b>+1 762 278 7611</b>.";

export const knowledgeBase: KnowledgeEntry[] = [
 {k:['hello','hi ','hey','salam','namaste','good morning','good evening'],
  a:"Hello! I'm the EaseHawk assistant — built the way we build assistants for clients, like the bilingual EN/AR one running in production for Mattex in Saudi Arabia. Ask me about our work, capabilities, products or pricing.",
  c:['What do you do?','Show me proof','Pricing','Talk to a human']},
 {k:['what do you do','services','capabilities','offering','what does easehawk do','help me with'],
  a:"Six capabilities, every one backed by delivered work: <b>Software Engineering</b>, <b>AI &amp; Automation</b>, <b>CRM &amp; Enterprise</b> (Salesforce · Microsoft · Zoho partners), <b>Data &amp; BI</b>, <b>Brand &amp; Video</b>, and <b>Embedded Talent</b>. Full detail: "+link(R.capabilities,'the Capabilities page')+".",
  c:['Show me proof','AI & automation','Pricing','MoxSuite products']},
 {k:['proof','case stud','clients','portfolio of work','who have you worked','references','track record'],
  a:"Seventeen named engagements — SERCO, ADNOC-Fertiglobe, Amazon Payment Services, SAP, Ministry of Culture UAE, Tigo Energy, UTAC and more, across six countries. Every one has a full case sheet: "+link(R.successStories,'open the Success Stories')+". Films included: "+link(R.videoPortfolio,'the video showreel')+".",
  c:['ADNOC story','White City automation','Government work','Talk to a human']},
 {k:['ai','automation','chatbot','llm','genai','agent','artificial intelligence','machine learning'],
  a:"You're talking to one — this is the pattern we ship for clients. In production: a bilingual <b>EN/AR assistant</b> for Mattex (KSA) and <b>~80% of daily operations automated</b> for a 50+ truck US logistics operator ("+link(R.successStories+'#case-whitecity','White City case')+"). We build LLM apps with evals, guardrails and telemetry — not vibes. Details: "+link(R.aiAutomation,'the AI &amp; Automation page')+".",
  c:['White City automation','Is my data safe?','Pricing','Book a call']},
 {k:['adnoc','fertiglobe','protiviti'],
  a:"ADNOC-Fertiglobe: two specialists embedded via our Protiviti channel inside the global energy joint venture — six months, enterprise vetting cleared. "+link(R.successStories+'#case-adnoc','Open the case sheet')+".",
  c:['Embedded talent','Government work','Talk to a human']},
 {k:['white city','logistics','trucking','80%'],
  a:"White City (USA): roughly <b>80% of daily operations automated</b> across a 50+ truck fleet — dispatch, tracking, back office and an analytics layer showing revenue daily. Two years and compounding. "+link(R.successStories+'#case-whitecity','Open the case sheet')+".",
  c:['AI & automation','Pricing','Book a call']},
 {k:['mattex','arabic','bilingual','saudi manufactur'],
  a:"Mattex (KSA): a 2+ year retained partnership — full digital ecosystem plus a bilingual <b>EN/AR AI assistant live in production</b>. Arabic content always passes native Gulf Arabic review before it ships. "+link(R.successStories+'#case-mattex','Open the case sheet')+".",
  c:['AI & automation','Show me proof','Book a call']},
 {k:['government','ministry','federal','public sector','gov '],
  a:"Government &amp; public sector is our strongest room: SERCO's national operations centre (9 months), two senior D365 architects on a <b>UAE federal ministry</b> programme, specialists inside ADNOC-Fertiglobe — plus ministry clients in KSA. We deliver through channels these institutions already trust: Alpha Data, Protiviti. "+link(R.industries,'Industries page')+".",
  c:['ADNOC story','Embedded talent','Talk to a human']},
 {k:['amazon','tigo','sap','utac','serco','acquis','alruqee','viita','towell','bhumi','fine hygienic','mega prime','leanplum','roambee'],
  a:"That name is on our delivered list — with the country, duration and outcome on record. The fastest way to judge us: "+link(R.successStories,'open the case sheet in Success Stories')+" or "+link(R.videoPortfolio,'watch the films')+".",
  c:['Show me proof','Pricing','Book a call']},
 {k:['price','pricing','cost','how much','budget','rates','charges'],
  a:"Honest answer: it depends which door — <b>fixed-scope projects</b>, <b>embedded squads</b> and <b>managed retainers</b> price differently. What we promise: a scoped number after one conversation, never a menu of mystery rates, and no invoice surprises. "+link(R.calendly,'Book 30 minutes')+" and you'll leave with a real figure path.",
  c:['Engagement models','Book a call','Talk to a human']},
 {k:['engagement model','how do you work','project or retainer','ways to engage','embedded squad','retainer'],
  a:"Three doors: <b>Project Delivery</b> (fixed scope, fixed outcome), <b>Embedded Squad</b> (our specialists inside your team in weeks — ADNOC-grade vetting), and <b>Managed Retainer</b> (long-run ownership; our longest runs are 2–3 years and counting). Not sure? We'll recommend one honestly.",
  c:['Pricing','Show me proof','Book a call']},
 {k:['moxsuite','mox suite','products','moxsend','moxcrm','moxquote','moxfinance','moxwarm','moxcheck'],
  a:"MoxSuite is our own AI-native product platform — one intelligence core under <b>MoxSend</b> (AI outreach), <b>MoxWarm</b>, <b>MoxCheck</b>, <b>MoxCRM</b>, <b>MoxQuote</b> and <b>MoxFinance</b>, with 35 products on the roadmap. Building products is why our client AI ships production-grade. "+link(R.moxsuite,'Explore MoxSuite')+".",
  c:['MoxCampus','MoxRev','AI & automation']},
 {k:['moxcampus','school','education'],
  a:"<b>MoxCampus</b> — the AI operating system for independent schools: admissions to alumni, predictive AI on every student journey, multi-tenant for school groups. English-first, Arabic-ready. "+link(R.moxsuite,'See it on the MoxSuite page')+".",
  c:['MoxRev','MoxSuite products','Book a call']},
 {k:['moxrev','dealership','rental','automotive','car'],
  a:"<b>MoxRev</b> — the AI operating system for dealerships and rental fleets: AI dynamic pricing, utilisation intelligence, both sides of the lot on one platform. Sell. Rent. Rev it up. "+link(R.moxsuite,'See it on the MoxSuite page')+".",
  c:['MoxCampus','MoxSuite products','Book a call']},
 {k:['career','careers','job','jobs','hiring','vacanc','work for you','apply','openings','join the team','join you','open roles'],
  a:"Four open AI &amp; data roles, written as mission briefs — Senior AI Engineer, AI Solutions Architect, Data Architect, ML &amp; Data Engineer. No bench, named clients, every applicant answered within 48 hours. "+link(R.careers,'Read the briefs')+".",
  c:['What do you do?','Talk to a human']},
 {k:['human','talk to someone','real person','sales','contact','speak','phone','call you','email'],
  a:"Of course — that's the whole point. "+HUMAN,
  c:['Book a call','Pricing','Show me proof']},
 {k:['book','calendly','meeting','schedule','demo','intro call'],
  a:"Straight to the calendar: "+link(R.calendly,'calendly.com/easehawk ↗')+" — 30 minutes with someone who can make decisions. Prefer writing first? "+link(R.contact,'the contact page')+" routes you in one message.",
  c:['Pricing','Show me proof']},
 {k:['nda','confidential','non-disclosure','secret'],
  a:"Yes — yours or ours, usually executed within a day. Our standard NDA is enterprise-grade, built for India-international engagements. Confidentiality is the starting line, not a negotiation.",
  c:['Talk to a human','Book a call']},
 {k:['where are you','location','office','address','based','gurugram','india','headquart'],
  a:"HQ: <b>WeWork India, DLF Forum, Cybercity Phase III, Gurugram, HR 122002, India</b> — delivering across GCC, India, North America, UK and APAC on a follow-the-sun band. "+link(R.contact,'Contact page')+" has the live delivery dial.",
  c:['Talk to a human','Show me proof']},
 {k:['salesforce','microsoft','zoho','dynamics','d365','crm','odoo','oracle','erp'],
  a:"Direct partnerships with <b>Salesforce, Microsoft and Zoho</b>, plus Odoo delivery and experience across SAP and Oracle estates. Delivered: Salesforce for UK finance (Acquis), D365 for Saudi industry (Alruqee), Zoho for India's largest volunteer non-profit (Bhumi). Adoption is our metric, not installation.",
  c:['Show me proof','Pricing','Book a call']},
 {k:['industr','sector','vertical','manufactur','energy','fintech','insurance','semiconductor','logistic'],
  a:"Eight industries, all entered through delivered work: Government, Energy, Manufacturing, Financial Services &amp; Insurance, Logistics, Technology &amp; Semiconductors, Consumer/FMCG, Non-Profit — plus two industry platforms (MoxCampus, MoxRev). "+link(R.industries,'Open your sector')+".",
  c:['Government work','Show me proof','Book a call']},
 {k:['video','film','showreel','explainer','brand film','animation'],
  a:"Eighteen films across four disciplines — promotional, 2D explainer, character animation, tutorial — for brands like Amazon Payment Services, Tigo Energy and Leanplum. "+link(R.videoPortfolio,'Press play on the showreel')+". Full creative scope: "+link(R.branding,'Brand &amp; Digital Marketing')+".",
  c:['Show me proof','Pricing','Book a call']},
 {k:['how fast','timeline','how long','delivery time','when can you start'],
  a:"Benchmarks, not promises: a government-grade national operations centre in <b>9 months</b>; specialists embedded in <b>weeks</b>; first automation workflows live in weeks, not quarters. You get a scoped timeline after one conversation.",
  c:['Pricing','Book a call','Show me proof']},
 {k:['data safe','privacy','secure','train','pdpl','residency','gdpr'],
  a:"Your engagement data stays inside your engagement — we design for data residency and PDPL-class constraints from day one, and governance review is part of the build. It's also how we run our own products.",
  c:['AI & automation','NDA?','Talk to a human']},
 {k:['about you','who are you','about easehawk','who is easehawk','the company','founded','your team','tell me about the company'],
  a:"EaseHawk Technologies — a global AI transformation company, est. 2022, HQ Gurugram, India. Services with receipts (17 named case studies, six countries) plus our own AI product platform, MoxSuite. Grab the "+"<b>Company Profile PDF</b> from the glowing hexagon at bottom-left, or start at "+link(R.home,'the main site')+".",
  c:['What do you do?','Show me proof','Talk to a human']},
 {k:['profile','pdf','download','brochure','deck'],
  a:"The <b>Company Profile PDF</b> lives behind the glowing hexagon at the bottom-left of every page — 9 pages: capabilities, all 17 case studies, clients and MoxSuite. Forward-friendly by design.",
  c:['Show me proof','Talk to a human']},
];

export const fallbackEntry: KnowledgeEntry = {
  a: "That one deserves a human answer rather than a scripted guess. " + HUMAN,
  c: ["What do you do?", "Show me proof", "Book a call"],
  k: [],
};

export const chipQueries: Record<string, string> = {'What do you do?':'what do you do','Show me proof':'case studies','Pricing':'pricing','Talk to a human':'talk to a human',
 'AI & automation':'ai and automation','MoxSuite products':'moxsuite','Book a call':'book a call','ADNOC story':'adnoc',
 'White City automation':'white city','Government work':'government','Engagement models':'engagement models',
 'Embedded talent':'engagement models','Is my data safe?':'data safe','MoxCampus':'moxcampus','MoxRev':'moxrev','NDA?':'nda'};

export function localBrain(query: string): KnowledgeEntry {
  const q = " " + query.toLowerCase() + " ";
  let best: KnowledgeEntry | null = null;
  let score = 0;
  for (const item of knowledgeBase) {
    let s = 0;
    for (const k of item.k) {
      if (q.includes(k)) s += k.length;
    }
    if (s > score) {
      score = s;
      best = item;
    }
  }
  return best ?? fallbackEntry;
}

export async function brain(query: string): Promise<KnowledgeEntry> {
  const endpoint = process.env.NEXT_PUBLIC_LLM_ENDPOINT;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: query }),
      });
      if (res.ok) {
        const data = (await res.json()) as KnowledgeEntry;
        if (data?.a) return data;
      }
    } catch {
      /* fall through to local brain */
    }
  }
  return localBrain(query);
}
