declare module '*.svg' {
  const content: any;
  export default content;
}

interface Window {
  // TypeScript support for Netlify CMS
  netlifyIdentity: {
    on(event: string, callback: (user: Record<string, unknown>) => void);
  };
}

declare module '*.md';
