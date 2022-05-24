import { Component } from 'react';
import Home, { HomeComponentProps } from '../components/pages/Home';
import CollectionService from '../lib/CollectionService';

export default class HomePage extends Component<HomeComponentProps> {
  render(): JSX.Element {
    const { title, intro, features } = this.props;
    return (
      <div>
        <Home title={title} intro={intro} features={features} />
      </div>
    );
  }
}

export function getStaticProps() {
  const markdownCollection = new CollectionService<HomeComponentProps>(
    './_content/home.md',
  );

  const resolvedFiles = markdownCollection.getParsedFiles();

  const metadataFromFile = resolvedFiles[0];

  return {
    props: {
      title: metadataFromFile.title,
      intro: metadataFromFile.intro,
      features: metadataFromFile.features,
    },
  };
}
