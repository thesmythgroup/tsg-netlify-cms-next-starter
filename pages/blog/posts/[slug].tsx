import BlogPostPageComponent, {
  BlogPostPageProps,
} from '../../../components/page/BlogPostPageComponent';
import { BlogPostResolver } from '../../../lib/BlogPostResolver';
import { resolveLocalizedPaths } from '../../../lib/resolve-localized-paths';

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  relatedPosts,
}) => {
  return <BlogPostPageComponent post={post} relatedPosts={relatedPosts} />;
};

export default BlogPostPage;

export async function getStaticProps({ params, locale }) {
  const blogPostResolver = await new BlogPostResolver(
    locale,
  ).fetchPostContent();

  const post = blogPostResolver.getBlogPostBySlug(params.slug);

  const relatedPosts = blogPostResolver.getRelatedBlogPosts(
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

export async function getStaticPaths() {
  const paths = await resolveLocalizedPaths('blog');

  return {
    paths,
    fallback: false,
  };
}
