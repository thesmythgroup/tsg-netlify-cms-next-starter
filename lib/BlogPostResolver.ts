import { BlogPost } from '../components/page/BlogPageComponent';
import { readdir } from 'fs/promises';
import CollectionService from './CollectionService';
import { BLOG_POSTS_PER_PAGE } from './constants';
import { DEFAULT_LOCALE } from './locale-settings';
import { LocalizedMarkdownContentInterface } from '../interfaces/LocalizedMarkdownContent.interface';

export class BlogPostResolver {
  posts: BlogPost[] | undefined;

  private readonly _language?: string;
  constructor(language?: string) {
    this._language = language ?? DEFAULT_LOCALE;
  }

  countBlogPosts(): number {
    return this.posts.length;
  }

  getPaginatedBlogPosts(page: number): BlogPost[] {
    return this.posts.slice(
      (page - 1) * BLOG_POSTS_PER_PAGE,
      page * BLOG_POSTS_PER_PAGE,
    );
  }

  getBlogPostsByCategory(cat: string): BlogPost[] {
    return this.posts.filter((post) => {
      return post.categorySlug?.toLowerCase() === cat;
    });
  }

  getBlogPostBySlug(slug: string): BlogPost {
    return this.posts.find((post) => post.slug === slug);
  }

  getRelatedBlogPosts(
    category: string,
    currentPostSlug: string,
    tags?: string[],
  ): BlogPost[] {
    return this.posts.filter((post) => {
      return (
        (post.category === category ||
          tags?.some((t) => post.tags?.includes(t))) &&
        post.slug !== currentPostSlug
      );
    });
  }

  getBlogPostsByTag(tag: string): BlogPost[] {
    return this.posts.filter((post) => {
      return post.tagSlugs?.includes(tag);
    });
  }

  async fetchPostContent(): Promise<BlogPostResolver> {
    if (this.posts) {
      return this;
    }

    // Read all categories so they can be paired with posts
    const categories = (await readdir('./content/categories')).map(
      (categoryFilename) => {
        const cat = new CollectionService<
          LocalizedMarkdownContentInterface<{ name: string }>
        >(`./content/categories/${categoryFilename}`).getParsedFiles()[0][
          this._language
        ];
        return {
          name: cat.name,
          slug: categoryFilename.replace('.md', ''),
        };
      },
    );

    // Read all tags so they can be paired with posts
    const tags = (await readdir('./content/tags')).map((tagFilename) => {
      const tag = new CollectionService<
        LocalizedMarkdownContentInterface<{ name: string }>
      >(`./content/tags/${tagFilename}`).getParsedFiles()[0][this._language];

      return {
        name: tag.name,
        slug: tagFilename.replace('.md', ''),
      };
    });

    const fileNames = await readdir('./content/blog');
    const posts = fileNames.map((filename) => {
      const post = new CollectionService<
        LocalizedMarkdownContentInterface<BlogPost>
      >(`./content/blog/${filename}`).getParsedFiles()[0][this._language];
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
    this.posts = posts.sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      } else {
        return -1;
      }
    });

    return this;
  }
}
