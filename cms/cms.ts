import CMS from 'netlify-cms-app';
import IndexPreviewComponent from './previews/IndexPreviewComponent';
import { cmsConfig } from './config';
import { init as initEmbeddedVideoWidget } from './widgets/EmbeddedVideo';
import { CmsConfig } from 'netlify-cms-core';

(window as unknown as { CMS_MANUAL_INIT: boolean }).CMS_MANUAL_INIT = true;

// Initialize stuff here.
CMS.registerPreviewStyle('/admin/assets/cms.css');
CMS.registerPreviewTemplate('home', IndexPreviewComponent);

initEmbeddedVideoWidget(CMS);

CMS.init({ config: cmsConfig as CmsConfig });
