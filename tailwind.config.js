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
        'customHover': '#077fffa6',
        'custom-grey': '#808080',
        'msg-color': '#134274',
        'custom-black': '#393939',
        'chat-box': '#f8f8f8',
        'borderColor': '#ffffff50',
        'dropMenu': '#a4a4a4',
      },
      fontFamily: {
        'MyFont': ['"Poppins"', 'serif']
      },
      height:{
        'screen-3/5': '75vh',
        '80%': '80%',
        'msg': 'calc(100% - 20%)'
      },
      padding:{
        '15': '60px',
        '65': '65px',
      },
      width:{
        '15': '60px'
      },
      maxWidth:{
        '70%': '70%',
      },
      minWidth:{
        '700': '700px'
      },
      opacity:{
        '80%': '80%'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
  
}