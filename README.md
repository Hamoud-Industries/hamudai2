# Hamoud Labs

A futuristic software company landing page built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- Interactive particle background
- Cinematic hero intro animation
- Parallax layered scroll effects
- Cards with 3D tilt and glowing edges
- Smooth section reveal animations
- Fully responsive design

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- Framer Motion (motion/react)
- react-parallax-tilt
- @tsparticles/react
- lucide-react

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

1. Push your code to the `main` branch of your GitHub repository.
2. Go to your repository settings on GitHub: **Settings > Pages**.
3. Under **Build and deployment**, set the **Source** to **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` will automatically build and deploy your site whenever you push to `main`.

**Note on Vite Base Path:**
If you are deploying to a project page (e.g., `https://username.github.io/repo-name/`), you need to set the `base` property in `vite.config.ts` to `'/repo-name/'`. If you are deploying to a user/organization page (e.g., `https://username.github.io/`), the default base path (`'/'`) is correct.
