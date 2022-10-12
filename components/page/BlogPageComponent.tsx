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
            <div key={i} className={'text-left border'}>
              <div className={'h-72 w-auto'}>
                <img
                  className={'object-cover w-full h-full'}
                  src={post.image}
                />
              </div>
              <div className={'p-2'}>
                <div className={'italic text-sm'}>
                  {new Date(post.date).toLocaleDateString('en-us', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  | (Category goes here)
                </div>
                <div className={'text-sm'}>(Tags go here)</div>
                <h3 className={'text-xl py-1.5 font-bold'}>{post.title}</h3>
                <div className={'line-clamp-5'}>{post.content}</div>
                <button
                  className={
                    'mt-4 border rounded-lg py-1.5 px-3.5 bg-black text-white text-sm'
                  }
                >
                  Read More
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BlogPageComponent;
