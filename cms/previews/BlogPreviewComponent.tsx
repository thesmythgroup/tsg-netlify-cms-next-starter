import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React from 'react';
import BlogPageComponent from '../../components/page/BlogPageComponent';

const BlogPreviewComponent: React.FC<PreviewTemplateComponentProps> = (
  props,
) => {
  const title = props.entry.getIn(['data', 'title']);
  const subtitle = props.entry.getIn(['data', 'subtitle']);

  return (
    <div className={'p-5'}>
      <BlogPageComponent
        title={title}
        subtitle={subtitle}
        posts={[]}
        pagination={{ current: 1, total: 1 }}
      />
    </div>
  );
};

export default BlogPreviewComponent;
