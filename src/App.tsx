import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import ContentEditor from './content/pages/admin/ContentEditor';
import GetQuote from './pages/GetQuote';
import ContactUs from './pages/ContactUs';
import Careers from './pages/Careers';
import OceanContract from './pages/OceanFreight';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/ocean-freight" element={<OceanContract />} />
        <Route path="/get-quote" element={<GetQuote />} />
        <Route path="/careers" element={<Careers />} />
        
        {/* Admin Routes - IMPORTANT */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/edit" element={<ContentEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
