# TSG Netlify CMS Starter

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see
the result.

You can start editing the page by modifying `pages/index.js`. The page
auto-updates as you edit the file.

Run the CMS:

```bash
npm run cms
```

You can log into the CMS at <http://127.0.0.1:8080/admin>.

## Deploy To Netlify

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/thesmythgroup/tsg-netlify-cms-next-starter&amp;stack=cms"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

## Before Releasing To Production

Before you can go live with this site, you will need to do the following items:

   - Change `SITE_URL` in `lib\constants.ts` to the URL of your site.

## Development Notes

### Page Components Defined in `./pages` Should Only be "Entry" Components

Why? Netlify CMS does not have any nice preview styles out-of-the-box, so if
we're going to display nice previews, we need to pass it our React components.

This being the case, any component defined in `./pages` should serve
only these two purpose:

1. Import content from markdown files
2. Import a component for display
3. Feed content document attributes into the page component via props
   (see `pages/index.tsx` and `components/pages/home.tsx` for an example)

For each new page we create, we then need to reference it in two places:

1. Admin entry point in `public/admin/index.html` (see: <https://www.netlifycms.org/docs/customization/>)
2. Front-end entry-point in `pages/page-name.tsx`

### TailwindCSS (aka: Don't Use CSS...generally)

These applications are intended to be styled using (tailwindcss)[https://tailwindcss.com/]

There may be some situations where a singular CSS file is more practical. Whether to
use a separate CSS file should be decided case-by-case.

Generally speaking, Tailwindcss should be used for styling elements.

### TailwindCSS Plug-ins
TailwindCSS offers official plugins for added ease & functionality. We have included some of the more useful plugins already:

* [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)
  * A plugin that provides a basic reset for form styles that makes form elements easy to override with utilities.
* [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
  * This plugin provides a set of `prose` classes you can use to add beautiful typographic defaults to any vanilla HTML you don’t control, like HTML rendered from Markdown, or pulled from a CMS.

**Not included** but also useful:
* [@tailwindcss/aspect-ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)
  * A plugin that provides a composable API for giving elements a fixed aspect ratio.
* [@tailwindcss/line-clamp](https://github.com/tailwindlabs/tailwindcss-line-clamp)
  * A plugin that provides utilities for visually truncating text after a fixed number of lines.


### Don't Use next/image

Because the primary use case for using Next.js is to bundle a static site using `next export`, the default
behavior of the `next/image` component imposes too many restrictions and problems. Therefore, this project uses
(`next-image-optimized`)[https://github.com/cyrilwanner/next-optimized-images] instead.

Simply use `<img src={'path/to/image'}` where images are needed.

Examples:

### Developing On the Local CMS

The CMS is configured in `public/admin/config.yml`. If you make changes to the config
you may have to hard-reload your browser to get the changes to show up.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features
  and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/).
Your feedback and contributions are welcome!
