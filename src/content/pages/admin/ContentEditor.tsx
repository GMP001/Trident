import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentAPI, authAPI } from '../../../services/api';

const ContentEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState('about');
  const [content, setContent] = useState<any>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [dragActive, setDragActive] = useState(false);

  // Available pages for editing
  const pages = [
    { id: 'home', label: '🏠 Homepage (Landing Page)' },
    { id: 'about', label: 'About Us' },
    { id: 'ocean-transport', label: '🚢 Ocean Transport' },
    { id: 'inland-transport', label: '🚛 Inland Transport' },
    { id: 'lcl', label: '📦 LCL (Less-than-Container Load)' },
    { id: 'air-freight', label: '✈️ Air Freight' },
    { id: 'ground-freight', label: '🚚 Ground Freight' },
    { id: 'warehousing', label: '🏭 Warehousing & Distribution' },
    { id: 'depot', label: '🏗️ Depot Services' },
    { id: 'cold-storage', label: '❄️ Cold Storage' },
    { id: 'customs-services', label: '🛃 Customs Services' },
    { id: 'project-logistics', label: '🏗️ Project Logistics' },
    { id: 'fmcg', label: '🍎 FMCG' },
    { id: 'fashion-lifestyle', label: '👗 Fashion & Lifestyle' },
    { id: 'retail', label: '🏬 Retail' },
    { id: 'chemicals', label: '🧪 Chemicals' },
    { id: 'automotive', label: '🚗 Automotive' },
    { id: 'pharma-healthcare', label: '💊 Pharma & Healthcare' },
    { id: 'trident-rate', label: '💰 Trident Rate' },
    { id: 'ocean-contract', label: '📄 Ocean Contract' },
    { id: 'special-cargo', label: '📦 Special Cargo' },
    { id: 'scm', label: '📊 Supply Chain Management' },
    { id: 'goh', label: '👕 Garments on Hanger' },
    { id: 'cars-in-containers', label: '🚗 Cars in Containers' },
    { id: 'flexibags', label: '💧 Flexibag Logistics' },
    { id: 'leadership', label: '👥 Leadership' },
  ];


// ========== HOMEPAGE SECTION RENDER FUNCTIONS ==========
    // Render Hero Section for Homepage
    const renderHomeHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.image', page.hero.image || '')}
        {renderEditableField('Button 1 Text', 'hero.button1Text', page.hero.button1Text || '')}
        {renderEditableField('Button 2 Text', 'hero.button2Text', page.hero.button2Text || '')}
        </div>
    );
    };

    // Render Be Ready Section for Homepage
    const renderBeReadySection = (page: any) => {
    if (!page.beReady) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">"Be Ready" Section</h3>
        {renderEditableField('Title First Line', 'beReady.title', page.beReady.title || '')}
        {renderEditableField('Title Second Line', 'beReady.subtitle', page.beReady.subtitle || '')}
        {renderEditableField('Description', 'beReady.description', page.beReady.description || '', true)}
        {renderImageUpload('Background Video', 'beReady.video', page.beReady.video || '')}
        </div>
    );
    };

    // Render Call Us Section for Homepage
    const renderCallUsSection = (page: any) => {
    if (!page.callUs) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call Us Section</h3>
        {renderEditableField('Phone Number', 'callUs.phoneNumber', page.callUs.phoneNumber || '')}
        {renderEditableField('WhatsApp Number', 'callUs.whatsappNumber', page.callUs.whatsappNumber || '')}
        </div>
    );
    };

    // Render East-West Network Section for Homepage
    const renderEastWestNetworkSection = (page: any) => {
    if (!page.eastWestNetwork) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">East-West Network Section</h3>
        {renderEditableField('Title', 'eastWestNetwork.title', page.eastWestNetwork.title || '')}
        {renderEditableField('Description', 'eastWestNetwork.description', page.eastWestNetwork.description || '', true)}
        {renderImageUpload('Image', 'eastWestNetwork.image', page.eastWestNetwork.image || '')}
        {renderEditableField('Button Text', 'eastWestNetwork.buttonText', page.eastWestNetwork.buttonText || '')}
        </div>
    );
    };

    // Render Logistics Trend Map Section for Homepage
    const renderLogisticsTrendMapSection = (page: any) => {
    if (!page.logisticsTrendMap) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Logistics Trend Map Section</h3>
        {renderEditableField('Title', 'logisticsTrendMap.title', page.logisticsTrendMap.title || '')}
        {renderEditableField('Description', 'logisticsTrendMap.description', page.logisticsTrendMap.description || '', true)}
        {renderImageUpload('Image', 'logisticsTrendMap.image', page.logisticsTrendMap.image || '')}
        {renderEditableField('Button Text', 'logisticsTrendMap.buttonText', page.logisticsTrendMap.buttonText || '')}
        </div>
    );
    };

    // Render Industry Sectors Section for Homepage
    const renderIndustrySectorsSection = (page: any) => {
    if (!page.industrySectors) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Industry Sectors Section</h3>
        {renderEditableField('Title', 'industrySectors.title', page.industrySectors.title || '')}
        {renderEditableField('Description', 'industrySectors.description', page.industrySectors.description || '', true)}
        </div>
    );
    };

  // Render Logistics Services Section for Homepage
  const renderLogisticsServicesSection = (page: any) => {
    const logisticsServices = page.logisticsServices || {};
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Logistics Services & Solutions</h3>
        
        {renderEditableField('Section Title', 'logisticsServices.title', logisticsServices.title || 'Logistics services and solutions')}
        {renderEditableField('Section Description', 'logisticsServices.description', logisticsServices.description || '', true)}
        
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            📌 <strong>Note:</strong> The tabbed interface (Transport, Logistics Management, Solutions) and cards below are currently static.
            To make them editable, a more complex backend structure would be needed.
          </p>
        </div>
      </div>
    );
  };

  const getEditableSections = (pageId: string) => {
    if (pageId === 'home') {
      return ['hero', 'beReady', 'callUs', 'eastWestNetwork', 'logisticsTrendMap', 'logisticsServices', 'industrySectors'];
    }
    if (pageId === 'about') {
        return ['hero', 'purpose', 'vision', 'values', 'leadership', 'sustainability', 'cta'];
    }
    if (pageId === 'ocean-transport') {
        return ['hero', 'predictableDeliveries', 'eastWestNetwork', 'gallery', 'faqs', 'cta'];
    }
    if (pageId === 'inland-transport') {
        return ['hero', 'features', 'servicesDescription', 'solutions', 'cta'];
    }
    if (pageId === 'lcl') {
        return ['hero', 'promotionalCard', 'whatIsLCL', 'whyChooseLCL', 'lclVsFCL', 'whenToUseLCL', 'howItWorks', 'costInfo', 'faqs', 'cta'];
    }
      if (pageId === 'air-freight') {
        return ['hero', 'servicesTitle', 'airFreight', 'tridentAirCargo', 'seaAir', 'airCharter', 'whyChooseUs', 'howItWorks', 'faqs', 'cta'];
    }
    if (pageId === 'ground-freight') {
        return ['hero', 'servicesTitle', 'fullTruckload', 'lessThanTruckload', 'crossBorder', 'whyChooseUs', 'contactSteps', 'needSupport', 'faqs', 'cta'];
    }
    if (pageId === 'warehousing') {
        return ['hero', 'buildSupplyChain', 'whyTrident', 'servicesOffer', 'wmsSupport', 'cta'];
    }
      if (pageId === 'depot') {
        return ['hero', 'overview', 'services', 'contact'];
    }
    if (pageId === 'cold-storage') {
      return ['hero', 'benefits', 'advantages', 'contact', 'cta'];
    }
    if (pageId === 'customs-services') {
      return ['hero', 'localExpertise', 'whyChooseUs', 'contact', 'cta'];
    }
    if (pageId === 'project-logistics') {
      return ['hero', 'overview', 'services', 'whyChooseUs', 'contact', 'cta'];
    }
    if (pageId === 'fmcg') {
      return ['hero', 'overview', 'strategy', 'segments', 'contact', 'cta'];
    }
    if (pageId === 'fashion-lifestyle') {
      return ['hero', 'overview', 'growStrategy', 'industries', 'contact', 'cta'];
    }
    if (pageId === 'retail') {
      return ['hero', 'overview', 'strategy', 'categories', 'contact', 'cta'];
    }
    if (pageId === 'chemicals') {
      return ['hero', 'overview', 'industryOverview', 'trends', 'servicesOverview', 'chemicalTypes', 'contact', 'cta'];
    }
    if (pageId === 'automotive') {
      return ['hero', 'overview', 'strategy', 'sectors', 'contact', 'cta'];
    }
    if (pageId === 'pharma-healthcare') {
      return ['hero', 'overview', 'strategy', 'segments', 'contact', 'cta'];
    }
    if (pageId === 'trident-rate') {
      return ['hero', 'shippingMadeSimple', 'whyTridentRate', 'cta'];
    }
    if (pageId === 'ocean-contract') {
      return ['hero', 'overview', 'whyChooseUs', 'contractProducts', 'cta'];
    }
    if (pageId === 'special-cargo') {
      return ['hero', 'overview', 'oneStopShop', 'cargoTypes', 'containerSpecs', 'cta'];
    }
    if (pageId === 'scm') {
      return ['hero', 'section1', 'section2', 'section3', 'buildingSolutions', 'resilienceModel', 'supplyChainPlatform', 'gartnerRecognition', 'digitalTransformation', 'cta'];
    }
    if (pageId === 'goh') {
      return ['hero', 'overview', 'whyChooseUs', 'servicesInclude', 'services', 'systems', 'contact', 'cta'];
    }
    if (pageId === 'cars-in-containers') {
      return ['hero', 'whatIsCiC', 'whyComplement', 'whyNeedCiC', 'howItWorks', 'benefits', 'contact', 'cta'];
    }
    if (pageId === 'flexibags') {
      return ['hero', 'whatIsFlexibag', 'idealChoice', 'whatAreFlexibags', 'needMoreInfo', 'howItWorks', 'benefits', 'contact', 'cta'];
    }
    if (pageId === 'leadership') {
      return ['hero', 'introSection', 'leaders', 'cta'];
    }
    return ['hero', 'cta'];
  };

  useEffect(() => {
    document.body.classList.add('admin-mode');
    checkAuth();
    
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    try {
      await authAPI.verify(token);
      loadContent();
    } catch (error) {
      localStorage.removeItem('admin_token');
      navigate('/admin/login');
    }
  };

  const loadContent = async () => {
    try {
      const allContent = await contentAPI.getAll();
      setContent(allContent);
      setLoading(false);
    } catch (error) {
      console.error('Error loading content:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    localStorage.removeItem('admin_role');
    navigate('/admin/login');
  };

  // Handle image upload
  const handleImageUpload = async (file: File, fieldPath: string) => {
    
    setUploadingImage(true);
    setEditingField(fieldPath);
    
    // Check file size (200MB max)
    if (file.size > 200 * 1024 * 1024) {
      setSaveMessage('❌ File too large. Maximum size is 200MB.');
      setTimeout(() => setSaveMessage(''), 3000);
      setUploadingImage(false);
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }
      
      const data = await response.json();
      const filePath = data.filePath;
      
      // Update the page content with the new file path
      const currentPageContent = { ...content.pages[selectedPage] };
      const fieldParts = fieldPath.split('.');
      
      if (fieldParts.length === 2) {
        if (!currentPageContent[fieldParts[0]]) currentPageContent[fieldParts[0]] = {};
        currentPageContent[fieldParts[0]][fieldParts[1]] = filePath;
      } else if (fieldParts.length === 3) {
        const arrayName = fieldParts[0];
        const index = parseInt(fieldParts[1]);
        const property = fieldParts[2];
        
        if (!currentPageContent[arrayName]) {
          currentPageContent[arrayName] = [];
        }
        if (!currentPageContent[arrayName][index]) {
          currentPageContent[arrayName][index] = {};
        }
        currentPageContent[arrayName][index][property] = filePath;
      } else {
      }
      
      // Save to backend
      await contentAPI.updatePage(selectedPage, currentPageContent);
      
      // Update local state
      const updatedContent = { ...content };
      updatedContent.pages[selectedPage] = currentPageContent;
      setContent(updatedContent);
      
      setSaveMessage(`✅ ${data.fileType || 'File'} uploaded and saved successfully!`);
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('❌ Failed to upload file. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setUploadingImage(false);
      setEditingField(null);
    }
  };

  const startEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const saveEdit = async () => {
    setSaving(true);
    
    try {
      const currentPageContent = { ...content.pages[selectedPage] };
      const fieldParts = editingField!.split('.');
      
      if (fieldParts.length === 2) {
        currentPageContent[fieldParts[0]][fieldParts[1]] = editValue;
      } else if (fieldParts.length === 3) {
        const arrayName = fieldParts[0];
        const index = parseInt(fieldParts[1]);
        const property = fieldParts[2];
        currentPageContent[arrayName][index][property] = editValue;
      } else if (fieldParts.length === 1) {
        currentPageContent[fieldParts[0]] = editValue;
      }
      
      await contentAPI.updatePage(selectedPage, currentPageContent);
      
      const updatedContent = { ...content };
      updatedContent.pages[selectedPage] = currentPageContent;
      setContent(updatedContent);
      setEditingField(null);
      setSaveMessage('✅ Content saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('❌ Failed to save content');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const togglePageActive = async () => {
    setSaving(true);
    
    try {
      const currentPageContent = { ...content.pages[selectedPage] };
      currentPageContent.isActive = !currentPageContent.isActive;
      
      await contentAPI.updatePage(selectedPage, currentPageContent);
      
      const updatedContent = { ...content };
      updatedContent.pages[selectedPage] = currentPageContent;
      setContent(updatedContent);
      setSaveMessage(`✅ Page ${currentPageContent.isActive ? 'activated' : 'deactivated'}!`);
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('❌ Failed to update page status');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, fieldPath: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith('image/')) {
      handleImageUpload(files[0], fieldPath);
    } else {
      setSaveMessage('❌ Please drop an image file');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Render image upload with drag & drop
  const renderImageUpload = (label: string, fieldPath: string, currentImage: string) => {
    const isUploading = uploadingImage && editingField === fieldPath;
    
    // Create a unique key for this upload field
    const uniqueKey = fieldPath.replace(/\./g, '_');
    
    return (
      <div className="mb-4 p-4 border-2 border-dashed rounded-lg transition-all" style={{ borderColor: dragActive ? '#3b82f6' : '#d1d5db', backgroundColor: dragActive ? '#eff6ff' : '#f9fafb' }}>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        
        {/* Current Image Preview */}
        {currentImage && !isUploading && (
          <div className="mb-3">
            <img src={currentImage.startsWith('/uploads') ? `http://localhost:5000${currentImage}` : currentImage} alt="Current" className="max-w-full h-32 object-cover rounded-lg border" />
            <p className="text-xs text-gray-500 mt-1">Current: {currentImage.split('/').pop()}</p>
          </div>
        )}
        
        {/* Drag & Drop Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={(e) => handleDrop(e, fieldPath)}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onClick={() => {
            setEditingField(fieldPath);
            fileInputRefs.current[uniqueKey]?.click();
          }}
        >
          {isUploading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-sm text-gray-600">Uploading image...</p>
            </div>
          ) : (
            <>
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </>
          )}
        </div>
        
        <input
          ref={(el) => {
            fileInputRefs.current[uniqueKey] = el;
          }}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleImageUpload(e.target.files[0], fieldPath);
            }
          }}
        />
      </div>
    );
  };

  // Render editable field
  const renderEditableField = (label: string, fieldPath: string, value: string, isTextArea = false) => {
    if (editingField === fieldPath) {
      return (
        <div className="mb-4">
          {isTextArea ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <div className="mt-2 flex gap-2">
            <button onClick={saveEdit} className="bg-green-600 text-white px-4 py-1 rounded-md text-sm" disabled={saving}>
              Save
            </button>
            <button onClick={() => setEditingField(null)} className="bg-gray-400 text-white px-4 py-1 rounded-md text-sm">
              Cancel
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex justify-between items-start mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <p className="text-gray-800">{value || '(empty)'}</p>
        </div>
        <button onClick={() => startEdit(fieldPath, value)} className="text-blue-600 text-sm hover:underline ml-4">
          Edit
        </button>
      </div>
    );
  };


// ========== ABOUT US SECTION RENDER FUNCTIONS ==========
  // Render Hero Section with image upload
  const renderHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '')}
        {page.hero.ctaText && renderEditableField('Button Text', 'hero.ctaText', page.hero.ctaText)}
        
        {/* Image/Video Upload - Supports MP4, JPG, PNG, GIF, WebP */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Background (Image or Video)
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Supported formats: MP4, JPG, PNG, GIF, WebP (Max 10MB)
          </p>
          {renderImageUpload('Background Media', 'hero.media', page.hero.media || page.hero.image || '/about_us.mp4')}
        </div>
        
        {/* Media Type Hint */}
        <div className="mt-2 p-2 bg-blue-50 rounded-md">
          <p className="text-xs text-blue-600">
            💡 Tip: Upload .mp4 files for video background, or .jpg/.png for static image background.
            The frontend will automatically detect and display the correct format.
          </p>
        </div>
      </div>
    );
  };

  // Render Values Section with image upload for each value
  const renderValuesSection = (page: any) => {
    if (!page.values) return null;
        
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Core Values</h3>
        {page.values.map((value: any, index: number) => {
          
          return (
            <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
              <h4 className="font-medium text-gray-700 mb-3">Value {index + 1}</h4>
              {renderEditableField(`Title`, `values.${index}.title`, value.title || '')}
              {renderEditableField(`Description`, `values.${index}.description`, value.description || '', true)}
              {renderImageUpload(`Image`, `values.${index}.image`, value.image || '')}
            </div>
          );
        })}
      </div>
    );
  };

  // Render Leadership Section with image upload
  const renderLeadershipSection = (page: any) => {
    if (!page.leadership) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Leadership Section</h3>
        {renderEditableField('Leadership Title', 'leadership.title', page.leadership.title || '')}
        {renderEditableField('Leadership Description', 'leadership.description', page.leadership.description || '', true)}
        {renderImageUpload('Leadership Image', 'leadership.image', page.leadership.image || '')}
      </div>
    );
  };

  // Render Sustainability Section with image upload
  const renderSustainabilitySection = (page: any) => {
    if (!page.sustainability) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Sustainability Section</h3>
        {renderEditableField('Sustainability Title', 'sustainability.title', page.sustainability.title || '')}
        {renderEditableField('Sustainability Description', 'sustainability.description', page.sustainability.description || '', true)}
        {renderImageUpload('Sustainability Image', 'sustainability.image', page.sustainability.image || '')}
      </div>
    );
  };

  // Rest of the sections (Purpose, Vision, CTA) remain the same
  const renderPurposeSection = (page: any) => {
    if (!page.purpose) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Purpose Section</h3>
        {renderImageUpload('Purpose Image', 'purpose.image', page.purpose.image || '')}
        {renderEditableField('Purpose Heading', 'purpose.heading', page.purpose.heading || '', true)}
        {renderEditableField('Purpose Text', 'purpose.text', page.purpose.text || '', true)}
        {renderEditableField('Purpose Tags (comma separated)', 'purpose.tags', page.purpose.tags?.join(', ') || '', false)}
      </div>
    );
  };

  const renderVisionSection = (page: any) => {
    if (!page.vision) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Vision Section</h3>
        {renderEditableField('Vision Title', 'vision.title', page.vision.title || '', true)}
        {renderEditableField('Vision Description', 'vision.description', page.vision.description || '', true)}
      </div>
    );
  };

  const renderCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button 1 Text', 'cta.button1Text', page.cta.button1Text || '')}
        {renderEditableField('Button 2 Text', 'cta.button2Text', page.cta.button2Text || '')}
      </div>
    );
  };


// ========== OCEAN TRANSPORT SECTION RENDER FUNCTIONS ==========
    // Render Hero Section for Ocean Transport
    const renderOceanHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.video', page.hero.video || '')}
        </div>
    );
    };

    // Render Predictable Deliveries Section for Ocean Transport
    const renderPredictableDeliveriesSection = (page: any) => {
    if (!page.predictableDeliveries) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Predictable Deliveries Section</h3>
        {renderEditableField('Title', 'predictableDeliveries.title', page.predictableDeliveries.title || '')}
        {renderEditableField('Description', 'predictableDeliveries.description', page.predictableDeliveries.description || '', true)}
        {renderEditableField('Description 2', 'predictableDeliveries.description2', page.predictableDeliveries.description2 || '', true)}
        {renderImageUpload('Image', 'predictableDeliveries.image', page.predictableDeliveries.image || '')}
        </div>
    );
    };

    // Render East-West Network Section for Ocean Transport
    const renderOceanEastWestNetworkSection = (page: any) => {
    if (!page.eastWestNetwork) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">East-West Network Section</h3>
        {renderEditableField('Title', 'eastWestNetwork.title', page.eastWestNetwork.title || '')}
        {renderEditableField('Description', 'eastWestNetwork.description', page.eastWestNetwork.description || '', true)}
        {renderEditableField('Description 2', 'eastWestNetwork.description2', page.eastWestNetwork.description2 || '', true)}
        {renderImageUpload('Image', 'eastWestNetwork.image', page.eastWestNetwork.image || '')}
        {renderEditableField('Button 1 Text', 'eastWestNetwork.button1Text', page.eastWestNetwork.button1Text || '')}
        {renderEditableField('Button 2 Text', 'eastWestNetwork.button2Text', page.eastWestNetwork.button2Text || '')}
        </div>
    );
    };

    // Render Gallery Section for Ocean Transport
    const renderGallerySection = (page: any) => {
    if (!page.gallery) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Gallery Section</h3>
        {renderEditableField('Gallery Title', 'gallery.title', page.gallery.title || '')}
        {page.gallery.images && page.gallery.images.map((image: string, index: number) => (
            <div key={index}>
            {renderImageUpload(`Gallery Image ${index + 1}`, `gallery.images.${index}`, image)}
            </div>
        ))}
        </div>
    );
    };

    // Render FAQs Section for Ocean Transport
    const renderFaqsSection = (page: any) => {
    if (!page.faqs) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">FAQs Section</h3>
        {page.faqs.map((faq: any, index: number) => (
            <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">FAQ {index + 1}</h4>
            {renderEditableField(`Question`, `faqs.${index}.question`, faq.question || '', true)}
            {renderEditableField(`Answer`, `faqs.${index}.answer`, faq.answer || '', true)}
            </div>
        ))}
        </div>
    );
    };

    // Render CTA Section for Ocean Transport
    const renderOceanCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
        </div>
    );
    };

