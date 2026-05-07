import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { queries } = req.body;
  if (!Array.isArray(queries)) {
    return res.status(400).json({ error: "Queries array is required" });
  }

  const limitedQueries = queries.slice(0, 50);
  const allResults = [];

  interface Platform {
    name: string;
    url: string;
    type: string;
  }

  for (const q of limitedQueries) {
    const clean = q.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!clean) continue;

    const platforms: Platform[] = [
      { name: `${clean}.com`, url: `https://whois.com/whois/${clean}.com`, type: 'domain' },
      { name: "GitHub", url: `https://github.com/${clean}`, type: 'social' }
    ];

    const results = platforms.map((p: Platform) => ({
      ...p,
      query: q,
      status: clean.length < 4 ? "taken" : (Math.random() > 0.7 ? "available" : "taken"),
      id: `${p.name}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    }));

    allResults.push(...results);
  }

  return res.status(200).json(allResults);
}
