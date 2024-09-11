/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './tailpress-blocks.php',
        './build/**/*.{js,php}',
        './shared/dist/**/*.{js,css}'
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

