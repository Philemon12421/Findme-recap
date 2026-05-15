import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SearchBar from '../components/SearchBar';
import SEO from '../components/SEO';
import {
  CheckCircle2, XCircle, ExternalLink, ShieldCheck, Zap, Globe,
  Github, Instagram, Twitter, Facebook, Linkedin, Youtube,
  Music, MessageSquare, Sparkles, Twitch, Camera, Upload,
  ScanFace, ArrowRight, Star
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
  const [dragOver, setDragOver]             = useState(false);
  const [uploadedImage, setUploadedImage]   = useState<string | null>(null);
  const fileInputRef                        = useRef<HTMLInputElement>(null);

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

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen max-w-full overflow-x-hidden">
      <SEO
        title="Findme - Check Any Identity Anywhere"
        description="Search usernames and domain availability across 1000+ platforms in seconds with Findme."
      />

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto text-center mb-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold mb-6 border border-slate-200"
          >
            <Star size={12} className="text-brand-orange fill-brand-orange" />
            Trusted by 50,000+ users worldwide
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent px-2 leading-[1.1]">
            Findme – Check Any <br className="hidden md:block" />
            <span className="text-brand-orange">Identity</span> Anywhere
          </h1>
          <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium px-2">
            Search usernames and domain availability across 1000+ platforms in seconds.
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-slate-400 font-medium"
          >
            {[['1000+', 'Platforms'], ['<2s', 'Avg. response'], ['Free', 'No sign-up needed']].map(([val, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="font-bold text-slate-700">{val}</span>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Results ── */}
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
                className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100"
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
                {(['all', 'social', 'domain'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all flex items-center gap-1.5",
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

      {/* ── Features Grid ── */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10 px-4">
        {[
          {
            title: "Identity Protection",
            desc: "Prevent identity theft by securing your username across all major platforms instantly.",
            icon: <ShieldCheck className="text-blue-500" size={28} />,
            accent: "bg-blue-50",
          },
          {
            title: "Real-time Verification",
            desc: "Live API connectors ensure accurate availability checks with zero cached results.",
            icon: <Zap className="text-brand-orange" size={28} />,
            accent: "bg-orange-50",
          },
          {
            title: "Global Coverage",
            desc: "Our engine scans over 1000+ social media, hobby, and professional networks globally.",
            icon: <Globe className="text-emerald-500" size={28} />,
            accent: "bg-emerald-50",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="p-7 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-5", f.accent)}>
              {f.icon}
            </div>
            <h3 className="text-lg font-bold mb-2 text-slate-900">{f.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ── AI Visual Scan CTA ── */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white shadow-xl shadow-slate-100"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-orange/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-0">

            {/* ── Left: Copy ── */}
            <div className="flex-1 p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest mb-6 w-fit">
                <Sparkles size={12} /> New Feature
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-slate-900 mb-4">
                AI Identity <br className="hidden sm:block" />Visual Scan
              </h2>

              <p className="text-slate-500 font-medium leading-relaxed text-sm sm:text-base mb-4 max-w-md">
                Upload a profile photo to detect your digital presence across the web. Our AI matching layer simulates facial recognition to find orphaned accounts you might have forgotten.
              </p>

              {/* Feature bullets */}
              <ul className="space-y-2.5 mb-8">
                {[
                  'Scan 500+ platforms with one photo',
                  'Find forgotten or impersonated accounts',
                  'Privacy-first — images never stored',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                    <CheckCircle2 size={16} className="text-brand-orange mt-0.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="group inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-black transition-all">
                  <ScanFace size={16} />
                  Try Visual Scan
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all">
                  Learn More
                </button>
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="hidden lg:block w-px bg-slate-100 my-10" />
            <div className="block lg:hidden h-px bg-slate-100 mx-8 sm:mx-10" />

            {/* ── Right: Upload area ── */}
            <div className="flex-1 p-8 sm:p-10 lg:p-14 flex items-center justify-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
              />

              <motion.div
                whileHover={{ scale: 1.01 }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                className={cn(
                  "w-full max-w-xs sm:max-w-sm aspect-square rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-300 relative overflow-hidden",
                  dragOver
                    ? "border-brand-orange bg-brand-orange/5 scale-[1.02]"
                    : uploadedImage
                    ? "border-green-300 bg-green-50/30"
                    : "border-slate-200 bg-slate-50/50 hover:border-brand-orange/50 hover:bg-brand-orange/3"
                )}
              >
                {uploadedImage ? (
                  <>
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover rounded-2xl absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-black/30 rounded-2xl flex flex-col items-center justify-center gap-2">
                      <ScanFace size={36} className="text-white" />
                      <p className="text-white text-sm font-bold">Click to change photo</p>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={dragOver ? { scale: 1.15 } : { scale: 1 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-slate-300 mb-4"
                    >
                      <Upload size={32} className={dragOver ? "text-brand-orange" : "text-slate-300"} />
                    </motion.div>
                    <p className="text-slate-500 font-bold text-center text-sm leading-relaxed">
                      {dragOver ? (
                        <span className="text-brand-orange">Drop your photo here</span>
                      ) : (
                        <>Drag & drop photo<br />or <span className="text-brand-orange underline underline-offset-2">click to upload</span></>
                      )}
                    </p>
                    <p className="text-slate-300 text-xs mt-2 font-medium">JPG, PNG or WEBP · Max 5MB</p>
                  </>
                )}

                {/* Corner badge */}
                <div className="absolute bottom-3 right-3 bg-brand-orange text-white p-2 rounded-xl shadow-md">
                  <Sparkles size={14} />
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </section>
    </div>
  );
}
