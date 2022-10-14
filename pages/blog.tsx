import { GetStaticPropsResult } from 'next';
import BlogPageComponent, {
  BlogPageComponentProps,
  BlogPost,
} from '../components/page/BlogPageComponent';
import CollectionService from '../lib/CollectionService';
import fs from 'fs';

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

  const fileNames = fs.readdirSync('./content/blog');
  const posts = fileNames.map((filename) => {
    const post = new CollectionService<BlogPost>(
      `./content/blog/${filename}`,
    ).getParsedFiles()[0];

    return {
      ...post,
      date: post.date.toString(),
      slug: filename.replace('.md', ''),
    };
  });

  return {
    props: {
      title: blogMetadata.title,
      subtitle: blogMetadata.subtitle,
      posts,
    },
  };
}
