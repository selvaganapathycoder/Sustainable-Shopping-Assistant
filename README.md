# 🌱 EcoScan – Sustainable Shopping Assistant

EcoScan is a modern, mobile-first frontend app that helps users scan products, understand their environmental impact, and choose eco-friendly alternatives, while tracking their sustainability progress over time.

## 🎯 Goal
Simplify sustainability decisions in seconds for shoppers who want to make greener choices but find labels confusing or alternatives hard to find.

## 🛠 Tech Stack
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **State**: React Context API
- **Charts**: Recharts
- **Camera**: html5-qrcode (Barcode scanner)
- **Deployment**: Optimized for Vercel/Netlify

## 🧠 Sustainability Score Logic
The score (0-100) is calculated based on four key pillars:
`Score = (Packaging + Carbon + Ethics + Recyclability) / 4`
- **90+**: Grade A (Recommended)
- **60-89**: Grade B/C (Moderate)
- **Below 40**: Grade D/E (Better Avoid)

## ✨ Extra Features
- **Framer Motion Animations**: Smooth micro-animations for a premium feel.
- **LocalStorage Caching**: Persistent scan history and points.
- **Mock Product Database**: Pre-configured barcodes for demonstration.
- **Eco Points Gamification**: Earn badges as you save CO₂.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
