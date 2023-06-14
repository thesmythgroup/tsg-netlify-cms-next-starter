import { GetStaticPropsResult } from 'next';
import IndexComponent, {
  IndexComponentProps,
} from '../components/page/IndexComponent';
import CollectionService from '../lib/CollectionService';
import { LocalizedMarkdownContentInterface } from '../interfaces/LocalizedMarkdownContent.interface';

const IndexPage: React.FC<IndexComponentProps> = ({
  title,
  intro,
  features,
  embeddedVideo,
  showGallery,
  gallery,
}) => {
  return (
    <>
      <IndexComponent
        title={title}
        intro={intro}
        showGallery={showGallery}
        embeddedVideo={embeddedVideo}
        features={features}
        gallery={gallery}
      />
    </>
  );
};

export default IndexPage;

export function getStaticProps({
  locale,
}): GetStaticPropsResult<IndexComponentProps> {
  const markdownCollection = new CollectionService<
    LocalizedMarkdownContentInterface<IndexComponentProps>
  >('./content/home.md');

  const resolvedFiles = markdownCollection.getParsedFiles();

  const metadataFromFile = resolvedFiles[0][locale];

  return {
    props: {
      title: metadataFromFile.title,
      intro: metadataFromFile.intro,
      features: metadataFromFile.features,
      embeddedVideo: metadataFromFile.embeddedVideo,
      showGallery: metadataFromFile.showGallery,
      gallery: metadataFromFile.gallery ?? [],
    },
  };
}
