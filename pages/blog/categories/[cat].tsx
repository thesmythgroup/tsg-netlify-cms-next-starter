import { GetStaticPropsResult } from 'next';
import { BlogPost } from '../../../components/page/BlogPageComponent';
import BlogPostComponent from '../../../components/BlogPostComponent';
import { BlogPostResolver } from '../../../lib/BlogPostResolver';
import { resolveLocalizedPaths } from '../../../lib/resolve-localized-paths';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { i18nString } from '../../../lib/i18n';
import AllPostsLink from '../../../components/AllPostsLink';

interface BlogCategoryPageProps {
  posts: BlogPost[];
}

export const CategoryBlogPage: React.FC<BlogCategoryPageProps> = ({
  posts,
}) => {
  const router = useRouter();
  const locale = router?.locale;

  return (
    <>
      <h1 className={'text-3xl mb-8'}>
        <AllPostsLink url={'/blog/1'} locale={locale}>
          {posts[0]?.category}
        </AllPostsLink>
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

  console.log('paths', paths);

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
