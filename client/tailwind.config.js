/** @type {import('tailwindcss').Config} */

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'field-blue': "url('images/blueSideCropped.png')",
                'field-red': "url('images/redSideCropped.png')",
                'field-red-endgame': "url('images/fieldmapREDendgame.png')",
                'field-blue-endgame': "url('images/fieldmapBLUEendgame.png')",
            },
            colors: {
                darkred: '#7c1034',
                lightblue: 'cfe5ff',
                medblue: '252f9c'
            },
            fontFamily: {
                sans: 'Poppins'
            },
            rotate: {
                '60': '60deg', 
            }
        },

        plugins: [],
    },
};
