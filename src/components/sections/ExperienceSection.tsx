import React from 'react';
import type { ExperienceSection, ExperienceData } from '../../types';
import { motion } from 'framer-motion';
import ExternalLinkIcon from '../../icons/ExternalLinkIcon';

interface Props {
  data: ExperienceSection;
}

function groupByCompany(entries: ExperienceData[]): { company: string; roles: ExperienceData[] }[] {
  const grouped: { company: string; roles: ExperienceData[] }[] = [];
  const seen: Record<string, number> = {};

  [...entries].forEach((exp) => {
    if (seen[exp.company] === undefined) {
      seen[exp.company] = grouped.length;
      grouped.push({ company: exp.company, roles: [] });
    }
    grouped[seen[exp.company]].roles.push(exp);
  });

  return grouped;
}

const getYear = (duration: string) => {
  const match = duration.match(/\d{4}/);
  return match ? match[0] : '';
};

const container = {
  show: { transition: { staggerChildren: 0.1 } },
} as const;

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
} as const;

const roleVariant = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
} as const;

const rolesContainer = {
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
} as const;

export default function ExperienceSectionView({ data }: Props) {
  const grouped = groupByCompany(data.experience);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      <motion.h2
        variants={cardVariant}
        className="text-6xl font-extrabold tracking-tight text-text-primary leading-tight"
      >
        {data.title}
      </motion.h2>

      <motion.div className="space-y-8">
        {grouped.map(({ company, roles }) => (
          <motion.div
            key={company}
            variants={cardVariant}
            className="bg-bg-sidebar border border-border-subtle rounded-2xl p-8 space-y-8"
          >
            {/* Company header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-text-primary">{company}</h3>
                <p className="text-sm font-bold text-teal-400 mt-1 flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity uppercase tracking-widest">
                  {roles[0].role} <ExternalLinkIcon size={12} />
                </p>
              </div>
            </div>

            {/* Role Items */}
            <motion.div
              variants={rolesContainer}
              className="space-y-10 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border-subtle"
            >
              {roles.map((exp, i) => (
                <motion.div key={i} variants={roleVariant} className="relative pl-10">
                  {/* Circle bullet */}
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-text-primary bg-bg-sidebar z-10" />

                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-text-primary">{exp.role}</h4>
                    <span className="bg-bg-base border border-border-subtle px-3 py-1 rounded-md text-[10px] font-bold text-text-muted uppercase tracking-widest">
                      {getYear(exp.duration)}
                    </span>
                  </div>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-2 mt-4">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-text-muted text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-sm bg-border-subtle mt-1.5 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
