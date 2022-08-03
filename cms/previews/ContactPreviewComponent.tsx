import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React from 'react';
import ContactPageComponent from '../../components/page/ContactPageComponent';

const ContactPreviewComponent: React.FC<PreviewTemplateComponentProps> = (
  props,
) => {
  const intro = props.entry.getIn(['data', 'intro']);

  return (
    <div className={'p-5'}>
      <ContactPageComponent intro={intro} />
    </div>
  );
};

export default ContactPreviewComponent;
