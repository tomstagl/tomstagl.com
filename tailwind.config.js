module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    options: { whitelistPatterns: [/^h-.*/, /^w-.*/] },
    content: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.tsx'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
