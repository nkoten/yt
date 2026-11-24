import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import YouTubeChannelChecklist from './ytPage.jsx';

const Home = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-amber-500">Home Page</h2>
    <Link to="/about" className="text-sky-400 underline mt-4 inline-block">
      Ir para About
    </Link>
  </div>
);

const About = () => <YouTubeChannelChecklist />;

function App() {
  return (
    <HashRouter>
      <nav className="p-4 bg-[var(--ogx-0)] flex gap-4 border-b border-slate-700">
        <Link to="/" className="hover:text-amber-400 transition-colors">
          Home
        </Link>
        <Link to="/about" className="hover:text-sky-400 transition-colors">
          About
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById('app_root')).render(<App />);
