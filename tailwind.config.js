/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#EDEAE4',
        dark: '#1A1A1A',
        ink: '#111111',
        body: '#555555',
        muted: '#999999',
        orange: '#C8482A',
        rule: '#D8D4CC',
        card: '#FFFFFF',
      },
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        body: ['"Google Sans"', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      fontSize: {
        // fluid display sizes mirroring the original clamp() values
        hero: ['clamp(48px,7vw,104px)', { lineHeight: '1.02', letterSpacing: '0.5px' }],
        'hero-hover': ['clamp(50px,7.2vw,106px)', { lineHeight: '1.02', letterSpacing: '0.5px' }],
        display: ['clamp(48px,7vw,96px)', { lineHeight: '0.95', letterSpacing: '-1px' }],
        'display-sm': ['clamp(40px,5.5vw,80px)', { lineHeight: '0.95', letterSpacing: '-1px' }],
        contact: ['clamp(52px,9vw,120px)', { lineHeight: '0.96', letterSpacing: '0.5px' }],
        worktitle: ['clamp(24px,2.8vw,36px)', { lineHeight: '1.1', letterSpacing: '-0.5px' }],
      },
    },
  },
  plugins: [],
}
