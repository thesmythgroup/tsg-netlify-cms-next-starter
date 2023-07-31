const fs = require('fs');

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

function isIndexPage(fileName) {
  return fileName === 'index.tsx' || fileName === 'index.jsx';
}

function isDynamicRoute(fileName) {
  return fileName?.startsWith('[');
}

function findMatchingContentRoute(directory) {
  const contentPath = `${CONTENT_DIR}${directory}`;
  try {
    const files = fs.readdirSync(`${contentPath}`);
    return files[0];
  } catch (err) {
    // console.log('❌ matching content not found for: ', contentPath);
  }

  return;
}

function generatePageUrlsFromDirectory(directory) {
  const files = fs.readdirSync(directory);
  const directoryAsRoute = directory.slice(PAGES_DIR.length);
  // console.log(`📂 Contents of '${directory}' (${directoryAsRoute}) directory:`);
  // console.log(files);

  const pageUrls = [];
  for (const file of files) {
    if (IGNORE_FILES.includes(file)) {
      continue;
    }

    const filePath = `${directory}/${file}`;
    const fileStat = fs.lstatSync(filePath);
    if (fileStat.isDirectory()) {
      // Recursively add pages from this directory.
      pageUrls.push(...generatePageUrlsFromDirectory(filePath));
    }

    if (!fileStat.isFile()) {
      continue;
    }

    if (isIndexPage(file)) {
      pageUrls.push(`${HOST}${directoryAsRoute}`);
    } else if (isDynamicRoute(file)) {
      let exampleContentPage = findMatchingContentRoute(directoryAsRoute);
      if (exampleContentPage) {
        exampleContentPage = exampleContentPage.endsWith('.md')
          ? exampleContentPage.split('.')[0]
          : exampleContentPage;
        // TODO: The logic to find the content matching this route does not
        // work properly at the moment. We will need to discuss a better solution.
        // pages.push(`${HOST}${directoryAsRoute}/${exampleContentPage}`);
      }
    } else {
      const pageWithoutExtension = file.split('.')[0];
      pageUrls.push(`${HOST}${directoryAsRoute}/${pageWithoutExtension}`);
    }
  }

  return pageUrls;
}

const uniqueUrls = Array.from(
  new Set([
    ...generatePageUrlsFromDirectory(PAGES_DIR),
    // Specify sample URLs for dynamic routes
    'http://localhost:3000/blog/1',
    'http://localhost:3000/blog/posts/2023-06-14-great-eats-in-nantucket-via-chatgpt',
  ]),
);

// Sorting is unnecessary but it looks nicer 🙂
uniqueUrls.sort((a, b) => a.localeCompare(b));
console.log('🌎 List of URLs to audit: \n', uniqueUrls);

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready - started',
      url: uniqueUrls,
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        onlyCategories: [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
        ],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    server: {},
  },
};
