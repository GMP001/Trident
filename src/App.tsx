import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import OceanTransport from './pages/OceanTransport';
import AdminLogin from './pages/AdminLogin';
import ContentEditor from './content/pages/admin/ContentEditor';

// Import other pages as needed
import InlandTransport from './pages/InlandTransport';
import LCL from './pages/LCL';
import AirFreight from './pages/AirFreight';
import GroundFreight from './pages/GroundFreight';
import Warehousing from './pages/Warehousing';
import Depot from './pages/Depot';
import ColdStorage from './pages/ColdStorage';
import CustomsServices from './pages/CustomsServices';
import ProjectLogistics from './pages/ProjectLogistics';
import FMCG from './pages/FMCG';
import FashionLifestyle from './pages/FashionLifestyle';
import Retail from './pages/Retail';
import Chemicals from './pages/Chemicals';
import Automotive from './pages/Automotive';
import PharmaHealthcare from './pages/PharmaHealthcare';
import TridentRate from './pages/TridentRate';
import OceanContract from './pages/OceanContract';
import SpecialCargo from './pages/SpecialCargo';
import SCM from './pages/scm';
import GOH from './pages/goh';
import CarsInContainers from './pages/carInContainer';
import Flexibags from './pages/flexibags';
import Leadership from './pages/Leadership';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/ocean-transport" element={<OceanTransport />} />
        <Route path="/inland-transport" element={<InlandTransport />} />
        <Route path="/lcl" element={<LCL />} />
        <Route path="/air-freight" element={<AirFreight />} />
        <Route path="/ground-freight" element={<GroundFreight />} />
        <Route path="/warehousing" element={<Warehousing />} />
        <Route path="/depot" element={<Depot />} />
        <Route path="/cold-storage" element={<ColdStorage />} />
        <Route path="/customs-services" element={<CustomsServices />} />
        <Route path="/project-logistics" element={<ProjectLogistics />} />
        <Route path="/industry/fmcg" element={<FMCG />} />
        <Route path="/fashion-lifestyle" element={<FashionLifestyle />} />
        <Route path="/industry/retail" element={<Retail />} />
        <Route path="/industry/chemicals" element={<Chemicals />} />
        <Route path="/industry/automotive" element={<Automotive />} />
        <Route path="/industry/pharma" element={<PharmaHealthcare />} />
        <Route path="/trident-rate" element={<TridentRate />} />
        <Route path="/ocean-contract" element={<OceanContract />} />
        <Route path="/special-cargo" element={<SpecialCargo />} />
        <Route path="/supply-chain-management" element={<SCM />} />
        <Route path="/garments-on-hanger" element={<GOH />} />
        <Route path="/cars-in-containers" element={<CarsInContainers />} />
        <Route path="/flexibag-logistics" element={<Flexibags />} />
        <Route path="/leadership" element={<Leadership />} />
        
        {/* Admin Routes - IMPORTANT */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/edit" element={<ContentEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
