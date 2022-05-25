import { Component } from 'react';
import IndexComponent, {
  IndexComponentProps,
} from '../components/page/IndexComponent';
import CollectionService from '../lib/CollectionService';

export default class IndexPageView extends Component<IndexComponentProps> {
  render(): JSX.Element {
    const { title, intro, features, gallery } = this.props;
    return (
      <div>
        <IndexComponent
          title={title}
          intro={intro}
          features={features}
          gallery={gallery}
        />
      </div>
    );
  }
}

export function getStaticProps() {
  const markdownCollection = new CollectionService<IndexComponentProps>(
    './content/home.md',
  );

  const resolvedFiles = markdownCollection.getParsedFiles();

  const metadataFromFile = resolvedFiles[0];

  return {
    props: {
      title: metadataFromFile.title,
      intro: metadataFromFile.intro,
      features: metadataFromFile.features,
      gallery: metadataFromFile.gallery,
    },
  };
}
