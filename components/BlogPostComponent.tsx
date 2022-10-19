import { BlogPost } from './page/BlogPageComponent';

const BlogPostComponent: React.FC<BlogPost> = ({
  category,
  title,
  date,
  image,
  content,
  slug,
  categorySlug,
}) => {
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
            <a href={`/blog/categories/${categorySlug}`}>{category}</a>
          ) : (
            category
          )}
        </div>
        <div className={'text-sm'}>(Tags go here)</div>
        <h3 className={'text-xl py-1.5 font-bold'}>{title}</h3>
        <div className={'line-clamp-5 mb-4'}>{content}</div>
        <a
          href={`/blog/posts/${slug}`}
          className={'rounded-lg py-1.5 px-3.5 bg-black text-white text-sm'}
        >
          Read More
        </a>
      </div>
    </div>
  );
};
export default BlogPostComponent;
