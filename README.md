# 🏆 Tier List App

A fast, drag-and-drop tier list builder built with **React**, **TypeScript**, **Tailwind CSS**, and **dnd kit**.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat-square&logo=vite&logoColor=white)
![dnd kit](https://img.shields.io/badge/dnd_kit-latest-FF4154?style=flat-square)

---

## ✨ Features

- 🖱️ **Drag & Drop** — Smooth, accessible drag-and-drop powered by dnd kit
- 🎨 **Custom Tiers** — Add, remove, and rename tier rows (S, A, B, C, D... or your own labels)
- 📦 **Item Management** — Add items to an unranked pool, then drag them into tiers
- ♿ **Accessible** — Keyboard navigation and screen reader support via dnd kit's accessibility layer
- ⚡ **Fast** — Vite-powered dev server and optimised production builds
- 🔒 **Type-safe** — Fully typed with TypeScript throughout

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm, yarn, or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/Anup4944/tier-list.git
cd tier-list

# Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy to any static host.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 18+](https://react.dev/) | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Vite](https://vitejs.dev/) | Bundler & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [dnd kit](https://dndkit.com/) | Drag-and-drop primitives |

### dnd kit hooks used

- `useDraggable` — Makes items draggable
- `useDroppable` — Designates tier rows as drop targets
- `DndContext` / `DragOverlay` — Global drag state and overlay rendering

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

## 🙏 Acknowledgements

- [dnd kit](https://dndkit.com/) — for the excellent drag-and-drop primitives
- [Tailwind CSS](https://tailwindcss.com/) — for making styling a joy
- [Vite](https://vitejs.dev/) — for the lightning-fast dev experience