// ========== INLAND TRANSPORT SECTION RENDER FUNCTIONS ==========
    // Render Hero Section for Inland Transport
    const renderInlandHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.video', page.hero.video || '')}
        {renderEditableField('Button 1 Text', 'hero.button1Text', page.hero.button1Text || '')}
        {renderEditableField('Button 2 Text', 'hero.button2Text', page.hero.button2Text || '')}
        </div>
    );
    };

    // Render Features Section for Inland Transport
    const renderInlandFeaturesSection = (page: any) => {
    if (!page.features) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Features Section (3 Cards)</h3>
        {page.features.map((feature: any, index: number) => (
            <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Feature {index + 1}</h4>
            {renderEditableField(`Title`, `features.${index}.title`, feature.title || '')}
            {renderEditableField(`Description`, `features.${index}.description`, feature.description || '', true)}
            </div>
        ))}
        </div>
    );
    };

    // Render Services Description Section for Inland Transport
    const renderInlandServicesDescriptionSection = (page: any) => {
    if (!page.servicesDescription) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Services Description Section</h3>
        {renderEditableField('Title', 'servicesDescription.title', page.servicesDescription.title || '')}
        {renderEditableField('Description', 'servicesDescription.description', page.servicesDescription.description || '', true)}
        {renderImageUpload('Image', 'servicesDescription.image', page.servicesDescription.image || '')}
        </div>
    );
    };

    // Render Solutions Section for Inland Transport
    const renderInlandSolutionsSection = (page: any) => {
    if (!page.solutions) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Solutions Section (Service Cards)</h3>
        {page.solutions.map((solution: any, index: number) => (
            <div key={index} className="ml-4 mb-8 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Solution {index + 1}: {solution.title}</h4>
            {renderEditableField(`Title`, `solutions.${index}.title`, solution.title || '')}
            {renderEditableField(`Description`, `solutions.${index}.description`, solution.description || '', true)}
            {renderImageUpload(`Image`, `solutions.${index}.image`, solution.image || '')}
            {renderEditableField(`Button 1 Text`, `solutions.${index}.button1Text`, solution.button1Text || '')}
            {renderEditableField(`Button 2 Text`, `solutions.${index}.button2Text`, solution.button2Text || '')}
            </div>
        ))}
        </div>
    );
    };

    // Render CTA Section for Inland Transport
    const renderInlandCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button 1 Text', 'cta.button1Text', page.cta.button1Text || '')}
        {renderEditableField('Button 2 Text', 'cta.button2Text', page.cta.button2Text || '')}
        </div>
    );
    };

// ========== LCL SECTION RENDER FUNCTIONS ==========
    // Render Hero Section for LCL
    const renderLCLHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.video', page.hero.video || '')}
        {renderEditableField('Button 1 Text', 'hero.button1Text', page.hero.button1Text || '')}
        {renderEditableField('Button 2 Text', 'hero.button2Text', page.hero.button2Text || '')}
        </div>
    );
    };

    // Render Promotional Card Section
    const renderPromotionalCardSection = (page: any) => {
    if (!page.promotionalCard) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Promotional Card Section</h3>
        {renderEditableField('Title', 'promotionalCard.title', page.promotionalCard.title || '')}
        {renderEditableField('Description', 'promotionalCard.description', page.promotionalCard.description || '', true)}
        {renderEditableField('Button Text', 'promotionalCard.buttonText', page.promotionalCard.buttonText || '')}
        </div>
    );
    };

    // Render What is LCL Section
    const renderWhatIsLCLSection = (page: any) => {
    if (!page.whatIsLCL) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">What is LCL Section</h3>
        {renderEditableField('Title', 'whatIsLCL.title', page.whatIsLCL.title || '')}
        {renderEditableField('Description', 'whatIsLCL.description', page.whatIsLCL.description || '', true)}
        {renderEditableField('Description 2', 'whatIsLCL.description2', page.whatIsLCL.description2 || '', true)}
        {renderImageUpload('Image', 'whatIsLCL.image', page.whatIsLCL.image || '')}
        {renderEditableField('Image Caption', 'whatIsLCL.imageCaption', page.whatIsLCL.imageCaption || '')}
        </div>
    );
    };

    // Render Why Choose LCL Section
    const renderWhyChooseLCLSection = (page: any) => {
    if (!page.whyChooseLCL) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Choose LCL Section</h3>
        {renderEditableField('Title', 'whyChooseLCL.title', page.whyChooseLCL.title || '')}
        {renderEditableField('Description', 'whyChooseLCL.description', page.whyChooseLCL.description || '', true)}
        {renderEditableField('Description 2', 'whyChooseLCL.description2', page.whyChooseLCL.description2 || '', true)}
        {renderImageUpload('Image', 'whyChooseLCL.image', page.whyChooseLCL.image || '')}
        {renderEditableField('Image Caption', 'whyChooseLCL.imageCaption', page.whyChooseLCL.imageCaption || '')}
        {renderEditableField('Button Text', 'whyChooseLCL.buttonText', page.whyChooseLCL.buttonText || '')}
        </div>
    );
    };

    // Render LCL vs FCL Section
    const renderLCLVsFCLSection = (page: any) => {
    if (!page.lclVsFCL) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">LCL vs FCL Section</h3>
        {renderEditableField('Title', 'lclVsFCL.title', page.lclVsFCL.title || '')}
        {renderEditableField('Description', 'lclVsFCL.description', page.lclVsFCL.description || '', true)}
        {renderEditableField('Description 2', 'lclVsFCL.description2', page.lclVsFCL.description2 || '', true)}
        {renderEditableField('Description 3', 'lclVsFCL.description3', page.lclVsFCL.description3 || '', true)}
        {renderImageUpload('Image', 'lclVsFCL.image', page.lclVsFCL.image || '')}
        {renderEditableField('Image Caption', 'lclVsFCL.imageCaption', page.lclVsFCL.imageCaption || '')}
        </div>
    );
    };

    // Render When to Use LCL Section
    const renderWhenToUseLCLSection = (page: any) => {
    if (!page.whenToUseLCL) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">When to Use LCL Section</h3>
        {renderEditableField('Title', 'whenToUseLCL.title', page.whenToUseLCL.title || '')}
        {renderEditableField('Description', 'whenToUseLCL.description', page.whenToUseLCL.description || '', true)}
        {renderEditableField('Description 2', 'whenToUseLCL.description2', page.whenToUseLCL.description2 || '', true)}
        {renderImageUpload('Image', 'whenToUseLCL.image', page.whenToUseLCL.image || '')}
        {renderEditableField('Image Caption', 'whenToUseLCL.imageCaption', page.whenToUseLCL.imageCaption || '')}
        {renderEditableField('Button Text', 'whenToUseLCL.buttonText', page.whenToUseLCL.buttonText || '')}
        </div>
    );
    };

    // Render How It Works Section
    const renderHowItWorksSection = (page: any) => {
    if (!page.howItWorks) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">How It Works Section</h3>
        {renderEditableField('Title', 'howItWorks.title', page.howItWorks.title || '')}
        {renderEditableField('Description', 'howItWorks.description', page.howItWorks.description || '', true)}
        {renderEditableField('Description 2', 'howItWorks.description2', page.howItWorks.description2 || '', true)}
        {renderEditableField('Description 3', 'howItWorks.description3', page.howItWorks.description3 || '', true)}
        {renderEditableField('Description 4', 'howItWorks.description4', page.howItWorks.description4 || '', true)}
        {renderImageUpload('Image', 'howItWorks.image', page.howItWorks.image || '')}
        {renderEditableField('Image Caption', 'howItWorks.imageCaption', page.howItWorks.imageCaption || '')}
        {renderEditableField('Button Text', 'howItWorks.buttonText', page.howItWorks.buttonText || '')}
        </div>
    );
    };

    // Render Cost Info Section
    const renderCostInfoSection = (page: any) => {
    if (!page.costInfo) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Cost Information Section</h3>
        {renderEditableField('Title', 'costInfo.title', page.costInfo.title || '')}
        {renderEditableField('Description', 'costInfo.description', page.costInfo.description || '', true)}
        {renderEditableField('Description 2', 'costInfo.description2', page.costInfo.description2 || '', true)}
        {renderEditableField('Description 3', 'costInfo.description3', page.costInfo.description3 || '', true)}
        {renderImageUpload('Image', 'costInfo.image', page.costInfo.image || '')}
        {renderEditableField('Image Caption', 'costInfo.imageCaption', page.costInfo.imageCaption || '')}
        {renderEditableField('Button Text', 'costInfo.buttonText', page.costInfo.buttonText || '')}
        </div>
    );
    };

    // Render LCL FAQs Section
    const renderLCLFaqsSection = (page: any) => {
    if (!page.faqs) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">FAQs Section</h3>
        {page.faqs.map((faq: any, index: number) => (
            <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">FAQ {index + 1}</h4>
            {renderEditableField(`Question`, `faqs.${index}.question`, faq.question || '', true)}
            {renderEditableField(`Answer`, `faqs.${index}.answer`, faq.answer || '', true)}
            </div>
        ))}
        </div>
    );
    };

    // Render LCL CTA Section
    const renderLCLCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button 1 Text', 'cta.button1Text', page.cta.button1Text || '')}
        {renderEditableField('Button 2 Text', 'cta.button2Text', page.cta.button2Text || '')}
        </div>
    );
    };

