# Future&more Inc. - Cinematic Portfolio Website

This is a Next.js project for the Future&more Inc. portfolio website, designed for a cinematic and ultra-professional user experience.

## Tech Stack

- **Frontend:** Next.js, React
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

1. **Clone the repository (or set up files locally):**

   ```bash
   git clone <your-repo-url>
   cd future-and-more-portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Start production server:**

   ```bash
   npm run start
   ```

## Project Structure

- `pages/`: Contains all the application routes (e.g., `index.js` for Home, `products/index.js` for Products).
- `components/`: Reusable UI components (e.g., `Navbar.js`, `Layout.js`).
- `lib/`: Helper functions, animation variants (`animations.js`), and mock data (`data.js`).
- `context/`: React context providers (e.g., `ThemeContext.js`).
- `public/`: Static assets like images and fonts (if not using CDN).
- `styles/`: Global CSS files (`globals.css`).
- `tailwind.config.js`: Tailwind CSS configuration.

## Customization

- **Content:** Update mock data in `lib/data.js`. This should ideally be replaced with API calls to your FastAPI backend.
- **Images:** Replace placeholder image URLs in `lib/data.js` and static images in the `public` folder.
- **Theme:** Colors and typography can be adjusted in `tailwind.config.js` and `styles/globals.css`.
- **Animations:** Modify or extend animation variants in `lib/animations.js`.

## Deployment

Deploy easily to platforms like Vercel (recommended for Next.js) or Netlify.
