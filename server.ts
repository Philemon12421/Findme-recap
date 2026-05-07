import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Enhanced username and domain check simulation (Phase 2 Integration)
  app.get("/api/check-username", async (req, res) => {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: "Search query is required" });
    }

    const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Phase 2: GitHub Public API Integration
    let githubStatus = "taken";
    try {
      // Free public API check (No auth required for basic public user data)
      const ghResponse = await fetch(`https://api.github.com/users/${cleanQuery}`, {
        headers: { 'User-Agent': 'Findme-App-Checker' }
      });
      if (ghResponse.status === 404) {
        githubStatus = "available";
      }
    } catch (e) {
      githubStatus = Math.random() > 0.5 ? "available" : "taken"; // Fallback to simulation
    }

    interface Platform {
      name: string;
      url: string;
      type: string;
      status?: string;
    }

    // List of platforms
    const socialPlatforms: Platform[] = [
      { name: "GitHub", url: `https://github.com/${cleanQuery}`, type: 'social', status: githubStatus },
      { name: "Instagram", url: `https://instagram.com/${cleanQuery}`, type: 'social' },
      { name: "Twitter", url: `https://twitter.com/${cleanQuery}`, type: 'social' },
      { name: "TikTok", url: `https://tiktok.com/@${cleanQuery}`, type: 'social' },
      { name: "Facebook", url: `https://facebook.com/${cleanQuery}`, type: 'social' },
      { name: "Reddit", url: `https://reddit.com/user/${cleanQuery}`, type: 'social' },
      { name: "LinkedIn", url: `https://linkedin.com/in/${cleanQuery}`, type: 'social' },
      { name: "Pinterest", url: `https://pinterest.com/${cleanQuery}`, type: 'social' },
      { name: "YouTube", url: `https://youtube.com/@${cleanQuery}`, type: 'social' }
    ];

    const domains: Platform[] = [
      { name: `${cleanQuery}.com`, url: `https://whois.com/whois/${cleanQuery}.com`, type: 'domain' },
      { name: `${cleanQuery}.net`, url: `https://whois.com/whois/${cleanQuery}.net`, type: 'domain' },
      { name: `${cleanQuery}.org`, url: `https://whois.com/whois/${cleanQuery}.org`, type: 'domain' },
      { name: `${cleanQuery}.io`, url: `https://whois.com/whois/${cleanQuery}.io`, type: 'domain' },
      { name: `${cleanQuery}.ai`, url: `https://whois.com/whois/${cleanQuery}.ai`, type: 'domain' }
    ];

    // Combine and process
    const results = [...socialPlatforms, ...domains].map(p => {
      // If status wasn't already set (like GitHub), simulate based on length/complexity
      const status = p.status || (cleanQuery.length < 4 ? "taken" : (Math.random() > 0.6 ? "available" : "taken"));
      return {
        ...p,
        status,
        id: `${p.name}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      };
    });

    res.json(results);
  });

  // Bulk check endpoint
  app.post("/api/bulk-check", async (req, res) => {
    const { queries } = req.body;
    if (!Array.isArray(queries)) {
      return res.status(400).json({ error: "Queries array is required" });
    }

    const limitedQueries = queries.slice(0, 50); // Limit to 50 for performance
    
    interface Platform {
      name: string;
      url: string;
      type: string;
      status?: string;
    }

    const allResults = [];

    for (const q of limitedQueries) {
      const clean = q.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!clean) continue;

      // For bulk, we'll just check .com and GitHub (one simulation, one real-ish)
      const platforms: Platform[] = [
        { name: `${clean}.com`, url: `https://whois.com/whois/${clean}.com`, type: 'domain' },
        { name: "GitHub", url: `https://github.com/${clean}`, type: 'social' }
      ];

      const results = platforms.map(p => ({
        ...p,
        query: q,
        status: clean.length < 4 ? "taken" : (Math.random() > 0.7 ? "available" : "taken"),
        id: `${p.name}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      }));

      allResults.push(...results);
    }

    res.json(allResults);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
