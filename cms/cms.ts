import CMS from 'netlify-cms-app';
import '../styles/index.css';
import HomePreview from './pages/HomePreview';

CMS.init();

// Initialize stuff here.
CMS.registerPreviewStyle('/admin/assets/main.css');
CMS.registerPreviewStyle(
  'https://cdn.jsdelivr.net/npm/tailwindcss/dist/preflight.min.css',
);
CMS.registerPreviewStyle(
  'https://cdn.jsdelivr.net/npm/tailwindcss/dist/utilities.min.css',
);
CMS.registerPreviewStyle(
  'https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css',
);
CMS.registerPreviewTemplate('home', HomePreview);
