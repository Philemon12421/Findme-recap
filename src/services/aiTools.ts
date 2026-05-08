import { cn } from '../lib/utils';

// Deterministic variant generation
export async function generateAIVariants(name: string): Promise<string[]> {
  const prefixes = ['the', 'official', 'real', 'get', 'iam', 'my', 'its', 'simply', 'just', 'hey'];
  const suffixes = ['hq', 'studio', 'me', 'app', 'life', 'world', 'space', 'hub', 'plus', 'dot'];

  const cleanName = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!cleanName) return [];

  const variants = new Set<string>();

  // Classic combos
  variants.add(cleanName + 'official');
  variants.add('real' + cleanName);
  variants.add('get' + cleanName);
  variants.add(cleanName + 'hq');
  variants.add(cleanName + 'app');
  variants.add(cleanName + 'me');
  variants.add('iam' + cleanName);
  variants.add(cleanName + 'studio');

  // Leet-style digit swap (a→4, e→3, i→1, o→0)
  const leet = cleanName
    .replace(/a/g, '4')
    .replace(/e/g, '3')
    .replace(/i/g, '1')
    .replace(/o/g, '0');
  if (leet !== cleanName) variants.add(leet);

  // Reversed name
  const reversed = cleanName.split('').reverse().join('');
  if (reversed !== cleanName) variants.add(reversed + 'hq');

  // Fill remaining slots with prefix+name+suffix combos
  let i = 0;
  while (variants.size < 12) {
    const p = prefixes[i % prefixes.length];
    const s = suffixes[Math.floor(i / prefixes.length) % suffixes.length];
    variants.add(p + cleanName + s);
    i++;
  }

  return Array.from(variants).slice(0, 12);
}

// Richer logo concept
export async function generateLogoConcept(name: string): Promise<string> {
  const initial = name.charAt(0).toUpperCase();
  const styles = [
    {
      style: 'Minimalist Wordmark',
      shape: 'horizontal logotype with tracked-out letterforms',
      font: 'Geometric sans-serif (e.g. Futura or Neue Haas Grotesk)',
      layout: 'Full name set in uppercase with a thin rule beneath',
    },
    {
      style: 'Monogram Badge',
      shape: `bold "${initial}" enclosed in a rounded-corner square`,
      font: 'Condensed slab-serif (e.g. Rockwell Condensed)',
      layout: 'Icon-first, name in caption size below',
    },
    {
      style: 'Dynamic Mark',
      shape: `abstract arrow or chevron fused with the "${initial}" glyph`,
      font: 'Sharp grotesque (e.g. Aktiv Grotesk)',
      layout: 'Symbol left, wordmark right, vertically centered',
    },
  ];
  const pick = styles[name.length % styles.length];

  return `Logo Concept for "${name}" — ${pick.style}
- Shape: ${pick.shape}
- Typeface: ${pick.font}
- Layout: ${pick.layout}
- Primary color: Brand Orange (#FF6321) on Slate-900 (#0F172A)
- Secondary: White (#FFFFFF) for contrast elements
- Symbolism: The ${initial} initial anchors identity; clean geometry signals precision and trust.`;
}

// Expanded + scored chat assistant
const KNOWLEDGE_BASE: Record<string, string> = {
  username: "Keep usernames under 15 characters for cross-platform compatibility. Use a core keyword or your real name. Avoid numbers unless they're part of your brand.",
  seo: "Use the same handle everywhere for consistent Google indexing. Keywords in your profile name help discoverability on search engines.",
  domain: "Prefer .com for general brands, .ai for tech projects, .me for personal portfolios, .app for software tools. Avoid hyphens — they hurt memorability and SEO.",
  brand: "Personal branding starts with a consistent handle across your top 10 platforms. Check availability before committing to a name.",
  logo: "A strong logo is a single recognizable mark. Start with a monogram or wordmark — don't overcomplicate it.",
  color: "Pick two primary brand colors: one dominant, one accent. Orange signals energy and approachability; blue signals trust; green signals growth.",
  photo: "Your profile photo should be high-contrast and recognizable at 40×40px. A clean headshot or a bold icon works best.",
  twitter: "On X (Twitter), keep your handle matching your other platforms. Your display name can be longer and more descriptive.",
  instagram: "Instagram handles are case-insensitive. Use underscores sparingly — they reduce memorability.",
  tiktok: "TikTok handles under 24 characters. The @ handle is your primary identity there, so make it clean.",
  linkedin: "LinkedIn allows a custom URL under linkedin.com/in/yourname — set this immediately after creating your profile.",
  snapchat: "Snapchat usernames can't be changed after creation. Choose carefully and match your other handles.",
  threads: "Threads is tied to your Instagram handle — if you own the IG handle, you also get it on Threads.",
  twitch: "Twitch handles are permanent identifiers. If you stream, align your Twitch name with your YouTube and TikTok.",
  discord: "Discord usernames are now unique handles (no discriminator). Grab yours early as the platform grows.",
  personal: "For a personal brand, use your real name if available — it's the most trustworthy and SEO-friendly handle you can have.",
  hi: "Hello! I'm Findme Assistant. Ask me about handles, branding, SEO, or platform-specific tips.",
  hello: "Hello! I'm Findme Assistant. Ask me about handles, branding, SEO, or platform-specific tips.",
  hey: "Hey! I'm Findme Assistant. Ask me about handles, branding, SEO, or platform-specific tips.",
};

export async function identityChatAssistant(query: string): Promise<string> {
  const q = query.toLowerCase();

  // Score each key by how many characters overlap
  let bestKey = '';
  let bestScore = 0;

  for (const key of Object.keys(KNOWLEDGE_BASE)) {
    if (q.includes(key)) {
      if (key.length > bestScore) {
        bestScore = key.length;
        bestKey = key;
      }
    }
  }

  if (bestKey) return KNOWLEDGE_BASE[bestKey];

  return "Great question! As a general rule: check handle availability on GitHub, Instagram, and X first — they're the most identity-critical platforms. Aim for a handle under 15 characters with no special characters.";
}
