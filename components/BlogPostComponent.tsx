import { BlogPost } from './page/BlogPageComponent';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { i18nString } from '../lib/i18n';

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
  const locale = router?.locale;

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
          {categorySlug && locale ? (
            <Link href={`/blog/categories/${categorySlug}`} locale={locale}>
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
                  <Link href={`/blog/tags/${tagSlug}`}>{`#${tag}`}</Link>
                ) : (
                  `#${tag}`
                )}
              </span>
            );
          })}
        </div>
        <div className={'line-clamp-5 mb-4'}>{content}</div>
        {slug && locale ? (
          <Link
            href={`/blog/posts/${slug}`}
            className={'rounded-lg py-1.5 px-3.5 bg-black text-white text-sm'}
          >
            {i18nString(locale, 'readMoreLabel')}
          </Link>
        ) : null}
      </div>
    </div>
  );
};
export default BlogPostComponent;
