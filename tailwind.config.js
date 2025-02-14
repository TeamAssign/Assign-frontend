/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'main-color': '#FF4D4D',
        'sub-color': '#8CC872',
        'sub-color-2': '#324C22',
        'dark-gray': '#ABABAB',
        'light-gray': '#D9D9D9',
        'main-black': '#212529',
      },
      fontSize: {
        'size-title': '1.25rem' /* 20px */,
        'size-body': '1rem' /* 16px */,
        'size-subbody': '0.875rem' /* 14px */,
        'size-description': '0.75rem' /* 12px */,
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
