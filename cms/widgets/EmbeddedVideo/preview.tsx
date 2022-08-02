import React from 'react';
import { CmsWidgetPreviewProps } from 'netlify-cms-core';
import EmbeddedVideoComponent from './component';

const preview: React.FC<CmsWidgetPreviewProps> = (props) => {
  return <EmbeddedVideoComponent url={props.value} />;
};

export default preview;
