import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React from 'react';
import AboutPageComponent from '../../components/page/AboutPageComponent';

const AboutPreviewComponent: React.FC<PreviewTemplateComponentProps> = (
  props,
) => {
  const content = props.entry.getIn(['data', 'content']);

  return (
    <div className={'p-5'}>
      <AboutPageComponent content={content} />
    </div>
  );
};

export default AboutPreviewComponent;
