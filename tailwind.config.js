/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0F2644',
          700: '#1E5FA8',
        },
        positive: '#1D9E75',
        negative: '#E24B4A',
        warning: '#EF9F27',
        background: '#F4F7FB',
        card: '#FFFFFF',
        text: {
          primary: '#0F1F33',
          secondary: '#5A6A7E',
        },
        border: '#DDE3ED',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
