// Use CommonJS exports so PostCSS can load this config in environments
// that run Vite as a CommonJS module (Docker builds / older Node setups).
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

