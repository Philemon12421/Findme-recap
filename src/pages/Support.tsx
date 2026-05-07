import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { Mail, MessageCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function Support() {
  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
      <SEO 
        title="Support Center - Findme" 
        description="Need help with your digital identity? Reach out to Findme's support team via email or WhatsApp for immediate assistance."
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Support Center</h1>
        <p className="text-slate-500">Need help with your digital identity? We're here for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="glass rounded-3xl p-8 border border-slate-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6">
            <Mail size={32} />
          </div>
          <h2 className="text-xl font-bold mb-2">Email Support</h2>
          <p className="text-slate-500 text-sm mb-6 font-medium">Reach out for enterprise inquiries or technical issues.</p>
          <a href="mailto:drenchstudio1@gmail.com" className="text-brand-orange font-bold flex items-center gap-2">
            drenchstudio1@gmail.com <ArrowRight size={16} />
          </a>
        </div>

        <div className="glass rounded-3xl p-8 border border-slate-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
            <MessageCircle size={32} />
          </div>
          <h2 className="text-xl font-bold mb-2">Live Chat</h2>
          <p className="text-slate-500 text-sm mb-6 font-medium">Chat with us on WhatsApp for immediate support.</p>
          <a 
            href="https://wa.me/233592063645" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 font-bold flex items-center gap-2"
          >
            Open WhatsApp <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className="glass rounded-3xl p-8 border border-slate-100">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <HelpCircle className="text-brand-orange" /> Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "How accurate are the results?", a: "We hit live public endpoints and simulate some hobby platforms to provide over 99% accuracy across 1000+ sources." },
            { q: "Is Findme free to use?", a: "Yes, our basic username checker is free. We offer premium AI tools and bulk checks for advanced users." },
            { q: "Can I save my results?", a: "Currently, you can copy results to clipboard. Account-based saving is coming soon." }
          ].map((faq, i) => (
            <div key={i} className="border-b border-slate-100 pb-6 last:border-0">
              <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-slate-500 text-sm font-medium">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
