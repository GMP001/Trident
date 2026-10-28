import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load all page components
const HomePage = lazy(() => import('./pages/HomePage'));
const About = lazy(() => import('./pages/About'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const ContentEditor = lazy(() => import('./content/pages/admin/ContentEditor'));
const GetQuote = lazy(() => import('./pages/GetQuote'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Careers = lazy(() => import('./pages/Careers'));
const OceanContract = lazy(() => import('./pages/OceanFreight'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-[#38bdf8] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/ocean-freight" element={<OceanContract />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/careers" element={<Careers />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/edit" element={<ContentEditor />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
