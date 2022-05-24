import CMS from 'netlify-cms-app';
import '../styles/index.scss';
import HomePreview from './pages/HomePreview';

CMS.init();

// Initialize stuff here.
CMS.registerPreviewStyle('/admin/assets/main.css');
CMS.registerPreviewTemplate('home', HomePreview);
