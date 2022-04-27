/// <reference types="next" />
/// <reference types="next/types/global" />

interface Window {
  // TypeScript support for Netlify CMS
  netlifyIdentity: {
    on(event: string, callback: (user: Record<string, unknown>) => void);
  };
}

declare module '*.md';
