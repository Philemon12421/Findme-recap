# Findme – AI Digital Identity Checker

Findme is a modern SaaS application designed to help users secure their digital identity by checking username and domain availability across 1000+ platforms instantly.

## 🚀 Key Features

- **Omni-Search Engine**: Search for usernames across Social Media (Instagram, TikTok, GitHub, etc.) and Domains (.com, .io, .ai) in one click.
- **Bulk Verify**: Upload CSV or paste lists to check availability for 100+ handles at once.
- **Offline Intelligence**: 
  - **Username Generator**: Powered by a local heuristic engine (No external paid APIs).
  - **Identity Assistant**: Rule-based logic for instant branding tips.
  - **Logo Concept Engine**: SVG-based layout suggestions.
- **Personal Dashboard**: Save results locally via browser storage.
- **No Paid APIs**: This application uses **zero paid AI APIs**. All "AI" features are processed locally via custom algorithms or free public endpoints (like GitHub's public API), making it completely free to run and host.

## 🛠 Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion (motion)
- **Backend**: Node.js (Express)
- **AI**: Gemini 1.5 Flash (via @google/genai)
- **Icons**: Lucide React
- **Typography**: Inter (UI) & Poppins (Display)

## 🛡 Legal & Compliance

- **AdSense Ready**: Comprehensive Privacy, Terms, and Cookie policies included.
- **Secure**: No permanent backend storage of search queries.
- **Independent**: Not affiliated with any third-party social media platforms.

## 📂 Project Structure

- `/src/pages`: Main view logic (Home, Dashboard, AI Tools, Blog, About, etc.)
- `/src/components`: Reusable UI elements (Navbar, SearchBar)
- `/src/services`: Integration with external APIs (Gemini)
- `server.ts`: Express backend serving the app and handling search simulations.

---
© 2026 Findme. All rights reserved.
