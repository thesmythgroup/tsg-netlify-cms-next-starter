import { BlogPost } from './page/BlogPageComponent';

const BlogPageComponent: React.FC<BlogPost> = ({
  title,
  content,
  date,
  image,
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
          | (Category goes here)
        </div>
        <div className={'text-sm'}>(Tags go here)</div>
        <h3 className={'text-xl py-1.5 font-bold'}>{title}</h3>
        <div className={'line-clamp-5'}>{content}</div>
        <button
          className={
            'mt-4 border rounded-lg py-1.5 px-3.5 bg-black text-white text-sm'
          }
        >
          Read More
        </button>
      </div>
    </div>
  );
};
export default BlogPageComponent;
