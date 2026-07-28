import React from 'react';

const LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/allstrumguitar/?hl=en',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/allstrum/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.17V23H8V8z" />
      </svg>
    ),
  },
];

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`social-links ${className}`.trim()}>
      {LINKS.map((link) => (
        <a
          key={link.name}
          className="social-links__item"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`AllStrum on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
