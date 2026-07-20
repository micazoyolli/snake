# 🐍 Snake Game

Juego interactivo de Snake con Canvas, selección de fruta y color, audio, niveles, controles touch y teclado.

<img alt="Snake" src="https://github.com/micazoyolli/snake/blob/main/public/assets/screenshot.png" width="500" />

## 🌐 Demo

[Snake Demo](https://micazoyolli.github.io/snake/)

## 🛠️ Tecnologías

- HTML5
- TypeScript
- SCSS
- Vite
- Canvas API
- Vitest
- Playwright
- Node 24
- Micazoyolli Foundation para SEO/build, teclado y reduced motion

## 📦 Instalación

```bash
yarn install
```

## 🚀 Scripts

```bash
yarn dev
yarn lint
yarn typecheck
yarn test
yarn smoke
yarn build
yarn preview
yarn deploy
```

Abre `http://localhost:5173/snake/` para jugar en local.

## 🗂️ Estructura del proyecto

```txt
public/
scripts/
src/
├── game/
└── styles/
tests/
```

## 🚢 Despliegue en GitHub Pages

Este proyecto se publica en GitHub Pages desde la rama `gh-pages`. El comando `yarn deploy` compila la aplicación, limpia archivos `.DS_Store` del build y publica `dist/` usando el CLI de Micazoyolli Foundation sin crear commits de despliegue en `main`.

La configuración `base` de Vite debe conservar la subruta del repositorio: `/snake/`.

## 🧠 Funcionalidad

- Lógica modular para serpiente, alimento y renderizado.
- Selección de fruta y color antes de jugar.
- Controles por teclado y touch.
- Sonido para comida, colisión y movimiento.
- Pausa, reanudación y reinicio sin recargar.
- Niveles con velocidad progresiva.

## 🧩 Construido con Micazoyolli Foundation

Este proyecto utiliza [Micazoyolli Foundation](https://github.com/micazoyolli/foundation) como infraestructura compartida. Las mejoras de tooling, estructura y despliegue deben realizarse en Foundation para beneficiar a todos los proyectos que la consumen.

## 👩‍💻 Autora

Una creación de [`<micazoyolli />✨`](https://nadia.dev)
