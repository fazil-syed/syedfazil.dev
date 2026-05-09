import React, { useState, useEffect } from 'react';
import type { PortfolioData } from '../types';
import { Section } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import GithubIcon from '../icons/GithubIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import InstagramIcon from '../icons/InstagramIcon';
import SettingsIcon from '../icons/SettingsIcon';

import { UserIcon, BriefcaseIcon, CodeIcon, MailIcon } from '../icons/MenuIcons';

interface SidebarProps {
  data: PortfolioData;
  lang: string;
  setLang: (lang: string) => void;
  currentSection: Section;
  setCurrentSection: (section: Section) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

const getSocialIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('github')) return <GithubIcon size={20} />;
  if (n.includes('linkedin')) return <LinkedInIcon size={20} />;
  if (n.includes('instagram') || n.includes('insta')) return <InstagramIcon size={20} />;
  return null;
};

export default function Sidebar({
  data,
  lang,
  setLang,
  currentSection,
  setCurrentSection,
  showSettings,
  setShowSettings
}: SidebarProps) {

  const navItems = [
    { key: Section.About, label: data.nav.about, icon: UserIcon },
    { key: Section.Experience, label: data.nav.experience, icon: BriefcaseIcon },
    { key: Section.Work, label: data.nav.work, icon: CodeIcon },
    { key: Section.Contact, label: data.nav.contact, icon: MailIcon },
  ];

  return (
    <aside className="w-64 h-screen bg-bg-sidebar border-r border-border-subtle flex flex-col justify-between p-6 z-10 overflow-y-auto sticky top-0 flex-shrink-0">
      <div className="space-y-12">
        <div className="space-y-8">
          {/* Top Actions */}
          <button
            onClick={() => setCurrentSection(Section.Home)}
            className="flex items-center gap-3 text-text-muted hover:text-text-primary transition-all duration-300 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">BACK HOME</span>
          </button>

          {/* Personal Info */}
          <div>
            {data.personal.image && (
              <motion.img
                layoutId="profile-image"
                src={data.personal.image}
                alt={data.personal.name}
                className="w-16 h-16 rounded-full object-cover mb-4 border border-border-subtle shadow-sm"
              />
            )}
            <motion.p 
              layoutId="personal-role"
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted mb-1"
            >
              {data.personal.role}
            </motion.p>
            
            <div className="flex items-center justify-between group/name">
              <motion.h1 
                layoutId="personal-name"
                className="text-xl font-black tracking-tight text-text-primary"
              >
                {data.personal.name}
              </motion.h1>
              <button
                onClick={() => setShowSettings(true)}
                className="p-1 text-text-muted hover:text-text-primary transition-colors"
                aria-label="Settings"
              >
                <SettingsIcon size={18} className="group-hover/name:rotate-90 transition-transform duration-700" />
              </button>
            </div>

            <motion.div layoutId="social-links" className="flex gap-2 mt-5">
              {data.personal.social_links?.slice(0, 3).map((link, idx) => {
                const icon = getSocialIcon(link.name);
                if (!icon) return null;
                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-bg-base border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-muted transition-all duration-300"
                  >
                    {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 16 })}
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-3 bg-teal-400 rounded-full" />
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted">MENU</p>
          </div>
          
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                layoutId={`nav-item-${item.key}`}
                onClick={() => setCurrentSection(item.key)}
                whileTap={{ scale: 0.98 }}
                whileHover={{ x: 4 }}
                className={`relative flex items-center justify-between text-left px-4 py-3 rounded-xl transition-all duration-300 outline-none group ${
                  currentSection === item.key ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {/* Animated background for active item - Glassmorphism */}
                {currentSection === item.key && (
                  <motion.span
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-xl bg-text-primary/5 border border-text-primary/10 backdrop-blur-md shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                
                <div className="relative z-10 flex items-center gap-3">
                  <item.icon size={18} />
                  <span className="text-sm font-bold tracking-tight">
                    {item.label}
                  </span>
                </div>

                {currentSection === item.key && (
                  <motion.div
                    layoutId="sidebar-active-dot-container"
                    className="relative z-10 flex items-center justify-center w-2 h-2"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-full bg-teal-400/40 blur-[2px]"
                    />
                    <span className="relative w-1.5 h-1.5 rounded-full bg-teal-400" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>

      <div className="px-4">
        <div className="h-px w-full bg-border-subtle mb-4" />
        <div className="text-[9px] font-bold text-text-muted/50 tracking-[0.2em] uppercase">
          © {data.personal.name} 2026
        </div>
      </div>
    </aside>
  );
}
