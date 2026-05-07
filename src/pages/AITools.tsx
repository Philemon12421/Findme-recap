import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Type, MessageCircle, PenTool, Loader2 } from 'lucide-react';
import { generateAIVariants, generateLogoConcept, identityChatAssistant } from '../services/aiTools';
import { cn } from '../lib/utils';

export default function AITools() {
  const [name, setName] = useState('');
  const [variants, setVariants] = useState<string[]>([]);
  const [logoConcept, setLogoConcept] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatQuery, setChatQuery] = useState('');
  const [chatAnswer, setChatAnswer] = useState('');

  const handleGenerate = async () => {
    if (!name.trim()) return;
    setIsLoading(true);
    try {
      const [v, l] = await Promise.all([
        generateAIVariants(name),
        generateLogoConcept(name)
      ]);
      setVariants(v);
      setLogoConcept(l || '');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatQuery.trim()) return;
    setIsLoading(true);
    try {
      const res = await identityChatAssistant(chatQuery);
      setChatAnswer(res || '');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Identity Intelligence Tools</h1>
        <p className="text-slate-500 max-w-xl mx-auto font-medium">Smart identity tools and naming generators powered by our local brand-logic engine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Username & Logo Gen */}
        <div className="space-y-8">
          <div className="glass rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Type className="text-brand-orange" /> Username & Branding
            </h2>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name or keyword..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
              />
              <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className="bg-brand-orange text-white px-6 py-2 rounded-xl font-semibold hover:bg-brand-orange/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Generate
              </button>
            </div>

            {variants.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">AI Suggestions</h3>
                <div className="flex flex-wrap gap-2">
                  {variants.map(v => (
                    <span key={v} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">@{v}</span>
                  ))}
                </div>
              </div>
            )}

            {logoConcept && (
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <PenTool size={16} /> Logo Concept
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed italic">{logoConcept}</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Chat Assistant */}
        <div className="glass rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="text-brand-orange" /> Identity Assistant
          </h2>
          <div className="flex-1 bg-slate-50/50 rounded-2xl p-4 mb-4 min-h-[300px] overflow-y-auto">
            {chatAnswer ? (
              <div className="prose prose-sm font-medium text-slate-700">
                {chatAnswer}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 italic text-sm text-center px-10">
                "How can I help you optimize your personal brand today?"
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              placeholder="Ask anything about usernames, SEO, or branding..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            />
            <button 
              onClick={handleChat}
              disabled={isLoading}
              className="bg-slate-900 text-white p-3 rounded-xl hover:bg-black transition-colors disabled:opacity-50"
            >
              <Sparkles size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
