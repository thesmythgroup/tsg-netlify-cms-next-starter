import CMS from 'netlify-cms-app';
import IndexPreviewComponent from './previews/IndexPreviewComponent';
import { cmsConfig } from './config';
import { init as initEmbeddedVideoWidget } from './widgets/EmbeddedVideo';
import { CmsConfig } from 'netlify-cms-core';
import AboutPreviewComponent from './previews/AboutPreviewComponent';
import ContactPreviewComponent from './previews/ContactPreviewComponent';
import WidgetShowcasePreviewComponent from './previews/WidgetShowcasePreviewComponent';
import BlogPreviewComponent from './previews/BlogPreviewComponent';

(window as unknown as { CMS_MANUAL_INIT: boolean }).CMS_MANUAL_INIT = true;

// Initialize stuff here.
CMS.registerPreviewStyle('/admin/assets/cms.css');
CMS.registerPreviewTemplate('home', IndexPreviewComponent);
CMS.registerPreviewTemplate('blog', BlogPreviewComponent);
CMS.registerPreviewTemplate('about', AboutPreviewComponent);
CMS.registerPreviewTemplate('contact', ContactPreviewComponent);
CMS.registerPreviewTemplate(
  'widgetShowcasePage',
  WidgetShowcasePreviewComponent,
);

initEmbeddedVideoWidget(CMS);

CMS.init({ config: cmsConfig as CmsConfig });
