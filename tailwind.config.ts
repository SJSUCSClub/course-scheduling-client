import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
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
      subtitle: ['0.813rem', { lineHeight: '1.125rem', fontWeight: 700 }],
      'out-of': [
        '40px',
        { lineHeight: '4.75rem', letterSpacing: '-0.05em', fontWeight: 300 },
      ],
      rating: [
        '72px',
        { lineHeight: '4.75rem', letterSpacing: '-0.05em', fontWeight: 800 },
      ],
      'title-bold': [
        '34px',
        { lineHeight: '2.563rem', letterSpacing: '-0.05em', fontWeight: 800 },
      ],
      title: [
        '34px',
        { lineHeight: '2.563rem', letterSpacing: '-0.05em', fontWeight: 700 },
      ],
      heading: ['1.063rem', { lineHeight: '1.375rem', fontWeight: 600 }],
      subheading: ['0.938rem', { lineHeight: '1.25rem', fontWeight: 300 }],
      'body-bold': ['1.063rem', { lineHeight: '1.375rem', fontWeight: 700 }],
      body: ['1.063rem', { lineHeight: '1.375rem', fontWeight: 400 }],
      button: [
        '1rem',
        { letterSpacing: '-0.05em', lineHeight: '1.213rem', fontWeight: 700 },
      ],
      tag: ['1rem', { lineHeight: '1.213rem', fontWeight: 400 }],
      caption: ['0.75rem', { lineHeight: '0.906rem', fontWeight: 400 }],
    },
    borderRadius: {
      lg: '20px',
      md: '12px',
      sm: '6px',
    },
    extend: {
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '40px',
      },
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
    require('tailwindcss-unimportant'),
    plugin(({ addUtilities }) => {
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
