import { cn } from '../lib/utils';

// Phase 1: Offline Name Generator Algorithm
export async function generateAIVariants(name: string): Promise<string[]> {
  const prefixes = ['The', 'Official', 'Real', 'Get', 'Iam', 'My', 'Its', 'Direct', 'Simply', 'Just'];
  const suffixes = ['HQ', 'Studio', 'Me', 'App', 'Life', 'World', 'Space', 'Center', 'Hub', 'Plus'];
  
  const cleanName = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!cleanName) return [];

  const variants = new Set<string>();
  
  // Rule 1: Simple prefix
  variants.add(prefixes[Math.floor(Math.random() * prefixes.length)].toLowerCase() + cleanName);
  
  // Rule 2: Simple suffix
  variants.add(cleanName + suffixes[Math.floor(Math.random() * suffixes.length)].toLowerCase());
  
  // Rule 3: Balanced
  variants.add(cleanName + 'Official');
  variants.add('Real' + cleanName);
  
  // Rule 4: Action based
  variants.add('Get' + cleanName);
  
  // Rule 5: Domain style
  variants.add(cleanName + 'DotCom');

  // Fill up to 10
  while (variants.size < 10) {
    const p = prefixes[Math.floor(Math.random() * prefixes.length)].toLowerCase();
    const s = suffixes[Math.floor(Math.random() * suffixes.length)].toLowerCase();
    variants.add(p + cleanName + s);
  }

  return Array.from(variants);
}

// Phase 1: SVG/Template-based Logo Concept
export async function generateLogoConcept(name: string): Promise<string> {
  const initial = name.charAt(0).toUpperCase();
  return `Logo Concept for "${name}": 
  - Style: Minimalist Typographic Fusion.
  - Composition: A bold ${initial} glyph centered within a perfect geometric circle.
  - Palette: Vibrant Brand Orange (#FF6321) accent on a slate-900 background.
  - Symbolism: The circular boundary represents global reach, while the sharp ${initial} denotes precision and identity.`;
}

// Phase 1: Rule-based Chat Assistant
const RESPONSES: Record<string, string> = {
  "username": "For usernames, keep it under 15 characters to ensure compatibility across all platforms. Use your name or a core keyword that defines your brand.",
  "seo": "Optimize your profile names by using keywords people actually search for. Consistency is key for Google indexing.",
  "domain": "Prefer .com for general brands, .ai for tech, and .me for personal profiles. Avoid hyphens if possible.",
  "brand": "Personal branding starts with a consistent handle. Check availability on top 10 social networks before deciding.",
  "hi": "Hello! I'm Findme Assistant. Ask me about handles, branding, or SEO tips.",
  "hello": "Hello! I'm Findme Assistant. Ask me about handles, branding, or SEO tips.",
};

export async function identityChatAssistant(query: string): Promise<string> {
  const q = query.toLowerCase();
  
  for (const [key, val] of Object.entries(RESPONSES)) {
    if (q.includes(key)) return val;
  }
  
  return "That's a great question about identity. Generally, I recommend checking handle availability on GitHub, Instagram, and X first, as these are the most 'identity-critical' platforms today.";
}
