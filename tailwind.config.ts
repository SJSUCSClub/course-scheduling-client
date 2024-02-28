import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: 'rgb(var(--color-primary))',
      secondary: 'rgb(var(--color-secondary))',
      accent: 'rgb(var(--color-accent))',
      background: 'rgb(var(--color-background))',
      text: 'rgb(var(--color-text))',
      neutral: 'rgb(var(--color-neutral))',
      important: 'rgb(var(--color-important))',
      highlight: 'rgb(var(--color-highlight))',
      good: 'rgb(var(--color-good))',
      ok: 'rgb(var(--color-ok))',
      bad: 'rgb(var(--color-bad))',
      border: 'rgb(var(--color-border)/ 0.5)',
      'hovered-border': 'rgb(var(--color-hovered-border)/ 0.5)',
    },
    fontSize: {
      subtitle: ['13px', { lineHeight: '18px', fontWeight: 700 }],
      'out-of': [
        '40px',
        { lineHeight: '76px', letterSpacing: '-0.05em', fontWeight: 300 },
      ],
      rating: [
        '72px',
        { lineHeight: '76px', letterSpacing: '-0.05em', fontWeight: 800 },
      ],
      'title-bold': [
        '34px',
        { lineHeight: '41px', letterSpacing: '-0.05em', fontWeight: 800 },
      ],
      title: [
        '34px',
        { lineHeight: '41px', letterSpacing: '-0.05em', fontWeight: 700 },
      ],
      heading: ['17px', { lineHeight: '22px', fontWeight: 600 }],
      subheading: ['15px', { lineHeight: '20px', fontWeight: 300 }],
      'body-bold': ['17px', { lineHeight: '22px', fontWeight: 700 }],
      body: ['17px', { lineHeight: '22px', fontWeight: 400 }],
      button: ['16px', { letterSpacing: '-0.05em', fontWeight: 700 }],
      tag: ['16px', { fontWeight: 400 }],
      caption: ['12px', { fontWeight: 400 }],
    },
    borderRadius: {
      lg: '20px',
      md: '12px',
      sm: '6px',
    },
    extend: {
      boxShadow: {
        paper: '0px 4px 17px rgba(0, 0, 0, 0.05)',
      },
      backdropBlur: {
        10: '17px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.animation': {
          '@apply transition-all duration-100 ease-in-out': {},
        },
        '.max-width': {
          '@apply w-full max-w-[1076px]': {},
        },
        '.default-border': {
          '@apply border-2 border-border': {},
        },
        '.default-border-focus': {
          '@apply border-2 border-primary': {},
        },
      });
    }),
  ],
};
export default config;
