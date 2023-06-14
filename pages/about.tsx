import { GetStaticPropsResult } from 'next';
import AboutPageComponent, {
  AboutPageComponentProps,
} from '../components/page/AboutPageComponent';
import CollectionService from '../lib/CollectionService';
import { LocalizedMarkdownContentInterface } from '../interfaces/LocalizedMarkdownContent.interface';

export const AboutPage: React.FC<AboutPageComponentProps> = (props) => {
  return <AboutPageComponent content={props.content} />;
};

export default AboutPage;

export function getStaticProps({
  locale,
}): GetStaticPropsResult<AboutPageComponentProps> {
  const aboutContentMarkdown = new CollectionService<
    LocalizedMarkdownContentInterface<AboutPageComponentProps>
  >('./content/about.md');
  const aboutPageFileParsed = aboutContentMarkdown.getParsedFiles();
  const aboutMetadata = aboutPageFileParsed[0][locale];
  return {
    props: {
      content: aboutMetadata.content,
    },
  };
}
