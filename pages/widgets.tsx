import { GetStaticPropsResult } from 'next';
import WidgetShowcaseComponent, {
  WidgetShowcaseComponentProps,
} from '../components/page/WidgetShowcaseComponent';
import CollectionService from '../lib/CollectionService';
export const WidgetShowcasePage: React.FC<WidgetShowcaseComponentProps> = (
  props,
) => {
  const { color, profile, appointmentTime, location, code } = props;

  return (
    <WidgetShowcaseComponent
      code={code}
      color={color}
      appointmentTime={appointmentTime}
      location={location}
      profile={profile}
    />
  );
};

export default WidgetShowcasePage;

export function getStaticProps(): GetStaticPropsResult<WidgetShowcaseComponentProps> {
  const markdownCollection =
    new CollectionService<WidgetShowcaseComponentProps>(
      './content/widgetShowcase.md',
    );

  const resolvedFiles = markdownCollection.getParsedFiles();

  const metadataFromFile = resolvedFiles[0];

  return {
    props: {
      code: metadataFromFile.code,
      color: metadataFromFile.color,
      appointmentTime: metadataFromFile.appointmentTime ?? null,
      location: metadataFromFile.location,
      profile: metadataFromFile.profile,
    },
  };
}
