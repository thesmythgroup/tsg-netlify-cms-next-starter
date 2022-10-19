import { BlogPost } from './page/BlogPageComponent';

const BlogPostTileComponent: React.FC<BlogPost> = ({
  title,
  date,
  image,
  slug,
}) => {
  return (
    <a className={'flex items-center'} href={`/blog/posts/${slug}`}>
      <div className={'h-12 min-w-[3rem] max-w-[3rem] mr-2'}>
        <img className={'object-cover rounded w-full h-full'} src={image} />
      </div>
      <div className={'flex flex-col overflow-hidden'}>
        <span className={'text-sm font-bold line-clamp-2'}>{title}</span>
        <div className={'italic text-xs'}>
          {new Date(date).toLocaleDateString('en-us', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </div>
    </a>
  );
};
export default BlogPostTileComponent;
