/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        graphit: ['Graphit', 'cursive'],
        karantina: ['Karantina', 'cursive'],
        futura: ['Futura'],
        play: ['Play'],
        GeogrotesqueWide: ['GeogrotesqueWide']
      },
      colors: {
        'primary-bg-color': 'var(--primary-bg-color)',
        'second-bg-color': 'var(--second-bg-color)',
        'yellow-text-color': 'var(--yellow-text-color)',
        'green-text-color': 'var(--green-text-color)',
        'orange-color': 'var(--orange-color)',
        'brown': 'var(--brown)',
        'primary-color': 'var(--primary-color)',
        'primary-button-bg-color': 'var(--primary-button-bg-color)',
        'second-button-bg-color': 'var(--second-button-bg-color)',
        'text-balance-color': 'var(--text-balance-color)',
      },
      width: {
        'max-width': 'var(--max-width)',
      },
      backgroundImage: {
        'auth-mobile': "url('images/auth/background.m.png')"
      }
    },
  },
  plugins: [],
};
