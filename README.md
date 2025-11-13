# Slots Game - PixiJS Project

A slots game built with PixiJS and vanilla JavaScript.

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Then open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

## Technologies

- **PixiJS v8** - High-performance 2D WebGL renderer
- **Vite** - Fast build tool and dev server
- **Vanilla JavaScript** - No TypeScript, pure JS

## Tests

```bash
npm test
```

## Deployment

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### Automatic Deployment

The project uses GitHub Actions to automatically build and deploy:
- Push to `main` branch triggers the deployment workflow
- The site will be available at: `https://[your-username].github.io/[repository-name]/`

### Manual Deployment

If you need to manually trigger a deployment:
1. Go to the **Actions** tab in your GitHub repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

### Enabling GitHub Pages

If this is your first deployment, make sure GitHub Pages is enabled:
1. Go to your repository **Settings**
2. Navigate to **Pages** in the left sidebar
3. Under **Source**, select **GitHub Actions**
4. The workflow will handle the rest automatically

### Local Build

To test the production build locally:

```bash
npm run build
npm run preview
```