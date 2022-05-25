import { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export interface HomeFeature {
  title: string;
  content: string;
}

export interface HomeGalleryImage {
  image: string;
}

export interface HomeComponentProps {
  title: string;
  intro: string;
  features: HomeFeature[];
  gallery: HomeGalleryImage[];
}

export default class Home extends Component<HomeComponentProps> {
  render(): JSX.Element {
    return (
      <div>
        <h1 className={'text-2xl mb-8'}>{this.props.title}</h1>
        <div className={'mb-8'}>{this.props.intro}</div>
        <div className={'md:grid grid-cols-3 mb-8 gap-4'}>
          {this.props.features.map((feature, i) => {
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
          <h2 className={'text-2xl mb-8'}>Arrange Content To Your Liking</h2>
          <p className={'mb-8'}>
            Provide rich experiences and accurate information.
          </p>
        </div>
        <div className={'grid grid-cols-3'}>
          {this.props.gallery.map((item, i) => {
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
      </div>
    );
  }
}
