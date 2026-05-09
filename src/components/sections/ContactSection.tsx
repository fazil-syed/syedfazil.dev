import React from 'react';
import type { ContactData, SocialLink } from '../../types';
import { motion } from 'framer-motion';
import GithubIcon from '../../icons/GithubIcon';
import LinkedInIcon from '../../icons/LinkedInIcon';
import InstagramIcon from '../../icons/InstagramIcon';
import SendIcon from '../../icons/SendIcon';

interface Props {
  contact: ContactData;
  socialLinks?: SocialLink[];
}

function getSocialIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('linkedin')) return <LinkedInIcon size={18} />;
  if (n.includes('github')) return <GithubIcon size={18} />;
  if (n.includes('instagram') || n.includes('insta')) return <InstagramIcon size={18} />;
  return null;
}

const container = {
  show: { transition: { staggerChildren: 0.1 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
} as const;

const socialItem = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
} as const;

export default function ContactSection({ contact, socialLinks }: Props) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      {/* ── Hero Header ── */}
      <div>
        <motion.h2
          variants={item}
          className="text-6xl font-extrabold tracking-tight text-text-primary leading-tight mb-4"
        >
          {contact.headline}
        </motion.h2>
        <motion.p variants={item} className="text-text-muted text-base mb-8">
          {contact.subtitle}
        </motion.p>

        <motion.div variants={item} className="space-y-5">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-text-muted mb-1">Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-xl font-bold text-text-primary hover:opacity-70 transition-opacity"
            >
              {contact.email}
            </a>
          </div>

          {contact.phone && (
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-text-muted mb-1">Telephone</p>
              <p className="text-xl font-bold text-text-primary">{contact.phone}</p>
            </div>
          )}
        </motion.div>

        {/* Social icon circles */}
        {socialLinks && socialLinks.length > 0 && (
          <motion.div variants={container} className="flex gap-3 mt-8">
            {socialLinks.map((link, idx) => {
              const icon = getSocialIcon(link.name);
              if (!icon || !link.url) return null;
              return (
                <motion.a
                  key={idx}
                  variants={socialItem}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.name}
                  className="w-10 h-10 rounded-full bg-border-subtle hover:bg-text-primary hover:text-bg-base flex items-center justify-center text-text-muted transition-colors duration-200"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* ── Send a Message Form ── */}
      <motion.div
        variants={item}
        className="bg-bg-sidebar border border-border-subtle rounded-2xl p-8"
      >
        <h3 className="text-xl font-bold text-text-primary mb-6">{contact.message}</h3>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const name = (form.elements.namedItem('name') as HTMLInputElement).value;
            const email = (form.elements.namedItem('email') as HTMLInputElement).value;
            const msg = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
            window.location.href = `mailto:${contact.email}?subject=Message from ${name}&body=${encodeURIComponent(msg)}%0A%0AFrom: ${name} (${email})`;
          }}
        >
          <input
            name="name"
            type="text"
            required
            placeholder="e.g. John Doe"
            className="w-full bg-bg-base border border-border-subtle rounded-xl px-5 py-3.5 text-text-primary placeholder-text-muted text-sm outline-none focus:border-text-muted transition-colors"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="e.g. name@company.com"
            className="w-full bg-bg-base border border-border-subtle rounded-xl px-5 py-3.5 text-text-primary placeholder-text-muted text-sm outline-none focus:border-text-muted transition-colors"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="How can I help you?"
            className="w-full bg-bg-base border border-border-subtle rounded-xl px-5 py-3.5 text-text-primary placeholder-text-muted text-sm outline-none focus:border-text-muted transition-colors resize-none"
          />
          <motion.button
            type="submit"
            className="w-full bg-text-primary text-bg-base font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SendIcon size={18} />
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.section>
  );
}
