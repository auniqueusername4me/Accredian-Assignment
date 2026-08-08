# Accredian Enterprise Page Clone

This project is a high-fidelity recreation of the Accredian Enterprise website built with Next.js (App Router), Tailwind CSS, GSAP (for animations), and Lenis (for smooth scrolling).

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd Accredian
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
4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Vercel Deployment Steps

Deploying this Next.js app to Vercel is highly streamlined:

1. **Push your code to GitHub:** Ensure all your latest commits (like the ones we just made) are pushed to your GitHub repository.
2. **Log into Vercel:** Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
3. **Add New Project:** Click the **"Add New..."** button and select **"Project"**.
4. **Import Repository:** Find your `Accredian-Assignment` repository in the list and click **"Import"**.
5. **Configure Project:** 
   - Vercel will automatically detect that this is a **Next.js** framework project.
   - You do not need to change the Build Command or Output Directory (Vercel sets them to `npm run build` and `.next` by default).
6. **Deploy:** Click the **"Deploy"** button. Vercel will build the project and provide you with a live URL within minutes.

## Approach Taken

My primary goal was to create a highly interactive and premium clone of the Accredian Enterprise page. I focused heavily on visual excellence, utilizing modern design trends like smooth scroll (Lenis), complex GSAP scroll animations, parallax backgrounds, and glassmorphism overlays.

The architecture uses Next.js App Router. The UI is constructed from reusable, functional React components (e.g., `HeroSection`, `Features`, `Testimonials`, `DomainExpertise`, etc.) heavily styled with Tailwind CSS for rapid, responsive design. 

For interactivity and animations, I opted for GSAP with `ScrollTrigger` and `@gsap/react` to deliver a fluid, high-end feel, especially for the scroll-linked background lines and text reveal effects.

## AI Usage Explanation

AI tools (specifically Antigravity / Claude / Gemini) were instrumental throughout the development process as a pair-programmer:
- **Scaffolding & Boilerplate:** Used AI to quickly scaffold the Next.js project and set up the foundational Tailwind CSS architecture.
- **Component Generation:** AI helped generate the initial markup and styling for complex grid layouts (like the Features and Domain Expertise sections).
- **GSAP Animation Logic:** I leveraged AI to write the boilerplate for GSAP `ScrollTrigger` animations, such as the `RevealText` component and the interactive background lines.
- **Asset Gathering:** AI scripts were used to download and crop SVGs and logos from the original Accredian site to ensure high-fidelity replication.
- **Debugging:** AI was used to debug complex scroll-locking issues caused by combining GSAP, Lenis smooth scroll, and fixed position elements.

For a detailed breakdown of specific AI usage, challenges faced, and manual modifications, please refer to `project-challenges-and-ai-usage.txt`.

## Improvements With More Time

Given an additional 48 hours, I would implement the following:
1. **Dynamic Backend/API Integration:** Connect the form elements and lead capture sections to a real database (like Supabase or PostgreSQL) via Next.js Server Actions or API routes.
2. **Performance Optimization:** Implement `next/image` everywhere, lazy load off-screen components, and optimize the GSAP bundle size.
3. **Accessibility (a11y):** Ensure all interactive elements have proper ARIA attributes, ARIA roles, and are fully keyboard navigable.
4. **Dark Mode:** Introduce a fully tested, system-aware dark mode theme using Tailwind's `dark:` modifier.
