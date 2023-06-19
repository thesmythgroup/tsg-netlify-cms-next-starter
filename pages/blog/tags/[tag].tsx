import { GetStaticPropsResult } from 'next';
import { BlogPost } from '../../../components/page/BlogPageComponent';
import BlogPostComponent from '../../../components/BlogPostComponent';
import CollectionService from '../../../lib/CollectionService';
import { BlogPostResolver } from '../../../lib/BlogPostResolver';
import { resolveLocalizedPaths } from '../../../lib/resolve-localized-paths';
import { LocalizedMarkdownContentInterface } from '../../../interfaces/LocalizedMarkdownContent.interface';
import AllPostsLink from '../../../components/AllPostsLink';
import { useRouter } from 'next/router';

interface BlogTagPageProps {
  posts: BlogPost[];
  tag: string;
}

export const TagBlogPage: React.FC<BlogTagPageProps> = ({ posts, tag }) => {
  const router = useRouter();
  const locale = router?.locale;

  return (
    <>
      <h1 className={'text-3xl mb-8'}>
        <AllPostsLink url={'/blog/1'} locale={locale}>
          #{tag}
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

export default TagBlogPage;

export async function getStaticProps({
  locale,
  params,
}): Promise<GetStaticPropsResult<BlogTagPageProps>> {
  const blogPostResolver = await new BlogPostResolver(
    locale,
  ).fetchPostContent();

  const posts = blogPostResolver.getBlogPostsByTag(params.tag);
  const tagName = new CollectionService<
    LocalizedMarkdownContentInterface<{ name: string; slug: string }>
  >(`./content/tags/${params.tag}.md`).getParsedFiles()[0][locale].name;

  return {
    props: {
      posts,
      tag: tagName,
    },
  };
}

export async function getStaticPaths() {
  const paths = await resolveLocalizedPaths('tags');

  return {
    paths: paths.map((path) => {
      return {
        params: { tag: path.params.slug },
        locale: path.locale,
      };
    }),
    fallback: false,
  };
}
