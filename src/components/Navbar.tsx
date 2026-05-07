import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'AI Tools', path: '/ai-tools' },
    { name: 'Bulk Check', path: '/bulk' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-4 pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className="max-w-4xl mx-auto glass rounded-full px-6 py-2 flex items-center justify-between pointer-events-auto"
      >
        <NavLink to="/" className="flex items-center gap-2 transform transition-transform hover:scale-105 active:scale-95">
          <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-lg glow-orange">
            F
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
            Findme
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, idx) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-all hover:bg-slate-100",
                    isActive ? "text-brand-orange" : "text-slate-600"
                  )
                }
              >
                {item.name}
              </NavLink>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink 
              to="/contact"
              className="hidden sm:flex items-center gap-2 bg-brand-orange text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-orange/90 transition-colors shadow-md"
            >
              Contact
            </NavLink>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-2 max-w-4xl mx-auto glass rounded-2xl p-4 flex flex-col gap-4 pointer-events-auto"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink 
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="bg-brand-orange text-white px-4 py-3 rounded-xl text-center font-semibold"
            >
              Contact
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
