import { readdir } from 'fs/promises';
import { LOCALES } from './locale-settings';

export async function resolveLocalizedPaths(pathSuffix: string): Promise<
  {
    params: { slug: string };
    locale: string;
  }[]
> {
  return (
    await Promise.all(
      LOCALES.map(async (locale) => {
        return {
          locale: locale,
          paths: await readdir(`./content/${pathSuffix}/`),
        };
      }),
    )
  )
    .map((set) => {
      return set.paths.map((path) => {
        return {
          params: {
            slug: path.replace('.md', ''),
          },
          locale: set.locale,
        };
      });
    })
    .flat();
}
