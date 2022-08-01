import CMS from 'netlify-cms-app';
import IndexPreviewComponent from './previews/IndexPreviewComponent';
import { cmsConfig } from './config';

(window as unknown as { CMS_MANUAL_INIT: boolean }).CMS_MANUAL_INIT = true;

CMS.init({ config: cmsConfig });

// Initialize stuff here.
CMS.registerPreviewStyle('/admin/assets/cms.css');
CMS.registerPreviewTemplate('home', IndexPreviewComponent);
