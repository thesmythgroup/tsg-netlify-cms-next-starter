import fs from 'fs';
import { BlogPost } from '../components/page/BlogPageComponent';
import CollectionService from './CollectionService';
import { BLOG_POSTS_PER_PAGE } from './constants';

let postCache: BlogPost[];

function fetchPostContent(): BlogPost[] {
  if (postCache) {
    return postCache;
  }

  const fileNames = fs.readdirSync('./content/blog');
  const posts = fileNames.map((filename) => {
    const post = new CollectionService<BlogPost>(
      `./content/blog/${filename}`,
    ).getParsedFiles()[0];

    return {
      ...post,
      date: post.date.toString(),
      slug: filename.replace('.md', ''),
    };
  });

  // Sort posts by date
  postCache = posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return postCache;
}

export function countBlogPosts(): number {
  return fetchPostContent().length;
}

export function getPaginatedBlogPosts(page: number): BlogPost[] {
  return fetchPostContent().slice(
    (page - 1) * BLOG_POSTS_PER_PAGE,
    page * BLOG_POSTS_PER_PAGE,
  );
}
