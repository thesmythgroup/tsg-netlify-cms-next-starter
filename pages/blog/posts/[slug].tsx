import BlogPostPageComponent, {
  BlogPostPageProps,
} from '../../../components/page/BlogPostPageComponent';
import fs from 'fs';
import {
  getBlogPostBySlug,
  getRelatedBlogPostsByCategory,
} from '../../../lib/blog-posts';

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  relatedPosts,
}) => {
  return <BlogPostPageComponent post={post} relatedPosts={relatedPosts} />;
};

export default BlogPostPage;

export function getStaticProps({ params }) {
  const { category, title, content, date, image, categorySlug } =
    getBlogPostBySlug(params.slug);

  const relatedPosts = getRelatedBlogPostsByCategory(category, params.slug);

  return {
    props: {
      post: {
        category,
        title,
        content,
        date: date.toString(),
        image,
        slug: params.slug,
        categorySlug,
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
