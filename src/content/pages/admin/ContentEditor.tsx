//D:/Trident Log/Trident-FE/src/content/pages/admin/ContentEditor.tsx

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentAPI, authAPI } from '../../../services/api';

// ========== HELPER: Set nested value by dot-separated path ==========
const setNestedValue = (obj: any, path: string, value: any) => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1] || lastKey;
    
    if (/^\d+$/.test(nextKey)) {
      // Next key is numeric → current[key] should be an array
      if (!Array.isArray(current[key])) {
        current[key] = [];
      }
    } else {
      // Next key is a string → current[key] should be an object
      if (!current[key] || typeof current[key] !== 'object' || Array.isArray(current[key])) {
        current[key] = {};
      }
    }
    current = current[key];
  }

  // Set the final value
  if (/^\d+$/.test(lastKey)) {
    current[parseInt(lastKey)] = value;
  } else {
    current[lastKey] = value;
  }
};

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
  //Relate to Get a Quote
  const [quoteRecipients, setQuoteRecipients] = useState<string[]>([]);
  const [newRecipientEmail, setNewRecipientEmail] = useState('');
  const [showQuoteRecipientEditor, setShowQuoteRecipientEditor] = useState(false);
  //Relate to Contact Us
  const [contactRecipients, setContactRecipients] = useState<string[]>([]);
  const [newContactRecipientEmail, setNewContactRecipientEmail] = useState('');
  const [showContactRecipientEditor, setShowContactRecipientEditor] = useState(false);

  // Available pages for editing
