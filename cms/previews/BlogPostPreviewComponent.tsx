import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React from 'react';
import BlogPostComponent from '../../components/BlogPostComponent';
import BlogPostPageComponent from '../../components/page/BlogPostPageComponent';

const BlogPostPreviewComponent: React.FC<PreviewTemplateComponentProps> = (
  props,
) => {
  const title = props.entry.getIn(['data', 'title']);
  const content = props.entry.getIn(['data', 'content']);
  const image = props.entry.getIn(['data', 'image']);
  const date = props.entry.getIn(['data', 'date']);
  const isPage = props.entry.getIn(['data', 'showPage']);

  return (
    <div className={'p-5'}>
      {isPage ? (
        <BlogPostPageComponent
          title={title}
          content={content}
          image={image}
          date={date}
        />
      ) : (
        <div className={'max-w-2xl m-auto'}>
          <BlogPostComponent
            title={title}
            content={content}
            image={image}
            date={date}
          />
        </div>
      )}
    </div>
  );
};

export default BlogPostPreviewComponent;
