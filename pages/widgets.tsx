import { GetStaticPropsResult } from 'next';
import WidgetShowcaseComponent, {
  WidgetShowcaseComponentProps,
} from '../components/page/WidgetShowcaseComponent';
import CollectionService from '../lib/CollectionService';
import { LocalizedMarkdownContentInterface } from '../interfaces/LocalizedMarkdownContent.interface';
export const WidgetShowcasePage: React.FC<WidgetShowcaseComponentProps> = (
  props,
) => {
  const { title, color, profile, appointmentTime, location, code } = props;

  return (
    <WidgetShowcaseComponent
      title={title}
      code={code}
      color={color}
      appointmentTime={appointmentTime}
      location={location}
      profile={profile}
    />
  );
};

export default WidgetShowcasePage;

export function getStaticProps({
  locale,
}): GetStaticPropsResult<WidgetShowcaseComponentProps> {
  const markdownCollection = new CollectionService<
    LocalizedMarkdownContentInterface<WidgetShowcaseComponentProps>
  >('./content/widgetShowcase.md');

  const resolvedFiles = markdownCollection.getParsedFiles();

  const metadataFromFile = resolvedFiles[0][locale];

  return {
    props: {
      code: metadataFromFile.code,
      color: metadataFromFile.color,
      appointmentTime: metadataFromFile.appointmentTime ?? null,
      location: metadataFromFile.location,
      profile: metadataFromFile.profile,
      title: metadataFromFile.title,
    },
  };
}
