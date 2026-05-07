import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import AITools from './pages/AITools';
import LegalPage from './pages/LegalPage';
import Support from './pages/Support';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import BulkCheck from './pages/BulkCheck';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Home />
            </motion.div>
          } 
        />
        <Route 
          path="/blog" 
          element={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Blog />
            </motion.div>
          } 
        />
        <Route 
          path="/ai-tools" 
          element={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AITools />
            </motion.div>
          } 
        />
        <Route 
          path="/domain-checker" 
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Home />
            </motion.div>
          } 
        />
        <Route 
          path="/social-media" 
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Home />
            </motion.div>
          } 
        />
        <Route 
          path="/bulk" 
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <BulkCheck />
            </motion.div>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard />
            </motion.div>
          } 
        />
        <Route 
          path="/about" 
          element={
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <About />
            </motion.div>
          } 
        />
        <Route 
          path="/support" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Support />
            </motion.div>
          } 
        />
        <Route path="/privacy" element={<LegalPage type="privacy" />} />
        <Route path="/terms" element={<LegalPage type="terms" />} />
        <Route path="/cookies" element={<LegalPage type="cookies" />} />
        <Route path="/disclaimer" element={<LegalPage type="disclaimer" />} />
        <Route 
          path="/contact" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Support />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white max-w-full overflow-x-hidden">
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          
          <footer className="bg-slate-50 border-t border-slate-200 py-12 px-4 shadow-inner">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-lg">F</div>
                <span className="font-display font-bold text-xl">Findme</span>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                <a href="/privacy" className="text-sm font-medium text-slate-500 hover:text-brand-orange transition-colors">Privacy</a>
                <a href="/terms" className="text-sm font-medium text-slate-500 hover:text-brand-orange transition-colors">Terms</a>
                <a href="/dashboard" className="text-sm font-medium text-slate-500 hover:text-brand-orange transition-colors">Dashboard</a>
                <a href="/about" className="text-sm font-medium text-slate-500 hover:text-brand-orange transition-colors">About</a>
                <a href="/support" className="text-sm font-medium text-slate-500 hover:text-brand-orange transition-colors">Support</a>
              </div>
              <p className="text-sm text-slate-400 font-medium font-sans">
                © 2026 Findme. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </HelmetProvider>
  );
}
