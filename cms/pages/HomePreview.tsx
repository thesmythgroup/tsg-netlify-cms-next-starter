import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React, { Component } from 'react';
import Home from '../../components/pages/Home';

/**
 * This preview component wraps the standard Home component, and connects the netlify CMS
 * backend data to the component props.
 * See: https://www.netlifycms.org/docs/customization/
 */
export default class HomePreview extends Component<PreviewTemplateComponentProps> {
  render(): JSX.Element {
    const title = this.props.entry.getIn(['data', 'title']);

    const intro = this.props.entry.getIn(['data', 'intro']);

    /**
     * Example of loading in a collection from the CMS data
     */
    const features = this.props.entry.getIn(['data', 'features']).toJS();

    const gallery = this.props.entry.getIn(['data', 'gallery']).toJS();

    return (
      // Send the props down into the component.
      <div className={'p-5'}>
        <Home
          title={title}
          intro={intro}
          features={features}
          gallery={gallery}
        />
      </div>
    );
  }
}