// ========== AIR FREIGHT SECTION RENDER FUNCTIONS ==========
    // Render Hero Section for Air Freight
    const renderAirHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.video', page.hero.video || '')}
        {renderEditableField('Button 1 Text', 'hero.button1Text', page.hero.button1Text || '')}
        {renderEditableField('Button 2 Text', 'hero.button2Text', page.hero.button2Text || '')}
        </div>
    );
    };

    // Render Services Title Section
    const renderServicesTitleSection = (page: any) => {
    if (!page.servicesTitle) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Services Title Section</h3>
        {renderEditableField('Title', 'servicesTitle.title', page.servicesTitle.title || '')}
        {renderEditableField('Description', 'servicesTitle.description', page.servicesTitle.description || '', true)}
        </div>
    );
    };

    // Render Air Freight Section
    const renderAirFreightSection = (page: any) => {
    if (!page.airFreight) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Air Freight Section</h3>
        {renderEditableField('Title', 'airFreight.title', page.airFreight.title || '')}
        {renderEditableField('Description', 'airFreight.description', page.airFreight.description || '', true)}
        {page.airFreight.points && page.airFreight.points.map((point: string, index: number) => (
            <div key={index}>
            {renderEditableField(`Point ${index + 1}`, `airFreight.points.${index}`, point || '')}
            </div>
        ))}
        {renderImageUpload('Image', 'airFreight.image', page.airFreight.image || '')}
        </div>
    );
    };

    // Render Trident Air Cargo Section
    const renderTridentAirCargoSection = (page: any) => {
    if (!page.tridentAirCargo) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Trident Air Cargo Section</h3>
        {renderEditableField('Title', 'tridentAirCargo.title', page.tridentAirCargo.title || '')}
        {renderEditableField('Description', 'tridentAirCargo.description', page.tridentAirCargo.description || '', true)}
        {renderEditableField('Description 2', 'tridentAirCargo.description2', page.tridentAirCargo.description2 || '', true)}
        {renderImageUpload('Image', 'tridentAirCargo.image', page.tridentAirCargo.image || '')}
        </div>
    );
    };

    // Render Sea-Air Section
    const renderSeaAirSection = (page: any) => {
    if (!page.seaAir) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Sea-Air Section</h3>
        {renderEditableField('Title', 'seaAir.title', page.seaAir.title || '')}
        {renderEditableField('Description', 'seaAir.description', page.seaAir.description || '', true)}
        {renderEditableField('Description 2', 'seaAir.description2', page.seaAir.description2 || '', true)}
        {renderImageUpload('Image', 'seaAir.image', page.seaAir.image || '')}
        </div>
    );
    };

    // Render Air Charter Section
    const renderAirCharterSection = (page: any) => {
    if (!page.airCharter) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Air Charter Section</h3>
        {renderEditableField('Title', 'airCharter.title', page.airCharter.title || '')}
        {renderEditableField('Description', 'airCharter.description', page.airCharter.description || '', true)}
        {page.airCharter.points && page.airCharter.points.map((point: string, index: number) => (
            <div key={index}>
            {renderEditableField(`Point ${index + 1}`, `airCharter.points.${index}`, point || '')}
            </div>
        ))}
        {renderImageUpload('Image', 'airCharter.image', page.airCharter.image || '')}
        </div>
    );
    };

    // Render Why Choose Us Section
    const renderWhyChooseUsSection = (page: any) => {
    if (!page.whyChooseUs) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Choose Us Section</h3>
        {renderEditableField('Title', 'whyChooseUs.title', page.whyChooseUs.title || '')}
        {page.whyChooseUs.benefits && page.whyChooseUs.benefits.map((benefit: any, index: number) => (
            <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Benefit {index + 1}</h4>
            {renderEditableField(`Title`, `whyChooseUs.benefits.${index}.title`, benefit.title || '')}
            {renderEditableField(`Description`, `whyChooseUs.benefits.${index}.description`, benefit.description || '', true)}
            </div>
        ))}
        </div>
    );
    };

    // Render How It Works Section for Air Freight
    const renderAirHowItWorksSection = (page: any) => {
    if (!page.howItWorks) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">How It Works Section</h3>
        {renderEditableField('Title', 'howItWorks.title', page.howItWorks.title || '')}
        {renderEditableField('Button 1 Text', 'howItWorks.button1Text', page.howItWorks.button1Text || '')}
        {renderEditableField('Button 2 Text', 'howItWorks.button2Text', page.howItWorks.button2Text || '')}
        </div>
    );
    };

    // Render Air Freight FAQs Section
    const renderAirFaqsSection = (page: any) => {
    if (!page.faqs) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">FAQs Section</h3>
        {page.faqs.map((faq: any, index: number) => (
            <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            {renderEditableField(`Question`, `faqs.${index}.question`, faq.question || '', true)}
            {renderEditableField(`Answer`, `faqs.${index}.answer`, faq.answer || '', true)}
            </div>
        ))}
        </div>
    );
    };

    // Render Air Freight CTA Section
    const renderAirCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button 1 Text', 'cta.button1Text', page.cta.button1Text || '')}
        {renderEditableField('Button 2 Text', 'cta.button2Text', page.cta.button2Text || '')}
        </div>
    );
    };

// ========== GROUND FREIGHT SECTION RENDER FUNCTIONS ==========
    // Render Hero Section for Ground Freight
    const renderGroundHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.video', page.hero.video || '')}
        {renderEditableField('Button 1 Text', 'hero.button1Text', page.hero.button1Text || '')}
        {renderEditableField('Button 2 Text', 'hero.button2Text', page.hero.button2Text || '')}
        </div>
    );
    };

    // Render Services Title Section for Ground Freight
    const renderGroundServicesTitleSection = (page: any) => {
    if (!page.servicesTitle) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Services Title Section</h3>
        {renderEditableField('Title', 'servicesTitle.title', page.servicesTitle.title || '')}
        {renderEditableField('Description', 'servicesTitle.description', page.servicesTitle.description || '', true)}
        </div>
    );
    };

    // Render Full Truckload Section
    const renderFullTruckloadSection = (page: any) => {
    if (!page.fullTruckload) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Full Truckload (FTL) Section</h3>
        {renderEditableField('Title', 'fullTruckload.title', page.fullTruckload.title || '')}
        {renderEditableField('Description', 'fullTruckload.description', page.fullTruckload.description || '', true)}
        {renderImageUpload('Image', 'fullTruckload.image', page.fullTruckload.image || '')}
        </div>
    );
    };

    // Render Less-than-Truckload Section
    const renderLessThanTruckloadSection = (page: any) => {
    if (!page.lessThanTruckload) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Less-than-Truckload (LTL) Section</h3>
        {renderEditableField('Title', 'lessThanTruckload.title', page.lessThanTruckload.title || '')}
        {renderEditableField('Description', 'lessThanTruckload.description', page.lessThanTruckload.description || '', true)}
        {renderImageUpload('Image', 'lessThanTruckload.image', page.lessThanTruckload.image || '')}
        </div>
    );
    };

    // Render Cross-Border Section
    const renderCrossBorderSection = (page: any) => {
    if (!page.crossBorder) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Cross-Border Section</h3>
        {renderEditableField('Title', 'crossBorder.title', page.crossBorder.title || '')}
        {renderEditableField('Description', 'crossBorder.description', page.crossBorder.description || '', true)}
        {renderImageUpload('Image', 'crossBorder.image', page.crossBorder.image || '')}
        </div>
    );
    };

    // Render Why Choose Us Section for Ground Freight
    const renderGroundWhyChooseUsSection = (page: any) => {
    if (!page.whyChooseUs) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Choose Us Section</h3>
        {renderEditableField('Title', 'whyChooseUs.title', page.whyChooseUs.title || '')}
        {page.whyChooseUs.benefits && page.whyChooseUs.benefits.map((benefit: any, index: number) => (
            <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Benefit {index + 1}</h4>
            {renderEditableField(`Title`, `whyChooseUs.benefits.${index}.title`, benefit.title || '')}
            {renderEditableField(`Description`, `whyChooseUs.benefits.${index}.description`, benefit.description || '', true)}
            </div>
        ))}
        </div>
    );
    };

    // Render Contact Steps Section
    const renderContactStepsSection = (page: any) => {
    if (!page.contactSteps) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Steps Section</h3>
        {renderEditableField('Title', 'contactSteps.title', page.contactSteps.title || '')}
        {renderEditableField('Subtitle', 'contactSteps.subtitle', page.contactSteps.subtitle || '', true)}
        {page.contactSteps.steps && page.contactSteps.steps.map((step: any, index: number) => (
            <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Step {step.step}</h4>
            {renderEditableField(`Title`, `contactSteps.steps.${index}.title`, step.title || '')}
            {renderEditableField(`Description`, `contactSteps.steps.${index}.description`, step.description || '')}
            </div>
        ))}
        {renderEditableField('Button Text', 'contactSteps.buttonText', page.contactSteps.buttonText || '')}
        </div>
    );
    };

    // Render Need Support Section
    const renderNeedSupportSection = (page: any) => {
    if (!page.needSupport) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Need Support Section</h3>
        {renderEditableField('Title', 'needSupport.title', page.needSupport.title || '')}
        {renderEditableField('Description', 'needSupport.description', page.needSupport.description || '', true)}
        {renderImageUpload('Image', 'needSupport.image', page.needSupport.image || '')}
        {renderEditableField('Button Text', 'needSupport.buttonText', page.needSupport.buttonText || '')}
        </div>
    );
    };

    // Render Ground Freight FAQs Section
    const renderGroundFaqsSection = (page: any) => {
    if (!page.faqs) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">FAQs Section</h3>
        {page.faqs.map((faq: any, index: number) => (
            <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">FAQ {index + 1}</h4>
            {renderEditableField(`Question`, `faqs.${index}.question`, faq.question || '', true)}
            {renderEditableField(`Answer`, `faqs.${index}.answer`, faq.answer || '', true)}
            </div>
        ))}
        </div>
    );
    };

    // Render Ground Freight CTA Section
    const renderGroundCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button 1 Text', 'cta.button1Text', page.cta.button1Text || '')}
        {renderEditableField('Button 2 Text', 'cta.button2Text', page.cta.button2Text || '')}
        </div>
    );
    };

// ========== WAREHOUSING SECTION RENDER FUNCTIONS ==========
    // Render Hero Section for Warehousing
    const renderWarehousingHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.video', page.hero.video || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
        </div>
    );
    };

    // Render Build Supply Chain Section
    const renderBuildSupplyChainSection = (page: any) => {
    if (!page.buildSupplyChain) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Build Supply Chain Section</h3>
        {renderEditableField('Title', 'buildSupplyChain.title', page.buildSupplyChain.title || '')}
        {renderEditableField('Description', 'buildSupplyChain.description', page.buildSupplyChain.description || '', true)}
        {renderEditableField('Description 2', 'buildSupplyChain.description2', page.buildSupplyChain.description2 || '', true)}
        {renderEditableField('Description 3', 'buildSupplyChain.description3', page.buildSupplyChain.description3 || '', true)}
        {renderImageUpload('Image', 'buildSupplyChain.image', page.buildSupplyChain.image || '')}
        </div>
    );
    };

    // Render Why Trident Section
    const renderWhyTridentSection = (page: any) => {
    if (!page.whyTrident) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Trident Section</h3>
        {renderEditableField('Title', 'whyTrident.title', page.whyTrident.title || '')}
        {renderEditableField('Subtitle', 'whyTrident.subtitle', page.whyTrident.subtitle || '', true)}
        {page.whyTrident.benefits && page.whyTrident.benefits.map((benefit: any, index: number) => (
            <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Benefit {index + 1}</h4>
            {renderEditableField(`Title`, `whyTrident.benefits.${index}.title`, benefit.title || '')}
            {renderEditableField(`Description`, `whyTrident.benefits.${index}.description`, benefit.description || '', true)}
            </div>
        ))}
        </div>
    );
    };

    // Render Services Offer Section
    const renderServicesOfferSection = (page: any) => {
    if (!page.servicesOffer) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Services Offer Section</h3>
        {renderEditableField('Title', 'servicesOffer.title', page.servicesOffer.title || '')}
        {page.servicesOffer.services && page.servicesOffer.services.map((service: any, index: number) => (
            <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Service {index + 1}</h4>
            {renderEditableField(`Title`, `servicesOffer.services.${index}.title`, service.title || '')}
            {renderEditableField(`Description`, `servicesOffer.services.${index}.description`, service.description || '', true)}
            {renderImageUpload(`Image`, `servicesOffer.services.${index}.image`, service.image || '')}
            </div>
        ))}
        </div>
    );
    };

    // Render WMS Support Section
    const renderWMSSupportSection = (page: any) => {
    if (!page.wmsSupport) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">WMS Support Section</h3>
        {renderEditableField('Title', 'wmsSupport.title', page.wmsSupport.title || '')}
        {renderEditableField('Description', 'wmsSupport.description', page.wmsSupport.description || '', true)}
        {renderImageUpload('Video', 'wmsSupport.video', page.wmsSupport.video || '')}
        </div>
    );
    };

    // Render Warehousing CTA Section
    const renderWarehousingCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
        </div>
    );
    };

