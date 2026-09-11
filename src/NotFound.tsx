import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { BackToTop } from "./components/BackToTop";

export function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex min-h-[60svh] flex-col items-center justify-center bg-ivory px-6 text-center">
        <p className="font-display text-7xl font-bold text-clay-500">404</p>
        <h1 className="mt-4 font-display text-3xl text-forest-950">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal/65">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-forest-950 px-8 text-sm font-bold tracking-wide text-ivory transition-colors hover:bg-clay-500"
        >
          Back to home
        </a>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
