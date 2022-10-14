import BlogPostComponent from '../BlogPostComponent';

export interface BlogPageComponentProps {
  title: string;
  subtitle: string;
  posts: BlogPost[];
}

export interface BlogPost {
  image: string;
  title: string;
  content: string;
  date: string;
  slug?: string;
}

const BlogPageComponent: React.FC<BlogPageComponentProps> = ({
  title,
  subtitle,
  posts = [],
}) => {
  // Get newest posts first
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className={'pb-20 flex md:text-center text-left flex-col'}>
      <h2 className={'text-5xl font-bold mb-6 pt-10 md:pt-0'}>{title}</h2>
      <div className={'mb-20'}>{subtitle}</div>
      <div className={'grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3'}>
        {sortedPosts.map((post, i) => {
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
    </div>
  );
};
export default BlogPageComponent;
