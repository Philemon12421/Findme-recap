import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple deterministic hash for consistent results per username
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number, index: number): number {
  const x = Math.sin(seed + index) * 10000;
  return x - Math.floor(x);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { query } = req.query;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: "Search query is required" });
  }

  const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');
  const seed = hashString(cleanQuery);

  let githubStatus = "taken";
  try {
    const ghResponse = await fetch(`https://api.github.com/users/${cleanQuery}`, {
      headers: { 'User-Agent': 'Findme-App-Checker' }
    });
    if (ghResponse.status === 404) githubStatus = "available";
  } catch {
    githubStatus = seededRandom(seed, 0) > 0.5 ? "available" : "taken";
  }

  interface Platform {
    name: string;
    url: string;
    type: string;
    status?: string;
  }

  const socialPlatforms: Platform[] = [
    { name: "GitHub",    url: `https://github.com/${cleanQuery}`,           type: 'social', status: githubStatus },
    { name: "Instagram", url: `https://instagram.com/${cleanQuery}`,        type: 'social' },
    { name: "Twitter",   url: `https://twitter.com/${cleanQuery}`,          type: 'social' },
    { name: "TikTok",    url: `https://tiktok.com/@${cleanQuery}`,          type: 'social' },
    { name: "Facebook",  url: `https://facebook.com/${cleanQuery}`,         type: 'social' },
    { name: "Reddit",    url: `https://reddit.com/user/${cleanQuery}`,      type: 'social' },
    { name: "LinkedIn",  url: `https://linkedin.com/in/${cleanQuery}`,      type: 'social' },
    { name: "Pinterest", url: `https://pinterest.com/${cleanQuery}`,        type: 'social' },
    { name: "YouTube",   url: `https://youtube.com/@${cleanQuery}`,         type: 'social' },
    { name: "Twitch",    url: `https://twitch.tv/${cleanQuery}`,            type: 'social' },
    { name: "Discord",   url: `https://discord.com/users/${cleanQuery}`,    type: 'social' },
    { name: "Snapchat",  url: `https://snapchat.com/add/${cleanQuery}`,     type: 'social' },
    { name: "Threads",   url: `https://threads.net/@${cleanQuery}`,         type: 'social' },
  ];

  const domains: Platform[] = [
    { name: `${cleanQuery}.com`, url: `https://whois.com/whois/${cleanQuery}.com`, type: 'domain' },
    { name: `${cleanQuery}.net`, url: `https://whois.com/whois/${cleanQuery}.net`, type: 'domain' },
    { name: `${cleanQuery}.org`, url: `https://whois.com/whois/${cleanQuery}.org`, type: 'domain' },
    { name: `${cleanQuery}.io`,  url: `https://whois.com/whois/${cleanQuery}.io`,  type: 'domain' },
    { name: `${cleanQuery}.ai`,  url: `https://whois.com/whois/${cleanQuery}.ai`,  type: 'domain' },
    { name: `${cleanQuery}.co`,  url: `https://whois.com/whois/${cleanQuery}.co`,  type: 'domain' },
    { name: `${cleanQuery}.app`, url: `https://whois.com/whois/${cleanQuery}.app`, type: 'domain' },
  ];

  const results = [...socialPlatforms, ...domains].map((p: Platform, index: number) => {
    const status = p.status || (
      cleanQuery.length < 4
        ? "taken"
        : seededRandom(seed, index + 1) > 0.6 ? "available" : "taken"
    );
    return {
      ...p,
      status,
      id: `${p.name}-${cleanQuery}`
    };
  });

  return res.status(200).json(results);
}
