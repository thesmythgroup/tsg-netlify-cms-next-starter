import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import React from 'react';
import BlogPostComponent from '../../components/BlogPostComponent';
import { BlogPost } from '../../components/page/BlogPageComponent';
import BlogPostPageComponent from '../../components/page/BlogPostPageComponent';

const BlogPostPreviewComponent: React.FC<PreviewTemplateComponentProps> = (
  props,
) => {
  const post: BlogPost = {
    category: props.entry.getIn(['data', 'category']),
    title: props.entry.getIn(['data', 'title']),
    tags: props.entry.getIn(['data', 'tags']),
    date: props.entry.getIn(['data', 'date']),
    image: props.entry.getIn(['data', 'image']),
    content: props.entry.getIn(['data', 'content']),
    slug: props.entry.getIn(['data', 'slug']),
    categorySlug: props.entry.getIn(['data', 'categorySlug']),
    tagSlugs: props.entry.getIn(['data', 'tagSlugs']),
  };
  const isPage = props.entry.getIn(['data', 'showPage']);

  return (
    <div className={'p-5'}>
      {isPage ? (
        <BlogPostPageComponent post={post} relatedPosts={[]} />
      ) : (
        <div className={'max-w-2xl m-auto'}>
          <BlogPostComponent post={post} />
        </div>
      )}
    </div>
  );
};

export default BlogPostPreviewComponent;
