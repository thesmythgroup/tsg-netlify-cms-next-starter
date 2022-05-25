import CMS from 'netlify-cms-app';
import IndexPreviewComponent from './previews/IndexPreviewComponent';

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
CMS.registerPreviewTemplate('home', IndexPreviewComponent);
