import ReactMarkdown from 'react-markdown';
import { Component as EmbeddedVideoComponent } from '../../cms/widgets/EmbeddedVideo';

export interface IndexFeature {
  title: string;
  content: string;
}

export interface IndexGalleryImage {
  image: string;
}

export interface IndexComponentProps {
  title: string;
  intro: string;
  secondaryHeading: string;
  secondaryContent: string;
  features: IndexFeature[];
  embeddedVideo: string;
  showGallery: boolean;
  gallery?: IndexGalleryImage[];
}

const IndexPageComponent: React.FC<IndexComponentProps> = ({
  title,
  intro,
  secondaryHeading,
  secondaryContent,
  features,
  embeddedVideo,
  showGallery,
  gallery,
}) => {
  return (
    <div>
      <h1 className={'text-2xl mb-8'}>{title}</h1>
      <div className={'mb-8'}>{intro}</div>
      <div className={'md:grid grid-cols-3 mb-8 gap-4'}>
        {features.map((feature, i) => {
          return (
            <div key={i}>
              <h2 className={'text-xl mb-4'}>{feature.title}</h2>
              <div>
                <ReactMarkdown children={feature.content} />
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h2 className={'text-2xl mb-8'}>{secondaryHeading}</h2>
        <div className={'mb-8'}>
          <ReactMarkdown children={secondaryContent} />
        </div>
      </div>

      {embeddedVideo ? (
        <div className='mb-5'>
          <EmbeddedVideoComponent url={embeddedVideo} />
        </div>
      ) : null}

      {showGallery && gallery ? (
        <div className={'grid grid-cols-3'}>
          {gallery.map((item, i) => {
            return (
              <div key={i} className={'relative overflow-hidden'}>
                <img
                  className={'scale-150 h-full w-fit'}
                  src={item.image}
                  alt={'In production this should have real alt text'}
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default IndexPageComponent;
