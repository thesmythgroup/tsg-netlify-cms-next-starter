import { writeFile } from 'node:fs/promises';
import path from 'path';

(async () => {
  // TODO: Once we know the site url, update this.
  const siteUrl = 'https://www.example.com';
  const fileContents = [
    'User-agent: *',
    `Sitemap: ${siteUrl}/sitemap.xml`,
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
