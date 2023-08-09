import { readdirSync, lstatSync } from 'fs';
import { writeFile } from 'node:fs/promises';
import path from 'path';
import lighthouserc from '../lighthouserc.json';
import { LOCALES, DEFAULT_LOCALE } from '../lib/locale-settings';

/**
 * This script alters the lighthouserc config file so that the lighthouseci tool runs against
 * all of the "important" page routes in our app. In the case of dynamic routes ([slug].tsx), we
 * aren't necessarily interested in auditing all of those pages. This is because some pages are
 * taxonomical. We only care about canonical urls and the localized version of that URL.
 */

const HOST = 'http://localhost:3000';
const PAGES_DIR = './pages';
const CONTENT_DIR = './content';
const IGNORE_FILES = [
  '_app.tsx',
  '_document.tsx',
  '_error.tsx',
  '404.tsx',
  '500.tsx',
];

(async () => {
  // Based on Next's pages directory, we generate route URLs for:
  // 1) static pages
  // 2) canonical URLs of interest
  // The canonical URLs of interest are manually specified since
  // there is currently no way to determine these routes programmatically.
  const staticUrls = generateStaticUrlsFromDirectory(PAGES_DIR);
  const dynamicCanonicalUrls = getDynamicCanonicalUrls();
  // const urlsAlreadyProvided =
  //   lighthouserc.ci.collect.url?.map(removeTrailingSlashIfPresent) ?? [];
  const uniqueUrls = Array.from(
    new Set<string>([...staticUrls, ...dynamicCanonicalUrls]),
  );

  // To make the config file look pretty, sort the urls. 🙂
  uniqueUrls.sort((a, b) => a.localeCompare(b));

  // Now that we have our complete list of URLs to audit, let's update the config JSON
  // and then write that object back to the .json file.
  lighthouserc.ci.collect['url'] = uniqueUrls;
  console.log('URLS to audit: ', uniqueUrls);

  try {
    await writeFile(
      path.join(process.cwd(), 'lighthouserc.json'),
      JSON.stringify(lighthouserc, null, 2),
      {
        encoding: 'utf-8',
      },
    );
    console.log('Completed lighthouserc.json config generation.');
  } catch (e) {
    console.error(e);
  }
})();

function generateStaticUrlsFromDirectory(directory: string): string[] {
  const files = readdirSync(directory);

  const pageUrls = [];
  for (const file of files) {
    if (IGNORE_FILES.includes(file) || isDynamicRoute(file)) {
      continue;
    }

    const filePath = `${directory}/${file}`;
    const fileStat = lstatSync(filePath);
    if (fileStat.isDirectory()) {
      // Recursively add pages from this directory.
      pageUrls.push(...generateStaticUrlsFromDirectory(filePath));
      continue;
    }

    if (!fileStat.isFile()) {
      continue;
    }

    const path = isIndexPage(file) ? '' : file.split('.')[0];
    pageUrls.push(...getUrlAndLocalization(path));
  }

  return pageUrls;
}

function getDynamicCanonicalUrls(): string[] {
  // At the moment, the only canonical URLs we care about are the /blog/posts routes.
  return [...getBlogPostUrls()];
}

function getBlogPostUrls(): string[] {
  const blogPosts = readdirSync(`${CONTENT_DIR}/blog`);

  const urls = [];
  for (const post of blogPosts) {
    // Remove the .md extension to get the slug
    const blogSlug = post.split('.')[0];
    urls.push(...getUrlAndLocalization(`blog/posts/${blogSlug}`));
  }

  return urls;
}

function getUrlAndLocalization(path: string): string[] {
  // the DEFAULT_LOCALE ('en', in this case) is not represented in the url.
  // Appending the locale to the host is Next's default convention.
  const supportedLocales = LOCALES.filter((l) => l !== DEFAULT_LOCALE);
  return [
    `${HOST}/${path}`,
    ...supportedLocales.map((locale) => `${HOST}/${locale}/${path}`),
  ];
}

function isIndexPage(fileName: string): boolean {
  return fileName === 'index.tsx' || fileName === 'index.jsx';
}

function isDynamicRoute(fileName: string): boolean {
  return fileName?.startsWith('[');
}
