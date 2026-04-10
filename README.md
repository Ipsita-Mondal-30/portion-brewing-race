# Potion Brewing Race

Web3 game frontend built with **Next.js** (App Router), **Tailwind CSS**, and **ethers.js** — wallet connection, on-chain **join race** / **brew potion**, Sepolia network checks, and a power-based leaderboard.

## Routes

- `/` — Welcome
- `/game` — Arena (full game UI)
- `/form` — Alchemist registration form (demo)

## Setup

```bash
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_CONTRACT_ADDRESS if you override it in code
npm run dev
```

## Stack

Next.js 14 · Tailwind · ethers v6 · Framer Motion · MetaMask (`window.ethereum`)
