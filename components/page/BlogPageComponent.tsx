import BlogPostComponent from '../BlogPostComponent';
import Link from 'next/link';

export interface BlogPageComponentProps {
  title: string;
  subtitle: string;
  posts: BlogPost[];
  pagination: Pagination;
}

export interface BlogPost {
  category: string;
  title: string | null;
  tags: string[];
  date: string;
  image: string;
  content: string;
  slug: string;
  categorySlug: string;
  tagSlugs: string[];
}

export interface Pagination {
  current: number;
  total: number;
}

const BlogPageComponent: React.FC<BlogPageComponentProps> = ({
  title,
  subtitle,
  posts = [],
  pagination,
}) => {
  return (
    <div className={'flex md:text-center text-left flex-col'}>
      <h2 className={'text-5xl font-bold mb-6 pt-10 md:pt-0'}>{title}</h2>
      <div className={'mb-20'}>{subtitle}</div>
      <div className={'grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3'}>
        {posts.map((post, i) => {
          return <BlogPostComponent key={i} post={post} />;
        })}
      </div>
      <div className={'flex justify-center mt-20'}>
        <Link
          href={`${pagination.current - 1}`}
          className={`mr-4 ${pagination.current === 1 && 'invisible'}`}
        >
          &larr;
        </Link>
        {`${pagination.current} of ${pagination.total}`}
        <Link
          href={`${pagination.current + 1}`}
          className={`mr-4 ${pagination.current === 1 && 'invisible'}`}
        >
          &rarr;
        </Link>
      </div>
    </div>
  );
};
export default BlogPageComponent;
