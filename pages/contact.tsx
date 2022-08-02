import { GetStaticPropsContext, GetStaticPropsResult } from 'next';

import ContactPageComponent, {
  ContactPageComponentProps,
} from '../components/page/ContactPageComponent';
import CollectionService from '../lib/CollectionService';
export const AboutPage: React.FC<ContactPageComponentProps> = (props) => {
  return <ContactPageComponent intro={props.intro} />;
};

export default AboutPage;

export function getStaticProps({
  params,
}: GetStaticPropsContext): GetStaticPropsResult<ContactPageComponentProps> {
  const contactPageMarkdown = new CollectionService<ContactPageComponentProps>(
    './content/contact.md',
  );
  const contactPageFileParsed = contactPageMarkdown.getParsedFiles();
  const contactMetadata = contactPageFileParsed[0];
  return {
    props: {
      intro: contactMetadata.intro,
    },
  };
}
