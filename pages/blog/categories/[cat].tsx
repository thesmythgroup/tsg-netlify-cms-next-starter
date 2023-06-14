import { GetStaticPropsResult } from 'next';
import { BlogPost } from '../../../components/page/BlogPageComponent';
import BlogPostComponent from '../../../components/BlogPostComponent';
import { BlogPostResolver } from '../../../lib/BlogPostResolver';
import { resolveLocalizedPaths } from '../../../lib/resolve-localized-paths';

interface BlogCategoryPageProps {
  posts: BlogPost[];
}

export const CategoryBlogPage: React.FC<BlogCategoryPageProps> = ({
  posts,
}) => {
  return (
    <>
      <h1 className={'text-3xl mb-8'}>
        <a href='/blog/1'>All Posts</a> / <strong>{posts[0]?.category}</strong>
      </h1>
      <div className={'grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3'}>
        {posts.map((post, i) => {
          return <BlogPostComponent key={i} post={post}></BlogPostComponent>;
        })}
      </div>
    </>
  );
};

export default CategoryBlogPage;

export async function getStaticProps({
  locale,
  params,
}): Promise<GetStaticPropsResult<BlogCategoryPageProps>> {
  const blogPostResolver = await new BlogPostResolver(
    locale,
  ).fetchPostContent();

  const posts = blogPostResolver.getBlogPostsByCategory(params.cat);

  return {
    props: {
      posts,
    },
  };
}

export async function getStaticPaths() {
  const paths = await resolveLocalizedPaths('categories');

  return {
    paths: paths.map((path) => {
      return {
        params: {
          cat: path.params.slug,
        },
        locale: path.locale,
      };
    }),
    fallback: false,
  };
}
