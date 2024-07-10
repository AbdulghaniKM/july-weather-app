/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'frangipani': {
          '50': '#fff8ed',
          '100': '#ffefd5',
          '200': '#fee3bc',
          '300': '#fdc274',
          '400': '#fa9c3d',
          '500': '#f87f17',
          '600': '#e9640d',
          '700': '#c14b0d',
          '800': '#9a3c12',
          '900': '#7c3312',
          '950': '#431707',
        },
        'tuna': {
          '50': '#f6f7f9',
          '100': '#ecedf2',
          '200': '#d4d7e3',
          '300': '#aeb4cb',
          '400': '#838bad',
          '500': '#636d94',
          '600': '#4e567b',
          '700': '#404564',
          '800': '#383c54',
          '900': '#303345',
          '950': '#212330',
        },

      }

    },
    screens: {
      'xs': '475px',
      'sm': { 'max': '639px' },
    }
  },
  plugins: [require('daisyui')],
}