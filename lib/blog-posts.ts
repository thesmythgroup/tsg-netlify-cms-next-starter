import fs from 'fs';
import { BlogPost } from '../components/page/BlogPageComponent';
import CollectionService from './CollectionService';
import { BLOG_POSTS_PER_PAGE } from './constants';

let postCache: BlogPost[];

function fetchPostContent(): BlogPost[] {
  if (postCache) {
    return postCache;
  }

  // Read all categories so they can be paried with posts
  const categories = fs
    .readdirSync('./content/categories')
    .map((categoryFilename) => {
      const cat = new CollectionService<{ name: string }>(
        `./content/categories/${categoryFilename}`,
      ).getParsedFiles()[0];
      return {
        name: cat.name,
        slug: categoryFilename.replace('.md', ''),
      };
    });

  // Read all tags so they can be paried with posts
  const tags = fs.readdirSync('./content/tags').map((tagFilename) => {
    const tag = new CollectionService<{ name: string }>(
      `./content/tags/${tagFilename}`,
    ).getParsedFiles()[0];

    return {
      name: tag.name,
      slug: tagFilename.replace('.md', ''),
    };
  });

  const fileNames = fs.readdirSync('./content/blog');
  const posts = fileNames.map((filename) => {
    const post = new CollectionService<BlogPost>(
      `./content/blog/${filename}`,
    ).getParsedFiles()[0];
    const category = categories.find((cat) => cat.name === post.category);
    const postTags = post.tags?.map((tag) => {
      return tags.find((t) => t.name === tag);
    });

    return {
      ...post,
      date: post.date.toString(),
      slug: filename.replace('.md', ''),
      categorySlug: category?.slug || '',
      tagSlugs: postTags?.map((t) => t.slug) || [],
    };
  });

  // Sort posts by date
  postCache = posts.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
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

export function getBlogPostsByCategory(cat: string): BlogPost[] {
  return fetchPostContent().filter((post) => {
    return post.categorySlug?.toLowerCase() === cat;
  });
}

export function getBlogPostBySlug(slug: string): BlogPost {
  return fetchPostContent().find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(
  category: string,
  currentPostSlug: string,
  tags?: string[],
): BlogPost[] {
  return fetchPostContent().filter((post) => {
    return (
      (post.category === category ||
        tags?.some((t) => post.tags?.includes(t))) &&
      post.slug !== currentPostSlug
    );
  });
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return fetchPostContent().filter((post) => {
    return post.tagSlugs?.includes(tag);
  });
}
