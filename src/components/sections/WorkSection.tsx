import React, { useState, useMemo } from 'react';
import type { ProjectData } from '../../types';
import { motion } from 'framer-motion';
import ExternalLinkIcon from '../../icons/ExternalLinkIcon';
import SearchIcon from '../../icons/SearchIcon';

interface Props {
  work: ProjectData[];
  label: string;
}

const container = {
  show: { transition: { staggerChildren: 0.08 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
} as const;

function WorkCard({ project, index }: { project: ProjectData; index: number }) {
  const card = (
    <motion.div
      variants={item}
      className="flex flex-col border border-border-subtle rounded-2xl overflow-hidden bg-bg-sidebar cursor-pointer group transition-colors transition-shadow duration-300 hover:border-border-hover hover:shadow-hover h-full"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Image */}
      {project.image ? (
        <div className="w-full h-64 overflow-hidden bg-border-subtle">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="w-full h-64 bg-bg-base flex items-center justify-center text-text-muted text-xs uppercase tracking-widest font-bold">
          No Image
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-bg-base border border-border-subtle px-2 py-0.5 rounded uppercase font-bold text-text-muted tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Name */}
        <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-teal-400 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-3">{project.description}</p>

        {/* Footer */}
        <div className="border-t border-border-subtle pt-4 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted">
            {project.work_type ?? 'project'}
          </span>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-text-primary group-hover:opacity-70 transition-opacity">
            <span>View</span>
            <ExternalLinkIcon size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return project.open_link ? (
    <a href={project.open_link} target="_blank" rel="noreferrer" className="block h-full">
      {card}
    </a>
  ) : (
    <div className="block h-full">{card}</div>
  );
}

export default function WorkSection({ work, label }: Props) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    work.forEach(p => p.tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [work]);

  const filteredWork = useMemo(() => {
    return work.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !activeTag || p.tags?.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [work, search, activeTag]);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-end justify-between">
        <h2 className="text-6xl font-extrabold tracking-tight text-text-primary leading-tight">
          {label}
        </h2>
        <span className="bg-bg-sidebar border border-border-subtle px-3 py-1 rounded-full text-xs font-bold text-text-primary mb-2">
          {filteredWork.length} Results
        </span>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-text-primary transition-colors">
          <SearchIcon size={18} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full bg-bg-sidebar border border-border-subtle rounded-xl pl-12 pr-6 py-4 text-text-primary placeholder-text-muted outline-none focus:border-border-hover transition-colors"
        />
      </motion.div>

      {/* Tags */}
      <motion.div variants={item} className="flex gap-2 flex-wrap">
        {allTags.map(tag => (
          <motion.button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${activeTag === tag
              ? 'bg-text-primary text-bg-base'
              : 'bg-bg-sidebar border border-border-subtle text-text-muted hover:border-border-hover hover:text-text-primary'
              }`}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredWork.map((project, index) => (
          <WorkCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </motion.section>
  );
}
