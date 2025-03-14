/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#26b6c6',
                secondary: '#1a8e9c',
                accent: '#FDCA40',   // Sunny Yellow
                background: '#F7F7F2', // Off-white
                darkText: '#222222',  // Dark Gray
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
            }
        },
    },
    plugins: [],
}