// ========== DEPOT SECTION RENDER FUNCTIONS ==========
    // Render Hero Section for Depot
    const renderDepotHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.video', page.hero.video || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
        </div>
    );
    };

    // Render Overview Section
    const renderDepotOverviewSection = (page: any) => {
    if (!page.overview) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Overview Section</h3>
        
        {/* Speed and Flexibility */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Speed and Flexibility</h4>
            {renderEditableField('Title', 'overview.speedAndFlexibility.title', page.overview.speedAndFlexibility?.title || '')}
            {renderEditableField('Description', 'overview.speedAndFlexibility.description', page.overview.speedAndFlexibility?.description || '', true)}
            {renderEditableField('Description 2', 'overview.speedAndFlexibility.description2', page.overview.speedAndFlexibility?.description2 || '', true)}
            {renderImageUpload('Image', 'overview.speedAndFlexibility.image', page.overview.speedAndFlexibility?.image || '')}
        </div>
        
        {/* Key Benefits */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Key Benefits</h4>
            {renderEditableField('Title', 'overview.keyBenefits.title', page.overview.keyBenefits?.title || '')}
            {renderEditableField('Subtitle', 'overview.keyBenefits.subtitle', page.overview.keyBenefits?.subtitle || '', true)}
            {page.overview.keyBenefits?.benefits && page.overview.keyBenefits.benefits.map((benefit: any, index: number) => (
            <div key={index} className="ml-4 mb-3 p-2 border-l-2 border-blue-200">
                <h5 className="font-medium text-gray-700">Benefit {index + 1}</h5>
                {renderEditableField(`Title`, `overview.keyBenefits.benefits.${index}.title`, benefit.title || '')}
                {renderEditableField(`Description`, `overview.keyBenefits.benefits.${index}.description`, benefit.description || '')}
            </div>
            ))}
        </div>
        
        {/* Depot Services */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Depot Services</h4>
            {renderEditableField('Title', 'overview.depotServices.title', page.overview.depotServices?.title || '')}
            {renderEditableField('Description', 'overview.depotServices.description', page.overview.depotServices?.description || '', true)}
            {renderImageUpload('Image', 'overview.depotServices.image', page.overview.depotServices?.image || '')}
            {renderEditableField('Button Text', 'overview.depotServices.buttonText', page.overview.depotServices?.buttonText || '')}
        </div>
        
        {/* Global Reach */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Global Reach</h4>
            {renderEditableField('Title', 'overview.globalReach.title', page.overview.globalReach?.title || '')}
            {renderEditableField('Subtitle', 'overview.globalReach.subtitle', page.overview.globalReach?.subtitle || '')}
        </div>
        </div>
    );
    };

    // Render Services Section
    const renderDepotServicesSection = (page: any) => {
    if (!page.services) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Services Section</h3>
        
        {/* Simplify Supply Chain */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Simplify Supply Chain</h4>
            {renderEditableField('Title', 'services.simplifySupplyChain.title', page.services.simplifySupplyChain?.title || '')}
            {page.services.simplifySupplyChain?.opportunities && page.services.simplifySupplyChain.opportunities.map((opp: string, index: number) => (
            <div key={index}>
                {renderEditableField(`Opportunity ${index + 1}`, `services.simplifySupplyChain.opportunities.${index}`, opp || '')}
            </div>
            ))}
            {renderEditableField('Description', 'services.simplifySupplyChain.description', page.services.simplifySupplyChain?.description || '', true)}
            {renderImageUpload('Image', 'services.simplifySupplyChain.image', page.services.simplifySupplyChain?.image || '')}
        </div>
        
        {/* Customer Dedicated Depot */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Customer Dedicated Depot</h4>
            {renderEditableField('Title', 'services.customerDedicatedDepot.title', page.services.customerDedicatedDepot?.title || '')}
            {renderEditableField('Description', 'services.customerDedicatedDepot.description', page.services.customerDedicatedDepot?.description || '', true)}
            {renderImageUpload('Image', 'services.customerDedicatedDepot.image', page.services.customerDedicatedDepot?.image || '')}
        </div>
        
        {/* Full Container Storage */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Full Container Storage</h4>
            {renderEditableField('Title', 'services.fullContainerStorage.title', page.services.fullContainerStorage?.title || '')}
            {renderEditableField('Description', 'services.fullContainerStorage.description', page.services.fullContainerStorage?.description || '', true)}
            {renderImageUpload('Image', 'services.fullContainerStorage.image', page.services.fullContainerStorage?.image || '')}
        </div>
        
        {/* Container Preparation */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Container Preparation</h4>
            {renderEditableField('Title', 'services.containerPreparation.title', page.services.containerPreparation?.title || '')}
            {renderEditableField('Description', 'services.containerPreparation.description', page.services.containerPreparation?.description || '', true)}
            {renderImageUpload('Image', 'services.containerPreparation.image', page.services.containerPreparation?.image || '')}
        </div>
        
        {/* Stuffing and Destuffing */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Stuffing and Destuffing</h4>
            {renderEditableField('Title', 'services.stuffingAndDestuffing.title', page.services.stuffingAndDestuffing?.title || '')}
            {renderEditableField('Description', 'services.stuffingAndDestuffing.description', page.services.stuffingAndDestuffing?.description || '', true)}
            {renderImageUpload('Image', 'services.stuffingAndDestuffing.image', page.services.stuffingAndDestuffing?.image || '')}
        </div>
        
        {/* Value Added Services */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Value Added Services</h4>
            {renderEditableField('Title', 'services.valueAddedServices.title', page.services.valueAddedServices?.title || '')}
            {renderEditableField('Subtitle', 'services.valueAddedServices.subtitle', page.services.valueAddedServices?.subtitle || '', true)}
            {page.services.valueAddedServices?.services && page.services.valueAddedServices.services.map((service: any, index: number) => (
            <div key={index} className="ml-4 mb-3 p-2 border-l-2 border-blue-200">
                <h5 className="font-medium text-gray-700">Value Service {index + 1}</h5>
                {renderEditableField(`Title`, `services.valueAddedServices.services.${index}.title`, service.title || '')}
                {renderEditableField(`Description`, `services.valueAddedServices.services.${index}.description`, service.description || '')}
            </div>
            ))}
        </div>
        </div>
    );
    };

    // Render Contact Section
    const renderDepotContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
        </div>
    );
    };
  // ========== COLD STORAGE SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Cold Storage
  const renderColdStorageHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.video', page.hero.video || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render Benefits Section
  const renderColdStorageBenefitsSection = (page: any) => {
    if (!page.benefits) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Benefits Section</h3>
        {renderEditableField('Title', 'benefits.title', page.benefits.title || '')}
        {renderEditableField('Description', 'benefits.description', page.benefits.description || '', true)}
        {renderEditableField('Description 2', 'benefits.description2', page.benefits.description2 || '', true)}
        {renderEditableField('Description 3', 'benefits.description3', page.benefits.description3 || '', true)}
        {renderImageUpload('Image', 'benefits.image', page.benefits.image || '')}
      </div>
    );
  };

  // Render Advantages Section
  const renderColdStorageAdvantagesSection = (page: any) => {
    if (!page.advantages) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Advantages Section</h3>
        {renderEditableField('Title', 'advantages.title', page.advantages.title || '')}
        {renderEditableField('Subtitle', 'advantages.subtitle', page.advantages.subtitle || '', true)}
        {page.advantages.items && page.advantages.items.map((item: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Advantage {index + 1}</h4>
            {renderEditableField(`Title`, `advantages.items.${index}.title`, item.title || '')}
            {renderEditableField(`Description`, `advantages.items.${index}.description`, item.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Cold Storage Contact Section
  const renderColdStorageContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
      </div>
    );
  };

  // Render Cold Storage CTA Section
  const renderColdStorageCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };

  // ========== CUSTOMS SERVICES SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Customs Services
  const renderCustomsHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.video', page.hero.video || '')}
        {renderEditableField('Button 1 Text', 'hero.button1Text', page.hero.button1Text || '')}
        {renderEditableField('Button 2 Text', 'hero.button2Text', page.hero.button2Text || '')}
      </div>
    );
  };

  // Render Local Expertise Section
  const renderLocalExpertiseSection = (page: any) => {
    if (!page.localExpertise) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Local Expertise Section</h3>
        {renderEditableField('Title', 'localExpertise.title', page.localExpertise.title || '')}
        {renderEditableField('Description', 'localExpertise.description', page.localExpertise.description || '', true)}
        {renderEditableField('Description 2', 'localExpertise.description2', page.localExpertise.description2 || '', true)}
        {renderImageUpload('Image', 'localExpertise.image', page.localExpertise.image || '')}
        {renderEditableField('Image Caption', 'localExpertise.imageCaption', page.localExpertise.imageCaption || '')}
        {renderEditableField('Button Text', 'localExpertise.buttonText', page.localExpertise.buttonText || '')}
      </div>
    );
  };

  // Render Why Choose Us Section
  const renderCustomsWhyChooseUsSection = (page: any) => {
    if (!page.whyChooseUs) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Choose Us Section</h3>
        {renderEditableField('Title', 'whyChooseUs.title', page.whyChooseUs.title || '')}
        {renderEditableField('Subtitle', 'whyChooseUs.subtitle', page.whyChooseUs.subtitle || '', true)}
        {page.whyChooseUs.benefits && page.whyChooseUs.benefits.map((benefit: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Benefit {index + 1}</h4>
            {renderEditableField(`Title`, `whyChooseUs.benefits.${index}.title`, benefit.title || '')}
            {renderEditableField(`Description`, `whyChooseUs.benefits.${index}.description`, benefit.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Customs Services Contact Section
  const renderCustomsContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
      </div>
    );
  };

  // Render Customs Services CTA Section
  const renderCustomsCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button 1 Text', 'cta.button1Text', page.cta.button1Text || '')}
        {renderEditableField('Button 2 Text', 'cta.button2Text', page.cta.button2Text || '')}
      </div>
    );
  };

// ========== PROJECT LOGISTICS SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Project Logistics
  const renderProjectHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.video', page.hero.video || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render Overview Section for Project Logistics
  const renderProjectOverviewSection = (page: any) => {
    if (!page.overview) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Overview Section</h3>
        {renderEditableField('Title', 'overview.title', page.overview.title || '')}
        {renderEditableField('Description', 'overview.description', page.overview.description || '', true)}
        {renderEditableField('Description 2', 'overview.description2', page.overview.description2 || '', true)}
        {renderImageUpload('Image', 'overview.image', page.overview.image || '')}
        {renderEditableField('Image Caption', 'overview.imageCaption', page.overview.imageCaption || '')}
      </div>
    );
  };

  // Render Services Section for Project Logistics
  const renderProjectServicesSection = (page: any) => {
    if (!page.services) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Services Section</h3>
        {page.services.map((service: any, index: number) => (
          <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Service {index + 1}</h4>
            {renderEditableField(`Title`, `services.${index}.title`, service.title || '')}
            {renderEditableField(`Description`, `services.${index}.description`, service.description || '', true)}
            {renderImageUpload(`Image`, `services.${index}.image`, service.image || '')}
          </div>
        ))}
      </div>
    );
  };

  // Render Why Choose Us Section for Project Logistics
  const renderProjectWhyChooseUsSection = (page: any) => {
    if (!page.whyChooseUs) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Choose Us Section</h3>
        {renderEditableField('Title', 'whyChooseUs.title', page.whyChooseUs.title || '')}
        {page.whyChooseUs.benefits && page.whyChooseUs.benefits.map((benefit: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Benefit {index + 1}</h4>
            {renderEditableField(`Title`, `whyChooseUs.benefits.${index}.title`, benefit.title || '')}
            {renderEditableField(`Description`, `whyChooseUs.benefits.${index}.description`, benefit.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Contact Section for Project Logistics
  const renderProjectContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
      </div>
    );
  };

  // Render Project Logistics CTA Section
  const renderProjectCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };

// ========== FMCG SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for FMCG
  const renderFMCGHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.video', page.hero.video || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render Overview Section for FMCG
  const renderFMCOverviewSection = (page: any) => {
    if (!page.overview) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Overview Section</h3>
        {renderEditableField('Title', 'overview.title', page.overview.title || '')}
        {renderEditableField('Description', 'overview.description', page.overview.description || '', true)}
        {renderEditableField('Description 2', 'overview.description2', page.overview.description2 || '', true)}
        {renderImageUpload('Image', 'overview.image', page.overview.image || '')}
        {renderEditableField('Image Caption', 'overview.imageCaption', page.overview.imageCaption || '')}
      </div>
    );
  };

  // Render Strategy Section for FMCG
  const renderFMCStrategySection = (page: any) => {
    if (!page.strategy) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Strategy Section (3 Pillars)</h3>
        {renderEditableField('Title', 'strategy.title', page.strategy.title || '')}
        {renderEditableField('Subtitle', 'strategy.subtitle', page.strategy.subtitle || '', true)}
        {page.strategy.pillars && page.strategy.pillars.map((pillar: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Pillar {index + 1}</h4>
            {renderEditableField(`Title`, `strategy.pillars.${index}.title`, pillar.title || '')}
            {renderEditableField(`Description`, `strategy.pillars.${index}.description`, pillar.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Segments Section for FMCG
  const renderFMCSegmentsSection = (page: any) => {
    if (!page.segments) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Segments Section (Categories)</h3>
        {renderEditableField('Title', 'segments.title', page.segments.title || '')}
        {renderEditableField('Subtitle', 'segments.subtitle', page.segments.subtitle || '', true)}
        {page.segments.categories && page.segments.categories.map((category: any, index: number) => (
          <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Category {index + 1}</h4>
            {renderEditableField(`Title`, `segments.categories.${index}.title`, category.title || '')}
            {renderEditableField(`Description`, `segments.categories.${index}.description`, category.description || '', true)}
            {renderImageUpload(`Image`, `segments.categories.${index}.image`, category.image || '')}
            {renderEditableField(`Image Caption`, `segments.categories.${index}.imageCaption`, category.imageCaption || '')}
          </div>
        ))}
      </div>
    );
  };

  // Render Contact Section for FMCG
  const renderFMCGContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
      </div>
    );
  };

  // Render FMCG CTA Section
  const renderFMCGCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };

// ========== FASHION & LIFESTYLE SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Fashion & Lifestyle
  const renderFashionHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Video', 'hero.video', page.hero.video || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render Overview Section for Fashion & Lifestyle
  const renderFashionOverviewSection = (page: any) => {
    if (!page.overview) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Overview Section</h3>
        {renderEditableField('Title', 'overview.title', page.overview.title || '')}
        {renderEditableField('Description', 'overview.description', page.overview.description || '', true)}
        {renderEditableField('Description 2', 'overview.description2', page.overview.description2 || '', true)}
        {renderImageUpload('Image', 'overview.image', page.overview.image || '')}
        {renderEditableField('Image Caption', 'overview.imageCaption', page.overview.imageCaption || '')}
      </div>
    );
  };

  // Render Grow Strategy Section (3 Pillars)
  const renderFashionGrowStrategySection = (page: any) => {
    if (!page.growStrategy) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Grow Strategy Section (3 Pillars)</h3>
        {renderEditableField('Title', 'growStrategy.title', page.growStrategy.title || '')}
        {renderEditableField('Subtitle', 'growStrategy.subtitle', page.growStrategy.subtitle || '', true)}
        {page.growStrategy.pillars && page.growStrategy.pillars.map((pillar: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Pillar {index + 1}</h4>
            {renderEditableField(`Title`, `growStrategy.pillars.${index}.title`, pillar.title || '')}
            {renderEditableField(`Description`, `growStrategy.pillars.${index}.description`, pillar.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Tailored Solutions Section
  const renderFashionTailoredSolutionsSection = (page: any) => {
    if (!page.tailoredSolutions) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Tailored Solutions Section</h3>
        {renderEditableField('Title', 'tailoredSolutions.title', page.tailoredSolutions.title || '')}
        {renderEditableField('Subtitle', 'tailoredSolutions.subtitle', page.tailoredSolutions.subtitle || '', true)}
      </div>
    );
  };

  // Render Industries Section (Categories)
  const renderFashionIndustriesSection = (page: any) => {
    if (!page.industries) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Industries Section (Categories)</h3>
        {page.industries.categories && page.industries.categories.map((category: any, index: number) => (
          <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Category {index + 1}</h4>
            {renderEditableField(`Title`, `industries.categories.${index}.title`, category.title || '')}
            {renderEditableField(`Description`, `industries.categories.${index}.description`, category.description || '', true)}
            {renderImageUpload(`Image`, `industries.categories.${index}.image`, category.image || '')}
            {renderEditableField(`Image Caption`, `industries.categories.${index}.imageCaption`, category.imageCaption || '')}
          </div>
        ))}
      </div>
    );
  };

  // Render Contact Section for Fashion & Lifestyle
  const renderFashionContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
      </div>
    );
  };

  // Render Fashion & Lifestyle CTA Section
  const renderFashionCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };

// ========== RETAIL SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Retail
  const renderRetailHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Image', 'hero.image', page.hero.image || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render Overview Section for Retail
  const renderRetailOverviewSection = (page: any) => {
    if (!page.overview) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Overview Section</h3>
        {renderEditableField('Title', 'overview.title', page.overview.title || '')}
        {renderEditableField('Description', 'overview.description', page.overview.description || '', true)}
        {renderEditableField('Description 2', 'overview.description2', page.overview.description2 || '', true)}
        {renderImageUpload('Image', 'overview.image', page.overview.image || '')}
        {renderEditableField('Image Caption', 'overview.imageCaption', page.overview.imageCaption || '')}
      </div>
    );
  };

  // Render Strategy Section (4 Pillars)
  const renderRetailStrategySection = (page: any) => {
    if (!page.strategy) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Strategy Section (4 Pillars)</h3>
        {renderEditableField('Title', 'strategy.title', page.strategy.title || '')}
        {renderEditableField('Subtitle', 'strategy.subtitle', page.strategy.subtitle || '', true)}
        {page.strategy.pillars && page.strategy.pillars.map((pillar: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Pillar {index + 1}</h4>
            {renderEditableField(`Title`, `strategy.pillars.${index}.title`, pillar.title || '')}
            {renderEditableField(`Description`, `strategy.pillars.${index}.description`, pillar.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Categories Section
  const renderRetailCategoriesSection = (page: any) => {
    if (!page.categories) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Categories Section</h3>
        {renderEditableField('Title', 'categories.title', page.categories.title || '')}
        {renderEditableField('Subtitle', 'categories.subtitle', page.categories.subtitle || '', true)}
        {page.categories.items && page.categories.items.map((item: any, index: number) => (
          <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Category {index + 1}</h4>
            {renderEditableField(`Title`, `categories.items.${index}.title`, item.title || '')}
            {renderEditableField(`Description`, `categories.items.${index}.description`, item.description || '', true)}
            {renderImageUpload(`Image`, `categories.items.${index}.image`, item.image || '')}
            {renderEditableField(`Image Caption`, `categories.items.${index}.imageCaption`, item.imageCaption || '')}
          </div>
        ))}
      </div>
    );
  };

  // Render Contact Section for Retail
  const renderRetailContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
      </div>
    );
  };

  // Render Retail CTA Section
  const renderRetailCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };
// ========== CHEMICALS SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Chemicals
  const renderChemicalsHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Image', 'hero.image', page.hero.image || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render Overview Section for Chemicals
  const renderChemicalsOverviewSection = (page: any) => {
    if (!page.overview) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Overview Section</h3>
        {renderEditableField('Title', 'overview.title', page.overview.title || '')}
        {renderEditableField('Description', 'overview.description', page.overview.description || '', true)}
        {renderImageUpload('Image', 'overview.image', page.overview.image || '')}
      </div>
    );
  };

  // Render Industry Overview Section
  const renderChemicalsIndustryOverviewSection = (page: any) => {
    if (!page.industryOverview) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Industry Overview Section</h3>
        {renderEditableField('Title', 'industryOverview.title', page.industryOverview.title || '')}
        {renderEditableField('Subtitle', 'industryOverview.subtitle', page.industryOverview.subtitle || '', true)}
        {renderEditableField('Description', 'industryOverview.description', page.industryOverview.description || '', true)}
        {renderEditableField('Description 2', 'industryOverview.description2', page.industryOverview.description2 || '', true)}
      </div>
    );
  };

  // Render Trends Section
  const renderChemicalsTrendsSection = (page: any) => {
    if (!page.trends) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Trends Section (6 Trends)</h3>
        {renderEditableField('Title', 'trends.title', page.trends.title || '')}
        {page.trends.items && page.trends.items.map((item: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Trend {index + 1}</h4>
            {renderEditableField(`Title`, `trends.items.${index}.title`, item.title || '')}
            {item.points && item.points.map((point: string, pointIndex: number) => (
              <div key={pointIndex}>
                {renderEditableField(`Point ${pointIndex + 1}`, `trends.items.${index}.points.${pointIndex}`, point || '')}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Render Services Overview Section
  const renderChemicalsServicesOverviewSection = (page: any) => {
    if (!page.servicesOverview) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Services Overview Section</h3>
        {renderEditableField('Title', 'servicesOverview.title', page.servicesOverview.title || '')}
        {renderEditableField('Subtitle', 'servicesOverview.subtitle', page.servicesOverview.subtitle || '', true)}
        {renderEditableField('Subtitle 2', 'servicesOverview.subtitle2', page.servicesOverview.subtitle2 || '', true)}
      </div>
    );
  };

  // Render Chemical Types Section
  const renderChemicalsTypesSection = (page: any) => {
    if (!page.chemicalTypes) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Chemical Types Section</h3>
        {page.chemicalTypes.map((type: any, index: number) => (
          <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Chemical Type {index + 1}</h4>
            {renderEditableField(`Title`, `chemicalTypes.${index}.title`, type.title || '')}
            {renderEditableField(`Description`, `chemicalTypes.${index}.description`, type.description || '', true)}
            {type.subGroups && type.subGroups.map((subGroup: any, sgIndex: number) => (
              <div key={sgIndex} className="ml-4 mt-3 mb-3 p-2 border-l-2 border-blue-200">
                <h5 className="font-medium text-gray-700">Sub-Group {sgIndex + 1}</h5>
                {renderEditableField(`Sub-Group Title`, `chemicalTypes.${index}.subGroups.${sgIndex}.title`, subGroup.title || '')}
                {renderEditableField(`Sub-Group Description`, `chemicalTypes.${index}.subGroups.${sgIndex}.description`, subGroup.description || '')}
              </div>
            ))}
            {renderEditableField(`Description 2`, `chemicalTypes.${index}.description2`, type.description2 || '', true)}
            {renderImageUpload(`Image`, `chemicalTypes.${index}.image`, type.image || '')}
            {renderEditableField(`Image Caption`, `chemicalTypes.${index}.imageCaption`, type.imageCaption || '')}
            {type.buttonText && renderEditableField(`Button Text`, `chemicalTypes.${index}.buttonText`, type.buttonText || '')}
          </div>
        ))}
      </div>
    );
  };

  // Render Contact Section for Chemicals
  const renderChemicalsContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
      </div>
    );
  };

  // Render Chemicals CTA Section
  const renderChemicalsCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };

// ========== AUTOMOTIVE SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Automotive
  const renderAutomotiveHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Image', 'hero.image', page.hero.image || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render Overview Section for Automotive
  const renderAutomotiveOverviewSection = (page: any) => {
    if (!page.overview) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Overview Section</h3>
        {renderEditableField('Title', 'overview.title', page.overview.title || '')}
        {renderEditableField('Description', 'overview.description', page.overview.description || '', true)}
        {renderEditableField('Description 2', 'overview.description2', page.overview.description2 || '', true)}
        {renderImageUpload('Image', 'overview.image', page.overview.image || '')}
        {renderEditableField('Image Caption', 'overview.imageCaption', page.overview.imageCaption || '')}
      </div>
    );
  };

  // Render Strategy Section (4 Pillars)
  const renderAutomotiveStrategySection = (page: any) => {
    if (!page.strategy) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Strategy Section (4 Pillars)</h3>
        {renderEditableField('Title', 'strategy.title', page.strategy.title || '')}
        {renderEditableField('Subtitle', 'strategy.subtitle', page.strategy.subtitle || '', true)}
        {page.strategy.pillars && page.strategy.pillars.map((pillar: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Pillar {index + 1}</h4>
            {renderEditableField(`Title`, `strategy.pillars.${index}.title`, pillar.title || '')}
            {renderEditableField(`Description`, `strategy.pillars.${index}.description`, pillar.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Sectors Section
  const renderAutomotiveSectorsSection = (page: any) => {
    if (!page.sectors) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Sectors Section</h3>
        {renderEditableField('Title', 'sectors.title', page.sectors.title || '')}
        {renderEditableField('Subtitle', 'sectors.subtitle', page.sectors.subtitle || '', true)}
        {page.sectors.categories && page.sectors.categories.map((category: any, index: number) => (
          <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Category {index + 1}</h4>
            {renderEditableField(`Title`, `sectors.categories.${index}.title`, category.title || '')}
            {renderEditableField(`Description`, `sectors.categories.${index}.description`, category.description || '', true)}
            {renderImageUpload(`Image`, `sectors.categories.${index}.image`, category.image || '')}
            {renderEditableField(`Image Caption`, `sectors.categories.${index}.imageCaption`, category.imageCaption || '')}
          </div>
        ))}
      </div>
    );
  };

  // Render Contact Section for Automotive
  const renderAutomotiveContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
      </div>
    );
  };

  // Render Automotive CTA Section
  const renderAutomotiveCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };

// ========== PHARMA & HEALTHCARE SECTION RENDER FUNCTIONS ==========
  // Render Hero Section
  const renderPharmaHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Image', 'hero.image', page.hero.image || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render Overview Section
  const renderPharmaOverviewSection = (page: any) => {
    if (!page.overview) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Overview Section</h3>
        {renderEditableField('Title', 'overview.title', page.overview.title || '')}
        {renderEditableField('Description', 'overview.description', page.overview.description || '', true)}
        {renderEditableField('Description 2', 'overview.description2', page.overview.description2 || '', true)}
        {renderImageUpload('Image', 'overview.image', page.overview.image || '')}
      </div>
    );
  };

  // Render Strategy Section (4 Pillars)
  const renderPharmaStrategySection = (page: any) => {
    if (!page.strategy) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Strategy Section (4 Pillars)</h3>
        {renderEditableField('Title', 'strategy.title', page.strategy.title || '')}
        {renderEditableField('Subtitle', 'strategy.subtitle', page.strategy.subtitle || '', true)}
        {page.strategy.pillars && page.strategy.pillars.map((pillar: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Pillar {index + 1}</h4>
            {renderEditableField(`Title`, `strategy.pillars.${index}.title`, pillar.title || '')}
            {renderEditableField(`Description`, `strategy.pillars.${index}.description`, pillar.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Segments Section
  const renderPharmaSegmentsSection = (page: any) => {
    if (!page.segments) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Segments Section</h3>
        {renderEditableField('Title', 'segments.title', page.segments.title || '')}
        {renderEditableField('Subtitle', 'segments.subtitle', page.segments.subtitle || '', true)}
        {page.segments.categories && page.segments.categories.map((category: any, index: number) => (
          <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Category {index + 1}</h4>
            {renderEditableField(`Title`, `segments.categories.${index}.title`, category.title || '')}
            {renderEditableField(`Description`, `segments.categories.${index}.description`, category.description || '', true)}
            {renderImageUpload(`Image`, `segments.categories.${index}.image`, category.image || '')}
          </div>
        ))}
      </div>
    );
  };

  // Render Contact Section
  const renderPharmaContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
      </div>
    );
  };

  // Render CTA Section
  const renderPharmaCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };

// ========== TRIDENT RATE SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Trident Rate
  const renderTridentRateHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Image', 'hero.image', page.hero.image || '')}
        {renderEditableField('Button 1 Text', 'hero.button1Text', page.hero.button1Text || '')}
        {renderEditableField('Button 2 Text', 'hero.button2Text', page.hero.button2Text || '')}
      </div>
    );
  };

  // Render Shipping Made Simple Section
  const renderShippingMadeSimpleSection = (page: any) => {
    if (!page.shippingMadeSimple) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Shipping Made Simple Section</h3>
        {renderEditableField('Title', 'shippingMadeSimple.title', page.shippingMadeSimple.title || '')}
        {renderEditableField('Description', 'shippingMadeSimple.description', page.shippingMadeSimple.description || '', true)}
        {renderEditableField('Description 2', 'shippingMadeSimple.description2', page.shippingMadeSimple.description2 || '', true)}
        {renderImageUpload('Image', 'shippingMadeSimple.image', page.shippingMadeSimple.image || '')}
        {renderEditableField('Image Caption', 'shippingMadeSimple.imageCaption', page.shippingMadeSimple.imageCaption || '')}
      </div>
    );
  };

  // Render Why Trident Rate Section (6 Benefits)
  const renderWhyTridentRateSection = (page: any) => {
    if (!page.whyTridentRate) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Trident Rate Section (6 Benefits)</h3>
        {renderEditableField('Title', 'whyTridentRate.title', page.whyTridentRate.title || '')}
        {renderEditableField('Subtitle', 'whyTridentRate.subtitle', page.whyTridentRate.subtitle || '', true)}
        {page.whyTridentRate.benefits && page.whyTridentRate.benefits.map((benefit: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Benefit {index + 1}</h4>
            {renderEditableField(`Title`, `whyTridentRate.benefits.${index}.title`, benefit.title || '')}
            {renderEditableField(`Description`, `whyTridentRate.benefits.${index}.description`, benefit.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render CTA Section for Trident Rate
  const renderTridentRateCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button 1 Text', 'cta.button1Text', page.cta.button1Text || '')}
        {renderEditableField('Button 2 Text', 'cta.button2Text', page.cta.button2Text || '')}
      </div>
    );
  };

// ========== OCEAN CONTRACT SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Ocean Contract
  const renderOceanContractHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Image', 'hero.image', page.hero.image || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render Overview Section for Ocean Contract
  const renderOceanContractOverviewSection = (page: any) => {
    if (!page.overview) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Overview Section</h3>
        {renderEditableField('Title', 'overview.title', page.overview.title || '')}
        {renderEditableField('Description', 'overview.description', page.overview.description || '', true)}
        {renderEditableField('Description 2', 'overview.description2', page.overview.description2 || '', true)}
        {renderImageUpload('Image', 'overview.image', page.overview.image || '')}
        {renderEditableField('Image Caption', 'overview.imageCaption', page.overview.imageCaption || '')}
      </div>
    );
  };

  // Render Why Choose Us Section (4 Benefits)
  const renderOceanContractWhyChooseUsSection = (page: any) => {
    if (!page.whyChooseUs) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Choose Us Section (4 Benefits)</h3>
        {renderEditableField('Title', 'whyChooseUs.title', page.whyChooseUs.title || '')}
        {renderEditableField('Subtitle', 'whyChooseUs.subtitle', page.whyChooseUs.subtitle || '', true)}
        {page.whyChooseUs.benefits && page.whyChooseUs.benefits.map((benefit: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            {renderEditableField(`Title`, `whyChooseUs.benefits.${index}.title`, benefit.title || '')}
            {renderEditableField(`Description`, `whyChooseUs.benefits.${index}.description`, benefit.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Contract Products Section
  const renderContractProductsSection = (page: any) => {
    if (!page.contractProducts) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contract Products Section</h3>
        {renderEditableField('Title', 'contractProducts.title', page.contractProducts.title || '')}
        {renderEditableField('Subtitle', 'contractProducts.subtitle', page.contractProducts.subtitle || '', true)}
        {renderEditableField('Subtitle 2', 'contractProducts.subtitle2', page.contractProducts.subtitle2 || '', true)}
        
        {/* Fixed Contract */}
        <div className="ml-4 mt-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
          <h4 className="font-medium text-gray-700 mb-3">Fixed Contract</h4>
          {renderEditableField('Title', 'contractProducts.products.fixed.title', page.contractProducts.products?.fixed?.title || '')}
          {renderEditableField('Description', 'contractProducts.products.fixed.description', page.contractProducts.products?.fixed?.description || '', true)}
          {page.contractProducts.products?.fixed?.features && page.contractProducts.products.fixed.features.map((feature: string, idx: number) => (
            <div key={idx}>
              {renderEditableField(`Feature ${idx + 1}`, `contractProducts.products.fixed.features.${idx}`, feature || '')}
            </div>
          ))}
        </div>
        
        {/* Seasonal Contract */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
          <h4 className="font-medium text-gray-700 mb-3">Seasonal Contract</h4>
          {renderEditableField('Title', 'contractProducts.products.seasonal.title', page.contractProducts.products?.seasonal?.title || '')}
          {renderEditableField('Description', 'contractProducts.products.seasonal.description', page.contractProducts.products?.seasonal?.description || '', true)}
          {page.contractProducts.products?.seasonal?.features && page.contractProducts.products.seasonal.features.map((feature: string, idx: number) => (
            <div key={idx}>
              {renderEditableField(`Feature ${idx + 1}`, `contractProducts.products.seasonal.features.${idx}`, feature || '')}
            </div>
          ))}
        </div>
        
        {/* Block Space Contract */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
          <h4 className="font-medium text-gray-700 mb-3">Block Space Contract</h4>
          {renderEditableField('Title', 'contractProducts.products.block.title', page.contractProducts.products?.block?.title || '')}
          {renderEditableField('Description', 'contractProducts.products.block.description', page.contractProducts.products?.block?.description || '', true)}
          {page.contractProducts.products?.block?.features && page.contractProducts.products.block.features.map((feature: string, idx: number) => (
            <div key={idx}>
              {renderEditableField(`Feature ${idx + 1}`, `contractProducts.products.block.features.${idx}`, feature || '')}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Ocean Contract CTA Section
  const renderOceanContractCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };

// ========== SPECIAL CARGO SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Special Cargo
  const renderSpecialCargoHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Image', 'hero.image', page.hero.image || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render Overview Section for Special Cargo
  const renderSpecialCargoOverviewSection = (page: any) => {
    if (!page.overview) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Overview Section</h3>
        {renderEditableField('Title', 'overview.title', page.overview.title || '')}
        {renderEditableField('Description', 'overview.description', page.overview.description || '', true)}
        {renderEditableField('Description 2', 'overview.description2', page.overview.description2 || '', true)}
        {renderImageUpload('Image', 'overview.image', page.overview.image || '')}
      </div>
    );
  };

  // Render One Stop Shop Section (8 Benefits)
  const renderOneStopShopSection = (page: any) => {
    if (!page.oneStopShop) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">One Stop Shop Section (8 Benefits)</h3>
        {renderEditableField('Title', 'oneStopShop.title', page.oneStopShop.title || '')}
        {renderEditableField('Subtitle', 'oneStopShop.subtitle', page.oneStopShop.subtitle || '', true)}
        {page.oneStopShop.benefits && page.oneStopShop.benefits.map((benefit: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            {renderEditableField(`Title`, `oneStopShop.benefits.${index}.title`, benefit.title || '')}
            {renderEditableField(`Description`, `oneStopShop.benefits.${index}.description`, benefit.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Cargo Types Section
  const renderCargoTypesSection = (page: any) => {
    if (!page.cargoTypes) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Cargo Types Section</h3>
        {renderEditableField('Title', 'cargoTypes.title', page.cargoTypes.title || '')}
        {renderEditableField('Subtitle', 'cargoTypes.subtitle', page.cargoTypes.subtitle || '', true)}
        
        {/* In Gauge */}
        <div className="ml-4 mt-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
          <h4 className="font-medium text-gray-700 mb-3">In Gauge Cargo</h4>
          {renderEditableField('Title', 'cargoTypes.types.ingauge.title', page.cargoTypes.types?.ingauge?.title || '')}
          {renderEditableField('Description', 'cargoTypes.types.ingauge.description', page.cargoTypes.types?.ingauge?.description || '', true)}
          {renderEditableField('Description 2', 'cargoTypes.types.ingauge.description2', page.cargoTypes.types?.ingauge?.description2 || '', true)}
          {renderEditableField('Description 3', 'cargoTypes.types.ingauge.description3', page.cargoTypes.types?.ingauge?.description3 || '', true)}
          {renderImageUpload('Image', 'cargoTypes.types.ingauge.image', page.cargoTypes.types?.ingauge?.image || '')}
        </div>
        
        {/* Out of Gauge */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
          <h4 className="font-medium text-gray-700 mb-3">Out of Gauge Cargo</h4>
          {renderEditableField('Title', 'cargoTypes.types.outgauge.title', page.cargoTypes.types?.outgauge?.title || '')}
          {renderEditableField('Description', 'cargoTypes.types.outgauge.description', page.cargoTypes.types?.outgauge?.description || '', true)}
          {renderEditableField('Description 2', 'cargoTypes.types.outgauge.description2', page.cargoTypes.types?.outgauge?.description2 || '', true)}
          {renderImageUpload('Image', 'cargoTypes.types.outgauge.image', page.cargoTypes.types?.outgauge?.image || '')}
        </div>
        
        {/* Break Bulk */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
          <h4 className="font-medium text-gray-700 mb-3">Break Bulk Cargo</h4>
          {renderEditableField('Title', 'cargoTypes.types.breakbulk.title', page.cargoTypes.types?.breakbulk?.title || '')}
          {renderEditableField('Description', 'cargoTypes.types.breakbulk.description', page.cargoTypes.types?.breakbulk?.description || '', true)}
          {renderEditableField('Description 2', 'cargoTypes.types.breakbulk.description2', page.cargoTypes.types?.breakbulk?.description2 || '', true)}
          {renderImageUpload('Image', 'cargoTypes.types.breakbulk.image', page.cargoTypes.types?.breakbulk?.image || '')}
        </div>
      </div>
    );
  };

  // Render Container Specs Section
  const renderContainerSpecsSection = (page: any) => {
    if (!page.containerSpecs) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Container Specifications Section</h3>
        {renderEditableField('Title', 'containerSpecs.title', page.containerSpecs.title || '')}
        {renderEditableField('Note', 'containerSpecs.note', page.containerSpecs.note || '')}
        {page.containerSpecs.specs && page.containerSpecs.specs.map((spec: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Spec {index + 1}</h4>
            {renderEditableField(`Type`, `containerSpecs.specs.${index}.type`, spec.type || '')}
            {renderEditableField(`Length (CM)`, `containerSpecs.specs.${index}.length`, spec.length || '')}
            {renderEditableField(`Width (CM)`, `containerSpecs.specs.${index}.width`, spec.width || '')}
            {renderEditableField(`Height (CM)`, `containerSpecs.specs.${index}.height`, spec.height || '')}
            {renderEditableField(`Maximum Payload (KG)`, `containerSpecs.specs.${index}.payload`, spec.payload || '')}
          </div>
        ))}
      </div>
    );
  };

  // Render Special Cargo CTA Section
  const renderSpecialCargoCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };

// ========== SCM SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for SCM
  const renderSCMHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Image', 'hero.image', page.hero.image || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render Section 1 for SCM
  const renderSCMSection1Section = (page: any) => {
    if (!page.section1) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Section 1: Control, visibility, efficiency</h3>
        {renderEditableField('Title', 'section1.title', page.section1.title || '')}
        {renderEditableField('Description', 'section1.description', page.section1.description || '', true)}
        {renderEditableField('Description 2', 'section1.description2', page.section1.description2 || '', true)}
        {renderEditableField('Description 3', 'section1.description3', page.section1.description3 || '')}
        {renderImageUpload('Image', 'section1.image', page.section1.image || '')}
        {renderEditableField('Button Text', 'section1.buttonText', page.section1.buttonText || '')}
      </div>
    );
  };

  // Render Section 2 for SCM
  const renderSCMSection2Section = (page: any) => {
    if (!page.section2) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Section 2: Connecting and simplifying supply chains</h3>
        {renderEditableField('Title', 'section2.title', page.section2.title || '')}
        {renderEditableField('Description', 'section2.description', page.section2.description || '', true)}
        {page.section2.points && page.section2.points.map((point: string, index: number) => (
          <div key={index}>
            {renderEditableField(`Point ${index + 1}`, `section2.points.${index}`, point || '')}
          </div>
        ))}
        {renderImageUpload('Image', 'section2.image', page.section2.image || '')}
        {renderEditableField('Button Text', 'section2.buttonText', page.section2.buttonText || '')}
      </div>
    );
  };

  // Render Section 3 for SCM
  const renderSCMSection3Section = (page: any) => {
    if (!page.section3) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Section 3: End-to-end services</h3>
        {renderEditableField('Title', 'section3.title', page.section3.title || '')}
        {renderEditableField('Description', 'section3.description', page.section3.description || '', true)}
        {page.section3.benefits && page.section3.benefits.map((benefit: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Benefit {index + 1}</h4>
            {renderEditableField(`Title`, `section3.benefits.${index}.title`, benefit.title || '')}
            {renderEditableField(`Description`, `section3.benefits.${index}.description`, benefit.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Building Solutions Section for SCM
  const renderSCMBuildingSolutionsSection = (page: any) => {
    if (!page.buildingSolutions) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Building Solutions Section</h3>
        {renderImageUpload('Main Image', 'buildingSolutions.image', page.buildingSolutions.image || '')}
        {renderEditableField('Section Title', 'buildingSolutions.sectionTitle', page.buildingSolutions.sectionTitle || '')}
        
        {/* Data Management Column */}
        <div className="ml-4 mt-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
          <h4 className="font-medium text-gray-700 mb-3">Data Management Column</h4>
          {renderEditableField(`Title`, `buildingSolutions.columns.dataManagement.title`, page.buildingSolutions.columns?.dataManagement?.title || '')}
          {renderEditableField(`Description`, `buildingSolutions.columns.dataManagement.description`, page.buildingSolutions.columns?.dataManagement?.description || '', true)}
          {page.buildingSolutions.columns?.dataManagement?.features && page.buildingSolutions.columns.dataManagement.features.map((feature: string, idx: number) => (
            <div key={idx}>
              {renderEditableField(`Feature ${idx + 1}`, `buildingSolutions.columns.dataManagement.features.${idx}`, feature || '')}
            </div>
          ))}
        </div>
        
        {/* Stakeholder Management Column */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
          <h4 className="font-medium text-gray-700 mb-3">Stakeholder Management Column</h4>
          {renderEditableField(`Title`, `buildingSolutions.columns.stakeholderManagement.title`, page.buildingSolutions.columns?.stakeholderManagement?.title || '')}
          {renderEditableField(`Description`, `buildingSolutions.columns.stakeholderManagement.description`, page.buildingSolutions.columns?.stakeholderManagement?.description || '', true)}
          {page.buildingSolutions.columns?.stakeholderManagement?.features && page.buildingSolutions.columns.stakeholderManagement.features.map((feature: string, idx: number) => (
            <div key={idx}>
              {renderEditableField(`Feature ${idx + 1}`, `buildingSolutions.columns.stakeholderManagement.features.${idx}`, feature || '')}
            </div>
          ))}
        </div>
        
        {/* Shipment Management Column */}
        <div className="ml-4 mb-6 p-4 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
          <h4 className="font-medium text-gray-700 mb-3">Shipment Management Column</h4>
          {renderEditableField(`Title`, `buildingSolutions.columns.shipmentManagement.title`, page.buildingSolutions.columns?.shipmentManagement?.title || '')}
          {renderEditableField(`Description`, `buildingSolutions.columns.shipmentManagement.description`, page.buildingSolutions.columns?.shipmentManagement?.description || '', true)}
          {page.buildingSolutions.columns?.shipmentManagement?.features && page.buildingSolutions.columns.shipmentManagement.features.map((feature: string, idx: number) => (
            <div key={idx}>
              {renderEditableField(`Feature ${idx + 1}`, `buildingSolutions.columns.shipmentManagement.features.${idx}`, feature || '')}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Resilience Model Section for SCM
  const renderSCMResilienceModelSection = (page: any) => {
    if (!page.resilienceModel) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Supply Chain Resilience Model Section</h3>
        {renderEditableField('Title', 'resilienceModel.title', page.resilienceModel.title || '')}
        {renderEditableField('Description', 'resilienceModel.description', page.resilienceModel.description || '', true)}
        {renderEditableField('Description 2', 'resilienceModel.description2', page.resilienceModel.description2 || '', true)}
        {page.resilienceModel.points && page.resilienceModel.points.map((point: string, index: number) => (
          <div key={index}>
            {renderEditableField(`Point ${index + 1}`, `resilienceModel.points.${index}`, point || '')}
          </div>
        ))}
        {renderImageUpload('Image', 'resilienceModel.image', page.resilienceModel.image || '')}
        {renderEditableField('Button Text', 'resilienceModel.buttonText', page.resilienceModel.buttonText || '')}
      </div>
    );
  };

  // Render Supply Chain Platform Section for SCM
  const renderSCMSupplyChainPlatformSection = (page: any) => {
    if (!page.supplyChainPlatform) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Supply Chain Platform Section</h3>
        {renderEditableField('Title', 'supplyChainPlatform.title', page.supplyChainPlatform.title || '')}
        {renderEditableField('Description', 'supplyChainPlatform.description', page.supplyChainPlatform.description || '', true)}
        {renderEditableField('Description 2', 'supplyChainPlatform.description2', page.supplyChainPlatform.description2 || '', true)}
        {renderImageUpload('Image', 'supplyChainPlatform.image', page.supplyChainPlatform.image || '')}
        {renderEditableField('Image Caption', 'supplyChainPlatform.imageCaption', page.supplyChainPlatform.imageCaption || '')}
        {renderEditableField('Button Text', 'supplyChainPlatform.buttonText', page.supplyChainPlatform.buttonText || '')}
      </div>
    );
  };

  // Render Gartner Recognition Section for SCM
  const renderSCMGartnerRecognitionSection = (page: any) => {
    if (!page.gartnerRecognition) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Gartner Recognition Section</h3>
        {renderEditableField('Title', 'gartnerRecognition.title', page.gartnerRecognition.title || '')}
        {renderEditableField('Description', 'gartnerRecognition.description', page.gartnerRecognition.description || '', true)}
        {renderEditableField('Description 2', 'gartnerRecognition.description2', page.gartnerRecognition.description2 || '', true)}
        {renderImageUpload('Image', 'gartnerRecognition.image', page.gartnerRecognition.image || '')}
        {renderEditableField('Button Text', 'gartnerRecognition.buttonText', page.gartnerRecognition.buttonText || '')}
      </div>
    );
  };

  // Render Digital Transformation Section for SCM
  const renderSCMDigitalTransformationSection = (page: any) => {
    if (!page.digitalTransformation) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Digital Transformation Section</h3>
        {renderEditableField('Title', 'digitalTransformation.title', page.digitalTransformation.title || '')}
        {renderEditableField('Description', 'digitalTransformation.description', page.digitalTransformation.description || '', true)}
        {renderEditableField('Description 2', 'digitalTransformation.description2', page.digitalTransformation.description2 || '', true)}
        {renderImageUpload('Image', 'digitalTransformation.image', page.digitalTransformation.image || '')}
        {renderEditableField('Image Caption', 'digitalTransformation.imageCaption', page.digitalTransformation.imageCaption || '')}
        {renderEditableField('Button Text', 'digitalTransformation.buttonText', page.digitalTransformation.buttonText || '')}
      </div>
    );
  };

  // Render SCM CTA Section
  const renderSCMCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };
// ========== GOH (GARMENTS ON HANGER) SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for GOH
  const renderGOHHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Image', 'hero.image', page.hero.image || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render Overview Section for GOH
  const renderGOHOverviewSection = (page: any) => {
    if (!page.overview) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Overview Section</h3>
        {renderEditableField('Title', 'overview.title', page.overview.title || '')}
        {renderEditableField('Description', 'overview.description', page.overview.description || '', true)}
        {renderEditableField('Description 2', 'overview.description2', page.overview.description2 || '', true)}
        {renderEditableField('Image Caption', 'overview.imageCaption', page.overview.imageCaption || '')}
        {renderImageUpload('Image', 'overview.image', page.overview.image || '')}
      </div>
    );
  };

  // Render Why Choose Us Section (4 Benefits)
  const renderGOHWhyChooseUsSection = (page: any) => {
    if (!page.whyChooseUs) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Choose Us Section (4 Benefits)</h3>
        {renderEditableField('Title', 'whyChooseUs.title', page.whyChooseUs.title || '')}
        {page.whyChooseUs.benefits && page.whyChooseUs.benefits.map((benefit: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Benefit {index + 1}</h4>
            {renderEditableField(`Title`, `whyChooseUs.benefits.${index}.title`, benefit.title || '')}
            {renderEditableField(`Description`, `whyChooseUs.benefits.${index}.description`, benefit.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Services Include Section (5 Services)
  const renderGOHServicesIncludeSection = (page: any) => {
    if (!page.servicesInclude) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Services Include Section (5 Services)</h3>
        {renderEditableField('Title', 'servicesInclude.title', page.servicesInclude.title || '')}
        {renderEditableField('Subtitle', 'servicesInclude.subtitle', page.servicesInclude.subtitle || '', true)}
        {page.servicesInclude.services && page.servicesInclude.services.map((service: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Service {index + 1}</h4>
            {renderEditableField(`Title`, `servicesInclude.services.${index}.title`, service.title || '')}
            {renderEditableField(`Description`, `servicesInclude.services.${index}.description`, service.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Services Tab Section
  const renderGOHServicesSection = (page: any) => {
    if (!page.services) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Services Tab Section</h3>
        {renderEditableField('Title', 'services.title', page.services.title || '')}
        {page.services.items && page.services.items.map((item: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Service {index + 1}</h4>
            {renderEditableField(`Title`, `services.items.${index}.title`, item.title || '')}
            {renderEditableField(`Description`, `services.items.${index}.description`, item.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Systems Section
  const renderGOHSystemsSection = (page: any) => {
    if (!page.systems) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Systems Section</h3>
        {renderEditableField('Title', 'systems.title', page.systems.title || '')}
        {page.systems.systems && page.systems.systems.map((system: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">System {index + 1}</h4>
            {renderEditableField(`Title`, `systems.systems.${index}.title`, system.title || '')}
            {renderEditableField(`Description`, `systems.systems.${index}.description`, system.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Contact Section for GOH
  const renderGOHContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
      </div>
    );
  };

  // Render GOH CTA Section
  const renderGOHCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };
// ========== CARS IN CONTAINERS SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Cars in Containers
  const renderCICHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Image', 'hero.image', page.hero.image || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render What is CiC Section
  const renderCICWhatIsSection = (page: any) => {
    if (!page.whatIsCiC) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">What is Cars in Containers Section</h3>
        {renderEditableField('Title', 'whatIsCiC.title', page.whatIsCiC.title || '')}
        {renderEditableField('Description', 'whatIsCiC.description', page.whatIsCiC.description || '', true)}
        {renderEditableField('Description 2', 'whatIsCiC.description2', page.whatIsCiC.description2 || '', true)}
        {renderImageUpload('Image', 'whatIsCiC.image', page.whatIsCiC.image || '')}
      </div>
    );
  };

  // Render Why Complement Section
  const renderCICWhyComplementSection = (page: any) => {
    if (!page.whyComplement) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Complement Section</h3>
        {renderEditableField('Title', 'whyComplement.title', page.whyComplement.title || '')}
        {renderEditableField('Description', 'whyComplement.description', page.whyComplement.description || '', true)}
        {renderImageUpload('Image', 'whyComplement.image', page.whyComplement.image || '')}
        {renderEditableField('Image Caption', 'whyComplement.imageCaption', page.whyComplement.imageCaption || '')}
      </div>
    );
  };

  // Render Why Need CiC Section (3 Benefits)
  const renderCICWhyNeedSection = (page: any) => {
    if (!page.whyNeedCiC) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Need Cars in Containers Section (3 Benefits)</h3>
        {renderEditableField('Title', 'whyNeedCiC.title', page.whyNeedCiC.title || '')}
        {page.whyNeedCiC.benefits && page.whyNeedCiC.benefits.map((benefit: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Benefit {index + 1}</h4>
            {renderEditableField(`Title`, `whyNeedCiC.benefits.${index}.title`, benefit.title || '')}
            {renderEditableField(`Description`, `whyNeedCiC.benefits.${index}.description`, benefit.description || '', true)}
          </div>
        ))}
        {renderEditableField('Button Text', 'whyNeedCiC.buttonText', page.whyNeedCiC.buttonText || '')}
      </div>
    );
  };

  // Render How It Works Section
  const renderCICHowItWorksSection = (page: any) => {
    if (!page.howItWorks) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">How It Works Section</h3>
        {renderEditableField('Title', 'howItWorks.title', page.howItWorks.title || '')}
        {renderEditableField('Description', 'howItWorks.description', page.howItWorks.description || '', true)}
        {page.howItWorks.processSteps && page.howItWorks.processSteps.map((step: string, index: number) => (
          <div key={index}>
            {renderEditableField(`Step ${index + 1}`, `howItWorks.processSteps.${index}`, step || '')}
          </div>
        ))}
        {renderImageUpload('Image', 'howItWorks.image', page.howItWorks.image || '')}
        {renderEditableField('Image Caption', 'howItWorks.imageCaption', page.howItWorks.imageCaption || '')}
      </div>
    );
  };

  // Render Benefits Section
  const renderCICBenefitsSection = (page: any) => {
    if (!page.benefits) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Benefits Section (3 Benefits)</h3>
        {renderEditableField('Title', 'benefits.title', page.benefits.title || '')}
        {page.benefits.items && page.benefits.items.map((item: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Benefit {index + 1}</h4>
            {renderEditableField(`Title`, `benefits.items.${index}.title`, item.title || '')}
            {renderEditableField(`Description`, `benefits.items.${index}.description`, item.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Contact Section for Cars in Containers
  const renderCICContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
      </div>
    );
  };

  // Render CIC CTA Section
  const renderCICCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };

// ========== FLEXIBAG SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Flexibag
  const renderFlexibagHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Image', 'hero.image', page.hero.image || '')}
        {renderEditableField('Button Text', 'hero.buttonText', page.hero.buttonText || '')}
      </div>
    );
  };

  // Render What is Flexibag Section
  const renderFlexibagWhatIsSection = (page: any) => {
    if (!page.whatIsFlexibag) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">What is Flexibag Section</h3>
        {renderEditableField('Title', 'whatIsFlexibag.title', page.whatIsFlexibag.title || '')}
        {renderEditableField('Description', 'whatIsFlexibag.description', page.whatIsFlexibag.description || '', true)}
        {renderEditableField('Description 2', 'whatIsFlexibag.description2', page.whatIsFlexibag.description2 || '', true)}
        {renderEditableField('Description 3', 'whatIsFlexibag.description3', page.whatIsFlexibag.description3 || '', true)}
        {renderImageUpload('Image', 'whatIsFlexibag.image', page.whatIsFlexibag.image || '')}
        {renderEditableField('Image Caption', 'whatIsFlexibag.imageCaption', page.whatIsFlexibag.imageCaption || '')}
      </div>
    );
  };

  // Render Ideal Choice Section (3 Categories)
  const renderFlexibagIdealChoiceSection = (page: any) => {
    if (!page.idealChoice) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Ideal Choice Section (3 Categories)</h3>
        {renderEditableField('Title', 'idealChoice.title', page.idealChoice.title || '')}
        {renderEditableField('Subtitle', 'idealChoice.subtitle', page.idealChoice.subtitle || '', true)}
        {page.idealChoice.categories && page.idealChoice.categories.map((category: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Category {index + 1}</h4>
            {renderEditableField(`Title`, `idealChoice.categories.${index}.title`, category.title || '')}
            {renderEditableField(`Description`, `idealChoice.categories.${index}.description`, category.description || '', true)}
            {renderEditableField(`Example Commodities`, `idealChoice.categories.${index}.exampleCommodities`, category.exampleCommodities || '')}
            {renderImageUpload(`Image`, `idealChoice.categories.${index}.image`, category.image || '')}
          </div>
        ))}
      </div>
    );
  };

  // Render What are Flexibags Section
  const renderFlexibagWhatAreSection = (page: any) => {
    if (!page.whatAreFlexibags) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">What are Flexibags Section</h3>
        {renderEditableField('Title', 'whatAreFlexibags.title', page.whatAreFlexibags.title || '')}
        {renderEditableField('Description', 'whatAreFlexibags.description', page.whatAreFlexibags.description || '', true)}
        {renderEditableField('Description 2', 'whatAreFlexibags.description2', page.whatAreFlexibags.description2 || '', true)}
        {renderEditableField('Callout', 'whatAreFlexibags.callout', page.whatAreFlexibags.callout || '')}
        {renderImageUpload('Image', 'whatAreFlexibags.image', page.whatAreFlexibags.image || '')}
      </div>
    );
  };

  // Render Need More Info Section
  const renderFlexibagNeedMoreInfoSection = (page: any) => {
    if (!page.needMoreInfo) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Need More Info Section</h3>
        {renderEditableField('Title', 'needMoreInfo.title', page.needMoreInfo.title || '')}
        {renderEditableField('Description', 'needMoreInfo.description', page.needMoreInfo.description || '', true)}
        {renderEditableField('Button Text', 'needMoreInfo.buttonText', page.needMoreInfo.buttonText || '')}
      </div>
    );
  };

  // Render How It Works Section for Flexibag
  const renderFlexibagHowItWorksSection = (page: any) => {
    if (!page.howItWorks) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">How It Works Section</h3>
        {renderEditableField('Title', 'howItWorks.title', page.howItWorks.title || '')}
        {renderEditableField('Subtitle', 'howItWorks.subtitle', page.howItWorks.subtitle || '', true)}
        {page.howItWorks.steps && page.howItWorks.steps.map((step: string, index: number) => (
          <div key={index}>
            {renderEditableField(`Step ${index + 1}`, `howItWorks.steps.${index}`, step || '')}
          </div>
        ))}
        {renderImageUpload('Image', 'howItWorks.image', page.howItWorks.image || '')}
      </div>
    );
  };

  // Render Benefits Section for Flexibag
  const renderFlexibagBenefitsSection = (page: any) => {
    if (!page.benefits) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Benefits Section (5 Benefits)</h3>
        {renderEditableField('Title', 'benefits.title', page.benefits.title || '')}
        {page.benefits.items && page.benefits.items.map((item: any, index: number) => (
          <div key={index} className="ml-4 mb-4 p-3 border-l-4 border-green-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-2">Benefit {index + 1}</h4>
            {renderEditableField(`Title`, `benefits.items.${index}.title`, item.title || '')}
            {renderEditableField(`Description`, `benefits.items.${index}.description`, item.description || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // Render Contact Section for Flexibag
  const renderFlexibagContactSection = (page: any) => {
    if (!page.contact) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Section</h3>
        {renderEditableField('Title', 'contact.title', page.contact.title || '')}
        {renderEditableField('Subtitle', 'contact.subtitle', page.contact.subtitle || '', true)}
        {renderEditableField('Button Text', 'contact.buttonText', page.contact.buttonText || '')}
      </div>
    );
  };

  // Render Flexibag CTA Section
  const renderFlexibagCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('CTA Title', 'cta.title', page.cta.title || '')}
        {renderEditableField('CTA Subtitle', 'cta.subtitle', page.cta.subtitle || '', true)}
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
      </div>
    );
  };

// ========== LEADERSHIP SECTION RENDER FUNCTIONS ==========
  // Render Hero Section for Leadership
  const renderLeadershipHeroSection = (page: any) => {
    if (!page.hero) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderEditableField('Hero Title', 'hero.title', page.hero.title || '')}
        {renderEditableField('Hero Subtitle', 'hero.subtitle', page.hero.subtitle || '', true)}
        {renderImageUpload('Hero Background Image', 'hero.image', page.hero.image || '')}
      </div>
    );
  };

  // Render Intro Section for Leadership
  const renderLeadershipIntroSection = (page: any) => {
    if (!page.introSection) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Intro Section</h3>
        {renderEditableField('Title', 'introSection.title', page.introSection.title || '')}
        {renderEditableField('Description', 'introSection.description', page.introSection.description || '', true)}
      </div>
    );
  };

  // Render Leaders Section (Team Members)
  const renderLeadersSection = (page: any) => {
    if (!page.leaders) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Leaders Section (Team Members)</h3>
        {page.leaders.map((leader: any, index: number) => (
          <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Leader {index + 1}</h4>
            {renderEditableField(`Name`, `leaders.${index}.name`, leader.name || '')}
            {renderEditableField(`Title`, `leaders.${index}.title`, leader.title || '')}
            {renderEditableField(`Description`, `leaders.${index}.description`, leader.description || '', true)}
            {renderImageUpload(`Profile Image`, `leaders.${index}.image`, leader.image || '')}
          </div>
        ))}
      </div>
    );
  };

  // Render CTA Section for Leadership
  const renderLeadershipCTASection = (page: any) => {
    if (!page.cta) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Call to Action Section</h3>
        {renderEditableField('Button Text', 'cta.buttonText', page.cta.buttonText || '')}
        {renderEditableField('Button Link', 'cta.buttonLink', page.cta.buttonLink || '')}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div>Loading content from server...</div>
      </div>
    );
  }

  const currentPage = content?.pages?.[selectedPage] ?? content?.[selectedPage];
  const editableSections = getEditableSections(selectedPage);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Trident Admin Panel</h1>
          <p className="text-sm text-gray-500">
            Logged in as: {localStorage.getItem('admin_email')} ({localStorage.getItem('admin_role')})
          </p>
        </div>
        <div className="flex gap-3">
          <a href="/" target="_blank" className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-2">
            View Website →
          </a>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
      
      <div className="p-8">
        {/* Save Message */}
        {saveMessage && (
          <div className="fixed top-20 right-8 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-20">
            {saveMessage}
          </div>
        )}
        
        {/* Page Selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Page to Edit:</label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {pages.map(page => (
              <option key={page.id} value={page.id}>{page.label}</option>
            ))}
          </select>
        </div>
        
        {/* Content Editor */}
        {currentPage && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Editing: {pages.find(p => p.id === selectedPage)?.label}
              </h2>
              
              {/* Page Status Toggle */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {currentPage.isActive ? '✅ Visible' : '❌ Hidden'}
                </span>
                <button
                  onClick={togglePageActive}
                  disabled={saving}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    currentPage.isActive 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  } disabled:opacity-50`}
                >
                  {currentPage.isActive ? 'Hide Page' : 'Show Page'}
                </button>
              </div>
            </div>
            
            {/* Section Tabs */}
            <div className="flex gap-2 mb-6 border-b overflow-x-auto">
              {editableSections.map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 text-sm font-medium capitalize whitespace-nowrap ${
                    activeSection === section
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            
            {/* Render selected section */}
            <div className="max-h-[70vh] overflow-y-auto pr-4">
            {/* Homepage sections */}
            {selectedPage === 'home' && activeSection === 'hero' && renderHomeHeroSection(currentPage)}
            {selectedPage === 'home' && activeSection === 'beReady' && renderBeReadySection(currentPage)}
            {selectedPage === 'home' && activeSection === 'callUs' && renderCallUsSection(currentPage)}
            {selectedPage === 'home' && activeSection === 'eastWestNetwork' && renderEastWestNetworkSection(currentPage)}
            {selectedPage === 'home' && activeSection === 'logisticsTrendMap' && renderLogisticsTrendMapSection(currentPage)}
            {selectedPage === 'home' && activeSection === 'logisticsServices' && renderLogisticsServicesSection(currentPage)}
            {selectedPage === 'home' && activeSection === 'industrySectors' && renderIndustrySectorsSection(currentPage)}
            
            {/* About page sections */}
            {selectedPage === 'about' && activeSection === 'hero' && renderHeroSection(currentPage)}
            {selectedPage === 'about' && activeSection === 'purpose' && renderPurposeSection(currentPage)}
            {selectedPage === 'about' && activeSection === 'vision' && renderVisionSection(currentPage)}
            {selectedPage === 'about' && activeSection === 'values' && renderValuesSection(currentPage)}
            {selectedPage === 'about' && activeSection === 'leadership' && renderLeadershipSection(currentPage)}
            {selectedPage === 'about' && activeSection === 'sustainability' && renderSustainabilitySection(currentPage)}
            {selectedPage === 'about' && activeSection === 'cta' && renderCTASection(currentPage)}

            {/* Ocean Transport sections */}
            {selectedPage === 'ocean-transport' && activeSection === 'hero' && renderOceanHeroSection(currentPage)}
            {selectedPage === 'ocean-transport' && activeSection === 'predictableDeliveries' && renderPredictableDeliveriesSection(currentPage)}
            {selectedPage === 'ocean-transport' && activeSection === 'eastWestNetwork' && renderOceanEastWestNetworkSection(currentPage)}
            {selectedPage === 'ocean-transport' && activeSection === 'gallery' && renderGallerySection(currentPage)}
            {selectedPage === 'ocean-transport' && activeSection === 'faqs' && renderFaqsSection(currentPage)}
            {selectedPage === 'ocean-transport' && activeSection === 'cta' && renderOceanCTASection(currentPage)}

            {/* Inland Transport sections */}
            {selectedPage === 'inland-transport' && activeSection === 'hero' && renderInlandHeroSection(currentPage)}
            {selectedPage === 'inland-transport' && activeSection === 'features' && renderInlandFeaturesSection(currentPage)}
            {selectedPage === 'inland-transport' && activeSection === 'servicesDescription' && renderInlandServicesDescriptionSection(currentPage)}
            {selectedPage === 'inland-transport' && activeSection === 'solutions' && renderInlandSolutionsSection(currentPage)}
            {selectedPage === 'inland-transport' && activeSection === 'cta' && renderInlandCTASection(currentPage)}

            {/* LCL sections */}
            {selectedPage === 'lcl' && activeSection === 'hero' && renderLCLHeroSection(currentPage)}
            {selectedPage === 'lcl' && activeSection === 'promotionalCard' && renderPromotionalCardSection(currentPage)}
            {selectedPage === 'lcl' && activeSection === 'whatIsLCL' && renderWhatIsLCLSection(currentPage)}
            {selectedPage === 'lcl' && activeSection === 'whyChooseLCL' && renderWhyChooseLCLSection(currentPage)}
            {selectedPage === 'lcl' && activeSection === 'lclVsFCL' && renderLCLVsFCLSection(currentPage)}
            {selectedPage === 'lcl' && activeSection === 'whenToUseLCL' && renderWhenToUseLCLSection(currentPage)}
            {selectedPage === 'lcl' && activeSection === 'howItWorks' && renderHowItWorksSection(currentPage)}
            {selectedPage === 'lcl' && activeSection === 'costInfo' && renderCostInfoSection(currentPage)}
            {selectedPage === 'lcl' && activeSection === 'faqs' && renderLCLFaqsSection(currentPage)}
            {selectedPage === 'lcl' && activeSection === 'cta' && renderLCLCTASection(currentPage)}

            {/* Air Freight sections */}
            {selectedPage === 'air-freight' && activeSection === 'hero' && renderAirHeroSection(currentPage)}
            {selectedPage === 'air-freight' && activeSection === 'servicesTitle' && renderServicesTitleSection(currentPage)}
            {selectedPage === 'air-freight' && activeSection === 'airFreight' && renderAirFreightSection(currentPage)}
            {selectedPage === 'air-freight' && activeSection === 'tridentAirCargo' && renderTridentAirCargoSection(currentPage)}
            {selectedPage === 'air-freight' && activeSection === 'seaAir' && renderSeaAirSection(currentPage)}
            {selectedPage === 'air-freight' && activeSection === 'airCharter' && renderAirCharterSection(currentPage)}
            {selectedPage === 'air-freight' && activeSection === 'whyChooseUs' && renderWhyChooseUsSection(currentPage)}
            {selectedPage === 'air-freight' && activeSection === 'howItWorks' && renderAirHowItWorksSection(currentPage)}
            {selectedPage === 'air-freight' && activeSection === 'faqs' && renderAirFaqsSection(currentPage)}
            {selectedPage === 'air-freight' && activeSection === 'cta' && renderAirCTASection(currentPage)}

            {/* Ground Freight sections */}
            {selectedPage === 'ground-freight' && activeSection === 'hero' && renderGroundHeroSection(currentPage)}
            {selectedPage === 'ground-freight' && activeSection === 'servicesTitle' && renderGroundServicesTitleSection(currentPage)}
            {selectedPage === 'ground-freight' && activeSection === 'fullTruckload' && renderFullTruckloadSection(currentPage)}
            {selectedPage === 'ground-freight' && activeSection === 'lessThanTruckload' && renderLessThanTruckloadSection(currentPage)}
            {selectedPage === 'ground-freight' && activeSection === 'crossBorder' && renderCrossBorderSection(currentPage)}
            {selectedPage === 'ground-freight' && activeSection === 'whyChooseUs' && renderGroundWhyChooseUsSection(currentPage)}
            {selectedPage === 'ground-freight' && activeSection === 'contactSteps' && renderContactStepsSection(currentPage)}
            {selectedPage === 'ground-freight' && activeSection === 'needSupport' && renderNeedSupportSection(currentPage)}
            {selectedPage === 'ground-freight' && activeSection === 'faqs' && renderGroundFaqsSection(currentPage)}
            {selectedPage === 'ground-freight' && activeSection === 'cta' && renderGroundCTASection(currentPage)}

            {/* Warehousing sections */}
            {selectedPage === 'warehousing' && activeSection === 'hero' && renderWarehousingHeroSection(currentPage)}
            {selectedPage === 'warehousing' && activeSection === 'buildSupplyChain' && renderBuildSupplyChainSection(currentPage)}
            {selectedPage === 'warehousing' && activeSection === 'whyTrident' && renderWhyTridentSection(currentPage)}
            {selectedPage === 'warehousing' && activeSection === 'servicesOffer' && renderServicesOfferSection(currentPage)}
            {selectedPage === 'warehousing' && activeSection === 'wmsSupport' && renderWMSSupportSection(currentPage)}
            {selectedPage === 'warehousing' && activeSection === 'cta' && renderWarehousingCTASection(currentPage)}

            {/* Depot sections */}
            {selectedPage === 'depot' && activeSection === 'hero' && renderDepotHeroSection(currentPage)}
            {selectedPage === 'depot' && activeSection === 'overview' && renderDepotOverviewSection(currentPage)}
            {selectedPage === 'depot' && activeSection === 'services' && renderDepotServicesSection(currentPage)}
            {selectedPage === 'depot' && activeSection === 'contact' && renderDepotContactSection(currentPage)}

            {/* Cold Storage sections */}
            {selectedPage === 'cold-storage' && activeSection === 'hero' && renderColdStorageHeroSection(currentPage)}
            {selectedPage === 'cold-storage' && activeSection === 'benefits' && renderColdStorageBenefitsSection(currentPage)}
            {selectedPage === 'cold-storage' && activeSection === 'advantages' && renderColdStorageAdvantagesSection(currentPage)}
            {selectedPage === 'cold-storage' && activeSection === 'contact' && renderColdStorageContactSection(currentPage)}
            {selectedPage === 'cold-storage' && activeSection === 'cta' && renderColdStorageCTASection(currentPage)}

            {/* Customs Services sections */}
            {selectedPage === 'customs-services' && activeSection === 'hero' && renderCustomsHeroSection(currentPage)}
            {selectedPage === 'customs-services' && activeSection === 'localExpertise' && renderLocalExpertiseSection(currentPage)}
            {selectedPage === 'customs-services' && activeSection === 'whyChooseUs' && renderCustomsWhyChooseUsSection(currentPage)}
            {selectedPage === 'customs-services' && activeSection === 'contact' && renderCustomsContactSection(currentPage)}
            {selectedPage === 'customs-services' && activeSection === 'cta' && renderCustomsCTASection(currentPage)}

            {/* Project Logistics sections */}
            {selectedPage === 'project-logistics' && activeSection === 'hero' && renderProjectHeroSection(currentPage)}
            {selectedPage === 'project-logistics' && activeSection === 'overview' && renderProjectOverviewSection(currentPage)}
            {selectedPage === 'project-logistics' && activeSection === 'services' && renderProjectServicesSection(currentPage)}
            {selectedPage === 'project-logistics' && activeSection === 'whyChooseUs' && renderProjectWhyChooseUsSection(currentPage)}
            {selectedPage === 'project-logistics' && activeSection === 'contact' && renderProjectContactSection(currentPage)}
            {selectedPage === 'project-logistics' && activeSection === 'cta' && renderProjectCTASection(currentPage)}

            {/* FMCG sections */}
            {selectedPage === 'fmcg' && activeSection === 'hero' && renderFMCGHeroSection(currentPage)}
            {selectedPage === 'fmcg' && activeSection === 'overview' && renderFMCOverviewSection(currentPage)}
            {selectedPage === 'fmcg' && activeSection === 'strategy' && renderFMCStrategySection(currentPage)}
            {selectedPage === 'fmcg' && activeSection === 'segments' && renderFMCSegmentsSection(currentPage)}
            {selectedPage === 'fmcg' && activeSection === 'contact' && renderFMCGContactSection(currentPage)}
            {selectedPage === 'fmcg' && activeSection === 'cta' && renderFMCGCTASection(currentPage)}

            {/* Fashion & Lifestyle sections */}
            {selectedPage === 'fashion-lifestyle' && activeSection === 'hero' && renderFashionHeroSection(currentPage)}
            {selectedPage === 'fashion-lifestyle' && activeSection === 'overview' && renderFashionOverviewSection(currentPage)}
            {selectedPage === 'fashion-lifestyle' && activeSection === 'growStrategy' && renderFashionGrowStrategySection(currentPage)}
            {selectedPage === 'fashion-lifestyle' && activeSection === 'industries' && renderFashionIndustriesSection(currentPage)}
            {selectedPage === 'fashion-lifestyle' && activeSection === 'contact' && renderFashionContactSection(currentPage)}
            {selectedPage === 'fashion-lifestyle' && activeSection === 'cta' && renderFashionCTASection(currentPage)}

            {/* Retail sections */}
            {selectedPage === 'retail' && activeSection === 'hero' && renderRetailHeroSection(currentPage)}
            {selectedPage === 'retail' && activeSection === 'overview' && renderRetailOverviewSection(currentPage)}
            {selectedPage === 'retail' && activeSection === 'strategy' && renderRetailStrategySection(currentPage)}
            {selectedPage === 'retail' && activeSection === 'categories' && renderRetailCategoriesSection(currentPage)}
            {selectedPage === 'retail' && activeSection === 'contact' && renderRetailContactSection(currentPage)}
            {selectedPage === 'retail' && activeSection === 'cta' && renderRetailCTASection(currentPage)}

            {/* Chemicals sections */}
            {selectedPage === 'chemicals' && activeSection === 'hero' && renderChemicalsHeroSection(currentPage)}
            {selectedPage === 'chemicals' && activeSection === 'overview' && renderChemicalsOverviewSection(currentPage)}
            {selectedPage === 'chemicals' && activeSection === 'industryOverview' && renderChemicalsIndustryOverviewSection(currentPage)}
            {selectedPage === 'chemicals' && activeSection === 'trends' && renderChemicalsTrendsSection(currentPage)}
            {selectedPage === 'chemicals' && activeSection === 'servicesOverview' && renderChemicalsServicesOverviewSection(currentPage)}
            {selectedPage === 'chemicals' && activeSection === 'chemicalTypes' && renderChemicalsTypesSection(currentPage)}
            {selectedPage === 'chemicals' && activeSection === 'contact' && renderChemicalsContactSection(currentPage)}
            {selectedPage === 'chemicals' && activeSection === 'cta' && renderChemicalsCTASection(currentPage)}

            {/* Automotive sections */}
            {selectedPage === 'automotive' && activeSection === 'hero' && renderAutomotiveHeroSection(currentPage)}
            {selectedPage === 'automotive' && activeSection === 'overview' && renderAutomotiveOverviewSection(currentPage)}
            {selectedPage === 'automotive' && activeSection === 'strategy' && renderAutomotiveStrategySection(currentPage)}
            {selectedPage === 'automotive' && activeSection === 'sectors' && renderAutomotiveSectorsSection(currentPage)}
            {selectedPage === 'automotive' && activeSection === 'contact' && renderAutomotiveContactSection(currentPage)}
            {selectedPage === 'automotive' && activeSection === 'cta' && renderAutomotiveCTASection(currentPage)}

            {/* Pharma & Healthcare sections */}
            {selectedPage === 'pharma-healthcare' && activeSection === 'hero' && renderPharmaHeroSection(currentPage)}
            {selectedPage === 'pharma-healthcare' && activeSection === 'overview' && renderPharmaOverviewSection(currentPage)}
            {selectedPage === 'pharma-healthcare' && activeSection === 'strategy' && renderPharmaStrategySection(currentPage)}
            {selectedPage === 'pharma-healthcare' && activeSection === 'segments' && renderPharmaSegmentsSection(currentPage)}
            {selectedPage === 'pharma-healthcare' && activeSection === 'contact' && renderPharmaContactSection(currentPage)}
            {selectedPage === 'pharma-healthcare' && activeSection === 'cta' && renderPharmaCTASection(currentPage)}

            {/* Trident Rate sections */}
            {selectedPage === 'trident-rate' && activeSection === 'hero' && renderTridentRateHeroSection(currentPage)}
            {selectedPage === 'trident-rate' && activeSection === 'shippingMadeSimple' && renderShippingMadeSimpleSection(currentPage)}
            {selectedPage === 'trident-rate' && activeSection === 'whyTridentRate' && renderWhyTridentRateSection(currentPage)}
            {selectedPage === 'trident-rate' && activeSection === 'cta' && renderTridentRateCTASection(currentPage)}

            {/* Ocean Contract sections */}
            {selectedPage === 'ocean-contract' && activeSection === 'hero' && renderOceanContractHeroSection(currentPage)}
            {selectedPage === 'ocean-contract' && activeSection === 'overview' && renderOceanContractOverviewSection(currentPage)}
            {selectedPage === 'ocean-contract' && activeSection === 'whyChooseUs' && renderOceanContractWhyChooseUsSection(currentPage)}
            {selectedPage === 'ocean-contract' && activeSection === 'contractProducts' && renderContractProductsSection(currentPage)}
            {selectedPage === 'ocean-contract' && activeSection === 'cta' && renderOceanContractCTASection(currentPage)}

            {/* Special Cargo sections */}
            {selectedPage === 'special-cargo' && activeSection === 'hero' && renderSpecialCargoHeroSection(currentPage)}
            {selectedPage === 'special-cargo' && activeSection === 'overview' && renderSpecialCargoOverviewSection(currentPage)}
            {selectedPage === 'special-cargo' && activeSection === 'oneStopShop' && renderOneStopShopSection(currentPage)}
            {selectedPage === 'special-cargo' && activeSection === 'cargoTypes' && renderCargoTypesSection(currentPage)}
            {selectedPage === 'special-cargo' && activeSection === 'containerSpecs' && renderContainerSpecsSection(currentPage)}
            {selectedPage === 'special-cargo' && activeSection === 'cta' && renderSpecialCargoCTASection(currentPage)}

            {/* SCM sections */}
            {selectedPage === 'scm' && activeSection === 'hero' && renderSCMHeroSection(currentPage)}
            {selectedPage === 'scm' && activeSection === 'section1' && renderSCMSection1Section(currentPage)}
            {selectedPage === 'scm' && activeSection === 'section2' && renderSCMSection2Section(currentPage)}
            {selectedPage === 'scm' && activeSection === 'section3' && renderSCMSection3Section(currentPage)}
            {selectedPage === 'scm' && activeSection === 'buildingSolutions' && renderSCMBuildingSolutionsSection(currentPage)}
            {selectedPage === 'scm' && activeSection === 'resilienceModel' && renderSCMResilienceModelSection(currentPage)}
            {selectedPage === 'scm' && activeSection === 'supplyChainPlatform' && renderSCMSupplyChainPlatformSection(currentPage)}
            {selectedPage === 'scm' && activeSection === 'gartnerRecognition' && renderSCMGartnerRecognitionSection(currentPage)}
            {selectedPage === 'scm' && activeSection === 'digitalTransformation' && renderSCMDigitalTransformationSection(currentPage)}
            {selectedPage === 'scm' && activeSection === 'cta' && renderSCMCTASection(currentPage)}

            {/* GOH sections */}
            {selectedPage === 'goh' && activeSection === 'hero' && renderGOHHeroSection(currentPage)}
            {selectedPage === 'goh' && activeSection === 'overview' && renderGOHOverviewSection(currentPage)}
            {selectedPage === 'goh' && activeSection === 'whyChooseUs' && renderGOHWhyChooseUsSection(currentPage)}
            {selectedPage === 'goh' && activeSection === 'servicesInclude' && renderGOHServicesIncludeSection(currentPage)}
            {selectedPage === 'goh' && activeSection === 'services' && renderGOHServicesSection(currentPage)}
            {selectedPage === 'goh' && activeSection === 'systems' && renderGOHSystemsSection(currentPage)}
            {selectedPage === 'goh' && activeSection === 'contact' && renderGOHContactSection(currentPage)}
            {selectedPage === 'goh' && activeSection === 'cta' && renderGOHCTASection(currentPage)}

            {/* Cars in Containers sections */}
            {selectedPage === 'cars-in-containers' && activeSection === 'hero' && renderCICHeroSection(currentPage)}
            {selectedPage === 'cars-in-containers' && activeSection === 'whatIsCiC' && renderCICWhatIsSection(currentPage)}
            {selectedPage === 'cars-in-containers' && activeSection === 'whyComplement' && renderCICWhyComplementSection(currentPage)}
            {selectedPage === 'cars-in-containers' && activeSection === 'whyNeedCiC' && renderCICWhyNeedSection(currentPage)}
            {selectedPage === 'cars-in-containers' && activeSection === 'howItWorks' && renderCICHowItWorksSection(currentPage)}
            {selectedPage === 'cars-in-containers' && activeSection === 'benefits' && renderCICBenefitsSection(currentPage)}
            {selectedPage === 'cars-in-containers' && activeSection === 'contact' && renderCICContactSection(currentPage)}
            {selectedPage === 'cars-in-containers' && activeSection === 'cta' && renderCICCTASection(currentPage)}

            {/* Flexibag sections */}
            {selectedPage === 'flexibags' && activeSection === 'hero' && renderFlexibagHeroSection(currentPage)}
            {selectedPage === 'flexibags' && activeSection === 'whatIsFlexibag' && renderFlexibagWhatIsSection(currentPage)}
            {selectedPage === 'flexibags' && activeSection === 'idealChoice' && renderFlexibagIdealChoiceSection(currentPage)}
            {selectedPage === 'flexibags' && activeSection === 'whatAreFlexibags' && renderFlexibagWhatAreSection(currentPage)}
            {selectedPage === 'flexibags' && activeSection === 'needMoreInfo' && renderFlexibagNeedMoreInfoSection(currentPage)}
            {selectedPage === 'flexibags' && activeSection === 'howItWorks' && renderFlexibagHowItWorksSection(currentPage)}
            {selectedPage === 'flexibags' && activeSection === 'benefits' && renderFlexibagBenefitsSection(currentPage)}
            {selectedPage === 'flexibags' && activeSection === 'contact' && renderFlexibagContactSection(currentPage)}
            {selectedPage === 'flexibags' && activeSection === 'cta' && renderFlexibagCTASection(currentPage)}

            {/* Leadership sections */}
            {selectedPage === 'leadership' && activeSection === 'hero' && renderLeadershipHeroSection(currentPage)}
            {selectedPage === 'leadership' && activeSection === 'introSection' && renderLeadershipIntroSection(currentPage)}
            {selectedPage === 'leadership' && activeSection === 'leaders' && renderLeadersSection(currentPage)}
            {selectedPage === 'leadership' && activeSection === 'cta' && renderLeadershipCTASection(currentPage)}
            
            {selectedPage !== 'home' && selectedPage !== 'about' && selectedPage !== 'ocean-transport' && selectedPage !== 'inland-transport' && selectedPage !== 'lcl' && selectedPage !== 'air-freight' && selectedPage !== 'ground-freight' && selectedPage !== 'warehousing' && selectedPage !== 'depot' && selectedPage !== 'cold-storage' && selectedPage !== 'customs-services' && selectedPage !== 'project-logistics' && selectedPage !== 'fmcg' && selectedPage !== 'fashion-lifestyle' && selectedPage !== 'retail' && selectedPage !== 'chemicals' && selectedPage !== 'automotive' && selectedPage !== 'pharma-healthcare' && selectedPage !== 'trident-rate' && selectedPage !== 'ocean-contract' && selectedPage !== 'special-cargo' && selectedPage !== 'scm' && selectedPage !== 'goh' && selectedPage !== 'cars-in-containers' && selectedPage !== 'flexibags' && selectedPage !== 'leadership' && activeSection === 'hero' && renderHeroSection(currentPage)}
            {selectedPage !== 'home' && selectedPage !== 'about' && selectedPage !== 'ocean-transport' && selectedPage !== 'inland-transport' && selectedPage !== 'lcl' && selectedPage !== 'air-freight' && selectedPage !== 'ground-freight' && selectedPage !== 'warehousing' && selectedPage !== 'depot' && selectedPage !== 'cold-storage' && selectedPage !== 'customs-services' && selectedPage !== 'project-logistics' && selectedPage !== 'fmcg' && selectedPage !== 'fashion-lifestyle' && selectedPage !== 'retail' && selectedPage !== 'chemicals' && selectedPage !== 'automotive' && selectedPage !== 'pharma-healthcare' && selectedPage !== 'trident-rate' && selectedPage !== 'ocean-contract' && selectedPage !== 'special-cargo' && selectedPage !== 'scm' && selectedPage !== 'goh' && selectedPage !== 'cars-in-containers' && selectedPage !== 'flexibags' && selectedPage !== 'leadership' && activeSection === 'cta' && renderCTASection(currentPage)}
            </div>
            
            {/* Server Status */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">✅ Connected to Backend Server</h3>
              <p className="text-sm text-green-700">
                Changes are saved to: D:\Trident Log\Trident-BE\data\content.json
              </p>
              <p className="text-xs text-green-600 mt-1">
                💡 Tip: Drag & drop images directly onto the upload area or click to browse
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Hide Navbar on admin pages */}
      <style>{`
        body.admin-mode nav,
        body.admin-mode .fixed.top-0.left-0.right-0.z-50 {
          display: none !important;
        }
        body.admin-mode {
          padding-top: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default ContentEditor;
