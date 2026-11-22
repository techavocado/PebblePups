# 🐾 PebblePups

A warm, storybook- and sketchbook-inspired puppy adoption web application built with React and Vite. **PebblePups** replaces sterile pet directories with a handcrafted tactile aesthetic—featuring double-ring puppy portraits, organic SVG wave dividers, masking-tape filter notes, and an animated mascot—to help prospective pet parents browse real puppies and connect directly via WhatsApp.

🔗 **Live Demo:** [https://pebblepups.vercel.app](https://pebblepups.vercel.app)  
📦 **Repository:** [https://github.com/techavocado/PebblePups](https://github.com/techavocado/PebblePups)

---

## ✨ Key Features

- **Handcrafted Sketchbook Aesthetic:** Warm cream (`#fbf6eb` / `#fffdf8`) and honey-gold color palette paired with radial dot-grid paper textures, curved terracotta brush strokes, tilted status badges, and organic wave transitions.
- **Smooth Horizontal "Meet the Pups" Lineup:** Displays all available puppies on the home page with fluid 2-finger trackpad scrolling (translating both horizontal `deltaX` and vertical `deltaY` wheel gestures) and native touch swipe support without cluttering arrow buttons.
- **Dynamic Puppy Detail Routes (`/puppies/:id`):** Clicking any available puppy navigates directly to a shareable, browser-history-friendly detail page (`PuppyDetailPage`) showcasing real puppy photos, breed/age metadata, video badges, and direct WhatsApp inquiry links.
- **Multi-Criteria Sketchbook Filters (`PuppiesPage`):** Real-time filtering inside a taped-note filter card by:
  - **Origin / Category:** `Everywhere`, `Imported`, `Korean Teacup`
  - **Breed:** `Maltipoo`, `Pomeranian`, `Poodle`, `Cavapoo`, `Shih Tzu`
  - **Gender:** `Boys`, `Girls`
- **"Already Gone Home" Keepsake Showcase:** A dedicated warm honey strip and full-page tab celebrating adopted puppies with non-clickable circular keepsake portraits and unique photo pooling.
- **Custom Animated Mascot (`TeddyRunner`):** Interactive mascot integrated across the home stage and sketchbook header.
- **SPA-Ready Deployment:** Configured with `vercel.json` rewrite rules to support seamless direct navigation and browser refreshes across all client-side routes.

---

## 🛠️ Tech Stack

| Category | Technologies & Tools |
| :--- | :--- |
| **Frontend Framework** | React (`JSX`, Hooks: `useState`, `useMemo`, `useEffect`, `useRef`) |
| **Build Tool** | Vite |
| **Routing** | React Router DOM (`BrowserRouter`, dynamic `/puppies/:id` routes, `useNavigate`, `useSearchParams`) |
| **Animations** | Framer Motion (`motion`, `AnimatePresence`, scroll-linked & hover transitions) |
| **Icons & Graphics** | Lucide React, Custom Inline SVGs, Custom SVG Favicon |
| **Styling** | Modern CSS3 (`clamp()`, Flexbox, CSS Grid, `overscroll-behavior`, custom variables) |
| **Deployment & Hosting** | Git, GitHub, Vercel (CI/CD + SPA Rewrites) |

---

## 📁 Project Structure

```text
PebblePups/
├── public/
│   └── favicon.svg              # Custom PebblePups SVG favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Top navigation bar
│   │   ├── Footer.jsx           # Site footer
│   │   └── TeddyRunner.jsx      # Custom animated puppy mascot
│   ├── data/
│   │   └── puppiesData.js       # Centralized data for available, adopted & testimonial pups
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page with MeetThePups horizontal scroll lineup
│   │   ├── PuppiesPage.jsx      # Filterable puppy directory & Already Gone Home showcase
│   │   ├── PuppyDetailPage.jsx  # Dynamic puppy profile view (/puppies/:id)
│   │   └── HappyFamiliesPage.jsx# Testimonials and adoption stories
│   ├── App.jsx                  # Route definitions and layout wrapper
│   ├── App.css                  # Global design tokens and responsive styles
│   └── main.jsx                 # Application entry point
├── index.html                   # HTML template with custom favicon & title
├── vercel.json                  # Vercel SPA rewrite configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/techavocado/PebblePups.git
   cd PebblePups
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open the local URL shown in your terminal (typically `http://localhost:5173`).

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🌐 Deployment (Vercel)

This project is deployed on **Vercel** with continuous integration connected to the `main` branch. To prevent `404 NOT_FOUND` errors when refreshing nested React Router paths (such as `/happy-families` or `/puppies/:id`), the root `vercel.json` routes all requests to `index.html`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 👨‍💻 Author

Developed by **Himanshu Swami** ([@techavocado](https://github.com/techavocado))