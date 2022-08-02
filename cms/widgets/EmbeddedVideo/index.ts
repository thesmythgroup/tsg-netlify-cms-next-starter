import EmbeddedVideoPreview from './preview';
import EmbeddedVideoControl from './control';
import type { CMS } from 'netlify-cms-core';
import EmbeddedVideoComponent from './component';

export function init(CMS: CMS) {
  CMS.registerWidget(
    'embeddedVideo',
    EmbeddedVideoControl,
    EmbeddedVideoPreview,
  );
}

export const Component = EmbeddedVideoComponent;
