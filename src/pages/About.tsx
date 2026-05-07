import { motion } from 'motion/react';
import { Target, Users, Zap, ShieldCheck, Globe, Search } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-20">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-20 h-20 bg-brand-orange rounded-3xl flex items-center justify-center text-white font-bold text-4xl mx-auto mb-8 shadow-2xl rotate-3"
        >
          F
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Our Mission at Findme</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Findme was crafted by <span className="text-brand-orange">Drenchack Tech Company</span>. We're building the world's most advanced digital identity scanner, led by our founder <span className="font-bold text-slate-900">Philemon Osei kusi</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Why Identity Matters</h2>
          <p className="text-slate-600 leading-relaxed font-medium">
            In 2026, your online username is your decentralized ID. It's how people find you, trust you, and connect with your work. As more platforms emerge—from social niche groups to web3 protocols—keeping a consistent handle is difficult.
          </p>
          <p className="text-slate-600 leading-relaxed font-medium">
            Findme was founded to solve this "handle fragmentation." By using live API connectors and AI matching, we provide a 360-degree view of your digital presence.
          </p>
        </div>
        <div className="glass rounded-[3rem] p-10 border border-slate-100 grid grid-cols-2 gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-orange/5 opacity-50"></div>
          {[
            { label: 'Platforms', value: '1000+', icon: <Globe className="text-brand-orange" /> },
            { label: 'Scan Speed', value: '< 2s', icon: <Zap className="text-brand-orange" /> },
            { label: 'Accuracy', value: '99.9%', icon: <ShieldCheck className="text-brand-orange" /> },
            { label: 'Active Users', value: '50k+', icon: <Users className="text-brand-orange" /> },
          ].map((stat, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center justify-center text-center">
              <div className="mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-12 mb-24">
        <h2 className="text-3xl font-bold text-center">Our Core Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Transparency First",
              desc: "We hitting live endpoints directly. No cached data from months ago. You see what the platform sees.",
              icon: <Search className="text-blue-500" />
            },
            {
              title: "Privacy Focused",
              desc: "We don't store your sensitive digital fingerprints. Scans are handled in isolated environments.",
              icon: <Target className="text-purple-500" />
            },
            {
              title: "AI Driven",
              desc: "Our matching engine goes beyond exact strings to find related handles and visual matches.",
              icon: <Zap className="text-orange-500" />
            }
          ].map((pillar, i) => (
            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all">
              <div className="p-3 bg-white w-fit rounded-2xl shadow-sm mb-6">{pillar.icon}</div>
              <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
