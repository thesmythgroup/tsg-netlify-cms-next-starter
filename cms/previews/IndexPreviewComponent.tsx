import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React from 'react';
import IndexComponent from '../../components/page/IndexComponent';

/**
 * This preview component wraps the standard Home component, and connects the netlify CMS
 * backend data to the component props.
 * See: https://www.netlifycms.org/docs/customization/
 */
const IndexPreviewComponent: React.FC<PreviewTemplateComponentProps> = (
  props,
) => {
  const title = props.entry.getIn(['data', 'title']);
  const intro = props.entry.getIn(['data', 'intro']);

  /**
   * Example of loading in a collection from the CMS data
   */
  const features = props.entry.getIn(['data', 'features']).toJS();

  const embeddedVideo = props.entry.getIn(['data', 'embeddedVideo']);
  const showGallery = props.entry.getIn(['data', 'showGallery']);
  const gallery = props.entry.getIn(['data', 'gallery']).toJS();

  return (
    // Send the props down into the component.
    <div className={'p-5'}>
      <IndexComponent
        title={title}
        intro={intro}
        embeddedVideo={embeddedVideo}
        showGallery={showGallery}
        features={features}
        gallery={gallery}
      />
    </div>
  );
};

export default IndexPreviewComponent;
