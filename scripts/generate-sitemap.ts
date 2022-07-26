import { readdirSync } from 'fs';
import { writeFile } from 'node:fs/promises';
import path from 'path';
import { SITE_URL } from '../lib/constants';

(async () => {
  const staticPageUrls = readdirSync('./public')
    .filter((staticPage) => {
      // disallowlist of items in site root
      // generator will ignore these paths
      return ![
        '_next',
        '404',
        'admin',
        'sitemap.xml',
        'uploads',
        '_redirects',
        'vercel.svg',
        'favicon.ico',
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${SITE_URL}/${staticPagePath}`;
    });

  const siteMap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPageUrls
        .map((url) => {
          return `<url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>`;
        })
        .join('')}
    </urlset>
  `;

  try {
    await writeFile(
      path.join(process.cwd(), 'public', 'sitemap.xml'),
      siteMap,
      { encoding: 'utf-8' },
    );
    console.log(`Completed sitemap generation for: ${SITE_URL}`);
  } catch (e) {
    console.error(e);
  }
})();
