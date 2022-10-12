import { GetStaticPropsResult } from 'next';
import BlogPageComponent, {
  BlogPageComponentProps,
  BlogPost,
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
    './content/blogHeading.md',
  );
  const blogPageFileParsed = blogContentMarkdown.getParsedFiles();
  const blogMetadata = blogPageFileParsed[0];

  const posts = new CollectionService<BlogPost[]>('./content/blog/*.md')
    .getParsedFiles()
    .flat();

  return {
    props: {
      title: blogMetadata.title,
      subtitle: blogMetadata.subtitle,
      posts,
    },
  };
}
