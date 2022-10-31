import BlogPostPageComponent, {
  BlogPostPageProps,
} from '../../../components/page/BlogPostPageComponent';
import fs from 'fs';
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from '../../../lib/blog-posts';

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  relatedPosts,
}) => {
  return <BlogPostPageComponent post={post} relatedPosts={relatedPosts} />;
};

export default BlogPostPage;

export function getStaticProps({ params }) {
  const post = getBlogPostBySlug(params.slug);

  const relatedPosts = getRelatedBlogPosts(
    post.category,
    params.slug,
    post.tags,
  );

  return {
    props: {
      post: {
        ...post,
        date: post.date.toString(),
        slug: params.slug,
      },
      relatedPosts,
    },
  };
}

export function getStaticPaths() {
  const files = fs.readdirSync('./content/blog');
  const paths = files.map((filename) => {
    return {
      params: {
        slug: filename.replace('.md', ''),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
