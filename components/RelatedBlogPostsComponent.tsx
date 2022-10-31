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
            <div className={'mb-4'} key={i}>
              <BlogPostTileComponent post={post} />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default RelatedBlogPostsComponent;
