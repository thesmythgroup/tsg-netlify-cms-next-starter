import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React from 'react';
import WidgetShowcaseComponent from '../../components/page/WidgetShowcaseComponent';

/**
 * This preview component wraps a component, and connects the netlify CMS
 * backend data to the component props.
 * See: https://www.netlifycms.org/docs/customization/
 */
const IndexPreviewComponent: React.FC<PreviewTemplateComponentProps> = (
  props,
) => {
  const title = props.entry.getIn(['data', 'title']);
  // The code widget has properties 'code' and 'lang' which you
  // can use with a tool like Prism to render syntax highlighting.
  const code = props.entry.getIn(['data', 'code'])?.toJS();

  // The color widget can be hex or rgba.
  const color = props.entry.getIn(['data', 'color']);

  const appointmentTime = props.entry.getIn(['data', 'startTime']);

  // The map widget returns an object { type: string, coordinates: number[] }
  // but .toJS() doesn't work on it. So we need to JSON.parse() it.
  const location = props.entry.getIn(['data', 'location']);
  const locationObject = location ? JSON.parse(location) : undefined;

  // Ideally, we could use a combination of `widgetsFor` and `getIn` to
  // get the data for the "profile" object, but it doesn't seem to work.
  // There seems to be a bug in the API: https://github.com/netlify/netlify-cms/issues/3485
  // So, we'll use `toJS` to convert the ImmutableJS object to a regular
  // JavaScript object, and then we can access the data.
  const editorData = props.entry.getIn(['data'])?.toJS();
  const profile = editorData.profile;

  return (
    <WidgetShowcaseComponent
      title={title}
      code={code}
      color={color}
      appointmentTime={appointmentTime}
      location={locationObject}
      profile={profile}
    />
  );
};

export default IndexPreviewComponent;