const pages = [
  { id: 'home', label: '🏠 Homepage' },
  { id: 'about', label: 'ℹ️ About Us' },
  { id: 'ocean-freight', label: '🚢 Services (Ocean Freight)' },
  { id: 'get-quote', label: '📋 Get a Quote' },
  { id: 'careers', label: '💼 Careers' },
  { id: 'contact', label: '📞 Contact Us' },
];

  // Helper to get current page data from either pages or root
  const getCurrentPageData = () => {
      return content?.pages?.[selectedPage] || {};
  };

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

    // Render Logistics Services Section for Homepage
    const renderLogisticsServicesSection = (page: any) => {
    if (!page.logisticsServices) {
        page.logisticsServices = { title: 'Logistics services and solutions', description: '', cards: [] };
    }
    if (!page.logisticsServices.cards) {
        page.logisticsServices.cards = [];
    }

    const toggleCardVisibility = async (index: number) => {
        const currentPageContent = { ...getCurrentPageData() };
        const card = currentPageContent.logisticsServices.cards[index];
        card.hidden = !card.hidden;
        
        try {
            await contentAPI.updatePage(selectedPage, currentPageContent);
            const updatedContent = { ...content };
            if (!updatedContent.pages) updatedContent.pages = {};
            updatedContent.pages[selectedPage] = currentPageContent;
            setContent(updatedContent);
            setSaveMessage(card.hidden ? '✅ Card hidden!' : '✅ Card visible!');
            setTimeout(() => setSaveMessage(''), 3000);
        } catch (error) {
            setSaveMessage('❌ Failed to update card');
            setTimeout(() => setSaveMessage(''), 3000);
        }
    };
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Logistics Services & Solutions</h3>
        {renderEditableField('Section Title', 'logisticsServices.title', page.logisticsServices.title || '')}
        {renderEditableField('Section Description', 'logisticsServices.description', page.logisticsServices.description || '', true)}
        
        <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-700 mb-4">Service Cards</h4>
            {(page.logisticsServices.cards || []).map((card: any, idx: number) => (
                <div key={idx} className={`mb-4 p-4 rounded-lg relative ${card.hidden ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium text-gray-700">
                            Card #{idx + 1} {card.hidden && <span className="text-red-500 text-xs ml-2">(Hidden)</span>}
                        </h5>
                        <button 
                            onClick={() => toggleCardVisibility(idx)}
                            className={`text-sm ${card.hidden ? 'text-green-600 hover:text-green-800' : 'text-amber-600 hover:text-amber-800'}`}
                        >
                            {card.hidden ? '👁️ Show' : '🙈 Hide'}
                        </button>
                    </div>
                    {renderEditableField('Title', `logisticsServices.cards.${idx}.title`, card.title || '')}
                    {renderEditableField('Description', `logisticsServices.cards.${idx}.description`, card.description || '', true)}
                    {renderImageUpload('Image', `logisticsServices.cards.${idx}.image`, card.image || '')}
                    {renderEditableField('Link', `logisticsServices.cards.${idx}.link`, card.link || '')}
                </div>
            ))}
        </div>
        </div>
    );
    };

    // Render What Makes Trident Different Section
    const renderWhatMakesDifferentSection = (page: any) => {
    if (!page.whatMakesDifferent) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">What Makes Trident Different</h3>
        {renderEditableField('Title', 'whatMakesDifferent.title', page.whatMakesDifferent.title || '')}
        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
            {(page.whatMakesDifferent.items || []).map((item: string, idx: number) => (
            <div key={idx} className="mb-2">
                {renderEditableField(`Item ${idx + 1}`, `whatMakesDifferent.items.${idx}`, item)}
            </div>
            ))}
        </div>
        </div>
    );
    };

    // Render FAQs Section
    const renderFaqsSection = (page: any) => {
    if (!page.faqs) return null;
    
    const addFaq = async () => {
        const currentPageContent = { ...getCurrentPageData() };
        if (!currentPageContent.faqs) currentPageContent.faqs = [];
        currentPageContent.faqs.push({ question: 'New Question', answer: 'New Answer' });
        
        try {
            await contentAPI.updatePage(selectedPage, currentPageContent);
            const updatedContent = { ...content };
            if (!updatedContent.pages) updatedContent.pages = {};
            updatedContent.pages[selectedPage] = currentPageContent;
            setContent(updatedContent);
            setSaveMessage('✅ FAQ added!');
            setTimeout(() => setSaveMessage(''), 3000);
        } catch (error) {
            setSaveMessage('❌ Failed to add FAQ');
            setTimeout(() => setSaveMessage(''), 3000);
        }
    };

    const deleteFaq = async (index: number) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;
        
        const currentPageContent = { ...getCurrentPageData() };
        currentPageContent.faqs.splice(index, 1);
        
        try {
            await contentAPI.updatePage(selectedPage, currentPageContent);
            const updatedContent = { ...content };
            if (!updatedContent.pages) updatedContent.pages = {};
            updatedContent.pages[selectedPage] = currentPageContent;
            setContent(updatedContent);
            setSaveMessage('✅ FAQ deleted!');
            setTimeout(() => setSaveMessage(''), 3000);
        } catch (error) {
            setSaveMessage('❌ Failed to delete FAQ');
            setTimeout(() => setSaveMessage(''), 3000);
        }
    };
    
    return (
        <div className="mb-8">
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Frequently Asked Questions</h3>
            <button 
                onClick={addFaq}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
                + Add FAQ
            </button>
        </div>
        {(page.faqs || []).map((faq: any, idx: number) => (
            <div key={idx} className="mb-4 p-3 bg-gray-50 rounded-lg relative">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-700">FAQ #{idx + 1}</h4>
                <button 
                    onClick={() => deleteFaq(idx)}
                    className="text-red-500 hover:text-red-700 text-sm"
                >
                    🗑️ Delete
                </button>
            </div>
            {renderEditableField('Question', `faqs.${idx}.question`, faq.question || '')}
            {renderEditableField('Answer', `faqs.${idx}.answer`, faq.answer || '', true)}
            </div>
        ))}
        </div>
    );
    };

    // Render Connect Today Section
    const renderConnectTodaySection = (page: any) => {
    if (!page.connectToday) return null;
    
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Connect Today Section</h3>
        {renderEditableField('Title', 'connectToday.title', page.connectToday.title || '')}
        {renderEditableField('Subtitle', 'connectToday.subtitle', page.connectToday.subtitle || '')}
        {renderEditableField('CTA Text', 'connectToday.ctaText', page.connectToday.ctaText || '')}
        {renderImageUpload('Background Image', 'connectToday.backgroundImage', page.connectToday.backgroundImage || '')}
        </div>
    );
    };

  // ========== OCEAN FREIGHT RENDER FUNCTIONS ==========
  const renderOceanFreightHeroSection = (page: any) => {
    if (!page.hero) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderImageUpload('Hero Background Video', 'hero.media', page.hero.media || '/ocean_freight.mp4')}
      </div>
    );
  };

  const renderOceanFreightSegmentsSection = (page: any) => {
    if (!page.segments) return null;

    const toggleSegmentVisibility = async (index: number) => {
        const currentPageContent = { ...getCurrentPageData() };
        const segment = currentPageContent.segments[index];
        segment.hidden = !segment.hidden;
        try {
            await contentAPI.updatePage(selectedPage, currentPageContent);
            const updatedContent = { ...content };
            if (!updatedContent.pages) updatedContent.pages = {};
            updatedContent.pages[selectedPage] = currentPageContent;
            setContent(updatedContent);
            setSaveMessage(segment.hidden ? '✅ Segment hidden!' : '✅ Segment visible!');
            setTimeout(() => setSaveMessage(''), 3000);
        } catch (error) {
            setSaveMessage('❌ Failed to update segment');
            setTimeout(() => setSaveMessage(''), 3000);
        }
    };

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Service Segments</h3>
        {(page.segments || []).map((segment: any, idx: number) => (
          <div key={idx} className={`mb-6 p-4 rounded-lg ${segment.hidden ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-700">
                Segment #{idx + 1}: {segment.title || 'Untitled'} {segment.hidden && <span className="text-red-500 text-xs ml-2">(Hidden)</span>}
              </h4>
              <button onClick={() => toggleSegmentVisibility(idx)} className={`text-sm ${segment.hidden ? 'text-green-600 hover:text-green-800' : 'text-amber-600 hover:text-amber-800'}`}>
                {segment.hidden ? '👁️ Show' : '🙈 Hide'}
              </button>
            </div>
            {renderEditableField('Title', `segments.${idx}.title`, segment.title || '')}
            {renderEditableField('Subtitle', `segments.${idx}.subtitle`, segment.subtitle || '', true)}
            {renderImageUpload('Image', `segments.${idx}.image`, segment.image || '')}
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
              {(segment.points || []).map((point: string, pIdx: number) => (
                <div key={pIdx} className="mb-1">
                  {renderEditableField(`Point ${pIdx + 1}`, `segments.${idx}.points.${pIdx}`, point)}
                </div>
              ))}
            </div>
            {segment.processLabel && renderEditableField('Process Label', `segments.${idx}.processLabel`, segment.processLabel || '')}
            {segment.process !== undefined && renderEditableField('Process', `segments.${idx}.process`, segment.process || '', true)}
          </div>
        ))}
      </div>
    );
  };

  // ========== CAREERS PAGE RENDER FUNCTIONS ==========
  const renderCareersHeroSection = (page: any) => {
    if (!page.hero) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderImageUpload('Hero Background Video', 'hero.media', page.hero.media || '/careers.mp4')}
      </div>
    );
  };

  const renderCareersIntroSection = (page: any) => {
    if (!page.intro) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Intro Section</h3>
        {renderEditableField('Title', 'intro.title', page.intro.title || '')}
        {renderEditableField('Description', 'intro.description', page.intro.description || '', true)}
      </div>
    );
  };

  const renderCareersCultureSection = (page: any) => {
    if (!page.culture) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Culture Section</h3>
        {renderEditableField('Title', 'culture.title', page.culture.title || '')}
        {renderEditableField('Description', 'culture.description', page.culture.description || '', true)}
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-700 mb-4">Culture Icons (4 items)</h4>
          {(page.culture.icons || []).map((icon: any, idx: number) => (
            <div key={idx} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-700 mb-2">Icon #{idx + 1}</h5>
              {renderEditableField('Icon Name', `culture.icons.${idx}.icon`, icon.icon || '')}
              {renderEditableField('Text', `culture.icons.${idx}.text`, icon.text || '', true)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCareersResponsibilityBannerSection = (page: any) => {
    if (!page.responsibilityBanner) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Responsibility Banner</h3>
        {renderEditableField('Title', 'responsibilityBanner.title', page.responsibilityBanner.title || '')}
      </div>
    );
  };

  const renderCareersFAQSection = (page: any) => {
    if (!page.faqSection) return null;

    const addCareerFAQ = async () => {
      const currentPageContent = { ...getCurrentPageData() };
      if (!currentPageContent.faqSection) currentPageContent.faqSection = { faqs: [] };
      if (!currentPageContent.faqSection.faqs) currentPageContent.faqSection.faqs = [];
      currentPageContent.faqSection.faqs.push({ title: 'New FAQ', narration: 'New description' });
      try {
        await contentAPI.updatePage(selectedPage, currentPageContent);
        const updatedContent = { ...content };
        if (!updatedContent.pages) updatedContent.pages = {};
        updatedContent.pages[selectedPage] = currentPageContent;
        setContent(updatedContent);
        setSaveMessage('✅ FAQ added!');
        setTimeout(() => setSaveMessage(''), 3000);
      } catch (error) {
        setSaveMessage('❌ Failed to add FAQ');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    };

    const deleteCareerFAQ = async (index: number) => {
      if (!confirm('Delete this FAQ?')) return;
      const currentPageContent = { ...getCurrentPageData() };
      currentPageContent.faqSection.faqs.splice(index, 1);
      try {
        await contentAPI.updatePage(selectedPage, currentPageContent);
        const updatedContent = { ...content };
        if (!updatedContent.pages) updatedContent.pages = {};
        updatedContent.pages[selectedPage] = currentPageContent;
        setContent(updatedContent);
        setSaveMessage('✅ FAQ deleted!');
        setTimeout(() => setSaveMessage(''), 3000);
      } catch (error) {
        setSaveMessage('❌ Failed to delete FAQ');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    };

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">FAQ Section</h3>
        {renderImageUpload('Section Image', 'faqSection.image', page.faqSection.image || '/career_3.jpg')}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-semibold text-gray-700">FAQs</h4>
            <button onClick={addCareerFAQ} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">+ Add FAQ</button>
          </div>
          {(page.faqSection.faqs || []).map((faq: any, idx: number) => (
            <div key={idx} className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-medium text-gray-700">FAQ #{idx + 1}</h5>
                <button onClick={() => deleteCareerFAQ(idx)} className="text-red-500 hover:text-red-700 text-sm">🗑️ Delete</button>
              </div>
              {renderEditableField('Title', `faqSection.faqs.${idx}.title`, faq.title || '')}
              {renderEditableField('Narration', `faqSection.faqs.${idx}.narration`, faq.narration || '', true)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCareersJobOpeningsSection = (page: any) => {
    if (!page.jobOpenings) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Job Openings Section</h3>
        {renderImageUpload('Background Image', 'jobOpenings.backgroundImage', page.jobOpenings.backgroundImage || '/careers_4.jpg')}
        {renderEditableField('Title', 'jobOpenings.title', page.jobOpenings.title || '')}
        {renderEditableField('Description', 'jobOpenings.description', page.jobOpenings.description || '', true)}
      </div>
    );
  };

  const renderCareersWhyWorkSection = (page: any) => {
    if (!page.whyWork) return null;

    const addWhyWorkItem = async () => {
      const currentPageContent = { ...getCurrentPageData() };
      if (!currentPageContent.whyWork) currentPageContent.whyWork = { items: [] };
      if (!currentPageContent.whyWork.items) currentPageContent.whyWork.items = [];
      currentPageContent.whyWork.items.push({ icon: 'DollarOutlined', text: 'New benefit' });
      try {
        await contentAPI.updatePage(selectedPage, currentPageContent);
        const updatedContent = { ...content };
        if (!updatedContent.pages) updatedContent.pages = {};
        updatedContent.pages[selectedPage] = currentPageContent;
        setContent(updatedContent);
        setSaveMessage('✅ Item added!');
        setTimeout(() => setSaveMessage(''), 3000);
      } catch (error) {
        setSaveMessage('❌ Failed to add item');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    };

    const deleteWhyWorkItem = async (index: number) => {
      if (!confirm('Delete this item?')) return;
      const currentPageContent = { ...getCurrentPageData() };
      currentPageContent.whyWork.items.splice(index, 1);
      try {
        await contentAPI.updatePage(selectedPage, currentPageContent);
        const updatedContent = { ...content };
        if (!updatedContent.pages) updatedContent.pages = {};
        updatedContent.pages[selectedPage] = currentPageContent;
        setContent(updatedContent);
        setSaveMessage('✅ Item deleted!');
        setTimeout(() => setSaveMessage(''), 3000);
      } catch (error) {
        setSaveMessage('❌ Failed to delete item');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    };

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Work at Trident</h3>
        {renderEditableField('Title', 'whyWork.title', page.whyWork.title || '')}
        {renderImageUpload('Section Image', 'whyWork.image', page.whyWork.image || '/careers_05.jpg')}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-semibold text-gray-700">Benefit Items</h4>
            <button onClick={addWhyWorkItem} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">+ Add Item</button>
          </div>
          {(page.whyWork.items || []).map((item: any, idx: number) => (
            <div key={idx} className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-medium text-gray-700">Item #{idx + 1}</h5>
                <button onClick={() => deleteWhyWorkItem(idx)} className="text-red-500 hover:text-red-700 text-sm">🗑️ Delete</button>
              </div>
              {renderEditableField('Icon Name', `whyWork.items.${idx}.icon`, item.icon || '')}
              {renderEditableField('Text', `whyWork.items.${idx}.text`, item.text || '', true)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ========== CONTACT PAGE RENDER FUNCTIONS ==========
const renderContactHeroSection = (page: any) => {
  if (!page.hero) return null;
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
      {renderImageUpload('Hero Background Video', 'hero.media', page.hero.media || '/contact_us_2.mp4')}
    </div>
  );
};

const renderContactIntroSection = (page: any) => {
  if (!page.intro) return null;
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Intro Section</h3>
      {renderEditableField('Title', 'intro.title', page.intro.title || '')}
      {renderEditableField('Description', 'intro.description', page.intro.description || '', true)}
    </div>
  );
};

const renderContactConsultationSection = (page: any) => {
  if (!page.consultation) return null;
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Consultation Section</h3>
      {renderEditableField('Title', 'consultation.title', page.consultation.title || '')}
      {renderEditableField('Description', 'consultation.description', page.consultation.description || '', true)}
      {renderEditableField('Sub Description', 'consultation.subDescription', page.consultation.subDescription || '', true)}
      {renderEditableField('Cover Title', 'consultation.coverTitle', page.consultation.coverTitle || '')}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Points</label>
        {(page.consultation.coverPoints || []).map((point: string, idx: number) => (
          <div key={idx} className="mb-2">
            {renderEditableField(`Point ${idx + 1}`, `consultation.coverPoints.${idx}`, point)}
          </div>
        ))}
      </div>
      {renderEditableField('Closing Text', 'consultation.closingText', page.consultation.closingText || '', true)}
    </div>
  );
};

const getEditableSections = (pageId: string) => {
    if (pageId === 'home') {
      return ['hero', 'beReady', 'logisticsServices', 'whatMakesDifferent', 'faqs', 'connectToday'];
    }
    if (pageId === 'about') {
      return ['hero', 'purpose', 'vision', 'values', 'leadership', 'sustainability', 'offices'];
    }
    if (pageId === 'ocean-freight') {
      return ['hero', 'segments'];
    }
    if (pageId === 'careers') {
      return ['hero', 'intro', 'culture', 'responsibilityBanner', 'faqSection', 'jobOpenings', 'whyWork'];
    }
    if (pageId === 'contact') {
      return ['hero', 'intro', 'consultation'];
    }
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
      // Load quote recipients from global settings
      if (allContent.globalSettings?.quoteRecipients) {
        setQuoteRecipients(allContent.globalSettings.quoteRecipients);
      }
      if (allContent.globalSettings?.contactRecipients) {
        setContactRecipients(allContent.globalSettings.contactRecipients);
      }
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
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }
        
        const data = await response.json();
        const filePath = data.filePath;
        
        const currentPageContent = getCurrentPageData();
        const fieldParts = fieldPath.split('.');
        
        if (fieldParts.length === 2) {
          const [section, field] = fieldParts;
          if (!currentPageContent[section]) currentPageContent[section] = {};
          currentPageContent[section][field] = filePath;
        } 
        else if (fieldParts.length === 3) {
          const [parentName, indexStr, fieldName] = fieldParts;
          const arrayIndex = parseInt(indexStr);
          
          if (Array.isArray(currentPageContent[parentName])) {
            if (!isNaN(arrayIndex) && arrayIndex >= 0 && arrayIndex < currentPageContent[parentName].length) {
              currentPageContent[parentName][arrayIndex] = {
                ...currentPageContent[parentName][arrayIndex],
                [fieldName]: filePath
              };
            }
          } 
          else if (currentPageContent[parentName] && typeof currentPageContent[parentName] === 'object') {
            if (currentPageContent[parentName][indexStr] && typeof currentPageContent[parentName][indexStr] === 'object' && !Array.isArray(currentPageContent[parentName][indexStr])) {
              currentPageContent[parentName][indexStr] = {
                ...currentPageContent[parentName][indexStr],
                [fieldName]: filePath
              };
            } else {
              currentPageContent[parentName][indexStr] = filePath;
            }
          }
        }
        else if (fieldParts.length === 4) {
          const [parent, middle, indexOrField, field] = fieldParts;
          const arrayIndex = parseInt(indexOrField);
          
          if (currentPageContent[parent] && Array.isArray(currentPageContent[parent][middle])) {
            if (!isNaN(arrayIndex) && arrayIndex >= 0 && arrayIndex < currentPageContent[parent][middle].length) {
              currentPageContent[parent][middle][arrayIndex] = {
                ...currentPageContent[parent][middle][arrayIndex],
                [field]: filePath
              };
            }
          }
          else {
            if (!currentPageContent[parent]) currentPageContent[parent] = {};
            if (currentPageContent[parent][middle] && typeof currentPageContent[parent][middle] === 'object' && !Array.isArray(currentPageContent[parent][middle])) {
              currentPageContent[parent][middle] = {
                ...currentPageContent[parent][middle],
                [field]: filePath
              };
            } else {
              if (!currentPageContent[parent][middle]) currentPageContent[parent][middle] = {};
              currentPageContent[parent][middle][field] = filePath;
            }
          }
        }
        else if (fieldParts.length === 5) {
          const [section, subsection, arrayName, indexStr, field] = fieldParts;
          const arrayIndex = parseInt(indexStr);
          
          if (!currentPageContent[section]) currentPageContent[section] = {};
          if (!currentPageContent[section][subsection]) currentPageContent[section][subsection] = {};
          
          if (Array.isArray(currentPageContent[section][subsection][arrayName])) {
            if (!isNaN(arrayIndex) && arrayIndex >= 0) {
              if (!currentPageContent[section][subsection][arrayName][arrayIndex]) {
                currentPageContent[section][subsection][arrayName][arrayIndex] = {};
              }
              currentPageContent[section][subsection][arrayName][arrayIndex] = {
                ...currentPageContent[section][subsection][arrayName][arrayIndex],
                [field]: filePath
              };
            }
          } else {
            if (!currentPageContent[section][subsection][arrayName]) currentPageContent[section][subsection][arrayName] = {};
            currentPageContent[section][subsection][arrayName][indexStr] = filePath;
          }
        }
        // ===== NEW: 6-part handling for deeply nested images (e.g., contractProducts.products.fixed.someArray.0.image) =====
        else if (fieldParts.length === 6) {
          // Pattern: p1.p2.p3.arrayName.index.field
          // "contractProducts.products.fixed.someArray.0.image"
          const [p1, p2, p3, arrayName, indexStr, field] = fieldParts;
          const arrayIndex = parseInt(indexStr);
          
          if (!currentPageContent[p1]) currentPageContent[p1] = {};
          if (!currentPageContent[p1][p2]) currentPageContent[p1][p2] = {};
          if (!currentPageContent[p1][p2][p3]) currentPageContent[p1][p2][p3] = {};
          
          if (Array.isArray(currentPageContent[p1][p2][p3][arrayName])) {
            if (!isNaN(arrayIndex) && arrayIndex >= 0) {
              if (!currentPageContent[p1][p2][p3][arrayName][arrayIndex]) {
                currentPageContent[p1][p2][p3][arrayName][arrayIndex] = {};
              }
              currentPageContent[p1][p2][p3][arrayName][arrayIndex] = {
                ...currentPageContent[p1][p2][p3][arrayName][arrayIndex],
                [field]: filePath
              };
            }
          } else {
            if (!currentPageContent[p1][p2][p3][arrayName]) currentPageContent[p1][p2][p3][arrayName] = {};
            currentPageContent[p1][p2][p3][arrayName][indexStr] = filePath;
          }
        }
        
        await contentAPI.updatePage(selectedPage, currentPageContent);
        
        const updatedContent = { ...content };
        if (!updatedContent.pages) {
          updatedContent.pages = {};
        }
        updatedContent.pages[selectedPage] = currentPageContent;
        setContent(updatedContent);
        
        setSaveMessage(`✅ ${data.fileType || 'File'} uploaded and saved successfully!`);
        setTimeout(() => setSaveMessage(''), 3000);
      } catch (error) {
        console.error('Error uploading file:', error);
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
      // Deep clone the current page data
      const updatedPage = JSON.parse(JSON.stringify(getCurrentPageData()));
      
      // Apply the edit using the generic setter
      setNestedValue(updatedPage, editingField!, editValue);
      
      // Persist to backend
      await contentAPI.updatePage(selectedPage, updatedPage);
      
      // Update local state
      setContent((prev: any) => ({
        ...prev,
        pages: {
          ...prev.pages,
          [selectedPage]: updatedPage,
        },
      }));
      
      setEditingField(null);
      setSaveMessage('✅ Content saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Save error:', error);
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

  // ========== QUOTE RECIPIENT MANAGEMENT ==========
  const addQuoteRecipient = () => {
      if (newRecipientEmail && newRecipientEmail.includes('@') && !quoteRecipients.includes(newRecipientEmail)) {
        setQuoteRecipients([...quoteRecipients, newRecipientEmail]);
        setNewRecipientEmail('');
      }
    };

    const removeQuoteRecipient = (email: string) => {
      setQuoteRecipients(quoteRecipients.filter(e => e !== email));
    };

    const saveQuoteRecipients = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await fetch('http://localhost:5000/api/content/settings/quote-recipients', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ emails: quoteRecipients }),
        });
        
        if (response.ok) {
          setSaveMessage('✅ Quote recipients saved successfully!');
          setTimeout(() => setSaveMessage(''), 3000);
        } else {
          throw new Error('Failed to save');
        }
      } catch (error) {
        setSaveMessage('❌ Failed to save quote recipients');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    };

  // ========== CONTACT RECIPIENT MANAGEMENT ==========
  const addContactRecipient = () => {
    if (newContactRecipientEmail && newContactRecipientEmail.includes('@') && !contactRecipients.includes(newContactRecipientEmail)) {
      setContactRecipients([...contactRecipients, newContactRecipientEmail]);
      setNewContactRecipientEmail('');
    }
  };

  const removeContactRecipient = (email: string) => {
    setContactRecipients(contactRecipients.filter(e => e !== email));
  };

  const saveContactRecipients = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('http://localhost:5000/api/content/settings/contact-recipients', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ emails: contactRecipients }),
      });
      if (response.ok) {
        setSaveMessage('✅ Contact recipients saved!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      setSaveMessage('❌ Failed to save contact recipients');
      setTimeout(() => setSaveMessage(''), 3000);
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
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 200MB</p>
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
  const renderAboutHeroSection = (page: any) => {
    if (!page.hero) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
        {renderImageUpload('Hero Background Video', 'hero.media', page.hero.media || '/about_us.mp4')}
      </div>
    );
  };

  const renderPurposeSection = (page: any) => {
    if (!page.purpose) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Who We Are Section</h3>
        {renderEditableField('Heading', 'purpose.heading', page.purpose.heading || '')}
        {renderEditableField('Subtitle', 'purpose.subtitle', page.purpose.subtitle || '')}
        {renderEditableField('Text', 'purpose.text', page.purpose.text || '', true)}
        {renderImageUpload('Image', 'purpose.image', page.purpose.image || '')}
      </div>
    );
  };

  const renderVisionSection = (page: any) => {
    if (!page.vision) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Vision & Mission Section</h3>
        {renderEditableField('Title', 'vision.title', page.vision.title || '')}
        {renderEditableField('Description', 'vision.description', page.vision.description || '', true)}
        {renderEditableField('Vision Statement', 'vision.visionStatement', page.vision.visionStatement || '', true)}
        {renderEditableField('Mission Statement', 'vision.missionStatement', page.vision.missionStatement || '', true)}
      </div>
    );
  };

  const renderValuesSection = (page: any) => {
    if (!page.values) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Core Values</h3>
        {page.values.map((value: any, index: number) => (
          <div key={index} className="ml-4 mb-6 p-4 border-l-4 border-blue-300 bg-gray-50 rounded-r-lg">
            <h4 className="font-medium text-gray-700 mb-3">Value {index + 1}</h4>
            {renderEditableField(`Title`, `values.${index}.title`, value.title || '')}
            {renderEditableField(`Description`, `values.${index}.description`, value.description || '', true)}
            {renderImageUpload(`Image`, `values.${index}.image`, value.image || '')}
          </div>
        ))}
      </div>
    );
  };

  // Render Leadership Section with leaders array
  const renderLeadershipSection = (page: any) => {
    if (!page.leadership) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Leadership Section</h3>
        {renderEditableField('Title', 'leadership.title', page.leadership.title || '')}
        {renderEditableField('Description', 'leadership.description', page.leadership.description || '', true)}
        
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-700 mb-4">Leaders</h4>
          {(page.leadership.leaders || []).map((leader: any, idx: number) => (
            <div key={idx} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-700 mb-2">Leader #{idx + 1}</h5>
              {renderEditableField('Name', `leadership.leaders.${idx}.name`, leader.name || '')}
              {renderEditableField('Title', `leadership.leaders.${idx}.title`, leader.title || '')}
              {renderEditableField('Description', `leadership.leaders.${idx}.description`, leader.description || '', true)}
              {renderImageUpload('Image', `leadership.leaders.${idx}.image`, leader.image || '')}
              {renderEditableField('Gradient', `leadership.leaders.${idx}.gradient`, leader.gradient || '')}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSustainabilitySection = (page: any) => {
    if (!page.sustainability) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Sustainability Section</h3>
        {renderEditableField('Title', 'sustainability.title', page.sustainability.title || '')}
        {renderEditableField('Description', 'sustainability.description', page.sustainability.description || '', true)}
        {renderImageUpload('Image', 'sustainability.image', page.sustainability.image || '')}
      </div>
    );
  };

  const renderOfficesSection = (page: any) => {
    if (!page.offices) return null;
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Our Offices Section</h3>
        {renderEditableField('Title', 'offices.title', page.offices.title || '')}
        {renderEditableField('Description', 'offices.description', page.offices.description || '', true)}
        {renderEditableField('Company Name', 'offices.companyName', page.offices.companyName || '')}
        {renderEditableField('Phone', 'offices.phone', page.offices.phone || '')}
        {renderEditableField('Email', 'offices.email', page.offices.email || '')}
        {renderEditableField('Map URL', 'offices.mapUrl', page.offices.mapUrl || '', true)}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address Lines</label>
          {(page.offices.address || []).map((line: string, idx: number) => (
            <div key={idx} className="mb-2">
              {renderEditableField(`Line ${idx + 1}`, `offices.address.${idx}`, line)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const currentPage = content?.pages?.[selectedPage] ?? content?.[selectedPage] ?? {};
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
              {(editableSections || []).map(section => (
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

          {/* Quote Recipients - shown only for get-quote page */}
          {selectedPage === 'get-quote' && (
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  📧 Quote Request Recipients
                </h3>
                <button
                  onClick={() => setShowQuoteRecipientEditor(!showQuoteRecipientEditor)}
                  className="text-sm text-sky-600 hover:text-sky-800"
                >
                  {showQuoteRecipientEditor ? '▲ Hide' : '▼ Show'}
                </button>
              </div>
              
              {showQuoteRecipientEditor && (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Add email addresses that will receive quote requests from the Get a Quote page.
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {quoteRecipients.map((email, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span className="text-gray-700">{email}</span>
                        <button
                          onClick={() => removeQuoteRecipient(email)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    ))}
                    {quoteRecipients.length === 0 && (
                      <p className="text-gray-400 text-sm italic">No recipients added yet.</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <input
                      type="email"
                      value={newRecipientEmail}
                      onChange={(e) => setNewRecipientEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addQuoteRecipient()}
                      placeholder="Enter email address"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={addQuoteRecipient}
                      className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-600"
                    >
                      Add
                    </button>
                  </div>
                  
                  <button
                    onClick={saveQuoteRecipients}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                  >
                    💾 Save Recipients
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Contact Recipients - shown only for contact page */}
          {selectedPage === 'contact' && (
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  📅 Consultation Booking Recipients
                </h3>
                <button
                  onClick={() => setShowContactRecipientEditor(!showContactRecipientEditor)}
                  className="text-sm text-sky-600 hover:text-sky-800"
                >
                  {showContactRecipientEditor ? '▲ Hide' : '▼ Show'}
                </button>
              </div>
              {showContactRecipientEditor && (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Add email addresses that will receive consultation booking notifications.
                  </p>
                  <div className="space-y-2 mb-4">
                    {contactRecipients.map((email, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span className="text-gray-700">{email}</span>
                        <button
                          onClick={() => removeContactRecipient(email)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    ))}
                    {contactRecipients.length === 0 && (
                      <p className="text-gray-400 text-sm italic">No recipients added yet.</p>
                    )}
                  </div>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="email"
                      value={newContactRecipientEmail}
                      onChange={(e) => setNewContactRecipientEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addContactRecipient()}
                      placeholder="Enter email address"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={addContactRecipient}
                      className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-600"
                    >
                      Add
                    </button>
                  </div>
                  <button
                    onClick={saveContactRecipients}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                  >
                    💾 Save Recipients
                  </button>
                </div>
              )}
            </div>
          )}

            {/* Render selected section */}
            <div className="max-h-[70vh] overflow-y-auto pr-4">
            {/* Homepage sections */}
            {selectedPage === 'home' && activeSection === 'hero' && renderHomeHeroSection(currentPage)}
            {selectedPage === 'home' && activeSection === 'beReady' && renderBeReadySection(currentPage)}
            {selectedPage === 'home' && activeSection === 'logisticsServices' && renderLogisticsServicesSection(currentPage)}
            {selectedPage === 'home' && activeSection === 'whatMakesDifferent' && renderWhatMakesDifferentSection(currentPage)}
            {selectedPage === 'home' && activeSection === 'faqs' && renderFaqsSection(currentPage)}
            {selectedPage === 'home' && activeSection === 'connectToday' && renderConnectTodaySection(currentPage)}
            
            {/* About page sections */}
            {selectedPage === 'about' && activeSection === 'hero' && renderAboutHeroSection(currentPage)}
            {selectedPage === 'about' && activeSection === 'purpose' && renderPurposeSection(currentPage)}
            {selectedPage === 'about' && activeSection === 'vision' && renderVisionSection(currentPage)}
            {selectedPage === 'about' && activeSection === 'values' && renderValuesSection(currentPage)}
            {selectedPage === 'about' && activeSection === 'leadership' && renderLeadershipSection(currentPage)}
            {selectedPage === 'about' && activeSection === 'sustainability' && renderSustainabilitySection(currentPage)}
            {selectedPage === 'about' && activeSection === 'offices' && renderOfficesSection(currentPage)}

            {/* Ocean Freight page sections */}
            {selectedPage === 'ocean-freight' && activeSection === 'hero' && renderOceanFreightHeroSection(currentPage)}
            {selectedPage === 'ocean-freight' && activeSection === 'segments' && renderOceanFreightSegmentsSection(currentPage)}

            {/* Careers page sections */}
            {selectedPage === 'careers' && activeSection === 'hero' && renderCareersHeroSection(currentPage)}
            {selectedPage === 'careers' && activeSection === 'intro' && renderCareersIntroSection(currentPage)}
            {selectedPage === 'careers' && activeSection === 'culture' && renderCareersCultureSection(currentPage)}
            {selectedPage === 'careers' && activeSection === 'responsibilityBanner' && renderCareersResponsibilityBannerSection(currentPage)}
            {selectedPage === 'careers' && activeSection === 'faqSection' && renderCareersFAQSection(currentPage)}
            {selectedPage === 'careers' && activeSection === 'jobOpenings' && renderCareersJobOpeningsSection(currentPage)}
            {selectedPage === 'careers' && activeSection === 'whyWork' && renderCareersWhyWorkSection(currentPage)}

            {/* Contact page sections */}
            {selectedPage === 'contact' && activeSection === 'hero' && renderContactHeroSection(currentPage)}
            {selectedPage === 'contact' && activeSection === 'intro' && renderContactIntroSection(currentPage)}
            {selectedPage === 'contact' && activeSection === 'consultation' && renderContactConsultationSection(currentPage)}

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
