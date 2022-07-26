import { GetStaticPropsResult } from 'next';
import IndexComponent, {
  IndexComponentProps,
} from '../components/page/IndexComponent';
import CollectionService from '../lib/CollectionService';

const IndexPage: React.FC<IndexComponentProps> = ({
  title,
  intro,
  features,
  gallery,
}) => {
  return (
    <>
      <IndexComponent
        title={title}
        intro={intro}
        features={features}
        gallery={gallery}
      />
    </>
  );
};

export default IndexPage;

export function getStaticProps(): GetStaticPropsResult<IndexComponentProps> {
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
