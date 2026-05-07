import { useState } from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Calendar, User, ArrowRight } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    title: "How to Secure Your Digital Identity in 2026",
    excerpt: "Learn the latest strategies for protecting your personal brand across a fragmented social landscape.",
    author: "Findme Team",
    date: "May 5, 2026",
    content: `
# How to Secure Your Digital Identity in 2026

Digital identity has become more valuable than ever. With the rise of AI-powered search and the expansion of the "Social Graph", securing your username early is no longer just a luxury—it's a necessity.

## Why Speed Matters
Every second, thousands of new accounts are created. If you are a builder, creator, or professional, losing your handle on a major platform like TikTok or Instagram can cost you thousands in future brand value.

## Steps to Take Now
1. **Bulk Check**: Use our Findme engine to scan 1000+ sources.
2. **Standardize**: Try to keep your handle identical across platforms.
3. **Register Domains**: Don't forget the .com, .ai, and .me variants.
    `
  },
  {
    id: 2,
    title: "AI Identity: The Future of Personal Branding",
    excerpt: "Discover how AI is changing how we perceive online availability and identity matching.",
    author: "Branding Expert",
    date: "May 2, 2026",
    content: "Content about AI identity..."
  }
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof mockPosts[0] | null>(null);

  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
      {!selectedPost ? (
        <>
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Identity Blog</h1>
            <p className="text-slate-500">Expert insights on personal branding, digital security, and AI identity tools.</p>
          </div>

          <div className="space-y-8">
            {mockPosts.map((post) => (
              <motion.article 
                key={post.id}
                whileHover={{ x: 10 }}
                className="group cursor-pointer p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-4 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-brand-orange transition-colors">{post.title}</h2>
                <p className="text-slate-500 mb-4 leading-relaxed font-medium">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-brand-orange font-bold text-sm">
                  Read More <ArrowRight size={16} />
                </div>
              </motion.article>
            ))}
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button 
            onClick={() => setSelectedPost(null)}
            className="mb-8 text-slate-400 font-bold hover:text-slate-900 flex items-center gap-2"
          >
            ← Back to Blog
          </button>
          <article className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-brand-orange font-medium">
            <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
          </article>
        </motion.div>
      )}
    </div>
  );
}
