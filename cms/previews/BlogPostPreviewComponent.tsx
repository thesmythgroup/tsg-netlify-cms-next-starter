import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React from 'react';
import BlogPostComponent from '../../components/BlogPostComponent';

const BlogPostPreviewComponent: React.FC<PreviewTemplateComponentProps> = (
  props,
) => {
  const title = props.entry.getIn(['data', 'title']);
  const content = props.entry.getIn(['data', 'content']);
  const image = props.entry.getIn(['data', 'image']);
  const date = props.entry.getIn(['data', 'date']);
  const isPage = props.entry.getIn(['data', 'showPage']);

  return (
    <div className={'max-w-2xl p-5 m-auto'}>
      {isPage ? (
        // TODO: Add page preview
        <div>hello page</div>
      ) : (
        <BlogPostComponent
          title={title}
          content={content}
          image={image}
          date={date}
        />
      )}
    </div>
  );
};

export default BlogPostPreviewComponent;
