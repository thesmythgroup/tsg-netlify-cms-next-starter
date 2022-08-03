import { GetStaticPropsResult } from 'next';
import AboutPageComponent, {
  AboutPageComponentProps,
} from '../components/page/AboutPageComponent';
import CollectionService from '../lib/CollectionService';
export const AboutPage: React.FC<AboutPageComponentProps> = (props) => {
  return <AboutPageComponent content={props.content} />;
};

export default AboutPage;

export function getStaticProps(): GetStaticPropsResult<AboutPageComponentProps> {
  const aboutContentMarkdown = new CollectionService<AboutPageComponentProps>(
    './content/about.md',
  );
  const aboutPageFileParsed = aboutContentMarkdown.getParsedFiles();
  const aboutMetadata = aboutPageFileParsed[0];
  return {
    props: {
      content: aboutMetadata.content,
    },
  };
}
