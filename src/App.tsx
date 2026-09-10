import { MotionConfig } from "framer-motion";
import { lazy, Suspense } from "react";
import { About } from "./components/About";
import { Approach } from "./components/Approach";
import { BackToTop } from "./components/BackToTop";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { PurposeStrip } from "./components/PurposeStrip";
import { VisionMission } from "./components/VisionMission";

/* Below-fold sections are code-split so the critical path stays lean. */
const StrategicAreas = lazy(() =>
  import("./components/StrategicAreas").then((m) => ({ default: m.StrategicAreas })),
);
const StoryGallery = lazy(() =>
  import("./components/StoryGallery").then((m) => ({ default: m.StoryGallery })),
);
const ImpactPathway = lazy(() =>
  import("./components/ImpactPathway").then((m) => ({ default: m.ImpactPathway })),
);
const Targets = lazy(() =>
  import("./components/Targets").then((m) => ({ default: m.Targets })),
);
const Leadership = lazy(() =>
  import("./components/Leadership").then((m) => ({ default: m.Leadership })),
);
const Partnerships = lazy(() =>
  import("./components/Partnerships").then((m) => ({ default: m.Partnerships })),
);
const Cta = lazy(() => import("./components/Cta").then((m) => ({ default: m.Cta })));
const Contact = lazy(() =>
  import("./components/Contact").then((m) => ({ default: m.Contact })),
);

function PageFallback() {
  return <div aria-hidden="true" className="min-h-40 bg-ivory" />;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <PurposeStrip />
        <About />
        <VisionMission />
        <Approach />
        <Suspense fallback={<PageFallback />}>
          <StrategicAreas />
          <StoryGallery />
          <ImpactPathway />
          <Targets />
          <Leadership />
          <Partnerships />
          <Cta />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}