//D:/Trident Log/Trident-FE/src/services/contentService.ts

import { contentAPI } from './api';

// ============================================================
// Types
// ============================================================
export interface HeroSection {
    id?: number;
    page_id?: number;
    media?: string;
    title?: string;
    subtitle?: string;
    button1_text?: string;
    button2_text?: string;
}

export interface SectionCard {
    id?: number;
    section_id?: number;
    title: string;
    description: string;
    image: string;
    link: string;
    gradient?: string;
    reverse?: boolean;
    hidden?: boolean;
    sort_order?: number;
}

export interface SectionFAQ {
    id?: number;
    question?: string;
    answer?: string;
    title?: string;
    narration?: string;
    sort_order?: number;
}

export interface SectionLeader {
    id?: number;
    name: string;
    title: string;
    description: string;
    image: string;
    gradient?: string;
    reverse?: boolean;
    sort_order?: number;
}

export interface SectionIcon {
    id?: number;
    icon: string;
    text: string;
    sort_order?: number;
}

export interface PageSection {
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
    cards?: SectionCard[];
    points?: string[];
    faqs?: SectionFAQ[];
    leaders?: SectionLeader[];
    icons?: SectionIcon[];
    address?: string[];
}

export interface PageContent {
    id?: number;
    page_key: string;
    is_active: boolean;
    hero?: HeroSection | null;
    sections?: PageSection[];
}

export interface GlobalSettings {
    id?: number;
    company_name?: string;
    contact_email?: string;
    contact_phone?: string;
    quote_recipients?: string[];
    contact_recipients?: string[];
}

// ============================================================
// Cache
// ============================================================
const pageCache = new Map<string, { data: PageContent; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ============================================================
// Content Service Functions
// ============================================================

/**
 * Get a specific page by its key (e.g., 'home', 'about', 'ocean-freight')
 */
export const getPageContent = async (pageKey: string): Promise<PageContent | null> => {
    // Check cache first
    const cached = pageCache.get(pageKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }

    try {
        const response = await contentAPI.getPage(pageKey);
        
        if (response.success && response.page) {
            // Cache the result
            pageCache.set(pageKey, { data: response.page, timestamp: Date.now() });
            return response.page;
        }
        
        return null;
    } catch (error) {
        console.error(`Failed to load page content for "${pageKey}":`, error);
        return null;
    }
};

/**
 * Get all active pages list
 */
export const getPagesList = async () => {
    try {
        const response = await contentAPI.getPages();
        return response.success ? response.pages : [];
    } catch (error) {
        console.error('Failed to load pages list:', error);
        return [];
    }
};

/**
 * Update page content (admin only)
 */
export const updatePageContent = async (pageKey: string, data: {
    isActive?: boolean;
    hero?: Partial<HeroSection>;
    sections?: Partial<PageSection>[];
}) => {
    try {
        const response = await contentAPI.updatePage(pageKey, data);
        
        // Invalidate cache for this page
        pageCache.delete(pageKey);
        
        return response;
    } catch (error) {
        console.error(`Failed to update page "${pageKey}":`, error);
        throw error;
    }
};

/**
 * Get global settings
 */
export const getGlobalSettings = async (): Promise<GlobalSettings | null> => {
    try {
        const response = await contentAPI.getGlobalSettings();
        return response.success ? response.settings : null;
    } catch (error) {
        console.error('Failed to load global settings:', error);
        return null;
    }
};

/**
 * Update global settings (admin only)
 */
export const updateGlobalSettings = async (settings: Partial<GlobalSettings>) => {
    try {
        return await contentAPI.updateGlobalSettings(settings);
    } catch (error) {
        console.error('Failed to update global settings:', error);
        throw error;
    }
};

/**
 * Update quote recipients (admin only)
 */
export const updateQuoteRecipients = async (emails: string[]) => {
    try {
        return await contentAPI.updateQuoteRecipients(emails);
    } catch (error) {
        console.error('Failed to update quote recipients:', error);
        throw error;
    }
};

/**
 * Update contact recipients (admin only)
 */
export const updateContactRecipients = async (emails: string[]) => {
    try {
        return await contentAPI.updateContactRecipients(emails);
    } catch (error) {
        console.error('Failed to update contact recipients:', error);
        throw error;
    }
};

/**
 * Upload a file (image/video) - admin only
 * @param file - The file to upload
 * @param oldFilePath - Optional path of old file to delete
 */
export const uploadFile = async (file: File, oldFilePath?: string) => {
    try {
        return await contentAPI.uploadFile(file, oldFilePath);
    } catch (error) {
        console.error('Failed to upload file:', error);
        throw error;
    }
};

/**
 * Clear all cached content
 */
export const clearContentCache = () => {
    pageCache.clear();
};

/**
 * Load content (backward compatibility - loads home page by default)
 */
export const loadContent = async () => {
    return getPageContent('home');
};
