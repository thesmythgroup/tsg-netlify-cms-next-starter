import { GetStaticPropsResult } from 'next';
import BlogPageComponent, {
  BlogPageComponentProps,
} from '../components/page/BlogPageComponent';
import CollectionService from '../lib/CollectionService';

export const BlogPage: React.FC<BlogPageComponentProps> = ({
  title,
  subtitle,
  posts,
}) => {
  return <BlogPageComponent title={title} subtitle={subtitle} posts={posts} />;
};

export default BlogPage;

export function getStaticProps(): GetStaticPropsResult<BlogPageComponentProps> {
  const blogContentMarkdown = new CollectionService<BlogPageComponentProps>(
    './content/blog.md',
  );
  const blogPageFileParsed = blogContentMarkdown.getParsedFiles();
  const blogMetadata = blogPageFileParsed[0];
  return {
    props: {
      title: blogMetadata.title,
      subtitle: blogMetadata.subtitle,
      posts: blogMetadata.posts,
    },
  };
}
