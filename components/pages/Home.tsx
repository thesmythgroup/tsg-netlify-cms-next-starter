import { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export interface HomeFeature {
  title: string;
  content: string;
}

export interface HomeComponentProps {
  title: string;
  intro: string;
  features: HomeFeature[];
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
      </div>
    );
  }
}
