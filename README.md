# 🐍 Snake Game

Juego interactivo de Snake con canvas HTML5 y TypeScript, desarrollado con estructura modular, SCSS y Vite. Incluye sonido, selección de fruta y color, y diseño responsive para desktop y mobile.

<img alt="Snake" src="https://github.com/micazoyolli/snake/blob/main/public/assets/screenshot.png" width="500" />

## 🌐 Demo

👉 [Snake Demo](https://micazoyolli.github.io/snake/)

## 🚀 Tecnologías usadas

- HTML5 + SCSS (estructura modular)
- TypeScript (ES6+)
- Vite 8
- Node 24
- @micazoyolli/foundation para SEO/build, teclado y reduced motion
- Vitest + Playwright para pruebas del piloto

## 📦 Estructura del proyecto

```
snake/
├── public/
│   ├── assets/
│   ├── icons/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── meta.jpg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── game/
│   │   ├── audio.ts
│   │   ├── controls.ts
│   │   ├── food.ts
│   │   ├── main.ts
│   │   ├── snake.ts
│   │   └── utils.ts
│   ├── styles/
│   │   ├── _base.scss
│   │   ├── _canvas.scss
│   │   ├── _controls.scss
│   │   ├── _footer.scss
│   │   ├── _overlay.scss
│   │   └── main.scss
├── .editorconfig
├── .gitignore
├── .nvmrc
├── index.html
├── LICENSE
├── package.json
├── tsconfig.json
└── vite.config.js
```

## ▶️ Uso

```bash
yarn install
yarn dev
yarn lint
yarn typecheck
yarn test
yarn smoke
yarn build
```

Abre `http://localhost:5173/snake/` para jugar.

## 🧠 Funcionalidad

- Lógica modular para serpiente, alimento y renderizado
- Selección de fruta y color antes de jugar
- Controles por teclado y touch (mobile)
- Sonido integrado (comida, colisión, movimiento)
- Diseño responsive (desktop + mobile)
- Pausa y reanudación del juego

---

## Construido con Micazoyolli Foundation

Este proyecto utiliza [Micazoyolli Foundation](https://github.com/micazoyolli/foundation) como infraestructura compartida. Las mejoras de tooling, estructura y despliegue deben realizarse en Foundation para beneficiar a todos los proyectos que la consumen.

## 👩‍💻 Autora

Una creación de [`<micazoyolli />✨`](https://nadia.dev)
