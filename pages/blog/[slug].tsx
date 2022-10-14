import { BlogPost } from '../../components/page/BlogPageComponent';
import BlogPostPageComponent from '../../components/page/BlogPostPageComponent';
import CollectionService from '../../lib/CollectionService';
import fs from 'fs';

export const BlogPostPage: React.FC<BlogPost> = ({
  title,
  content,
  date,
  image,
}) => {
  return (
    <BlogPostPageComponent
      title={title}
      content={content}
      date={date}
      image={image}
    />
  );
};

export default BlogPostPage;

export function getStaticProps({ params }) {
  const { title, content, date, image } = new CollectionService<BlogPost>(
    `./content/blog/${params.slug}.md`,
  ).getParsedFiles()[0];

  return {
    props: {
      title,
      content,
      date: date.toString(),
      image,
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
