/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'custom-blue': '#077EFF',
        'custom-blue-hover': '#b5cde7',
        'custom-grey': '#808080',
        'msg-color': '#134274',
        'custom-black': '#393939',
        'chat-box': '#f8f8f8'
      },
      fontFamily: {
        'MyFont': ['"Poppins"', 'serif']
      },
      height:{
        'screen-3/5': '75vh',
        '80%': '80%',
        'msg': 'calc(100% - 20%)'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
  
}