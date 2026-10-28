// D:/Trident Log/Trident-FE/src/content/pages/admin/ContentEditor.tsx

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentAPI, authAPI } from '../../../services/api';
import { getMediaUrl } from '../../../utils/urlHelper';

// ============================================================
// Types
// ============================================================
interface HeroData {
    media?: string;
    title?: string;
    subtitle?: string;
    button1_text?: string;
    button2_text?: string;
}

interface PageSection {
    id?: number;
    section_key: string;
    section_type: string;
    sort_order?: number;
    title?: string;
    subtitle?: string;
    heading?: string;
    description?: string;
    sub_description?: string;
    closing_text?: string;
    process_label?: string;
    process?: string;
    video?: string;
    image?: string;
    background_image?: string;
    image_left?: boolean;
    cta_text?: string;
    company_name?: string;
    phone?: string;
    email?: string;
    map_url?: string;
    vision_statement?: string;
    mission_statement?: string;
    cards?: any[];
    points?: string[];
    faqs?: any[];
    leaders?: any[];
    icons?: any[];
    address?: string[];
}

interface PageData {
    id?: number;
    page_key: string;
    is_active: boolean;
    hero?: HeroData | null;
    sections?: PageSection[];
}

// ============================================================
// Constants
// ============================================================
const PAGES = [
    { id: 'home', label: '🏠 Homepage' },
    { id: 'about', label: 'ℹ️ About Us' },
    { id: 'ocean-freight', label: '🚢 Services (Ocean Freight)' },
    { id: 'careers', label: '💼 Careers' },
    { id: 'contact', label: '📞 Contact Us' },
    { id: 'get-quote', label: '📝 Get a Quote' },
    { id: 'email-settings', label: '✉️ Email Settings' },
    { id: 'footer', label: '🌐 Footer Settings' },
];


const getSectionsForPage = (pageKey: string): string[] => {
    const map: Record<string, string[]> = {
        home: ['hero', 'beReady', 'logisticsServices', 'whatMakesDifferent', 'faqs', 'connectToday'],
        about: ['hero', 'purpose', 'vision', 'values', 'leadership', 'sustainability', 'offices'],
        'ocean-freight': ['hero', 'segments'],
        careers: ['hero', 'intro', 'culture', 'responsibilityBanner', 'faqSection', 'jobOpenings', 'whyWork'],
        contact: ['hero', 'intro', 'consultation'],
    };
    return map[pageKey] || [];
};

