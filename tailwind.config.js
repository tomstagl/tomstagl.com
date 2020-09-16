module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.js', './src/**/*.jsx'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
