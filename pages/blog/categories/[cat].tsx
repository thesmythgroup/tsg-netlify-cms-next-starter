import { GetStaticPropsResult } from 'next';
import { BlogPost } from '../../../components/page/BlogPageComponent';
import { getBlogPostsByCategory } from '../../../lib/blog-posts';
import BlogPostComponent from '../../../components/BlogPostComponent';
import fs from 'fs';

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

export function getStaticProps({
  params,
}): GetStaticPropsResult<BlogCategoryPageProps> {
  const posts = getBlogPostsByCategory(params.cat);

  return {
    props: {
      posts,
    },
  };
}

export function getStaticPaths() {
  const files = fs.readdirSync('./content/categories');
  const paths = files.map((filename) => {
    return {
      params: {
        cat: filename.replace('.md', ''),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
