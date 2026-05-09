import React from 'react';
import type { PortfolioData } from '../../types';
import { Section } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import GithubIcon from '../../icons/GithubIcon';
import LinkedInIcon from '../../icons/LinkedInIcon';
import InstagramIcon from '../../icons/InstagramIcon';
import SettingsIcon from '../../icons/SettingsIcon';

interface Props {
  data: PortfolioData;
  lang: string;
  setLang: (lang: string) => void;
  setCurrentSection: (section: Section) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

const leftContainer = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fromBottom = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
} as const;

const fromLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.3 } },
} as const;

const iconVariant = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
} as const;

const navContainer = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
} as const;

const navItem = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
} as const;

export default function HomeSection({ data, lang, setLang, setCurrentSection, showSettings, setShowSettings }: Props) {
  const getSocialIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('github')) return <GithubIcon size={20} />;
    if (n.includes('linkedin')) return <LinkedInIcon size={20} />;
    if (n.includes('instagram') || n.includes('insta')) return <InstagramIcon size={20} />;
    return null;
  };

  const toggleTheme = () => {
    setShowSettings(true);
  };

  const navItems = [
    { id: '01', key: Section.About, label: data.nav.about },
    { id: '02', key: Section.Experience, label: data.nav.experience },
    { id: '03', key: Section.Work, label: data.nav.work },
    { id: '04', key: Section.Contact, label: data.nav.contact },
  ];

  return (
    <div className="relative min-h-screen w-full bg-bg-base flex flex-col md:flex-row items-center justify-center p-8 md:p-24 overflow-hidden">
      {/* Settings button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        onClick={() => setShowSettings(!showSettings)}
        className="absolute top-8 right-8 text-text-muted hover:text-text-primary transition-colors z-50"
      >
        <SettingsIcon size={24} />
      </motion.button>



      {/* Left Content */}
      <motion.div
        variants={leftContainer}
        initial="initial"
        animate="animate"
        className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-8 z-10"
      >
        <motion.div variants={fromBottom} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          {data.personal.image && (
            <motion.img
              layoutId="profile-image"
              src={data.personal.image}
              alt={data.personal.name}
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-bg-sidebar shadow-2xl"
            />
          )}
        </motion.div>

        <motion.div variants={fromBottom} className="space-y-2">
          <motion.p 
            layoutId="personal-role"
            className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-text-muted"
          >
            {data.personal.role}
          </motion.p>
          <motion.h1 
            layoutId="personal-name"
            className="text-5xl md:text-7xl font-black tracking-tighter text-text-primary leading-tight"
          >
            {data.personal.name}
          </motion.h1>
        </motion.div>

        <motion.div variants={leftContainer} layoutId="social-links" className="flex gap-6">
          {data.personal.social_links?.map((link, idx) => {
            const icon = getSocialIcon(link.name);
            if (!icon) return null;
            return (
              <motion.a
                key={idx}
                variants={iconVariant}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Right Navigation */}
      <motion.div
        variants={navContainer}
        initial="initial"
        animate="animate"
        className="flex-1 w-full md:w-auto mt-16 md:mt-0 flex flex-col space-y-0 z-10 md:pl-24"
      >
        {navItems.map((item) => (
          <motion.div 
            key={item.key} 
            variants={navItem} 
            layoutId={`nav-item-${item.key}`}
            className="group cursor-pointer border-b border-border-subtle last:border-0"
          >
            <button
              onClick={() => setCurrentSection(item.key)}
              className="w-full flex items-center py-6 md:py-10 text-left outline-none"
            >
              <span className="text-[10px] font-bold text-text-muted mr-8 tracking-widest">{item.id}</span>
              <span className="text-4xl md:text-6xl font-extrabold text-text-primary relative overflow-hidden">
                {item.label}
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-text-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              </span>
              <span className="ml-auto opacity-0 group-hover:opacity-70 text-text-primary transition-opacity duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
