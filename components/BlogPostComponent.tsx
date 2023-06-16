import { BlogPost } from './page/BlogPageComponent';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface BlogPostComponentProps {
  post: BlogPost;
}

const BlogPostComponent: React.FC<BlogPostComponentProps> = ({
  post: {
    date,
    categorySlug,
    category,
    title,
    image,
    content,
    slug,
    tags,
    tagSlugs,
  },
}) => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  return (
    <div className={'text-left border'}>
      <div className={'h-72 w-auto'}>
        <img className={'object-cover w-full h-full'} src={image} />
      </div>
      <div className={'p-2'}>
        <div className={'italic text-sm'}>
          {new Date(date).toLocaleDateString('en-us', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
          |
          {categorySlug ? (
            <Link
              href={`${locale ? locale : ''}/blog/categories/${categorySlug}`}
            >
              {category}
            </Link>
          ) : (
            category
          )}
        </div>
        <h3 className={'text-xl py-1.5 font-bold'}>{title}</h3>
        <div className={'text-xs py-1'}>
          {tags?.map((tag, i) => {
            const tagSlug = tagSlugs?.[i];
            return (
              <span key={i} className={'mr-2 border rounded-lg px-2 py-0.5'}>
                {tagSlug ? (
                  <Link href={`tags/${tagSlug}`}>{`#${tag}`}</Link>
                ) : (
                  `#${tag}`
                )}
              </span>
            );
          })}
        </div>
        <div className={'line-clamp-5 mb-4'}>{content}</div>
        <Link
          href={`posts/${slug}`}
          className={'rounded-lg py-1.5 px-3.5 bg-black text-white text-sm'}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
export default BlogPostComponent;
