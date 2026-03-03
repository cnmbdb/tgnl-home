import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Next.js 官网风格配色
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#0070f3',
          hover: '#0051cc',
        },
        secondary: {
          DEFAULT: '#7928ca',
          hover: '#5a1fa0',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'next-gradient': 'linear-gradient(180deg, #0070f3 0%, #7928ca 100%)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config

