/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#d03125',
        secondary: '#000000',
        black: '#000000',
        white: '#FFFFFF',
        red: '#ff2c1f',
        grey: '#9E9E9E',
        'opacity-white': 'rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        maven: ['Maven Pro', 'sans-serif'],
        sans: ['Lato', 'sans-serif'],
      },
      screens: {
        mobile: { max: '425px' },
        tablet: { max: '768px', min: '426px' },
        laptop: { max: '1024px', min: '769px' },
        desktop: '1440px',
      },
      fontSize: {
        sm: '0.8rem', //14
        base: '1rem', //16
        xl: '1.25rem', //20
        '2xl': '1.563rem', //24
        '3xl': '1.953rem', //30
        '4xl': '2.441rem', //36
        '5xl': '3.052rem', //48
      },
      gridTemplateColumns: {
        fill: 'repeat( auto-fit, minmax(250px, 1fr) )',
      },
    },
  },
  plugins: [],
}
