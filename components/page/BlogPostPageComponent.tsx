import RelatedBlogPostsComponent from '../RelatedBlogPostsComponent';
import { BlogPost } from './BlogPageComponent';

export interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

const BlogPostPageComponent: React.FC<BlogPostPageProps> = ({
  post: { date, categorySlug, category, title, image, content },
  relatedPosts,
}) => {
  return (
    <>
      <div
        className={'grid grid-cols-1 gap-y-6 md:gap-x-4 md:grid-cols-6 pb-20'}
      >
        <div className={'col-span-4'}>
          <div className={'italic text-sm'}>
            {new Date(date).toLocaleDateString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            |
            {categorySlug ? (
              <a href={`/blog/categories/${categorySlug}`}>{category}</a>
            ) : (
              category
            )}
          </div>
          <h2 className={'text-4xl my-2'}>{title}</h2>
          <div className={'w-auto h-[25rem]'}>
            <img className={'object-cover w-full h-full rounded'} src={image} />
          </div>
          <div className={'p-2'}>{content}</div>
          <div className={'italic text-sm'}>(Tags go here)</div>
        </div>
        {relatedPosts.length > 0 && (
          <div className={'col-span-2 border rounded h-min'}>
            <RelatedBlogPostsComponent posts={relatedPosts} />
          </div>
        )}
      </div>
    </>
  );
};
export default BlogPostPageComponent;
