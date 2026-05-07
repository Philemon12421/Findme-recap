import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { Trash2, Globe, Github, Instagram, Twitter, Music, Facebook, MessageSquare, Linkedin, Youtube, Zap, ExternalLink, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface SavedResult {
  id: string;
  name: string;
  url: string;
  status: 'available' | 'taken';
  type: 'social' | 'domain';
}

const platformIcons: Record<string, React.ReactNode> = {
  GitHub: <Github size={20} />,
  Instagram: <Instagram size={20} />,
  Twitter: <Twitter size={20} />,
  TikTok: <Music size={20} />,
  Facebook: <Facebook size={20} />,
  Reddit: <MessageSquare size={20} />,
  LinkedIn: <Linkedin size={20} />,
  YouTube: <Youtube size={20} />,
  Twitch: <Zap size={20} />,
  Discord: <MessageSquare size={20} />,
};

export default function Dashboard() {
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('findme_saved_results');
    if (saved) {
      setSavedResults(JSON.parse(saved));
    }
  }, []);

  const removeSaved = (id: string) => {
    const newResults = savedResults.filter(r => r.id !== id);
    setSavedResults(newResults);
    localStorage.setItem('findme_saved_results', JSON.stringify(newResults));
    localStorage.setItem('findme_saved_ids', JSON.stringify(newResults.map(r => r.id)));
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto min-h-screen">
      <SEO 
        title="Dashboard - Saved Identitites" 
        description="Manage your saved usernames and domain availability results on your Findme dashboard."
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-slate-500 font-medium tracking-tight">Your saved usernames and domain availability results.</p>
        </div>
        <div className="bg-brand-orange/10 px-4 py-2 rounded-xl border border-brand-orange/20 flex items-center gap-2 text-brand-orange font-bold text-sm">
          <Zap size={18} fill="currentColor" /> {savedResults.length} Items Saved
        </div>
      </div>

      {savedResults.length === 0 ? (
        <div className="text-center py-32 glass rounded-[3rem] border border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
            <Zap size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No saved results yet</h3>
          <p className="text-slate-400 font-medium mb-8">Start searching and use the lightning bolt icon to save results here.</p>
          <a href="/" className="inline-flex bg-brand-orange text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all">
            Go to Search
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {savedResults.map((result) => (
              <motion.div
                key={result.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative p-6 rounded-3xl border border-slate-100 bg-white hover:shadow-xl transition-all duration-300"
              >
                <button 
                  onClick={() => removeSaved(result.id)}
                  className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    {result.type === 'domain' ? <Globe size={24} /> : (platformIcons[result.name] || <Globe size={24} />)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 truncate max-w-[150px]">{result.name}</h3>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{result.type}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    {result.status === 'available' ? (
                      <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">
                        <CheckCircle2 size={14} /> Available
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded-lg">
                        <XCircle size={14} /> Taken
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => window.open(result.url, '_blank')}
                    className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-orange transition-colors"
                  >
                    View <ExternalLink size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
