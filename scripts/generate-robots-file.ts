import { writeFile } from 'node:fs/promises';
import path from 'path';
import { SITE_URL } from '../lib/constants';

(async () => {
  const fileContents = [
    'User-agent: *',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ].join('\n');

  try {
    await writeFile(
      path.join(process.cwd(), 'public', 'robots.txt'),
      fileContents,
      {
        encoding: 'utf-8',
      },
    );
    console.log('Created robots.txt file');
  } catch (e) {
    console.error(e);
  }
})();
