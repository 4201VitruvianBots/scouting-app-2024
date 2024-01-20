/** @type {import('tailwindcss').Config} */

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend:{
            backgroundImage: {
                'field-blue': "url('images/fieldBlue.png')",
                'field-red': "url('images/fieldRed.png')",
              }
        }
       
    },
    plugins: [],
};
