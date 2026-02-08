# 🐰💜 Silly Bunny Valentine

A cute, interactive Valentine's Day proposal app built with React, TypeScript, and Vite. 

It features a "No" button that playfully runs away from the cursor (or finger on mobile), ensuring the only option is "Yes"!

**[✨ View Live Demo](https://YOUR_GITHUB_USERNAME.github.io/silly-bunny-vday/)**

## 🎨 Features

* **Bearded Iris Theme:** A beautiful deep violet and soft lavender color palette with golden accents.
* **Interactive "No" Button:** The button uses smart logic to escape the mouse or touch events, making it impossible to click.
* **Mobile Compatible:** optimized for touchscreens and dynamic viewport heights.
* **Celebration Effects:**
    * Background rain of Purple Hearts (💜) and Fleur-de-lis (⚜️).
    * Confetti explosion on "Yes".
* **Custom Assets:** Easily swappable images for the "Ask" and "Success" states.

## 🛠️ Tech Stack

* **Framework:** React + TypeScript
* **Build Tool:** Vite
* **Styling:** CSS3 (Flexbox, CSS Animations)
* **Libraries:** `canvas-confetti` (for the celebration)

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/silly-bunny-vday.git](https://github.com/YOUR_GITHUB_USERNAME/silly-bunny-vday.git)
cd silly-bunny-vday
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

Open ```http://localhost:5173``` to view it in the browser.


## Default

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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
