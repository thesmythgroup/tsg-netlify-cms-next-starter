import { BlogPost } from './page/BlogPageComponent';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { i18nString } from '../lib/i18n';
import { FC } from 'react';

interface BlogPostComponentProps {
  post: BlogPost;
}

const BlogPostComponent: FC<BlogPostComponentProps> = ({
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
      <div className={'p-8'}>
        <div className={'italic text-sm pb-1'}>
          <span className={'mr-2'}>
            {new Date(date).toLocaleDateString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          |
          {categorySlug && locale ? (
            <Link href={`/blog/categories/${categorySlug}`} locale={locale}>
              <a className={'ml-2 underline'}>{category}</a>
            </Link>
          ) : (
            category
          )}
        </div>
        <h3 className={'text-xl pb-4 font-bold'}>{title}</h3>
        <div className={'text-xs py-2 mb-2'}>
          {tags?.map((tag, i) => {
            const tagSlug = tagSlugs?.[i];
            return (
              <span
                key={i}
                className={
                  'mr-2 rounded-lg px-4 py-1 bg-slate-100 hover:bg-orange-400 hover:text-white'
                }
              >
                {tagSlug ? (
                  <Link href={`/blog/tags/${tagSlug}`}>{`#${tag}`}</Link>
                ) : (
                  `#${tag}`
                )}
              </span>
            );
          })}
        </div>
        <div className={'line-clamp-5 mb-6'}>{content}</div>
        {slug && locale ? (
          <Link href={`/blog/posts/${slug}`}>
            <a
              className={
                'inline-block rounded-lg py-2 px-5 bg-black text-white text-sm border border-1 border-transparent hover:bg-white hover:text-gray-800 hover:border-1 hover:border-gray-800'
              }
            >
              {i18nString(locale, 'readMoreLabel')} &rarr;
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  );
};
export default BlogPostComponent;
