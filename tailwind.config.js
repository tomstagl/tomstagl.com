module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563eb',
          light: '#dbeafe',
          dark: '#1e40af',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
