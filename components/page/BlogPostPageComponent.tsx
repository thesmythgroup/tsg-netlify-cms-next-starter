import RelatedBlogPostsComponent from '../RelatedBlogPostsComponent';
import { BlogPost } from './BlogPageComponent';
import { useRouter } from 'next/router';
import Link from 'next/link';

export interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

const BlogPostPageComponent: React.FC<BlogPostPageProps> = ({
  post: { date, categorySlug, category, title, image, content, tags, tagSlugs },
  relatedPosts,
}) => {
  const router = useRouter();
  const locale = router?.locale;

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
            {categorySlug && locale ? (
              <Link href={`/blog/categories/${categorySlug}`} locale={locale}>
                {category}
              </Link>
            ) : (
              category
            )}
          </div>
          <h1 className={'text-4xl my-2'}>{title}</h1>
          <div className={'w-auto h-[25rem]'}>
            <img className={'object-cover w-full h-full rounded'} src={image} />
          </div>
          <div className={'p-2'}>{content}</div>
          <div className={'text-xs py-1'}>
            {tags?.map((tag, i) => {
              const tagSlug = tagSlugs?.[i];
              return (
                <span key={i} className={'mr-2 border rounded-lg px-2 py-0.5'}>
                  {tagSlug && locale ? (
                    <Link
                      passHref={true}
                      href={`/blog/tags/${tagSlug}`}
                      locale={locale}
                    >
                      <a>#{tag}</a>
                    </Link>
                  ) : (
                    `#${tag}`
                  )}
                </span>
              );
            })}
          </div>
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