// ============================================================
// Component
// ============================================================
const ContentEditor = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedPage, setSelectedPage] = useState('home');
    const [pageData, setPageData] = useState<PageData | null>(null);
    
    // 👇 MOVE YOUR FOOTER STATE HERE 👇
    const [footerSettings, setFooterSettings] = useState<any>({
        socialLinks: { facebook: '', youtube: '', instagram: '', linkedin: '' },
        footerData: {
            dhakaCompanyName: '', dhakaAddress1: '', dhakaAddress2: '', dhakaAddress3: '',
            dhakaEmail: '', dhakaPhone: '', dhakaAin: '', dhakaJctrans: '',
            ctgCompanyName: '', ctgAddress1: '', ctgAddress2: ''
        }
    });
    const [newQuoteEmail, setNewQuoteEmail] = useState('');
    const [newContactEmail, setNewContactEmail] = useState('');
    // 👆 ----------------------------- 👆

    const [editingField, setEditingField] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [activeSection, setActiveSection] = useState('hero');
    const [uploadingFile, setUploadingFile] = useState(false);
    const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

    // ============================================================
    // Auth Check & Data Load
    // ============================================================
    useEffect(() => {
        document.body.classList.add('admin-mode');
        checkAuth();
        return () => document.body.classList.remove('admin-mode');
    }, []);

    const checkAuth = async () => {
        if (!authAPI.isAuthenticated()) {
            navigate('/admin/login');
            return;
        }
        try {
            await authAPI.verify();
            loadPage(selectedPage);
        } catch {
            navigate('/admin/login');
        }
    };

    // 3. Modify loadPage
    const loadPage = async (pageKey: string) => {
        setLoading(true);
        try {
            if (pageKey === 'footer' || pageKey === 'email-settings') {
                const response = await contentAPI.getGlobalSettings();
                if (response.success && response.settings) {
                    setFooterSettings({
                        socialLinks: response.settings.socialLinks || { facebook: '', youtube: '', instagram: '', linkedin: '' },
                        footerData: response.settings.footerData || {
                            dhakaCompanyName: 'Trident Global Logistics Limited',
                            dhakaAddress1: 'Le Meridien Hotel (Commercial Space)',
                            dhakaAddress2: 'Level-06, 79/A, Airport Road',
                            dhakaAddress3: 'Nikunja-2, Khilkhet, Dhaka-1229, Bangladesh',
                            dhakaEmail: 'asif.ahmed@tgllbd.com',
                            dhakaPhone: '+8801982727100 (Wechat) & +8801755625928 & +8801713244029',
                            dhakaAin: '301260653',
                            dhakaJctrans: '159280',
                            ctgCompanyName: 'Trident Global Logistics Limited',
                            ctgAddress1: '3072 Shek Mujib Road',
                            ctgAddress2: 'Agrabad, Chittagong'
                        },
                        quote_recipients: response.settings.quote_recipients || [],
                        contact_recipients: response.settings.contact_recipients || [],
                    });
                }
            } else {
                const response = await contentAPI.getPage(pageKey);
                if (response.success && response.page) {
                    setPageData(response.page);
                }
            }
        } catch (error) {
            console.error('Error loading content:', error);
            showMessage('❌ Failed to load content');
        }
        setLoading(false);
    };

    // ============================================================
    // Helpers
    // ============================================================
    const showMessage = (msg: string) => {
        setSaveMessage(msg);
        setTimeout(() => setSaveMessage(''), 3000);
    };

    const getSectionByKey = (key: string): PageSection | undefined => {
        return pageData?.sections?.find(s => s.section_key === key);
    };

    const updateSection = (sectionKey: string, updates: Partial<PageSection>) => {
        setPageData(prev => {
            if (!prev) return prev;
            const sections = [...(prev.sections || [])];
            const idx = sections.findIndex(s => s.section_key === sectionKey);
            if (idx >= 0) {
                sections[idx] = { ...sections[idx], ...updates };
            } else {
                sections.push({ section_key: sectionKey, section_type: 'text_block', ...updates });
            }
            return { ...prev, sections };
        });
    };

    // const savePage = async () => {
    //     if (!pageData) return;
    //     setSaving(true);
    //     try {
    //         await contentAPI.updatePage(selectedPage, {
    //             isActive: pageData.is_active,
    //             hero: pageData.hero,
    //             sections: pageData.sections,
    //         });
    //         showMessage('✅ Page saved successfully!');
    //     } catch (error) {
    //         showMessage('❌ Failed to save page');
    //     }
    //     setSaving(false);
    // };

    // 4. Modify savePage
    const savePage = async () => {
        setSaving(true);
        try {
            if (selectedPage === 'footer') {
                await contentAPI.updateGlobalSettings(footerSettings);
                showMessage('✅ Footer settings saved successfully!');
            } else if (selectedPage === 'email-settings') {
                await contentAPI.updateQuoteRecipients(footerSettings.quote_recipients || []);
                await contentAPI.updateContactRecipients(footerSettings.contact_recipients || []);
                showMessage('✅ Email settings saved successfully!');
            } else {
                if (!pageData) return;
                await contentAPI.updatePage(selectedPage, {
                    isActive: pageData.is_active,
                    hero: pageData.hero,
                    sections: pageData.sections,
                });
                showMessage('✅ Page saved successfully!');
            }
        } catch (error) {
            showMessage('❌ Failed to save');
        }
        setSaving(false);
    };

    const handleLogout = async () => {
        await authAPI.logout();
        navigate('/admin/login');
    };

    // 5. Add render function for Footer Settings
    const renderFooterSettings = () => {
        const handleSocialChange = (field: string, value: string) => {
            setFooterSettings((prev: any) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, [field]: value }
            }));
        };

        const handleFooterDataChange = (field: string, value: string) => {
            setFooterSettings((prev: any) => ({
                ...prev,
                footerData: { ...prev.footerData, [field]: value }
            }));
        };

        return (
            <div className="mb-8">
                {/* Social Media Section */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Social Media Links</h3>
                <p className="text-sm text-gray-500 mb-6">Leave blank to hide the icon from the footer.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                        <input type="text" value={footerSettings.socialLinks.facebook} 
                            onChange={e => handleSocialChange('facebook', e.target.value)}
                            placeholder="https://facebook.com/yourpage"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                        <input type="text" value={footerSettings.socialLinks.youtube} 
                            onChange={e => handleSocialChange('youtube', e.target.value)}
                            placeholder="https://youtube.com/@yourchannel"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                        <input type="text" value={footerSettings.socialLinks.instagram} 
                            onChange={e => handleSocialChange('instagram', e.target.value)}
                            placeholder="https://instagram.com/yourpage"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                        <input type="text" value={footerSettings.socialLinks.linkedin} 
                            onChange={e => handleSocialChange('linkedin', e.target.value)}
                            placeholder="https://linkedin.com/company/yourcompany"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                {/* Dhaka Office Section */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b mt-8">Dhaka Office Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input type="text" value={footerSettings.footerData.dhakaCompanyName} onChange={e => handleFooterDataChange('dhakaCompanyName', e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                        <input type="text" value={footerSettings.footerData.dhakaAddress1} onChange={e => handleFooterDataChange('dhakaAddress1', e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                        <input type="text" value={footerSettings.footerData.dhakaAddress2} onChange={e => handleFooterDataChange('dhakaAddress2', e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 3</label>
                        <input type="text" value={footerSettings.footerData.dhakaAddress3} onChange={e => handleFooterDataChange('dhakaAddress3', e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="text" value={footerSettings.footerData.dhakaEmail} onChange={e => handleFooterDataChange('dhakaEmail', e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone / Mobile</label>
                        <input type="text" value={footerSettings.footerData.dhakaPhone} onChange={e => handleFooterDataChange('dhakaPhone', e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">AIN</label>
                        <input type="text" value={footerSettings.footerData.dhakaAin} onChange={e => handleFooterDataChange('dhakaAin', e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">JCtrans Member ID</label>
                        <input type="text" value={footerSettings.footerData.dhakaJctrans} onChange={e => handleFooterDataChange('dhakaJctrans', e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                </div>

                {/* Chittagong Office Section */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b mt-8">Chittagong Office Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input type="text" value={footerSettings.footerData.ctgCompanyName} onChange={e => handleFooterDataChange('ctgCompanyName', e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                        <input type="text" value={footerSettings.footerData.ctgAddress1} onChange={e => handleFooterDataChange('ctgAddress1', e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                        <input type="text" value={footerSettings.footerData.ctgAddress2} onChange={e => handleFooterDataChange('ctgAddress2', e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                </div>
            </div>
        );
    };

        const renderEmailSettings = () => {
        const addQuoteEmail = () => {
            if (!newQuoteEmail || !newQuoteEmail.includes('@')) return alert('Enter a valid email');
            const current = footerSettings.quote_recipients || [];
            if (!current.includes(newQuoteEmail)) {
                setFooterSettings({ ...footerSettings, quote_recipients: [...current, newQuoteEmail] });
            }
            setNewQuoteEmail('');
        };

        const removeQuoteEmail = (emailToRemove: string) => {
            const current = footerSettings.quote_recipients || [];
            setFooterSettings({ ...footerSettings, quote_recipients: current.filter((e: string) => e !== emailToRemove) });
        };

        const addContactEmail = () => {
            if (!newContactEmail || !newContactEmail.includes('@')) return alert('Enter a valid email');
            const current = footerSettings.contact_recipients || [];
            if (!current.includes(newContactEmail)) {
                setFooterSettings({ ...footerSettings, contact_recipients: [...current, newContactEmail] });
            }
            setNewContactEmail('');
        };

        const removeContactEmail = (emailToRemove: string) => {
            const current = footerSettings.contact_recipients || [];
            setFooterSettings({ ...footerSettings, contact_recipients: current.filter((e: string) => e !== emailToRemove) });
        };

        return (
            <div className="mb-8">
                {/* Quote Emails */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Rate Quote Recipients</h3>
                <p className="text-sm text-gray-500 mb-4">These email addresses will receive notifications whenever a customer submits a "Get a Quote" request.</p>
                
                <div className="flex gap-2 mb-4">
                    <input type="email" value={newQuoteEmail} onChange={e => setNewQuoteEmail(e.target.value)}
                        placeholder="Enter email address" className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    <button onClick={addQuoteEmail} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">+ Add</button>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    {(footerSettings.quote_recipients || []).length === 0 && <span className="text-gray-400 text-sm italic">No emails added yet.</span>}
                    {(footerSettings.quote_recipients || []).map((email: string) => (
                        <div key={email} className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-full text-sm">
                            {email}
                            <button onClick={() => removeQuoteEmail(email)} className="text-red-500 hover:text-red-700 font-bold">✕</button>
                        </div>
                    ))}
                </div>

                {/* Contact Emails */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b mt-8">Consultation / Meeting Recipients</h3>
                <p className="text-sm text-gray-500 mb-4">These email addresses will receive notifications whenever a customer books a 30-minute consultation from the "Contact Us" page.</p>
                
                <div className="flex gap-2 mb-4">
                    <input type="email" value={newContactEmail} onChange={e => setNewContactEmail(e.target.value)}
                        placeholder="Enter email address" className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    <button onClick={addContactEmail} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">+ Add</button>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    {(footerSettings.contact_recipients || []).length === 0 && <span className="text-gray-400 text-sm italic">No emails added yet.</span>}
                    {(footerSettings.contact_recipients || []).map((email: string) => (
                        <div key={email} className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-3 py-1.5 rounded-full text-sm">
                            {email}
                            <button onClick={() => removeContactEmail(email)} className="text-red-500 hover:text-red-700 font-bold">✕</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // ============================================================
    // Field Editing
    // ============================================================
    const startEdit = (fieldPath: string, currentValue: string) => {
        setEditingField(fieldPath);
        setEditValue(currentValue || '');
    };

    const saveEdit = async () => {
        if (!editingField || !pageData) return;

        const parts = editingField.split('.');
        let updated = { ...pageData };

        if (parts[0] === 'hero' && parts.length === 2) {
            // 👇 Add (updated.hero || {}) to prevent crashing on null
            updated.hero = { ...(updated.hero || {}), [parts[1]]: editValue };
        }else if (parts[0] === 'sections' && parts.length >= 3) {
            const sectionKey = parts[1];
            const sections = [...(updated.sections || [])];
            const idx = sections.findIndex(s => s.section_key === sectionKey);

            if (idx >= 0) {
                if (parts.length === 3) {
                    // sections.sectionKey.field
                    sections[idx] = { ...sections[idx], [parts[2]]: editValue };
                } else if (parts.length === 5 && parts[2] === 'cards') {
                    // sections.sectionKey.cards.cardIndex.field
                    const cardIndex = parseInt(parts[3]);
                    const fieldName = parts[4]; // 'title', 'description', 'link', 'image'
                    const cards = [...(sections[idx].cards || [])];
                    
                    if (cards[cardIndex]) {
                        // Update the specific field
                        cards[cardIndex] = { ...cards[cardIndex], [fieldName]: editValue };

                        // 👇 NEW LOGIC: If they changed the Title, auto-generate the Link
                        if (fieldName === 'title') {
                            // Create a URL-friendly slug from the title (e.g., "Customs Clearance" -> "customs-clearance")
                            const autoLink = `/ocean-freight#${editValue.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
                            cards[cardIndex].link = autoLink;
                        }
                        
                        sections[idx] = { ...sections[idx], cards };
                    }
                } else if (parts.length === 6 && parts[2] === 'cards' && parts[4] === 'points') {
                    // sections.sectionKey.cards.cardIndex.points.pointIndex
                    const cardIndex = parseInt(parts[3]);
                    const pointIndex = parseInt(parts[5]);
                    const cards = [...(sections[idx].cards || [])];
                    if (cards[cardIndex]) {
                        const points = [...(cards[cardIndex].points || [])];
                        points[pointIndex] = editValue;
                        cards[cardIndex] = { ...cards[cardIndex], points };
                        sections[idx] = { ...sections[idx], cards };
                    }
                } else if (parts.length === 5 && parts[2] === 'leaders') {
                    // sections.sectionKey.leaders.leaderIndex.field
                    const leaderIndex = parseInt(parts[3]);
                    const leaders = [...(sections[idx].leaders || [])];
                    if (leaders[leaderIndex]) {
                        leaders[leaderIndex] = { ...leaders[leaderIndex], [parts[4]]: editValue };
                        sections[idx] = { ...sections[idx], leaders };
                    }
                } else if (parts.length === 5 && parts[2] === 'faqs') {
                    // sections.sectionKey.faqs.faqIndex.field
                    const faqIndex = parseInt(parts[3]);
                    const faqs = [...(sections[idx].faqs || [])];
                    if (faqs[faqIndex]) {
                        faqs[faqIndex] = { ...faqs[faqIndex], [parts[4]]: editValue };
                        sections[idx] = { ...sections[idx], faqs };
                    }
                } else if (parts.length === 5 && parts[2] === 'address') {
                    // sections.sectionKey.address.addressIndex
                    const addrIndex = parseInt(parts[3]);
                    const address = [...(sections[idx].address || [])];
                    address[addrIndex] = editValue;
                    sections[idx] = { ...sections[idx], address };
                }
            }
            updated.sections = sections;
        }

        setPageData(updated);
        setEditingField(null);
        await savePageToServer(updated);
    };

    const savePageToServer = async (data: PageData) => {
        setSaving(true);
        try {
            await contentAPI.updatePage(selectedPage, {
                isActive: data.is_active,
                hero: data.hero,
                sections: data.sections,
            });
            showMessage('✅ Saved!');
        } catch {
            showMessage('❌ Save failed');
        }
        setSaving(false);
    };

    // ============================================================
    // File Upload
    // ============================================================
    const handleFileUpload = async (file: File, fieldPath: string, oldFilePath?: string) => {
        setUploadingFile(true);
        try {
            const result = await contentAPI.uploadFile(file, oldFilePath);
            const newPath = result.filePath;

            if (!pageData) return;
            const parts = fieldPath.split('.');
            let updated = { ...pageData };

            if (parts[0] === 'hero' && parts.length === 2) {
                // 👇 Add (updated.hero || {}) to prevent crashing on null
                updated.hero = { ...(updated.hero || {}), [parts[1]]: newPath };
            } else if (parts[0] === 'sections' && parts.length >= 3) {
                const sectionKey = parts[1];
                const sections = [...(updated.sections || [])];
                const idx = sections.findIndex(s => s.section_key === sectionKey);
                if (idx >= 0) {
                    if (parts.length === 3) {
                        sections[idx] = { ...sections[idx], [parts[2]]: newPath };
                    } else if (parts.length === 5 && parts[2] === 'cards') {
                        const cards = [...(sections[idx].cards || [])];
                        cards[parseInt(parts[3])] = { ...cards[parseInt(parts[3])], [parts[4]]: newPath };
                        sections[idx] = { ...sections[idx], cards };
                    } else if (parts.length === 5 && parts[2] === 'leaders') {
                        // 👇 NEW FIX: Handle Leader Image Uploads
                        const leaders = [...(sections[idx].leaders || [])];
                        leaders[parseInt(parts[3])] = { ...leaders[parseInt(parts[3])], [parts[4]]: newPath };
                        sections[idx] = { ...sections[idx], leaders };
                    }
                    updated.sections = sections;
                }
            }

            setPageData(updated);
            await savePageToServer(updated);
            showMessage('✅ File uploaded!');
        } catch (error: any) {
            showMessage('❌ ' + (error.message || 'Upload failed'));
        }
        setUploadingFile(false);
    };

    // ============================================================
    // Toggle Page Active
    // ============================================================
    const togglePageActive = async () => {
        if (!pageData) return;
        const updated = { ...pageData, is_active: !pageData.is_active };
        setPageData(updated);
        await savePageToServer(updated);
        showMessage(`✅ Page ${updated.is_active ? 'activated' : 'deactivated'}!`);
    };

    // ============================================================
    // Render: Editable Text Field
    // ============================================================
    const renderTextField = (label: string, fieldPath: string, value: string, isTextArea = false) => {
        if (editingField === fieldPath) {
            return (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {isTextArea ? (
                        <textarea value={editValue} onChange={e => setEditValue(e.target.value)}
                            rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    ) : (
                        <input type="text" value={editValue} onChange={e => setEditValue(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    )}
                    <div className="mt-2 flex gap-2">
                        <button onClick={saveEdit} disabled={saving}
                            className="bg-green-600 text-white px-4 py-1 rounded-md text-sm">Save</button>
                        <button onClick={() => setEditingField(null)}
                            className="bg-gray-400 text-white px-4 py-1 rounded-md text-sm">Cancel</button>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex justify-between items-start mb-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <p className="text-gray-800 text-sm">{value || '(empty)'}</p>
                </div>
                <button onClick={() => startEdit(fieldPath, value)}
                    className="text-blue-600 text-sm hover:underline ml-4 flex-shrink-0">Edit</button>
            </div>
        );
    };

    // ============================================================
    // Render: File Upload Field
    // ============================================================
    const renderFileUpload = (label: string, fieldPath: string, currentPath: string, accept: string = 'image/*,video/*') => {
        const uniqueKey = fieldPath.replace(/\./g, '_');

        return (
            <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                {currentPath && (
                    <div className="mb-3">
                        {currentPath.endsWith('.mp4') || currentPath.endsWith('.webm') ? (
                            <video src={getMediaUrl(currentPath)} className="max-w-full h-32 rounded-lg border" controls />
                        ) : (
                            <img src={getMediaUrl(currentPath)} alt={label} className="max-w-full h-32 object-cover rounded-lg border" />
                        )}
                        <p className="text-xs text-gray-500 mt-1 truncate">{currentPath.split('/').pop()}</p>
                    </div>
                )}
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    onClick={() => fileInputRefs.current[uniqueKey]?.click()}
                >
                    {uploadingFile ? (
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                            <p className="text-sm text-gray-600">Uploading...</p>
                        </div>
                    ) : (
                        <>
                            <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600"><span className="font-semibold">Click to upload</span></p>
                        </>
                    )}
                </div>
                <input ref={el => { fileInputRefs.current[uniqueKey] = el; }} type="file" className="hidden"
                    accept={accept}
                    onChange={e => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0], fieldPath, currentPath); }} />
            </div>
        );
    };

    // ============================================================
    // Render: Section Blocks
    // ============================================================
    const renderHeroSection = () => {
        const hero = pageData?.hero;
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Hero Section</h3>
                {renderFileUpload('Hero Media', 'hero.media', hero?.media || '', 'video/*,image/*')}
                {renderTextField('Title', 'hero.title', hero?.title || '')}
                {renderTextField('Subtitle', 'hero.subtitle', hero?.subtitle || '')}
                {renderTextField('Button 1 Text', 'hero.button1_text', hero?.button1_text || '')}
                {renderTextField('Button 2 Text', 'hero.button2_text', hero?.button2_text || '')}
            </div>
        );
    };

    const renderTextBlockSection = (sectionKey: string, title: string) => {
        const section = getSectionByKey(sectionKey);
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">{title}</h3>
                {renderTextField('Title', `sections.${sectionKey}.title`, section?.title || '')}
                {renderTextField('Subtitle', `sections.${sectionKey}.subtitle`, section?.subtitle || '')}
                {renderTextField('Description', `sections.${sectionKey}.description`, section?.description || '', true)}
                {sectionKey === 'beReady' && renderFileUpload('Video', `sections.${sectionKey}.video`, section?.video || '', 'video/*')}
                {sectionKey === 'connectToday' && renderFileUpload('Background Image', `sections.${sectionKey}.background_image`, section?.background_image || '')}
                {sectionKey === 'connectToday' && renderTextField('CTA Text', `sections.${sectionKey}.cta_text`, section?.cta_text || '')}
                {section?.points && section.points.length > 0 && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                        {section.points.map((point: string, idx: number) => (
                            renderTextField(`Point ${idx + 1}`, `sections.${sectionKey}.points.${idx}`, point)
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderCardsGridSection = (sectionKey: string, title: string) => {
        const section = getSectionByKey(sectionKey);
        const cards = section?.cards || [];

        const addCard = async () => {
            if (!pageData) return;
            const sections = [...(pageData.sections || [])];
            const idx = sections.findIndex(s => s.section_key === sectionKey);
            
            const newCard = {
                title: 'New Service',
                description: 'Description',
                image: '',
                link: '/ocean-freight#new-service',
                hidden: false
            };

            if (idx >= 0) {
                const updatedCards = [...(sections[idx].cards || []), newCard];
                sections[idx] = { ...sections[idx], cards: updatedCards };
            } else {
                sections.push({ 
                    section_key: sectionKey, 
                    section_type: 'cards_grid', 
                    title: 'Logistics Services',
                    description: '',
                    cards: [newCard] 
                });
            }
            
            setPageData({ ...pageData, sections });
            await savePageToServer({ ...pageData, sections });
            showMessage('✅ Card added!');
        };

        const removeCard = async (cardIndex: number) => {
            if (!pageData) return;
            const sections = [...(pageData.sections || [])];
            const idx = sections.findIndex(s => s.section_key === sectionKey);
            if (idx >= 0) {
                const updatedCards = [...(sections[idx].cards || [])];
                updatedCards.splice(cardIndex, 1);
                sections[idx] = { ...sections[idx], cards: updatedCards };
                setPageData({ ...pageData, sections });
                await savePageToServer({ ...pageData, sections });
                showMessage('✅ Card removed!');
            }
        };

        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">{title}</h3>
                {renderTextField('Section Title', `sections.${sectionKey}.title`, section?.title || '')}
                {renderTextField('Section Description', `sections.${sectionKey}.description`, section?.description || '', true)}
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-md font-semibold text-gray-700">Cards ({cards.length})</h4>
                        <button onClick={addCard} className="text-blue-600 text-sm hover:underline font-medium">+ Add Card</button>
                    </div>
                    {cards.map((card: any, idx: number) => (
                        <div key={idx} className={`mb-4 p-4 rounded-lg ${card.hidden ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-200'}`}>
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="font-medium text-gray-700">Card #{idx + 1} {card.hidden && <span className="text-red-500 text-xs">(Hidden)</span>}</h5>
                                <button onClick={() => removeCard(idx)} className="text-red-500 text-sm hover:underline">✕ Remove</button>
                            </div>
                            {renderTextField('Title', `sections.${sectionKey}.cards.${idx}.title`, card.title || '')}
                            {renderTextField('Description', `sections.${sectionKey}.cards.${idx}.description`, card.description || '', true)}
                            {renderFileUpload('Image', `sections.${sectionKey}.cards.${idx}.image`, card.image || '')}
                            {renderTextField('Link (URL)', `sections.${sectionKey}.cards.${idx}.link`, card.link || '')}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderFaqSection = (sectionKey: string, title: string) => {
        const section = getSectionByKey(sectionKey);
        const faqs = section?.faqs || [];

        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">{title}</h3>
                {faqs.map((faq: any, idx: number) => (
                    <div key={idx} className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-700 mb-2">FAQ #{idx + 1}</h4>
                        {renderTextField('Question', `sections.${sectionKey}.faqs.${idx}.question`, faq.question || '')}
                        {renderTextField('Answer', `sections.${sectionKey}.faqs.${idx}.answer`, faq.answer || '', true)}
                    </div>
                ))}
            </div>
        );
    };

    // ============================================================
    // About Page: Purpose Section (heading, subtitle, description, image)
    // ============================================================
    const renderAboutPurposeSection = () => {
        const section = getSectionByKey('purpose');
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Who We Are</h3>
                {renderTextField('Heading', `sections.purpose.heading`, section?.heading || '')}
                {renderTextField('Subtitle', `sections.purpose.subtitle`, section?.subtitle || '')}
                {renderTextField('Description (Text)', `sections.purpose.description`, section?.description || '', true)}
                {renderFileUpload('Image', `sections.purpose.image`, section?.image || '')}
            </div>
        );
    };

    // ============================================================
    // About Page: Vision Section (title, description, vision_statement, mission_statement)
    // ============================================================
    const renderAboutVisionSection = () => {
        const section = getSectionByKey('vision');
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Vision & Mission</h3>
                {renderTextField('Title', `sections.vision.title`, section?.title || '')}
                {renderTextField('Description', `sections.vision.description`, section?.description || '', true)}
                {renderTextField('Vision Statement', `sections.vision.vision_statement`, section?.vision_statement || '', true)}
                {renderTextField('Mission Statement', `sections.vision.mission_statement`, section?.mission_statement || '', true)}
            </div>
        );
    };

    // ============================================================
    // About Page: Values Section (section image + 5 text cards)
    // ============================================================
    const renderAboutValuesSection = () => {
        const section = getSectionByKey('values');
        const cards = section?.cards || [];

        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Core Values</h3>
                
                {/* Single shared image for the entire Values section */}
                {renderFileUpload('Section Image (shared for all values)', `sections.values.image`, section?.image || '')}
                
                <div className="mt-6">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Values ({cards.length})</h4>
                    <p className="text-xs text-gray-500 mb-4">Each value has a title and description. The image above is shared across all values.</p>
                    {cards.map((card: any, idx: number) => (
                        <div key={idx} className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <h5 className="font-medium text-gray-700 mb-3">Value #{idx + 1}</h5>
                            {renderTextField('Title', `sections.values.cards.${idx}.title`, card.title || '')}
                            {renderTextField('Description', `sections.values.cards.${idx}.description`, card.description || '', true)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // ============================================================
    // About Page: Leadership Section (title, description, leaders with name/title/desc/image/gradient/reverse)
    // ============================================================
    const renderAboutLeadershipSection = () => {
        const section = getSectionByKey('leadership');
        const leaders = section?.leaders || [];

        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Leadership</h3>
                {renderTextField('Section Title', `sections.leadership.title`, section?.title || '')}
                {renderTextField('Section Description', `sections.leadership.description`, section?.description || '', true)}
                <div className="mt-6">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Leaders ({leaders.length})</h4>
                    {leaders.map((leader: any, idx: number) => (
                        <div key={idx} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h5 className="font-medium text-gray-700 mb-3">Leader #{idx + 1}</h5>
                            {renderTextField('Name', `sections.leadership.leaders.${idx}.name`, leader.name || '')}
                            {renderTextField('Title (Position)', `sections.leadership.leaders.${idx}.title`, leader.title || '')}
                            {renderTextField('Description', `sections.leadership.leaders.${idx}.description`, leader.description || '', true)}
                            {renderFileUpload('Image', `sections.leadership.leaders.${idx}.image`, leader.image || '')}
                            {renderTextField('Gradient Class', `sections.leadership.leaders.${idx}.gradient`, leader.gradient || 'from-blue-100 to-blue-50')}
                            <div className="flex items-center gap-3 mb-3 p-3 bg-white rounded-lg">
                                <label className="text-sm font-medium text-gray-700">Image on Right (reverse):</label>
                                <span className={`text-sm ${leader.reverse ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                                    {leader.reverse ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // ============================================================
    // About Page: Sustainability Section (title, description, image)
    // ============================================================
    const renderAboutSustainabilitySection = () => {
        const section = getSectionByKey('sustainability');
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Sustainability</h3>
                {renderTextField('Title', `sections.sustainability.title`, section?.title || '')}
                {renderTextField('Description', `sections.sustainability.description`, section?.description || '', true)}
                {renderFileUpload('Image', `sections.sustainability.image`, section?.image || '')}
            </div>
        );
    };

    // ============================================================
    // About Page: Offices Section (title, description, company_name, phone, email, map_url, address lines)
    // ============================================================
    const renderAboutOfficesSection = () => {
        const section = getSectionByKey('offices');
        const addressLines = section?.address || [];

        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Our Offices</h3>
                {renderTextField('Title', `sections.offices.title`, section?.title || '')}
                {renderTextField('Description', `sections.offices.description`, section?.description || '', true)}
                {renderTextField('Company Name', `sections.offices.company_name`, section?.company_name || '')}
                {renderTextField('Phone', `sections.offices.phone`, section?.phone || '')}
                {renderTextField('Email', `sections.offices.email`, section?.email || '')}
                {renderTextField('Map URL', `sections.offices.map_url`, section?.map_url || '', true)}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Lines</label>
                    {addressLines.map((line: string, idx: number) => (
                        <div key={idx} className="mb-2">
                            {renderTextField(`Address Line ${idx + 1}`, `sections.offices.address.${idx}`, line)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // ============================================================
    // Ocean Freight: Segments Section (cards with points, process_label, process, reverse)
    // ============================================================
    const renderOceanFreightSegmentsSection = () => {
        const section = getSectionByKey('segments');
        const cards = section?.cards || [];

        const updateCardField = async (cardIndex: number, field: string, value: any) => {
            if (!pageData) return;
            const sections = [...(pageData.sections || [])];
            const idx = sections.findIndex(s => s.section_key === 'segments');
            if (idx >= 0) {
                const cards = [...(sections[idx].cards || [])];
                cards[cardIndex] = { ...cards[cardIndex], [field]: value };
                sections[idx] = { ...sections[idx], cards };
                setPageData({ ...pageData, sections });
            }
        };

        // 👇 NEW: Add Segment Function
        const addSegment = async () => {
            if (!pageData) return;
            const sections = [...(pageData.sections || [])];
            const idx = sections.findIndex(s => s.section_key === 'segments');
            
            const newSegment = {
                title: 'New Service Segment',
                description: 'Service description goes here',
                image: '',
                link: '/ocean-freight#new-service-segment',
                reverse: false,
                hidden: false,
                points: []
            };

            if (idx >= 0) {
                const updatedCards = [...(sections[idx].cards || []), newSegment];
                sections[idx] = { ...sections[idx], cards: updatedCards };
            } else {
                // If the 'segments' section doesn't exist at all, create it
                sections.push({ 
                    section_key: 'segments', 
                    section_type: 'segments_list', 
                    cards: [newSegment] 
                });
            }
            
            setPageData({ ...pageData, sections });
            await savePageToServer({ ...pageData, sections });
            showMessage('✅ Segment added!');
        };

        // 👇 NEW: Remove Segment Function
        const removeSegment = async (cardIndex: number) => {
            if (!pageData) return;
            const sections = [...(pageData.sections || [])];
            const idx = sections.findIndex(s => s.section_key === 'segments');
            if (idx >= 0) {
                const updatedCards = [...(sections[idx].cards || [])];
                updatedCards.splice(cardIndex, 1);
                sections[idx] = { ...sections[idx], cards: updatedCards };
                setPageData({ ...pageData, sections });
                await savePageToServer({ ...pageData, sections });
                showMessage('✅ Segment removed!');
            }
        };

        const addPoint = async (cardIndex: number) => {
            if (!pageData) return;
            const sections = [...(pageData.sections || [])];
            const idx = sections.findIndex(s => s.section_key === 'segments');
            if (idx >= 0) {
                const cards = [...(sections[idx].cards || [])];
                const card = { ...cards[cardIndex] };
                const points = [...(card.points || []), 'New point'];
                card.points = points;
                cards[cardIndex] = card;
                sections[idx] = { ...sections[idx], cards };
                setPageData({ ...pageData, sections });
                await savePageToServer({ ...pageData, sections });
                showMessage('✅ Point added!');
            }
        };

        const removePoint = async (cardIndex: number, pointIndex: number) => {
            if (!pageData) return;
            const sections = [...(pageData.sections || [])];
            const idx = sections.findIndex(s => s.section_key === 'segments');
            if (idx >= 0) {
                const cards = [...(sections[idx].cards || [])];
                const card = { ...cards[cardIndex] };
                const points = [...(card.points || [])];
                points.splice(pointIndex, 1);
                card.points = points;
                cards[cardIndex] = card;
                sections[idx] = { ...sections[idx], cards };
                setPageData({ ...pageData, sections });
                await savePageToServer({ ...pageData, sections });
                showMessage('✅ Point removed!');
            }
        };

        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Service Segments</h3>
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-md font-semibold text-gray-700">Segments ({cards.length})</h4>
                        {/* 👇 NEW: Add Segment Button */}
                        <button onClick={addSegment} className="text-blue-600 text-sm hover:underline font-medium">+ Add Segment</button>
                    </div>
                    {cards.map((card: any, idx: number) => (
                        <div key={idx} className={`mb-6 p-4 rounded-lg ${card.hidden ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-200'}`}>
                            <div className="flex justify-between items-center mb-3">
                                <h5 className="font-medium text-gray-700">
                                    Segment #{idx + 1}: {card.title || 'Untitled'}
                                    {card.hidden && <span className="text-red-500 text-xs ml-2">(Hidden)</span>}
                                </h5>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => updateCardField(idx, 'hidden', !card.hidden)}
                                        className={`text-sm ${card.hidden ? 'text-green-600 hover:text-green-800' : 'text-amber-600 hover:text-amber-800'}`}>
                                        {card.hidden ? '👁️ Show' : '🙈 Hide'}
                                    </button>
                                    {/* 👇 NEW: Remove Segment Button */}
                                    <button onClick={() => removeSegment(idx)} className="text-red-500 text-sm hover:underline">✕ Remove</button>
                                </div>
                            </div>

                            {renderTextField('Title', `sections.segments.cards.${idx}.title`, card.title || '')}
                            {renderTextField('Subtitle (Description)', `sections.segments.cards.${idx}.description`, card.description || '', true)}
                            {renderFileUpload('Image', `sections.segments.cards.${idx}.image`, card.image || '')}
                            {renderTextField('Link (Anchor)', `sections.segments.cards.${idx}.link`, card.link || '')}

                            {/* Image Left (Reverse) toggle */}
                            <div className="flex items-center gap-3 mb-3 p-3 bg-white rounded-lg">
                                <label className="text-sm font-medium text-gray-700">Image on Left:</label>
                                <button onClick={() => updateCardField(idx, 'reverse', !card.reverse)}
                                    className={`px-3 py-1 rounded text-sm font-medium ${card.reverse ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
                                    {card.reverse ? 'Yes' : 'No'}
                                </button>
                            </div>

                            {/* Process Label & Process */}
                            {renderTextField('Process Label', `sections.segments.cards.${idx}.process_label`, card.process_label || '')}
                            {renderTextField('Process', `sections.segments.cards.${idx}.process`, card.process || '', true)}

                            {/* Points */}
                            <div className="mt-4 p-3 bg-white rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                                {(card.points || []).map((point: string, pIdx: number) => (
                                    <div key={pIdx} className="mb-2 flex items-start gap-2">
                                        <div className="flex-1">
                                            {renderTextField(`Point ${pIdx + 1}`, `sections.segments.cards.${idx}.points.${pIdx}`, point)}
                                        </div>
                                        <button onClick={() => removePoint(idx, pIdx)}
                                            className="text-red-500 hover:text-red-700 text-sm mt-2 flex-shrink-0">✕</button>
                                    </div>
                                ))}
                                {(card.points || []).length === 0 && (
                                    <p className="text-xs text-gray-400 italic mb-2">No points added yet.</p>
                                )}
                                <button onClick={() => addPoint(idx)}
                                    className="text-blue-600 text-sm hover:underline mt-1">+ Add Point</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // ============================================================
    // Careers: Intro Section (title, description)
    // ============================================================
    const renderCareersIntroSection = () => {
        const section = getSectionByKey('intro');
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Intro Section</h3>
                {renderTextField('Title', `sections.intro.title`, section?.title || '')}
                {renderTextField('Description', `sections.intro.description`, section?.description || '', true)}
            </div>
        );
    };

    // ============================================================
    // Careers: Culture Section (title, description, icons)
    // ============================================================
    const renderCareersCultureSection = () => {
        const section = getSectionByKey('culture');
        const icons = section?.icons || [];

        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Culture Section</h3>
                {renderTextField('Title', `sections.culture.title`, section?.title || '')}
                {renderTextField('Description', `sections.culture.description`, section?.description || '', true)}
                <div className="mt-6">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Culture Icons ({icons.length})</h4>
                    {icons.map((icon: any, idx: number) => (
                        <div key={idx} className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <h5 className="font-medium text-gray-700 mb-3">Icon #{idx + 1}</h5>
                            {renderTextField('Icon Name (Ant Design)', `sections.culture.icons.${idx}.icon`, icon.icon || '')}
                            {renderTextField('Text', `sections.culture.icons.${idx}.text`, icon.text || '', true)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // ============================================================
    // Careers: Responsibility Banner (title)
    // ============================================================
    const renderCareersResponsibilitySection = () => {
        const section = getSectionByKey('responsibilityBanner');
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Responsibility Banner</h3>
                {renderTextField('Title', `sections.responsibilityBanner.title`, section?.title || '')}
            </div>
        );
    };

    // ============================================================
    // Careers: FAQ Section (image + faqs with title/narration)
    // ============================================================
    const renderCareersFAQSection = () => {
        const section = getSectionByKey('faqSection');
        const faqs = section?.faqs || [];

        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">FAQ Section</h3>
                {renderFileUpload('Section Image', `sections.faqSection.image`, section?.image || '')}
                <div className="mt-6">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">FAQs ({faqs.length})</h4>
                    {faqs.map((faq: any, idx: number) => (
                        <div key={idx} className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <h5 className="font-medium text-gray-700 mb-3">FAQ #{idx + 1}</h5>
                            {renderTextField('Title', `sections.faqSection.faqs.${idx}.title`, faq.title || '')}
                            {renderTextField('Narration', `sections.faqSection.faqs.${idx}.narration`, faq.narration || '', true)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // ============================================================
    // Careers: Job Openings Section (background_image, title, description)
    // ============================================================
    const renderCareersJobOpeningsSection = () => {
        const section = getSectionByKey('jobOpenings');
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Job Openings</h3>
                {renderFileUpload('Background Image', `sections.jobOpenings.background_image`, section?.background_image || '')}
                {renderTextField('Title', `sections.jobOpenings.title`, section?.title || '')}
                {renderTextField('Description', `sections.jobOpenings.description`, section?.description || '', true)}
            </div>
        );
    };

    // ============================================================
    // Careers: Why Work Section (title, image, icons with icon/text)
    // ============================================================
    const renderCareersWhyWorkSection = () => {
        const section = getSectionByKey('whyWork');
        const icons = section?.icons || [];

        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Why Work at Trident</h3>
                {renderTextField('Title', `sections.whyWork.title`, section?.title || '')}
                {renderFileUpload('Section Image', `sections.whyWork.image`, section?.image || '')}
                <div className="mt-6">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Benefit Items ({icons.length})</h4>
                    {icons.map((icon: any, idx: number) => (
                        <div key={idx} className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <h5 className="font-medium text-gray-700 mb-3">Item #{idx + 1}</h5>
                            {renderTextField('Icon Name (Ant Design)', `sections.whyWork.icons.${idx}.icon`, icon.icon || '')}
                            {renderTextField('Text', `sections.whyWork.icons.${idx}.text`, icon.text || '', true)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // ============================================================
    // Contact: Intro Section (title, description)
    // ============================================================
    const renderContactIntroSection = () => {
        const section = getSectionByKey('intro');
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Intro Section</h3>
                {renderTextField('Title', `sections.intro.title`, section?.title || '')}
                {renderTextField('Description', `sections.intro.description`, section?.description || '', true)}
            </div>
        );
    };

    // ============================================================
    // Contact: Consultation Section (title, description, sub_description, heading, points, closing_text)
    // ============================================================
    const renderContactConsultationSection = () => {
        const section = getSectionByKey('consultation');
        const points = section?.points || [];

        const addPoint = async () => {
            if (!pageData) return;
            const sections = [...(pageData.sections || [])];
            const idx = sections.findIndex(s => s.section_key === 'consultation');
            if (idx >= 0) {
                const pts = [...(sections[idx].points || []), 'New point'];
                sections[idx] = { ...sections[idx], points: pts };
                setPageData({ ...pageData, sections });
                await savePageToServer({ ...pageData, sections });
                showMessage('✅ Point added!');
            }
        };

        const removePoint = async (pointIndex: number) => {
            if (!pageData) return;
            const sections = [...(pageData.sections || [])];
            const idx = sections.findIndex(s => s.section_key === 'consultation');
            if (idx >= 0) {
                const pts = [...(sections[idx].points || [])];
                pts.splice(pointIndex, 1);
                sections[idx] = { ...sections[idx], points: pts };
                setPageData({ ...pageData, sections });
                await savePageToServer({ ...pageData, sections });
                showMessage('✅ Point removed!');
            }
        };

        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Consultation Section</h3>
                {renderTextField('Title', `sections.consultation.title`, section?.title || '')}
                {renderTextField('Description', `sections.consultation.description`, section?.description || '', true)}
                {renderTextField('Sub Description', `sections.consultation.sub_description`, section?.sub_description || '', true)}
                {renderTextField('Cover Title (Heading)', `sections.consultation.heading`, section?.heading || '')}
                {renderTextField('Closing Text', `sections.consultation.closing_text`, section?.closing_text || '', true)}

                {/* Cover Points */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-medium text-gray-700">Cover Points ({points.length})</label>
                        <button onClick={addPoint}
                            className="text-blue-600 text-sm hover:underline">+ Add Point</button>
                    </div>
                    {points.length === 0 && (
                        <p className="text-xs text-gray-400 italic">No points added yet.</p>
                    )}
                    {points.map((point: string, idx: number) => (
                        <div key={idx} className="mb-2 flex items-start gap-2">
                            <div className="flex-1">
                                {renderTextField(`Point ${idx + 1}`, `sections.consultation.points.${idx}`, point)}
                            </div>
                            <button onClick={() => removePoint(idx)}
                                className="text-red-500 hover:text-red-700 text-sm mt-2 flex-shrink-0">✕</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderPageChange = (pageKey: string) => {
        setSelectedPage(pageKey);
        setActiveSection(getSectionsForPage(pageKey)[0] || 'hero');
        loadPage(pageKey);
    };

    // ============================================================
    // Render
    // ============================================================
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600">Loading content...</p>
                </div>
            </div>
        );
    }

    const sections = getSectionsForPage(selectedPage);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Trident Admin Panel</h1>
                    <p className="text-sm text-gray-500">
                        Logged in as: {authAPI.getCurrentUser()?.uid || 'Admin'} ({authAPI.getCurrentUser()?.role || ''})
                    </p>
                </div>
                <div className="flex gap-3">
                    <a href="/" target="_blank" className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-2">View Website →</a>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700">Logout</button>
                </div>
            </div>

            <div className="p-8">
                {/* Save Message */}
                {saveMessage && (
                    <div className="fixed top-20 right-8 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-20">{saveMessage}</div>
                )}

                {/* Page Selector */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Page to Edit:</label>
                    <select value={selectedPage} onChange={e => renderPageChange(e.target.value)}
                        className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                        {PAGES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                    </select>
                </div>

                {/* Content Editor */}
                {(pageData || selectedPage === 'footer' || selectedPage === 'email-settings') && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-800">
                                Editing: {PAGES.find(p => p.id === selectedPage)?.label}
                            </h2>
                             {selectedPage !== 'footer' && selectedPage !== 'email-settings' && (
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500">{pageData?.is_active ? '✅ Visible' : '❌ Hidden'}</span>
                                    <button onClick={togglePageActive} disabled={saving}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${pageData?.is_active ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'} disabled:opacity-50`}>
                                        {pageData?.is_active ? 'Hide Page' : 'Show Page'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Section Tabs - Only show if NOT footer */}
                        {selectedPage !== 'footer' && (
                            <div className="flex gap-2 mb-6 border-b overflow-x-auto">
                                {sections.map(section => (
                                    <button key={section} onClick={() => setActiveSection(section)}
                                        className={`px-4 py-2 text-sm font-medium capitalize whitespace-nowrap ${activeSection === section ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                        {section.replace(/([A-Z])/g, ' $1').trim()}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Section Content */}
                        <div className="max-h-[70vh] overflow-y-auto pr-4">
                            {selectedPage === 'footer' && renderFooterSettings()}
                            {selectedPage === 'home' && activeSection === 'hero' && renderHeroSection()}
                            {selectedPage === 'home' && activeSection === 'beReady' && renderTextBlockSection('beReady', 'Be Ready Section')}
                            {selectedPage === 'home' && activeSection === 'logisticsServices' && renderCardsGridSection('logisticsServices', 'Logistics Services')}
                            {selectedPage === 'home' && activeSection === 'whatMakesDifferent' && renderTextBlockSection('whatMakesDifferent', 'What Makes Trident Different')}
                            {selectedPage === 'home' && activeSection === 'faqs' && renderFaqSection('faqs', 'FAQs')}
                            {selectedPage === 'home' && activeSection === 'connectToday' && renderTextBlockSection('connectToday', 'Connect Today')}

                            {selectedPage === 'about' && activeSection === 'hero' && renderHeroSection()}
                            {selectedPage === 'about' && activeSection === 'purpose' && renderAboutPurposeSection()}
                            {selectedPage === 'about' && activeSection === 'vision' && renderAboutVisionSection()}
                            {selectedPage === 'about' && activeSection === 'values' && renderAboutValuesSection()}
                            {selectedPage === 'about' && activeSection === 'leadership' && renderAboutLeadershipSection()}
                            {selectedPage === 'about' && activeSection === 'sustainability' && renderAboutSustainabilitySection()}
                            {selectedPage === 'about' && activeSection === 'offices' && renderAboutOfficesSection()}

                            {selectedPage === 'ocean-freight' && activeSection === 'hero' && renderHeroSection()}
                            {selectedPage === 'ocean-freight' && activeSection === 'segments' && renderOceanFreightSegmentsSection()}

                            {selectedPage === 'careers' && activeSection === 'hero' && renderHeroSection()}
                            {selectedPage === 'careers' && activeSection === 'intro' && renderCareersIntroSection()}
                            {selectedPage === 'careers' && activeSection === 'culture' && renderCareersCultureSection()}
                            {selectedPage === 'careers' && activeSection === 'responsibilityBanner' && renderCareersResponsibilitySection()}
                            {selectedPage === 'careers' && activeSection === 'faqSection' && renderCareersFAQSection()}
                            {selectedPage === 'careers' && activeSection === 'jobOpenings' && renderCareersJobOpeningsSection()}
                            {selectedPage === 'careers' && activeSection === 'whyWork' && renderCareersWhyWorkSection()}

                            {selectedPage === 'contact' && activeSection === 'hero' && renderHeroSection()}
                            {selectedPage === 'contact' && activeSection === 'intro' && renderContactIntroSection()}
                            {selectedPage === 'contact' && activeSection === 'consultation' && renderContactConsultationSection()}
                            {selectedPage === 'email-settings' && renderEmailSettings()}

                        </div>

                        {/* Save Button */}
                        <div className="mt-6 pt-4 border-t">
                            <button onClick={savePage} disabled={saving}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
                                {saving ? 'Saving...' : '💾 Save All Changes'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Hide Navbar */}
            <style>{`
                body.admin-mode nav,
                body.admin-mode .fixed.top-0.left-0.right-0.z-50 { display: none !important; }
                body.admin-mode { padding-top: 0 !important; }
            `}</style>
        </div>
    );
};

export default ContentEditor;
