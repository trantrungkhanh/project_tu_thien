import * as React from 'react';
import { useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AppTheme from '../shared-theme/AppTheme';

export default function MarketingPage(props) {
  // Tạo ref cho mỗi phần tử
  const highlightsRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const faqRef = useRef(null);
  const pricingRef = useRef(null);

  // Hàm cuộn đến vị trí của phần tử tương ứng
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar 
        onFeaturesClick={() => scrollToSection(featuresRef)}
        onHighlightsClick={() => scrollToSection(highlightsRef)}
        onTestimonialClick={() => scrollToSection(testimonialsRef)}
        onPricingClick={() => scrollToSection(pricingRef)}
        onFAQClick={() => scrollToSection(faqRef)}
        />
      <Hero />
      <div>
        <LogoCollection />
        <div ref={featuresRef}>
          <Features />
        </div>
        <Divider />
        <div ref={testimonialsRef}>
          <Testimonials />
        </div>
        <Divider />
        <div ref={highlightsRef}>
          <Highlights />
        </div>
        <Divider />
        <div ref={pricingRef}>
          <Pricing />
        </div>
        <Divider />
        <div ref={faqRef}>
          <FAQ />
        </div>
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
