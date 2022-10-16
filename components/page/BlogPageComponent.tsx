import BlogPostComponent from '../BlogPostComponent';

export interface BlogPageComponentProps {
  title: string;
  subtitle: string;
  posts: BlogPost[];
  pagination: Pagination;
}

export interface BlogPost {
  image: string;
  title: string;
  content: string;
  date: string;
  slug?: string;
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
    <div className={'pb-20 flex md:text-center text-left flex-col'}>
      <h2 className={'text-5xl font-bold mb-6 pt-10 md:pt-0'}>{title}</h2>
      <div className={'mb-20'}>{subtitle}</div>
      <div className={'grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3'}>
        {posts.map((post, i) => {
          return (
            <BlogPostComponent
              key={i}
              title={post.title}
              image={post.image}
              date={post.date}
              content={post.content}
              slug={post.slug}
            />
          );
        })}
      </div>
      <div className={'flex justify-center mt-20'}>
        <a
          href={`/blog/${pagination.current - 1}`}
          className={`mr-4 ${pagination.current === 1 && 'invisible'}`}
        >
          {'<'}
        </a>
        {`${pagination.current} of ${pagination.total}`}
        <a
          href={`/blog/${pagination.current + 1}`}
          className={`ml-4 ${
            pagination.current === pagination.total && 'invisible'
          }`}
        >
          {'>'}
        </a>
      </div>
    </div>
  );
};
export default BlogPageComponent;
