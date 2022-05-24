import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React, { Component } from 'react';
import Home from '../../components/pages/home';

/**
 * This preview component wraps the standard Home component, and connects the netlify CMS
 * backend data to the component props.
 * See: https://www.netlifycms.org/docs/customization/
 */
export default class HomePreview extends Component<PreviewTemplateComponentProps> {
  render(): JSX.Element {
    const title = this.props.entry.getIn(['data', 'title']);

    const intro = this.props.entry.getIn(['data', 'intro']);

    return (
      // Send the props down into the component.
      <Home title={title} intro={intro} />
    );
  }
}
