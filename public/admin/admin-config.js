// This tells Decap CMS what content editors can manage
CMS.init({
  config: {
    backend: {
      name: 'github',
      repo: 'GMP001/Trident',
      branch: 'main',
    },
    media_folder: 'public/uploads',
    public_folder: '/uploads',
    collections: [
      // Page Visibility Management
      {
        name: 'pages',
        label: 'Page Visibility',
        folder: 'content/pages',
        create: true,
        fields: [
          { name: 'title', label: 'Page Title', widget: 'string' },
          { name: 'slug', label: 'Page URL', widget: 'string' },
          { name: 'isActive', label: 'Page Active?', widget: 'boolean', default: true },
          { name: 'heroTitle', label: 'Hero Title', widget: 'text' },
          { name: 'heroSubtitle', label: 'Hero Subtitle', widget: 'text' },
          { name: 'heroImage', label: 'Hero Image', widget: 'image' }
        ]
      },
      // Global Site Settings
      {
        name: 'settings',
        label: 'Global Settings',
        files: [
          {
            name: 'general',
            label: 'General Settings',
            file: 'content/settings/general.json',
            fields: [
              { name: 'companyName', label: 'Company Name', widget: 'string' },
              { name: 'contactEmail', label: 'Contact Email', widget: 'string' },
              { name: 'contactPhone', label: 'Contact Phone', widget: 'string' }
            ]
          }
        ]
      }
    ]
  }
});

