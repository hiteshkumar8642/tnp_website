module.exports = {
    mode: 'jit',
    purge: [
      './src/**/*.{js,jsx,ts,tsx}', // Adjust the path according to your project structure
      './public/index.html',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          'primary': '#6c63ff',
          'secondary': '#5d5d5d',
          'background': '#f3f6fd',
          'hover-primary': '#5752d8',
        },
        spacing: {
          '30px': '30px',
          '10px': '10px',
          '20px': '20px',
          '80px': '80px',
        },
        borderRadius: {
          '20px': '20px',
        },
        fontSize: {
          '2xl': '1.5rem', // 24px
          'lg': '1.125rem', // 18px
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };
  