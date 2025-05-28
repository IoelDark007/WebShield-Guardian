/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{html,js}'];
export const theme = {
    colors: {
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
        'dark-green': '#2f855a',
        'neon-green': '#39ff14',
    },
    fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
    },
    extend: {
        spacing: {
            '8xl': '96rem',
            '9xl': '128rem',
        },
        borderRadius: {
            '4xl': '2rem',
        }
    }
};