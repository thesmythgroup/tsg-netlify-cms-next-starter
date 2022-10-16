import { GetStaticPropsResult } from 'next';
import BlogPageComponent, {
  BlogPageComponentProps,
} from '../../components/page/BlogPageComponent';
import CollectionService from '../../lib/CollectionService';
import { countBlogPosts, getPaginatedBlogPosts } from '../../lib/blog-posts';
import { BLOG_POSTS_PER_PAGE } from '../../lib/constants';

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

export function getStaticProps({
  params,
}): GetStaticPropsResult<BlogPageComponentProps> {
  const blogContentMarkdown = new CollectionService<BlogPageComponentProps>(
    './content/blogHeading.md',
  );
  const blogPageFileParsed = blogContentMarkdown.getParsedFiles();
  const blogMetadata = blogPageFileParsed[0];

  const currentPage = +params.page || 1;
  const posts = getPaginatedBlogPosts(currentPage);
  const pagination = {
    current: currentPage,
    total: Math.ceil(countBlogPosts() / BLOG_POSTS_PER_PAGE),
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

export function getStaticPaths() {
  const pages = Math.ceil(countBlogPosts() / BLOG_POSTS_PER_PAGE);
  const paths = [...Array(pages)].map((_, index) => ({
    params: { page: (index + 1).toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
