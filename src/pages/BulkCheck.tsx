import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { Upload, FileText, Play, Download, Search, CheckCircle2, XCircle, Globe, Github, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface BulkResult {
  id: string;
  name: string;
  url: string;
  status: 'available' | 'taken';
  type: 'social' | 'domain';
  query: string;
}

export default function BulkCheck() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<BulkResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    const lines = input.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;

    setIsProcessing(true);
    setResults([]);

    try {
      const response = await fetch('/api/bulk-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queries: lines })
      });
      
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorMsg = await response.json();
          throw new Error(errorMsg.error || 'Bulk check failed');
        } else {
          const text = await response.text();
          throw new Error('Server error: ' + text.substring(0, 50));
        }
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error('Server returned invalid response format');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Bulk check failed:', error);
      alert(error instanceof Error ? error.message : 'Something went wrong during the bulk check.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split(/[\n,]/).map(l => l.trim()).filter(l => l.length > 0);
      setInput(lines.join('\n'));
    };
    reader.readAsText(file);
  };

  const downloadResults = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Query,Platform,Status,URL\n"
      + results.map(r => `${r.query},${r.name},${r.status},${r.url}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "findme_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto min-h-screen">
      <SEO 
        title="Bulk Verify - Check Multiple Handles" 
        description="Paste a list or upload a CSV to check up to 50 usernames and domains at once with Findme's bulk verify tool."
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bulk Verify</h1>
        <p className="text-slate-500 max-w-xl mx-auto font-medium">
          Check up to 50 usernames and domains at once by pasting a list or uploading a CSV file.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass rounded-[2rem] p-6 border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FileText size={20} className="text-brand-orange" /> Input List
              </h2>
              <label className="cursor-pointer text-xs font-bold text-slate-400 hover:text-brand-orange transition-colors flex items-center gap-1">
                <Upload size={14} /> Upload CSV
                <input type="file" accept=".csv,.txt" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter handles or domains (one per line)..."
              className="w-full h-64 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-orange/20 resize-none"
            />
            
            <button
              onClick={handleProcess}
              disabled={isProcessing || !input.trim()}
              className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-orange/90 transition-all disabled:opacity-50"
            >
              {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <Play size={20} />}
              {isProcessing ? 'Processing...' : 'Run Bulk Check'}
            </button>
          </div>
        </div>

        {/* Results Side */}
        <div className="lg:col-span-7">
          <div className="glass rounded-[2rem] p-6 border border-slate-100 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Results ({results.length})</h2>
              {results.length > 0 && (
                <button 
                  onClick={downloadResults}
                  className="text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-black transition-colors"
                >
                  <Download size={14} /> Export CSV
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {results.length > 0 ? (
                  results.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                          {r.type === 'domain' ? <Globe size={16} /> : <Github size={16} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{r.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{r.query}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {r.status === 'available' ? (
                          <div className="text-green-500 font-bold text-xs flex items-center gap-1">
                            <CheckCircle2 size={16} /> Available
                          </div>
                        ) : (
                          <div className="text-red-400 font-bold text-xs flex items-center gap-1">
                            <XCircle size={16} /> Taken
                          </div>
                        )}
                        <a href={r.url} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-brand-orange transition-colors">
                          <Search size={16} />
                        </a>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-300 italic text-sm py-20">
                    <Search size={48} className="mb-4 opacity-20" />
                    Waiting for input to process...
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
