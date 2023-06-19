import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React from 'react';
import AboutPageComponent from '../../components/page/AboutPageComponent';

const AboutPreviewComponent: React.FC<PreviewTemplateComponentProps> = (
  props,
) => {
  const title = props.entry.getIn(['data', 'title']);
  const content = props.entry.getIn(['data', 'content']);

  return (
    <div className={'p-5'}>
      <AboutPageComponent title={title} content={content} />
    </div>
  );
};

export default AboutPreviewComponent;
