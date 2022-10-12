import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React from 'react';
import BlogPageComponent from '../../components/page/BlogPageComponent';

const BlogPreviewComponent: React.FC<PreviewTemplateComponentProps> = (
  props,
) => {
  const title = props.entry.getIn(['data', 'title']);
  const subtitle = props.entry.getIn(['data', 'subtitle']);
  const posts = props.entry.getIn(['data', 'posts'])?.toJS();

  return (
    <div className={'p-5'}>
      <BlogPageComponent title={title} subtitle={subtitle} posts={posts} />
    </div>
  );
};

export default BlogPreviewComponent;
