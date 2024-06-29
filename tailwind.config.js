// eslint-disable-next-line no-undef
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: [],
    theme: {
        extend: {},
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [
        plugin(({ addBase, theme }) => {
            addBase({
                a: { color: theme('colors.sky.600') },
            })
        }),
        // eslint-disable-next-line no-undef
        require('@tailwindcss/forms'),
    ],
}
