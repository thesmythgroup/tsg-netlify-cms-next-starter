import { GetStaticPropsResult } from 'next';
import BlogPageComponent, {
  BlogPageComponentProps,
} from '../../components/page/BlogPageComponent';
import CollectionService from '../../lib/CollectionService';
import { BLOG_POSTS_PER_PAGE } from '../../lib/constants';
import { BlogPostResolver } from '../../lib/BlogPostResolver';

export const BlogPage: React.FC<BlogPageComponentProps> = ({
  title,
  subtitle,
  posts,
  pagination,
}) => {
  return (
    <BlogPageComponent
      title={title}
      subtitle={subtitle}
      posts={posts}
      pagination={pagination}
    />
  );
};

export default BlogPage;

export async function getStaticProps({
  locale,
  params,
}): Promise<GetStaticPropsResult<BlogPageComponentProps>> {
  console.log('blog', params, locale);
  const blogPostResolver = await new BlogPostResolver(
    locale,
  ).fetchPostContent();

  const blogContentMarkdown = new CollectionService<BlogPageComponentProps>(
    `./content/${locale}/blogHeading.md`,
  );
  const blogPageFileParsed = blogContentMarkdown.getParsedFiles();
  const blogMetadata = blogPageFileParsed[0];

  const currentPage = +params.page || 1;
  const posts = blogPostResolver.getPaginatedBlogPosts(currentPage);
  const pagination = {
    current: currentPage,
    total: Math.ceil(blogPostResolver.countBlogPosts() / BLOG_POSTS_PER_PAGE),
  };

  return {
    props: {
      title: blogMetadata.title,
      subtitle: blogMetadata.subtitle,
      posts,
      pagination,
    },
  };
}

export async function getStaticPaths({ locale }) {
  const blogPostResolver = await new BlogPostResolver(
    locale,
  ).fetchPostContent();

  const pages = Math.ceil(
    blogPostResolver.countBlogPosts() / BLOG_POSTS_PER_PAGE,
  );
  const paths = [...Array(pages)].map((_, index) => ({
    params: { page: (index + 1).toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
