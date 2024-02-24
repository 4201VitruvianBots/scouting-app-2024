/** @type {import('tailwindcss').Config} */

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'field-blue-on-left': "url('images/fieldBlueOnLeft.png')",
                'field-blue-on-right': "url('images/fieldBlueOnRight.png')",
                'field-red-on-left': "url('images/fieldRedOnLeft.png')",
                'field-red-on-right': "url('images/fieldRedOnRight.png')",
                
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
