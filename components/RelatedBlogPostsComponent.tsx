import BlogPostTileComponent from './BlogPostTileComponent';
import { BlogPost } from './page/BlogPageComponent';

interface RelatedBlogPostsComponentProps {
  posts: BlogPost[];
}

const RelatedBlogPostsComponent: React.FC<RelatedBlogPostsComponentProps> = ({
  posts,
}) => {
  return (
    <>
      <h3 className={'text-center my-4 font-bold underline text-lg'}>
        Related Posts
      </h3>
      <div className={'p-6'}>
        {posts?.map((post, i) => {
          return (
            <BlogPostTileComponent
              key={i}
              title={post.title}
              date={post.date}
              category={post.category}
              image={post.image}
              content={post.content}
              slug={post.slug}
            />
          );
        })}
      </div>
    </>
  );
};
export default RelatedBlogPostsComponent;
