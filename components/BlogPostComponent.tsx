import { BlogPost } from './page/BlogPageComponent';

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
        <h3 className={'text-xl py-1.5 font-bold'}>{title}</h3>
        <div className={'text-xs py-1'}>
          {tags?.map((tag, i) => {
            const tagSlug = tagSlugs?.[i];
            return (
              <span key={i} className={'mr-2 border rounded-lg px-2 py-0.5'}>
                {tagSlug ? (
                  <a href={`/blog/tags/${tagSlug}`}>#{tag}</a>
                ) : (
                  `#${tag}`
                )}
              </span>
            );
          })}
        </div>
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
