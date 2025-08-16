import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ServicePreview from './components/ServicePreview';
import Services from './components/Services';
import Impact from './components/Impact';
import Donate from './components/Donate';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <ServicePreview />
      <Services />
      <Impact />
      <Donate />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;