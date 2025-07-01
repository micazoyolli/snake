# 🟦 Snake 

Juego clásico de Snake usando Javascript y canvas de HTML5 con sonido.

<img alt="Snake" src="https://github.com/micazoyolli/snake/blob/master/assets/screenshot.png" width="500" />

## 🌐 Demo

[Snake Demo](https://micazoyolli.github.io/snake/)

## 🚀 Tecnologías usadas

- HTML5 + SCSS (estructura modular)
- TypeScript (ES6+)
- Vite

## 📦 Estructura del proyecto

```
snake/
├── public/
│   ├── assets/
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── game/
│   │   ├── board.ts
│   │   ├── main.ts
│   │   ├── piece.ts
│   │   ├── renderer.ts
│   │   └── tetrominoes.ts
│   ├── styles/
│   │   ├── _buttons.scss
│   │   ├── _layout.scss
│   │   ├── _variables.scss
│   │   └── main.scss
├── index.html
├── .gitignore
├── LICENSE
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## ▶️ Uso

```bash
yarn install
yarn dev
```

Abre `http://localhost:5173/snake/` para jugar.

## 🧠 Funcionalidad

- Lógica modular para piezas, tablero y render
- Diseño responsive (desktop + mobile)
- Niveles que incrementan la velocidad dinámicamente
- Controles por teclado y touch (mobile)

---

## 👩‍💻 Autora

Una creación de [`<micazoyolli />✨`](https://nadia.dev)
