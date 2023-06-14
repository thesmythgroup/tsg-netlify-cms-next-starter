import { GetStaticPropsResult } from 'next';
import ContactPageComponent, {
  ContactPageComponentProps,
} from '../components/page/ContactPageComponent';
import CollectionService from '../lib/CollectionService';
import { LocalizedMarkdownContentInterface } from '../interfaces/LocalizedMarkdownContent.interface';

export const AboutPage: React.FC<ContactPageComponentProps> = (props) => {
  return <ContactPageComponent intro={props.intro} />;
};

export default AboutPage;

export function getStaticProps({
  locale,
}): GetStaticPropsResult<ContactPageComponentProps> {
  const contactPageMarkdown = new CollectionService<
    LocalizedMarkdownContentInterface<ContactPageComponentProps>
  >('./content/contact.md');
  const contactPageFileParsed = contactPageMarkdown.getParsedFiles();
  const contactMetadata = contactPageFileParsed[0][locale];
  return {
    props: {
      intro: contactMetadata.intro,
    },
  };
}
