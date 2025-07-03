# 🧮 geezify

**geezify** is a lightweight JavaScript/React-compatible package that lets you convert numbers between **Arabic numerals (1, 2, 3...)** and **Geez numerals (፩, ፪, ፫...)**.

> Supports conversions from 1 to 10 powers of 15. Ideal for Ethiopian heritage projects, calendars, education tools, or language learning apps.

---

## ✨ Features

- 🔁 Arabic ➡ Geez: `15` → `፲፭`
- 🔁 Geez ➡ Arabic: `፴፯` → `37`
- ⚡ Simple functions (`geez()`, `arabic()`)
- ✅ TypeScript support
- 🧩 Framework-agnostic (works in React, Node.js, Vanilla JS)
- 🌐 Fully open source

---

## 📦 Installation

Install using npm:

`````bash
npm install geezify


````yarn
yarn add geezify




usage


`````

import { geez, arabic } from 'geezify';

export default function App() {
return (

<div>
<p>Geez of 15: {geez(15)}</p> {/_ ፲፭ _/}
<p>Arabic of ፴፯: {arabic('፴፯')}</p> {/_ 37 _/}
</div>
);
}
