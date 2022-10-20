import { GetStaticPropsResult } from 'next';
import { BlogPost } from '../../../components/page/BlogPageComponent';
import { getBlogPostsByTag } from '../../../lib/blog-posts';
import BlogPostComponent from '../../../components/BlogPostComponent';
import fs from 'fs';
import CollectionService from '../../../lib/CollectionService';

interface BlogTagPageProps {
  posts: BlogPost[];
  tag: string;
}

export const TagBlogPage: React.FC<BlogTagPageProps> = ({ posts, tag }) => {
  return (
    <>
      <h1 className={'text-3xl mb-8'}>
        <a href='/blog/1'>All Posts</a> / <strong>#{tag}</strong>
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

export function getStaticProps({
  params,
}): GetStaticPropsResult<BlogTagPageProps> {
  const posts = getBlogPostsByTag(params.tag);
  const tagName = new CollectionService<{ name: string; slug: string }>(
    `./content/tags/${params.tag}.md`,
  ).getParsedFiles()[0].name;

  return {
    props: {
      posts,
      tag: tagName,
    },
  };
}

export function getStaticPaths() {
  const files = fs.readdirSync('./content/tags');
  const paths = files.map((filename) => {
    return {
      params: {
        tag: filename.replace('.md', ''),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
