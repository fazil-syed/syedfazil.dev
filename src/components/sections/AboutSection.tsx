import React from 'react';
import type { AboutData } from '../../types';
import { motion } from 'framer-motion';

interface Props {
  data: AboutData;
}

const container = {
  show: { transition: { staggerChildren: 0.12 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
} as const;

export default function AboutSection({ data }: Props) {
  return (
    <motion.section 
      variants={container} 
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.h2
        variants={item}
        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-12 text-text-primary leading-tight"
      >
        {data.title}
      </motion.h2>
      <motion.p variants={item} className="text-base md:text-xl text-text-muted leading-[1.9] font-light whitespace-pre-wrap">
        {data.content}
      </motion.p>
    </motion.section>
  );
}
