import React from 'react';
import type { PortfolioData } from '../types';
import { Section } from '../types';
import { AnimatePresence, motion } from 'framer-motion';
import AboutSection from './sections/AboutSection';
import WorkSection from './sections/WorkSection';
import ExperienceSectionView from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';

interface Props {
  data: PortfolioData;
  currentSection: Section;
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
} as const;

export default function MainContent({ data, currentSection }: Props) {
  return (
    <main className="flex-1 p-6 pb-28 md:p-12 min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {currentSection === Section.About && <AboutSection data={data.about} />}
          {currentSection === Section.Work && <WorkSection work={data.work} label={data.nav.work} />}
          {currentSection === Section.Experience && <ExperienceSectionView data={data.experience} />}
          {currentSection === Section.Contact && (
            <ContactSection
              contact={data.contact}
              socialLinks={data.personal.social_links}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
