/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-background" : "var(--color-primary-background)" 
      },
      fontFamily:{
        "spartan" : ["League Spartan", "sans-serif"]
      },
      keyframes:{
        moveInUp:{
          '0%' : {transform :'translateY(50px)', opacity : '0'},
          '100%' : {transform : "translateY(0px)", opacity : '1'}
        }
      },
      animation:{
        moveInUp : 'moveInUp 1.5s ease-in-out'
      }
    },
  },
  plugins: [],
}