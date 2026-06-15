// Simple content service that reads from public JSON file
export interface PageContent {
  isActive: boolean;
  hero: {
    title: string;
    subtitle: string;
    image: string;
    ctaText: string;
    ctaLink: string;
  };
}

let cachedContent: any = null;

export const loadContent = async () => {
  if (cachedContent) return cachedContent;
  
  try {
    const response = await fetch('/content/pages.json');
    cachedContent = await response.json();
    return cachedContent;
  } catch (error) {
    console.error('Failed to load content:', error);
    return null;
  }
};

export const getPageContent = async (pageSlug: string): Promise<PageContent | null> => {
  const content = await loadContent();
  if (!content) return null;
  
  const page = content.pages[pageSlug];
  if (!page || !page.isActive) return null;
  
  return page;
};

export const updatePageContent = async (pageSlug: string, data: any) => {
  // This would call your admin API to update the JSON file
  // For now, just log to console
  console.log(`Updating ${pageSlug}:`, data);
  return true;
};
