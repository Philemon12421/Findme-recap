import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SearchBar from '../components/SearchBar';
import SEO from '../components/SEO';
import {
  CheckCircle2, XCircle, ExternalLink, ShieldCheck, Zap, Globe,
  Github, Instagram, Twitter, Facebook, Linkedin, Youtube,
  Music, MessageSquare, Sparkles, Twitch, Camera
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Result {
  id: string;
  name: string;
  url: string;
  status: 'available' | 'taken' | 'checking';
  type: 'social' | 'domain';
}

const platformIcons: Record<string, React.ReactNode> = {
  GitHub:    <Github size={20} />,
  Instagram: <Instagram size={20} />,
  Twitter:   <Twitter size={20} />,
  TikTok:    <Music size={20} />,
  Facebook:  <Facebook size={20} />,
  Reddit:    <MessageSquare size={20} />,
  LinkedIn:  <Linkedin size={20} />,
  YouTube:   <Youtube size={20} />,
  Twitch:    <Twitch size={20} />,
  Discord:   <MessageSquare size={20} />,
  Snapchat:  <Camera size={20} />,
  Threads:   <MessageSquare size={20} />,
  Pinterest: <Globe size={20} />,
  Domain:    <Globe size={20} />,
};

export default function Home() {
  const [results, setResults]               = useState<Result[]>([]);
  const [isLoading, setIsLoading]           = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [error, setError]                   = useState<string | null>(null);
  const [activeTab, setActiveTab]           = useState<'all' | 'social' | 'domain'>('all');
  const [savedIds, setSavedIds]             = useState<string[]>([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchTriggered(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch('/api/check-username?query=' + encodeURIComponent(query));

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch results');
        }
        throw new Error('Server returned an error');
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error('Server returned an invalid response format');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Search failed:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSave = (result: Result) => {
    setSavedIds(prev =>
      prev.includes(result.id)
        ? prev.filter(id => id !== result.id)
        : [...prev, result.id]
    );
  };

  const filteredResults = results.filter(r =>
    activeTab === 'all' ? true : r.type === activeTab
  );

  const countFor = (tab: 'all' | 'social' | 'domain') =>
    tab === 'all' ? results.length : results.filter(r => r.type === tab).length;

  const availableCount = results.filter(r => r.status === 'available').length;
  const takenCount     = results.filter(r => r.status === 'taken').length;

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen max-w-full overflow-x-hidden">
      <SEO
        title="Findme - Check Any Identity Anywhere"
        description="Search usernames and domain availability across 1000+ platforms in seconds with Findme."
      />

      {/* Hero */}
      <section className="max-w-5xl mx-auto text-center mb-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent px-2">
            Findme – Check Any <br className="hidden md:block" />
            <span className="text-brand-orange">Identity</span> Anywhere
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium">
            Search usernames and domain availability across 1000+ platforms in seconds.
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </motion.div>
      </section>

      {/* Results */}
      <AnimatePresence>
        {searchTriggered && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto mb-20 px-4"
          >
            {/* Summary bar */}
            {!isLoading && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-6 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <span className="text-sm font-semibold text-slate-500">
                  {results.length} platforms checked
                </span>
                <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                  <CheckCircle2 size={16} /> {availableCount} available
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-red-400">
                  <XCircle size={16} /> {takenCount} taken
                </div>
              </motion.div>
            )}

            {/* Tab bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
                {(['all', 'social', 'domain'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all flex items-center gap-1.5",
                      activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {tab}
                    {results.length > 0 && (
                      <span className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full",
                        activeTab === tab ? "bg-slate-100 text-slate-600" : "bg-slate-200 text-slate-500"
                      )}>
                        {countFor(tab)}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <div className="w-2 h-2 rounded-full bg-green-500" /> Available
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <div className="w-2 h-2 rounded-full bg-red-400" /> Taken
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredResults.length > 0 ? (
                filteredResults.map((result, idx) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    className={cn(
                      "group relative p-4 rounded-2xl border bg-white transition-all duration-300 hover:shadow-lg",
                      result.status === 'available'
                        ? "border-green-100 hover:border-green-300 hover:bg-green-50/30"
                        : "border-slate-100 opacity-75 hover:opacity-90"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 transition-colors group-hover:bg-brand-orange group-hover:text-white">
                        {result.type === 'domain'
                          ? <Globe size={20} />
                          : (platformIcons[result.name] || <Globe size={20} />)}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSave(result)}
                          className={cn(
                            "p-1.5 rounded-lg border transition-colors",
                            savedIds.includes(result.id)
                              ? "bg-brand-orange/10 border-brand-orange text-brand-orange"
                              : "border-slate-100 text-slate-300 hover:text-slate-400"
                          )}
                          title={savedIds.includes(result.id) ? "Unsave" : "Save"}
                        >
                          <Zap size={16} fill={savedIds.includes(result.id) ? "currentColor" : "none"} />
                        </button>
                        {result.status === 'available'
                          ? <CheckCircle2 className="text-green-500" size={20} />
                          : <XCircle className="text-red-400" size={20} />}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 truncate pr-4">{result.name}</h3>
                      <button
                        onClick={() => window.open(result.url, '_blank')}
                        className="text-xs font-medium text-slate-400 flex items-center gap-1 hover:text-brand-orange transition-colors mt-1"
                      >
                        {result.type === 'domain' ? 'Check WHOIS' : 'View Profile'} <ExternalLink size={12} />
                      </button>
                    </div>

                    {result.status === 'available' && (
                      <button
                        onClick={() => window.open(result.url, '_blank')}
                        className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg text-xs font-semibold hover:bg-black transition-colors"
                      >
                        Claim Now
                      </button>
                    )}
                  </motion.div>
                ))
              ) : isLoading ? (
                Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="h-36 bg-slate-50 rounded-2xl animate-pulse border border-slate-100" />
                ))
              ) : error ? (
                <div className="col-span-full py-20 text-center text-red-500 font-medium">{error}</div>
              ) : (
                <div className="col-span-full py-20 text-center text-slate-400 font-medium">
                  {results.length > 0
                    ? `No ${activeTab === 'all' ? '' : activeTab + ' '}results to show.`
                    : "Search a username above to check availability."}
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
        {[
          { title: "Identity Protection", desc: "Prevent identity theft by securing your username across all major platforms instantly.", icon: <ShieldCheck className="text-blue-500" size={32} /> },
          { title: "Real-time Verification", desc: "Live API connectors ensure accurate availability checks with zero cached results.", icon: <Zap className="text-brand-orange" size={32} /> },
          { title: "Global Coverage", desc: "Our engine scans over 1000+ social media, hobby, and professional networks globally.", icon: <Globe className="text-emerald-500" size={32} /> },
        ].map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
          >
            <div className="mb-6">{f.icon}</div>
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* AI Visual Scan CTA */}
      <section className="max-w-6xl mx-auto py-20 px-4">
        <div className="glass rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="flex-1 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> New Feature
            </div>
            <h2 className="text-4xl font-bold leading-tight">AI Identity Visual Scan</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Upload a profile photo to detect your digital presence across the web. Our AI matching layer simulates facial recognition to find orphaned accounts you might have forgotten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                Try Visual Scan
              </button>
              <button className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="w-full aspect-square max-w-[400px] mx-auto rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 bg-slate-50 relative group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center text-slate-300 mb-4 group-hover:scale-110 transition-transform">
                <Globe size={40} />
              </div>
              <p className="text-slate-400 font-bold text-center">Drag & drop photo<br />or click to upload</p>
              <div className="absolute bottom-4 right-4 bg-brand-orange text-white p-2 rounded-lg shadow-lg">
                <Sparkles size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
