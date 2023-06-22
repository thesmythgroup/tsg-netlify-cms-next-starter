import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { i18nString } from '../lib/i18n';

interface AllPostsTitleProps {
  url: string;
  locale: string;
}

const AllPostsLink = ({
  url,
  locale,
  children,
}: PropsWithChildren<AllPostsTitleProps>) => {
  return (
    <>
      <Link href={url} locale={locale}>
        {i18nString(locale, 'allPostsLabel')}
      </Link>{' '}
      / <strong>{children}</strong>
    </>
  );
};
export default AllPostsLink;
