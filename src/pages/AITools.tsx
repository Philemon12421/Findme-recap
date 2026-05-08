import { useState, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Type, MessageCircle, PenTool, Loader2, Copy, Check, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';
import { generateAIVariants, generateLogoConcept, identityChatAssistant } from '../services/aiTools';
import { cn } from '../lib/utils';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export default function AITools() {
  const [name, setName]               = useState('');
  const [variants, setVariants]       = useState<string[]>([]);
  const [logoConcept, setLogoConcept] = useState<string>('');
  const [isLoading, setIsLoading]     = useState(false);
  const [chatQuery, setChatQuery]     = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [copiedVariant, setCopiedVariant] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!name.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const [v, l] = await Promise.all([
        generateAIVariants(name),
        generateLogoConcept(name),
      ]);
      setVariants(v);
      setLogoConcept(l || '');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatQuery.trim() || isLoading) return;
    const userMsg = chatQuery.trim();
    setChatQuery('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const res = await identityChatAssistant(userMsg);
      setChatHistory(prev => [...prev, { role: 'assistant', text: res || '' }]);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    } finally {
      setIsLoading(false);
    }
  };

  const copyVariant = async (v: string) => {
    await navigator.clipboard.writeText('@' + v);
    setCopiedVariant(v);
    setTimeout(() => setCopiedVariant(null), 1500);
  };

  const handleNameKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleGenerate();
  };

  const handleChatKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleChat();
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto min-h-screen">
      <SEO
        title="AI Identity Intelligence Tools"
        description="Optimize your personal brand with Findme's AI naming generator, logo concepts, and identity chat assistant."
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Identity Intelligence Tools</h1>
        <p className="text-slate-500 max-w-xl mx-auto font-medium">
          Smart identity tools and naming generators powered by our brand-logic engine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Username & Logo Generator */}
        <div className="space-y-8">
          <div className="glass rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Type className="text-brand-orange" /> Username & Branding
            </h2>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={handleNameKey}
                placeholder="Enter your name or keyword..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading || !name.trim()}
                className="bg-brand-orange text-white px-6 py-2 rounded-xl font-semibold hover:bg-brand-orange/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Generate
              </button>
            </div>

            <AnimatePresence>
              {variants.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">
                    AI Suggestions — click to copy
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {variants.map(v => (
                      <button
                        key={v}
                        onClick={() => copyVariant(v)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5",
                          copiedVariant === v
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-slate-100 text-slate-700 hover:bg-brand-orange/10 hover:text-brand-orange border border-transparent"
                        )}
                      >
                        @{v}
                        {copiedVariant === v
                          ? <Check size={12} />
                          : <Copy size={12} className="opacity-40" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {logoConcept && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-8 border-t border-slate-100"
                >
                  <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <PenTool size={16} /> Logo Concept
                  </h3>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    {/* Color swatch row */}
                    <div className="flex gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-[#FF6321] border-2 border-white shadow" title="Brand Orange" />
                      <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-white shadow" title="Slate 900" />
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-200 shadow" title="White" />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{logoConcept}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* AI Chat Assistant */}
        <div className="glass rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="text-brand-orange" /> Identity Assistant
            </h2>
            {chatHistory.length > 0 && (
              <button
                onClick={() => setChatHistory([])}
                className="text-slate-400 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                title="Clear chat"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>

          <div className="flex-1 bg-slate-50/50 rounded-2xl p-4 mb-4 min-h-[300px] max-h-[400px] overflow-y-auto space-y-3">
            {chatHistory.length > 0 ? (
              <>
                {chatHistory.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex",
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn(
                      "max-w-[85%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed",
                      msg.role === 'user'
                        ? "bg-slate-900 text-white rounded-br-sm"
                        : "bg-white border border-slate-100 text-slate-700 rounded-bl-sm shadow-sm"
                    )}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                      <Loader2 size={16} className="animate-spin text-slate-400" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </>
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
              onChange={e => setChatQuery(e.target.value)}
              onKeyDown={handleChatKey}
              placeholder="Ask about usernames, SEO, branding..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            />
            <button
              onClick={handleChat}
              disabled={isLoading || !chatQuery.trim()}
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
