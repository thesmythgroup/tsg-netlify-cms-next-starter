import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React from 'react';
import BlogPostComponent from '../../components/BlogPostComponent';
import BlogPostPageComponent from '../../components/page/BlogPostPageComponent';

const BlogPostPreviewComponent: React.FC<PreviewTemplateComponentProps> = (
  props,
) => {
  const category = props.entry.getIn(['data', 'category']);
  const title = props.entry.getIn(['data', 'title']);
  const date = props.entry.getIn(['data', 'date']);
  const image = props.entry.getIn(['data', 'image']);
  const content = props.entry.getIn(['data', 'content']);
  const isPage = props.entry.getIn(['data', 'showPage']);

  return (
    <div className={'p-5'}>
      {isPage ? (
        <BlogPostPageComponent
          post={{
            category,
            title,
            date,
            image,
            content,
          }}
          relatedPosts={[]}
        />
      ) : (
        <div className={'max-w-2xl m-auto'}>
          <BlogPostComponent
            category={category}
            title={title}
            date={date}
            image={image}
            content={content}
          />
        </div>
      )}
    </div>
  );
};

export default BlogPostPreviewComponent;
