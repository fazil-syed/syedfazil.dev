import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import HomeSection from './sections/HomeSection';
import SettingsModal from './SettingsModal';
import type { PortfolioData } from '../types';
import { Section } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

export default function Portfolio({ allData, initialLang }: { allData: Record<string, PortfolioData>; initialLang: string }) {
  const [lang, setLang] = useState(initialLang);
  const data = allData[lang];
  const [currentSection, setCurrentSection] = useState<Section>(Section.Home);
  const [showSettings, setShowSettings] = useState(false);

  const sharedProps = {
    data,
    lang,
    setLang,
    currentSection,
    setCurrentSection,
    showSettings,
    setShowSettings,
  };

  return (
    <div className="relative min-h-screen bg-bg-base grid grid-cols-1 grid-rows-1">
      <AnimatePresence initial={false} mode="sync">
        {currentSection === Section.Home ? (
          <motion.div 
            key="home-wrapper" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="col-start-1 row-start-1 w-full min-h-screen overflow-hidden"
          >
            <HomeSection {...sharedProps} />
          </motion.div>
        ) : (
          <motion.div 
            key="content-wrapper" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="col-start-1 row-start-1 flex min-h-screen bg-bg-base text-text-primary w-full"
          >
            <Sidebar {...sharedProps} />
            <MainContent data={data} currentSection={currentSection} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        data={data}
        lang={lang}
        setLang={setLang}
      />
    </div>
  );
}
