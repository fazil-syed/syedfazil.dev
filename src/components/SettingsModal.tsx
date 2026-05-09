import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoonIcon from '../icons/MoonIcon';
import type { PortfolioData } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  lang: string;
  setLang: (lang: string) => void;
}

export default function SettingsModal({ isOpen, onClose, data, lang, setLang }: SettingsModalProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, [isOpen]);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'kn', label: 'Kannada' },
    { code: 'hi', label: 'Hindi' },
    { code: 'bn', label: 'Bengali' },
    { code: 'ta', label: 'Tamil' },
    { code: 'te', label: 'Telugu' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <div className="relative max-w-sm w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-bg-sidebar border border-border-subtle rounded-[2rem] p-8 shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Appearance Section */}
              <div className="space-y-6">
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-text-muted">
                  APPEARANCE
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-text-primary">
                      <MoonIcon size={20} />
                    </div>
                    <span className="text-base font-bold text-text-primary">Dark Mode</span>
                  </div>
                  
                  <button 
                    onClick={toggleTheme}
                    className={`w-12 h-6 rounded-full transition-colors relative ${isDark ? 'bg-green-500' : 'bg-border-subtle'}`}
                  >
                    <motion.span 
                      animate={{ x: isDark ? 26 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className="h-px bg-border-subtle my-8" />

              {/* Language Section */}
              <div className="space-y-6">
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-text-muted">
                  LANGUAGE
                </p>
                
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {languages.map((l) => {
                    const isSupported = ['en', 'kn', 'hi'].includes(l.code);
                    return (
                      <button
                        key={l.code}
                        disabled={!isSupported}
                        onClick={() => {
                          if (isSupported) {
                            setLang(l.code);
                            window.history.pushState({}, '', `/${l.code}`);
                          }
                        }}
                        className={`text-left px-4 py-2.5 rounded-xl transition-all duration-200 ${
                          lang === l.code 
                            ? 'bg-text-primary text-bg-base font-bold' 
                            : isSupported 
                              ? 'text-text-muted hover:text-text-primary'
                              : 'text-text-muted/30 cursor-not-allowed'
                        }`}
                      >
                        <span className="text-sm font-medium tracking-tight">{l.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Close Button Below */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={onClose}
              className="absolute -bottom-20 left-0 w-12 h-12 bg-bg-sidebar border border-border-subtle rounded-2xl flex items-center justify-center text-text-primary shadow-xl hover:bg-bg-base transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
