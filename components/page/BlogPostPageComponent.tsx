import { BlogPost } from './BlogPageComponent';

const BlogPostPageComponent: React.FC<BlogPost> = ({
  title,
  content,
  date,
  image,
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
            | (Category goes here)
          </div>
          <h2 className={'text-4xl my-2'}>{title}</h2>
          <div className={'w-auto h-[25rem]'}>
            <img className={'object-cover w-full h-full rounded'} src={image} />
          </div>
          <div className={'p-2'}>{content}</div>
          <div className={'italic text-sm'}>(Tags go here)</div>
        </div>
        <div className={'col-span-2 border rounded h-min'}>
          <h3 className={'text-center my-4 font-bold underline text-lg'}>
            Related Posts
          </h3>
          <div className={'py-6'}></div>
        </div>
      </div>
    </>
  );
};
export default BlogPostPageComponent;
